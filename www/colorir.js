/* ============================================================
   colorir.js — Feature "Colorir / Álbum de Figurinhas" (Aventura com Jesus)
   Módulo AUTOCONTIDO (IIFE). Expõe SOMENTE window.openColorir.
   Motor de flood-fill portado do protótipo provado (colorir-app):
   barreira = as LINHAS do desenho (baseData), toque = 1 região,
   arraste = pincel gordinho, seenGen (Uint32) p/ performance.
   Recompensas fazem PONTE pro estado do app (state.colored / xp / coins /
   checkLevel / save / toast). NÃO define nem sobrescreve nenhum global do app.
   ============================================================ */
(function(){
  "use strict";
  /* ícones de linha (SVG) no lugar de emojis — herdam cor (currentColor) e tamanho (em) do texto */
  var ICON = {
    palette:'<svg class="clr-ic" viewBox="0 0 24 24"><path d="M12 3.5c-4.9 0-8.5 3.4-8.5 7.8 0 4.3 3.5 6.9 6.9 6.9.9 0 1.4-.7 1.4-1.4 0-.4-.2-.7-.4-1-.2-.3-.4-.6-.4-.9 0-.8.6-1.4 1.4-1.4h1.5c3.2 0 5.6-2 5.6-5 0-3.2-3.1-5-7.5-5Z"/><circle cx="8" cy="11" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="1.1" fill="currentColor" stroke="none"/><circle cx="16" cy="11" r="1.1" fill="currentColor" stroke="none"/></svg>',
    book:'<svg class="clr-ic" viewBox="0 0 24 24"><path d="M12 6.5C10.5 5 8 4.5 4 5v12c4-.5 6.5 0 8 1.5 1.5-1.5 4-2 8-1.5V5c-4-.5-6.5 0-8 1.5Z"/><path d="M12 6.5v12"/></svg>',
    soundOn:'<svg class="clr-ic" viewBox="0 0 24 24"><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a8 8 0 0 1 0 11"/></svg>',
    soundOff:'<svg class="clr-ic" viewBox="0 0 24 24"><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4Z"/><path d="m16 10 4.5 4M20.5 10 16 14"/></svg>',
    undo:'<svg class="clr-ic" viewBox="0 0 24 24"><path d="M9 6.5 4.5 11 9 15.5"/><path d="M4.5 11H15a4.5 4.5 0 0 1 0 9h-2"/></svg>',
    eraser:'<svg class="clr-ic" viewBox="0 0 24 24"><path d="M6 15.5 12.5 9l5.5 5.5-4 4H9.5L6 15.5Z"/><path d="m12.5 9 3.4-3.4a1.5 1.5 0 0 1 2.1 0l2.4 2.4a1.5 1.5 0 0 1 0 2.1L18 13.5"/><path d="M8.5 18.5H21"/></svg>',
    check:'<svg class="clr-ic" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    lock:'<svg class="clr-ic" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="2.2"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/><circle cx="12" cy="15" r="1.25" fill="currentColor" stroke="none"/></svg>'
  };

  /* ---------- refs privadas (nada vaza p/ escopo global) ---------- */
  var rootEl=null, stylesInjected=false;
  function qs(sel){ return rootEl ? rootEl.querySelector(sel) : null; }

  /* ---------- som (Web Audio, procedural) + faíscas de toque ---------- */
  var AC=null, soundOn=true, musicTimer=null, mi=0, lastSpark=0, curView="covers";
  var SCALE=[261.63,293.66,329.63,392.00,440.00,523.25]; // pentatônica suave
  function ensureAudio(){ if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}} if(AC&&AC.state==="suspended")AC.resume(); }
  function tone(f,dur,vol,type){ if(!AC||!soundOn)return; var o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;
    o.type=type||"sine"; o.frequency.value=f; g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.03); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.connect(g);g.connect(AC.destination); o.start(t); o.stop(t+dur+0.05); }
  function sfxFill(){ tone(380+Math.random()*240,0.13,0.11,"sine"); }             // "plop" ao pintar
  function sfxWin(){ [523,659,784,1046].forEach(function(f,i){ setTimeout(function(){ tone(f,0.24,0.12,"triangle"); },i*90); }); } // jingle
  function startMusic(){ stopMusic(); musicTimer=setInterval(function(){ if(!soundOn)return; var oct=Math.random()<0.25?0.5:1; tone(SCALE[mi]*oct,0.95,0.038,"triangle"); mi=(mi+(Math.random()<0.5?1:2))%SCALE.length; },660); }
  function stopMusic(){ if(musicTimer)clearInterval(musicTimer); musicTimer=null; }
  function musicForView(){ if(soundOn && (curView==="picker"||curView==="paint") && curAlbum) startMusic(); else stopMusic(); }
  function sparkle(x,y){ for(var i=0;i<5;i++){ var s=document.createElement("div"); s.className="clr-spark"; s.textContent=Math.random()<0.5?"✨":"⭐";
    s.style.left=x+"px"; s.style.top=y+"px"; var a=Math.random()*6.283,d=16+Math.random()*24;
    s.style.setProperty("--dx",(Math.cos(a)*d).toFixed(0)+"px"); s.style.setProperty("--dy",(Math.sin(a)*d).toFixed(0)+"px");
    document.body.appendChild(s); setTimeout((function(el){return function(){el.remove();};})(s),520); } }

  /* ---------- folha em branco onde o line-art é desenhado ---------- */
  function base(c){c.fillStyle="#fff";c.fillRect(0,0,700,700);c.lineWidth=5;c.strokeStyle="#1b1b1b";c.lineJoin="round";c.lineCap="round";}
  // re-renderiza capas/picker quando um desenho termina de chegar e decodificar
  function imgLoaded(){ try{ if(!rootEl) return; clrRenderCovers(); if(curAlbum) clrRenderPicker(); }catch(e){} }

  /* ---------- carregamento dos desenhos (SOB DEMANDA) ----------
     Antes: 8 PNG em base64 aqui dentro = 587 KB que entravam no parse do JS em TODA
     abertura do app, mesmo pra quem nunca abre o Colorir. Agora cada desenho e um
     arquivo em assets/colorir/ e so e buscado quando alguem vai de fato desenha-lo
     (capa do album, miniatura do picker ou canvas de pintura). Nada carrega ate o
     Colorir ser aberto.

     COLORIR_BASE segue o padrao do AUDIO_BASE: vazio = local (mesma origem, o que
     mantem o APK pintando OFFLINE e deixa o sw do web cachear por conta propria).
     Preenchido = CDN. So nesse caso o crossOrigin importa: o motor usa getImageData
     pro flood-fill, e imagem de outra origem sem CORS CONTAMINA o canvas e quebra a
     pintura inteira. Por isso ele e setado ANTES do src — depois nao vale. */
  function clrBase(){ try{ return (window.COLORIR_BASE||'').replace(/\/$/,''); }catch(_){ return ''; } }
  function imgUrl(arq){ var b=clrBase(); return b ? b+'/'+arq : 'assets/colorir/'+arq; }
  function ensureImg(d){
    if(d.img) return d.img;
    var im=new Image();
    if(clrBase()) im.crossOrigin='anonymous';        // ANTES do src, senao nao tem efeito
    im.onload=imgLoaded;
    im.onerror=function(){ d.img=null; };            // falhou (sem rede?): tenta de novo na proxima
    im.src=imgUrl(d.file);
    d.img=im; return im;
  }
  // desenha o line-art; enquanto nao carregou, fica so a folha branca (nunca quebra)
  function drawArt(c){ base(c); var im=ensureImg(this); if(im.complete&&im.naturalWidth) c.drawImage(im,0,0,700,700); }

  var DRAWINGS=[
    {id:"jesus",name:"Jesus e os Amigos",col:"O Amigo de Todos",file:"jesus.png",img:null,draw:drawArt},
    {id:"pastor",name:"O Bom Pastor",col:"O Bom Pastor",file:"pastor.png",img:null,draw:drawArt},
    {id:"criancas",name:"As Criancinhas",col:"Deixai as Criancinhas",file:"criancas.png",img:null,draw:drawArt},
    {id:"davi",name:"O Burrinho Davi",col:"O Mascote",file:"davi.png",img:null,draw:drawArt},
    {id:"zaqueu",name:"Zaqueu na Árvore",col:"A Curiosidade",file:"zaqueu.png",img:null,draw:drawArt},
    {id:"paes",name:"Pães e Peixes",col:"O Milagre",file:"paes.png",img:null,draw:drawArt},
    {id:"arca",name:"A Arca de Noé",col:"A Grande Promessa",file:"arca.png",img:null,draw:drawArt},
    {id:"daniel",name:"Daniel e o Leão",col:"A Coragem",file:"daniel.png",img:null,draw:drawArt},
    /* Álbum 2 — Heróis da Bíblia. O id "davi" já é o burrinho mascote no álbum 1, e é ele
       que guarda o progresso em state.colored; por isso o Davi bíblico entra como
       "davi-funda" e aparece pra criança como "O Menino da Funda" (dois Davis confundem). */
    {id:"davi-funda",name:"O Menino da Funda",col:"A Coragem Pequena",file:"davi-funda.png",img:null,draw:drawArt},
    {id:"sansao",name:"Sansão Forte",col:"A Força",file:"sansao.png",img:null,draw:drawArt},
    {id:"moises-mar",name:"Moisés e o Mar",col:"O Caminho no Mar",file:"moises-mar.png",img:null,draw:drawArt},
    {id:"jose-manto",name:"José e o Manto",col:"O Perdão",file:"jose-manto.png",img:null,draw:drawArt},
    {id:"jonas",name:"Jonas e a Baleia",col:"A Segunda Chance",file:"jonas.png",img:null,draw:drawArt},
    {id:"tabuas",name:"As Duas Tábuas",col:"As Palavras de Deus",file:"tabuas.png",img:null,draw:drawArt},
    {id:"bom-amigo",name:"O Bom Amigo",col:"O Cuidado",file:"bom-amigo.png",img:null,draw:drawArt},
    {id:"abraao",name:"Abraão e as Estrelas",col:"A Promessa",file:"abraao.png",img:null,draw:drawArt},
    /* Álbum 3 — O Mundo que Deus Criou. A ordem É a sequência dos 7 dias: a criança
       "constrói o mundo" pintando na ordem, o que dá um fio condutor que o álbum
       solto não tem. Amarra na história pra dormir "No Princípio" e no vídeo curto
       "A Criação do Mundo". O Jardim entra fora da contagem de dias, como fecho. */
    {id:"criacao-luz",name:"A Primeira Luz",col:"Dia 1",file:"criacao-luz.png",img:null,draw:drawArt},
    {id:"criacao-ceu",name:"O Céu e as Águas",col:"Dia 2",file:"criacao-ceu.png",img:null,draw:drawArt},
    {id:"criacao-terra",name:"A Terra Florida",col:"Dia 3",file:"criacao-terra.png",img:null,draw:drawArt},
    {id:"criacao-sol-lua",name:"O Sol e a Lua",col:"Dia 4",file:"criacao-sol-lua.png",img:null,draw:drawArt},
    {id:"criacao-peixes",name:"Peixes e Passarinhos",col:"Dia 5",file:"criacao-peixes.png",img:null,draw:drawArt},
    {id:"criacao-animais",name:"Os Animaizinhos",col:"Dia 6",file:"criacao-animais.png",img:null,draw:drawArt},
    {id:"criacao-jardim",name:"O Jardim Feliz",col:"A Família",file:"criacao-jardim.png",img:null,draw:drawArt},
    {id:"criacao-descanso",name:"O Dia de Descanso",col:"Dia 7",file:"criacao-descanso.png",img:null,draw:drawArt},
    /* Álbum 4 — Milagres de Jesus. "Pães e Peixes" e "Zaqueu" já existem no álbum 1;
       aqui são OUTROS momentos das mesmas histórias, com ids próprios (milagre-cesta,
       milagre-zaqueu) pra não colidir com o progresso de quem já pintou os do álbum 1. */
    {id:"milagre-aguas",name:"Jesus nas Águas",col:"O Passo de Fé",file:"milagre-aguas.png",img:null,draw:drawArt},
    {id:"milagre-cesta",name:"A Cesta que Não Acabava",col:"O Pão do Céu",file:"milagre-cesta.png",img:null,draw:drawArt},
    {id:"milagre-tempestade",name:"O Mar Ficou Calmo",col:"A Paz de Jesus",file:"milagre-tempestade.png",img:null,draw:drawArt},
    {id:"milagre-cego",name:"Os Olhos que Viram",col:"A Luz",file:"milagre-cego.png",img:null,draw:drawArt},
    {id:"milagre-ovelha",name:"A Ovelhinha Achada",col:"Ninguém se Perde",file:"milagre-ovelha.png",img:null,draw:drawArt},
    {id:"milagre-zaqueu",name:"O Almoço do Zaqueu",col:"O Convite",file:"milagre-zaqueu.png",img:null,draw:drawArt},
    {id:"milagre-volta",name:"O Abraço do Pai",col:"O Perdão",file:"milagre-volta.png",img:null,draw:drawArt},
    {id:"milagre-bencao",name:"A Bênção de Jesus",col:"A Grande Bênção",file:"milagre-bencao.png",img:null,draw:drawArt},
    /* Álbum 5 — Noite de Paz. O único noturno: lua e estrelas no lugar do sol.
       Amarra em "O Nascimento de Jesus" (top 10 das histórias pra dormir) e é o
       ativo sazonal de Natal. Ordem: anunciação -> viagem -> estrela -> manjedoura
       -> pastores -> reis, seguindo a narrativa. */
    {id:"natal-anjo",name:"O Anjo e Maria",col:"A Anunciação",file:"natal-anjo.png",img:null,draw:drawArt},
    {id:"natal-viagem",name:"A Viagem do Burrinho",col:"O Caminho",file:"natal-viagem.png",img:null,draw:drawArt},
    {id:"natal-estrela",name:"A Estrela Guia",col:"A Luz da Noite",file:"natal-estrela.png",img:null,draw:drawArt},
    {id:"natal-manjedoura",name:"O Bebê na Manjedoura",col:"A Noite Feliz",file:"natal-manjedoura.png",img:null,draw:drawArt},
    {id:"natal-pastores",name:"Os Pastorezinhos",col:"A Boa Notícia",file:"natal-pastores.png",img:null,draw:drawArt},
    {id:"natal-reis",name:"Os Três Presentes",col:"Os Reis Magos",file:"natal-reis.png",img:null,draw:drawArt},
    {id:"natal-abraao",name:"Contando Estrelas",col:"A Promessa da Noite",file:"natal-abraao.png",img:null,draw:drawArt},
    {id:"natal-boanoite",name:"Boa Noite com Jesus",col:"O Descanso",file:"natal-boanoite.png",img:null,draw:drawArt},
    /* Álbum 6 — Meu Coração Feliz. PRIMEIRO fora da Bíblia: situações do dia a dia
       (dividir o brinquedo, cuidar do cachorro, respirar fundo). Cada cena tem um
       coração grande como motivo recorrente. Dá par visual pras 7 Afirmações, que
       hoje só existem em áudio. */
    {id:"coracao-amado",name:"Sou Muito Amado",col:"Sou Amado por Deus",file:"coracao-amado.png",img:null,draw:drawArt},
    {id:"coracao-corajoso",name:"Posso Ser Corajoso",col:"A Coragem",file:"coracao-corajoso.png",img:null,draw:drawArt},
    {id:"coracao-cuidado",name:"Deus Cuida de Mim",col:"O Cuidado",file:"coracao-cuidado.png",img:null,draw:drawArt},
    {id:"coracao-especial",name:"Sou Único",col:"Sou Especial",file:"coracao-especial.png",img:null,draw:drawArt},
    {id:"coracao-bondoso",name:"Coração Bondoso",col:"A Bondade",file:"coracao-bondoso.png",img:null,draw:drawArt},
    {id:"coracao-partilha",name:"Dividir é Bom",col:"Compartilhar",file:"coracao-partilha.png",img:null,draw:drawArt},
    {id:"coracao-proposito",name:"Feito com Amor",col:"O Propósito",file:"coracao-proposito.png",img:null,draw:drawArt},
    {id:"coracao-paz",name:"Paz no Coração",col:"A Calma",file:"coracao-paz.png",img:null,draw:drawArt},
    /* Álbum 7 — Momentos de Oração. Par visual da missão diária "Oração de Hoje":
       a criança escuta a oração e pinta a figurinha correspondente. Ordem = ciclo do
       dia (manhã, refeição, casa, amigos, noite); as 4 primeiras diurnas, as 4
       últimas noturnas. Mãos unidas como dois blocos fechados — dedo separado vira
       sliver, que é o mesmo motivo de o mascote Davi orar com os cascos juntos. */
    {id:"oracao-manha",name:"Bom Dia, Deus",col:"Oração da Manhã",file:"oracao-manha.png",img:null,draw:drawArt},
    {id:"oracao-obrigado",name:"Obrigado pela Comida",col:"Gratidão",file:"oracao-obrigado.png",img:null,draw:drawArt},
    {id:"oracao-familia",name:"Oração em Família",col:"A Família",file:"oracao-familia.png",img:null,draw:drawArt},
    {id:"oracao-amigos",name:"Rezando com Amigos",col:"Juntos",file:"oracao-amigos.png",img:null,draw:drawArt},
    {id:"oracao-protecao",name:"Deus Me Protege",col:"A Proteção",file:"oracao-protecao.png",img:null,draw:drawArt},
    {id:"oracao-cancao",name:"A Canção do Mel",col:"O Pablo",file:"oracao-cancao.png",img:null,draw:drawArt},
    {id:"oracao-mascote",name:"O Davi Ora Também",col:"O Mascote",file:"oracao-mascote.png",img:null,draw:drawArt},
    {id:"oracao-noite",name:"Boa Noite, Deus",col:"Oração da Noite",file:"oracao-noite.png",img:null,draw:drawArt},
    /* Álbum 8 — As Bênçãos de Jesus. Espelha a série do app episódio por episódio,
       o que abre caminho pra linkar cada figurinha ao episódio ("assista e depois
       pinte"). Jesus padronizado nas 8 (barba curta, cabelo em blocos, túnica) —
       mas SEM a faixa cruzada e SEM sandálias: medi que tira fina no peito e
       recorte no pé afinam o traço e picotam (slivers 27,4 -> 19,1 só tirando). */
    {id:"bencao-anunciacao",name:"O Anjo Chegou",col:"A Anunciação",file:"bencao-anunciacao.png",img:null,draw:drawArt},
    {id:"bencao-burrinho",name:"O Rei no Burrinho",col:"Jerusalém",file:"bencao-burrinho.png",img:null,draw:drawArt},
    {id:"bencao-paodoceu",name:"O Pão do Céu",col:"O Alimento",file:"bencao-paodoceu.png",img:null,draw:drawArt},
    {id:"bencao-salmo",name:"O Salmo do Pastor",col:"O Bom Pastor",file:"bencao-salmo.png",img:null,draw:drawArt},
    {id:"bencao-criancas",name:"Deixem as Crianças",col:"O Acolhimento",file:"bencao-criancas.png",img:null,draw:drawArt},
    {id:"bencao-samaritano",name:"Quem é Meu Vizinho",col:"O Bom Samaritano",file:"bencao-samaritano.png",img:null,draw:drawArt},
    {id:"bencao-ovelha",name:"A Ovelha Perdida",col:"A Busca",file:"bencao-ovelha.png",img:null,draw:drawArt},
    {id:"bencao-amor",name:"Amar de Verdade",col:"Ame com Profundidade",file:"bencao-amor.png",img:null,draw:drawArt},
    /* Álbum 9 — O Mundo do Davi. Fecha a coleção em 72. Único sem figura bíblica:
       é o cotidiano do mascote (quarto, lanche, roupas, piada), espelhando a aba
       Davi. O "davi" do álbum 1 é o retrato dele; estes são as cenas, com ids
       próprios. Consistência do personagem veio de passar a CAPA como imagem de
       referência nas outras 7 — descrição de texto sozinha só dá "parecido". */
    {id:"davi-oi",name:"Oi, Eu Sou o Davi!",col:"O Amiguinho",file:"davi-oi.png",img:null,draw:drawArt},
    {id:"davi-quarto",name:"O Quarto do Davi",col:"Meu Cantinho",file:"davi-quarto.png",img:null,draw:drawArt},
    {id:"davi-lanche",name:"Hora do Lanche",col:"Alimentar",file:"davi-lanche.png",img:null,draw:drawArt},
    {id:"davi-brincar",name:"Vamos Brincar!",col:"Brincar",file:"davi-brincar.png",img:null,draw:drawArt},
    {id:"davi-piada",name:"A Piada do Davi",col:"Rir É Bom",file:"davi-piada.png",img:null,draw:drawArt},
    {id:"davi-roupas",name:"Meu Look Novo",col:"Roupas",file:"davi-roupas.png",img:null,draw:drawArt},
    {id:"davi-leitura",name:"A Leitura do Dia",col:"Missões do Dia",file:"davi-leitura.png",img:null,draw:drawArt},
    {id:"davi-cancao",name:"A Canção do Davi",col:"Hora de Cantar",file:"davi-cancao.png",img:null,draw:drawArt},
  ];
  var byDrawId={}; DRAWINGS.forEach(function(d){ byDrawId[d.id]=d; });
  var ALBUMS=[
    {id:"alb1",name:"Amiguinhos da Bíblia",sub:"Álbum 1",ids:["jesus","pastor","criancas","davi","zaqueu","paes","arca","daniel"]},
    // a capa do álbum é o PRIMEIRO id da lista (ver clrRenderCovers) — aqui, o Menino da Funda
    {id:"alb2",name:"Heróis da Bíblia",sub:"Álbum 2",ids:["davi-funda","sansao","moises-mar","jose-manto","jonas","tabuas","bom-amigo","abraao"]},
    {id:"alb3",name:"O Mundo que Deus Criou",sub:"Álbum 3",ids:["criacao-luz","criacao-ceu","criacao-terra","criacao-sol-lua","criacao-peixes","criacao-animais","criacao-jardim","criacao-descanso"]},
    {id:"alb4",name:"Milagres de Jesus",sub:"Álbum 4",ids:["milagre-aguas","milagre-cesta","milagre-tempestade","milagre-cego","milagre-ovelha","milagre-zaqueu","milagre-volta","milagre-bencao"]},
    {id:"alb5",name:"Noite de Paz",sub:"Álbum 5",ids:["natal-anjo","natal-viagem","natal-estrela","natal-manjedoura","natal-pastores","natal-reis","natal-abraao","natal-boanoite"]},
    {id:"alb6",name:"Meu Coração Feliz",sub:"Álbum 6",ids:["coracao-amado","coracao-corajoso","coracao-cuidado","coracao-especial","coracao-bondoso","coracao-partilha","coracao-proposito","coracao-paz"]},
    {id:"alb7",name:"Momentos de Oração",sub:"Álbum 7",ids:["oracao-manha","oracao-obrigado","oracao-familia","oracao-amigos","oracao-protecao","oracao-cancao","oracao-mascote","oracao-noite"]},
    {id:"alb8",name:"As Bênçãos de Jesus",sub:"Álbum 8",ids:["bencao-anunciacao","bencao-burrinho","bencao-paodoceu","bencao-salmo","bencao-criancas","bencao-samaritano","bencao-ovelha","bencao-amor"]},
    {id:"alb9",name:"O Mundo do Davi",sub:"Álbum 9",ids:["davi-oi","davi-quarto","davi-lanche","davi-brincar","davi-piada","davi-roupas","davi-leitura","davi-cancao"]}
  ];
  var curAlbum=null;

  /* ---------- PONTE com o estado do app (fonte da verdade p/ progresso) ---------- */
  // state.colored = ids concluídos (persiste + sincroniza via save() do app).
  function clrColored(){ if(typeof state==="undefined") return []; if(!Array.isArray(state.colored)) state.colored=[]; return state.colored; }
  function clrDone(id){ return clrColored().indexOf(id)>=0; }
  // miniaturas coloridas: cache LOCAL separado (NÃO entra no estado sincronizado, p/ não inchar o backend)
  var THUMB_KEY="clr_thumbs_v1";
  var clrThumbs=(function(){ try{ return JSON.parse(localStorage.getItem(THUMB_KEY))||{}; }catch(e){ return {}; } })();
  function clrSaveThumbs(){ try{ localStorage.setItem(THUMB_KEY, JSON.stringify(clrThumbs)); }catch(e){} }

  /* ---------- topo (lê nível/pães/xp do estado do app) ---------- */
  var XP_PER=50; // igual ao checkLevel() do app: level = floor(xp/50)+1
  function clrRenderTop(){
    var st=(typeof state!=="undefined")?state:{coins:0,level:1,xp:0};
    var c=qs("#clr-coins"); if(c) c.textContent=(st.coins||0);
    var l=qs("#clr-lvlnum"); if(l) l.textContent="Nível "+((st.level||1));
    var f=qs("#clr-xpfill"); if(f) f.style.width=(((st.xp||0)%XP_PER)/XP_PER*100)+"%";
  }

  /* ---------- paleta ---------- */
  var COLORS=["#ef4444","#f97316","#f59e0b","#eab308","#fde68a","#fecaca","#ffffff",
    "#84cc16","#22c55e","#10b981","#14b8a6","#06b6d4","#0ea5e9","#3b82f6",
    "#6366f1","#8b5cf6","#a855f7","#d946ef","#ec4899","#f43f5e","#78350f",
    "#92400e","#b45309","#451a03","#1f2937","#4b5563","#9ca3af","#e5e7eb"];
  var curColor="#f59e0b";
  function clrRenderPalette(){
    var p=qs("#clr-palette"); if(!p) return; p.innerHTML="";
    COLORS.forEach(function(hex){
      var b=document.createElement("button");
      b.className="clr-sw"+(hex===curColor?" on":""); b.style.background=hex;
      b.setAttribute("aria-label","Cor "+hex);
      b.onclick=function(){ curColor=hex; clrRenderPalette(); };
      p.appendChild(b);
    });
  }

  /* ---------- capas (álbuns) ---------- */
  function clrRenderCovers(){
    var g=qs("#clr-covers"); if(!g) return; g.innerHTML="";
    ALBUMS.forEach(function(alb){
      var done=alb.ids.filter(function(id){ return clrDone(id); }).length, tot=alb.ids.length;
      var el=document.createElement("div"); el.className="clr-cover"; el.tabIndex=0;
      el.setAttribute("role","button"); el.setAttribute("aria-label","Abrir álbum "+alb.name);
      var cvx=document.createElement("canvas"); cvx.width=cvx.height=700; cvx.className="clr-cvthumb";
      var first=byDrawId[alb.ids[0]]; if(first) first.draw(cvx.getContext("2d"));
      var info=document.createElement("div"); info.className="clr-cvinfo";
      info.innerHTML='<div class="clr-cvsub">'+alb.sub+'</div><div class="clr-cvname">'+alb.name+'</div>'+
        '<div class="clr-cvprog"><div class="clr-cvfill" style="width:'+(done/tot*100)+'%"></div></div>'+
        '<div class="clr-cvcount">'+done+'/'+tot+' figurinhas</div>';
      el.appendChild(cvx); el.appendChild(info);
      var open=function(){ openAlbum(alb); };
      el.onclick=open; el.onkeydown=function(e){ if(e.key==="Enter"||e.key===" ") open(); };
      g.appendChild(el);
    });
  }
  function openAlbum(alb){ curAlbum=alb; ensureAudio(); clrRenderPicker(); clrShow("picker"); }

  /* ---------- picker (desenhos do álbum) ---------- */
  function clrRenderPicker(){
    if(!curAlbum) return;
    var at=qs("#clr-albtitle"); if(at&&at.childNodes[0]) at.childNodes[0].nodeValue=curAlbum.name;
    var as=qs("#clr-albsub"); if(as) as.textContent=curAlbum.sub;
    var g=qs("#clr-picker"); if(!g) return; g.innerHTML="";
    curAlbum.ids.forEach(function(id){
      var d=byDrawId[id]; if(!d) return;
      var el=document.createElement("div"); el.className="clr-pick"+(clrDone(id)?" done":""); el.tabIndex=0;
      el.setAttribute("role","button"); el.setAttribute("aria-label","Colorir "+d.name);
      var cvx=document.createElement("canvas"); cvx.width=cvx.height=700;
      d.draw(cvx.getContext("2d"));
      el.innerHTML='<div class="clr-nm">'+d.name+'</div><div class="clr-cl">'+d.col+'</div>';
      el.prepend(cvx);
      if(clrDone(id)){ var t=document.createElement("div"); t.className="clr-badge-done"; t.textContent="✓ feito"; el.appendChild(t); }
      var open=function(){ openPaint(d); };
      el.onclick=open; el.onkeydown=function(e){ if(e.key==="Enter"||e.key===" ") open(); };
      g.appendChild(el);
    });
  }

  /* ---------- pintura (motor de flood-fill portado do protótipo) ---------- */
  var cv=null, ctx=null, current=null, undoStack=[], baseData=null;
  var seenGen=new Uint32Array(700*700); var gen=0;
  var work=null, LT=100;
  function hexRgb(h){h=h.replace("#","");return{r:parseInt(h.slice(0,2),16),g:parseInt(h.slice(2,4),16),b:parseInt(h.slice(4,6),16)};}
  var curRGB=hexRgb(curColor);
  function paintBase(d){ base(ctx); d.draw(ctx); baseData=ctx.getImageData(0,0,700,700).data; }
  function openPaint(d){
    current=d; paintBase(d); undoStack=[];
    var pt=qs("#clr-ptitle"); if(pt&&pt.childNodes[0]) pt.childNodes[0].nodeValue=d.name;
    var ps=qs("#clr-psub"); if(ps) ps.textContent=d.col;
    clrShow("paint");
  }
  function pushUndo(){ if(!ctx) return; undoStack.push(ctx.getImageData(0,0,700,700)); if(undoStack.length>8)undoStack.shift(); }
  function isLn(k){var i=k*4;return (baseData[i]*0.3+baseData[i+1]*0.59+baseData[i+2]*0.11)<LT;}
  function floodOn(sx,sy){ // preenche 1 região em `work` (barreira = linhas), rápido (sem realocar)
    var W=700,H=700;
    if(sx<0||sy<0||sx>=W||sy>=H)return;
    var d=work.data,f=curRGB,s=sy*W+sx,si=s*4;
    if(isLn(s))return;
    if(d[si]===f.r&&d[si+1]===f.g&&d[si+2]===f.b&&d[si+3]===255)return;
    gen++;var g=gen,st=[[sx,sy]];
    while(st.length){
      var p=st.pop();var x=p[0];var y=p[1];
      while(x>0 && !isLn(y*W+x-1) && seenGen[y*W+x-1]!==g) x--;
      var up=false,dn=false;
      while(x<W){var k=y*W+x;if(isLn(k)||seenGen[k]===g)break;
        var i=k*4;d[i]=f.r;d[i+1]=f.g;d[i+2]=f.b;d[i+3]=255;seenGen[k]=g;
        if(y>0){var ku=k-W,oku=!isLn(ku)&&seenGen[ku]!==g;if(oku&&!up){st.push([x,y-1]);up=true;}else if(!oku)up=false;}
        if(y<H-1){var kd=k+W,okd=!isLn(kd)&&seenGen[kd]!==g;if(okd&&!dn){st.push([x,y+1]);dn=true;}else if(!okd)dn=false;}
        x++;
      }
    }
  }
  // TOQUE = preenche 1 região. Só isso.
  // O arraste (pincel gordinho) foi REMOVIDO: encostar o dedo e escorregar saía pintando
  // tudo pelo caminho, o que numa mão de criança é acidente, não recurso.
  var painting=false, strokePushed=false;
  function toXY(cx,cy){var r=cv.getBoundingClientRect();return[Math.round((cx-r.left)/r.width*700),Math.round((cy-r.top)/r.height*700)];}
  function stamp(x,y){
    if(!strokePushed){pushUndo();strokePushed=true;}
    floodOn(x,y);
  }
  function bindCanvas(){
    cv.addEventListener("pointerdown",function(e){ e.preventDefault(); painting=true; strokePushed=false;
      var sensEl=qs("#clr-sens"); LT=60+(sensEl?(+sensEl.value):42); curRGB=hexRgb(curColor); work=ctx.getImageData(0,0,700,700);
      try{cv.setPointerCapture(e.pointerId);}catch(_){ }
      ensureAudio(); sfxFill(); sparkle(e.clientX,e.clientY); lastSpark=Date.now();
      var p=toXY(e.clientX,e.clientY); stamp(p[0],p[1]); ctx.putImageData(work,0,0); });
    cv.addEventListener("pointerup",function(){ if(painting&&work)ctx.putImageData(work,0,0); painting=false; work=null; });
    cv.addEventListener("pointercancel",function(){ painting=false; work=null; });
  }

  /* ---------- "Pronto!" -> PONTE de recompensa pro estado do app ---------- */
  function onPronto(){
    if(!current) return;
    // miniatura colorida pro álbum (cache local, não sincroniza)
    try{ var t=document.createElement("canvas"); t.width=t.height=220; t.getContext("2d").drawImage(cv,0,0,220,220);
         clrThumbs[current.id]=t.toDataURL("image/jpeg",0.7); clrSaveThumbs(); }catch(e){}
    // ---- ponte com o app (idempotente via state.colored) ----
    var id=current.id;
    if(!Array.isArray(state.colored)) state.colored=[];
    var first = state.colored.indexOf(id) < 0;
    if(first){ state.colored.push(id); state.xp += 12; state.coins += 6; if(typeof checkLevel==='function') checkLevel(); }
    if(typeof save==='function') save();
    if(first && typeof toast==='function') toast('🎉 Figurinha nova! +12 XP  +6 🥖');
    // ---- fim da ponte ----
    clrRenderTop(); clrRenderPicker(); clrRenderAlbum();
    celebrate(first);
  }

  /* ---------- álbum (coleção de figurinhas) ---------- */
  function clrRenderAlbum(){
    var g=qs("#clr-sticks"); if(!g) return;
    var done=clrColored().length;
    var pr=qs("#clr-prog"); if(pr) pr.textContent=done+"/"+DRAWINGS.length;
    g.innerHTML="";
    DRAWINGS.forEach(function(d){
      var st=document.createElement("div");
      if(clrDone(d.id)){
        st.className="clr-st";
        var th=clrThumbs[d.id];
        if(th){ var im=new Image(); im.src=th; st.appendChild(im); }
        else { var cvx=document.createElement("canvas"); cvx.width=cvx.height=700; d.draw(cvx.getContext("2d")); st.appendChild(cvx); }
        var cap=document.createElement("div"); cap.className="clr-cap"; cap.textContent=d.name; st.appendChild(cap);
      } else {
        st.className="clr-st clr-empty"; st.innerHTML='<div class="clr-lock">'+ICON.lock+'</div>';
      }
      g.appendChild(st);
    });
  }

  /* ---------- celebração + confete ---------- */
  function celebrate(first){
    var total=DRAWINGS.length, done=clrColored().length;
    var box=''+
      '<div class="clr-celbox">'+
        '<img class="clr-celdavi" src="assets/img/pet_donkey.webp" alt="Davi">'+
        '<h2>UAU! Ficou lindo!</h2>'+
        '<p>Você é um artista da Aventura!</p>'+
        '<div class="clr-stars">⭐⭐⭐</div>'+
        (first
          ? '<div class="clr-rewards"><div class="clr-rw">🥖 <b>+6</b></div><div class="clr-rw">✨ <b>+12 XP</b></div></div>'+
            '<div class="clr-newst">🎉 Nova figurinha no álbum! ('+done+'/'+total+')</div>'
          : '<div class="clr-newst">Figurinha atualizada no seu mural 💛</div>')+
        '<button class="clr-btn clr-pronto" id="clr-celok" style="width:100%">Continuar</button>'+
      '</div>';
    var cel=qs("#clr-cel"); if(!cel) return;
    cel.innerHTML=box; cel.classList.add("on");
    var ok=qs("#clr-celok"); if(ok) ok.onclick=function(){ cel.classList.remove("on"); clrShow("picker"); };
    confetti(); sfxWin();
  }
  function confetti(){
    if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    var cf=qs("#clr-confetti"); if(!cf) return; var x=cf.getContext("2d");
    cf.width=innerWidth;cf.height=innerHeight;
    var cols=["#f0c14b","#ffd97a","#3b82f6","#22c55e","#ec4899","#ffffff"];
    var P=[];for(var i=0;i<130;i++)P.push({x:innerWidth/2,y:innerHeight*0.34,vx:(Math.random()-.5)*13,vy:Math.random()*-14-3,g:.28+Math.random()*.2,c:cols[i%cols.length],s:5+Math.random()*7,r:Math.random()*6,vr:(Math.random()-.5)*.4,round:Math.random()<.35});
    var t=0;(function loop(){t++;var a=t>100?Math.max(0,1-(t-100)/32):1;x.clearRect(0,0,cf.width,cf.height);
      P.forEach(function(p){p.vy+=p.g;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;x.save();x.globalAlpha=a;x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;if(p.round){x.beginPath();x.arc(0,0,p.s*.5,0,7);x.fill();}else{x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.62);}x.restore();});
      if(t<136)requestAnimationFrame(loop);else x.clearRect(0,0,cf.width,cf.height);
    })();
  }

  /* ---------- navegação (capas -> desenhos -> pintura · aba coleção) ---------- */
  function clrShow(v){
    curView=v;
    var a=qs("#clr-covers"); if(a) a.style.display=(v==="covers")?"grid":"none";
    var b=qs("#clr-pickerWrap"); if(b) b.style.display=(v==="picker")?"block":"none";
    var c=qs("#clr-paint"); if(c) c.classList.toggle("on",v==="paint");
    var d=qs("#clr-album"); if(d) d.classList.toggle("on",v==="collection");
    var inColorir=(v!=="collection");
    var tc=qs("#clr-tabColorir"); if(tc) tc.classList.toggle("on",inColorir);
    var ta=qs("#clr-tabAlbum"); if(ta) ta.classList.toggle("on",!inColorir);
    if(v==="covers") clrRenderCovers();
    if(v==="collection") clrRenderAlbum();
    musicForView();
  }

  /* ---------- markup do overlay ---------- */
  function overlayHTML(){
    return ''+
    '<div class="clr-app">'+
      '<div class="clr-top">'+
        '<button class="clr-back clr-exit" id="clr-close" aria-label="Voltar ao app">‹</button>'+
        '<div class="clr-davi">'+ICON.palette+'</div>'+
        '<div class="clr-lvlwrap">'+
          '<div class="clr-lvl">Colorir · <small id="clr-lvlnum">Nível 1</small></div>'+
          '<div class="clr-xpbar"><div class="clr-xpfill" id="clr-xpfill"></div></div>'+
        '</div>'+
        '<div class="clr-coins">🥖 <span id="clr-coins">0</span></div>'+
        '<button class="clr-sndbtn" id="clr-snd" aria-label="Ligar ou desligar o som">'+ICON.soundOn+'</button>'+
      '</div>'+
      '<div class="clr-tabs">'+
        '<button class="clr-tab on" id="clr-tabColorir">'+ICON.palette+'Colorir</button>'+
        '<button class="clr-tab" id="clr-tabAlbum">'+ICON.book+'Meu Álbum</button>'+
      '</div>'+
      '<div class="clr-covers" id="clr-covers"></div>'+
      '<div id="clr-pickerWrap" style="display:none">'+
        '<div class="clr-pbar">'+
          '<button class="clr-back" id="clr-backCovers" aria-label="Voltar aos álbuns">‹</button>'+
          '<div class="clr-ptitle" id="clr-albtitle">—<small id="clr-albsub"></small></div>'+
        '</div>'+
        '<div class="clr-grid" id="clr-picker"></div>'+
      '</div>'+
      '<div class="clr-paint" id="clr-paint">'+
        '<div class="clr-pbar">'+
          '<button class="clr-back" id="clr-back" aria-label="Voltar">‹</button>'+
          '<div class="clr-ptitle" id="clr-ptitle">—<small id="clr-psub"></small></div>'+
        '</div>'+
        '<div class="clr-stage"><canvas id="clr-cv" width="700" height="700"></canvas></div>'+
        '<div class="clr-palette" id="clr-palette"></div>'+
        '<div class="clr-sens">'+
          '<label>Sensibilidade</label>'+
          '<input type="range" id="clr-sens" min="20" max="90" value="42">'+
        '</div>'+
        '<div class="clr-tools">'+
          '<button class="clr-btn clr-ghost" id="clr-undo">'+ICON.undo+'Desfazer</button>'+
          '<button class="clr-btn clr-ghost" id="clr-clear">'+ICON.eraser+'Limpar</button>'+
          '<button class="clr-btn clr-pronto" id="clr-pronto">Pronto! '+ICON.check+'</button>'+
        '</div>'+
      '</div>'+
      '<div class="clr-album" id="clr-album">'+
        '<div class="clr-albhead">'+
          '<h2>Meu Álbum da Aventura</h2>'+
          '<div class="clr-prog" id="clr-prog">0/0</div>'+
        '</div>'+
        '<div class="clr-sticks" id="clr-sticks"></div>'+
      '</div>'+
    '</div>'+
    '<div class="clr-cel" id="clr-cel"></div>'+
    '<canvas class="clr-confetti" id="clr-confetti"></canvas>';
  }

  /* ---------- estilos (todos prefixados clr-, escopados no overlay) ---------- */
  function injectStyles(){
    if(stylesInjected) return; stylesInjected=true;
    var s=document.createElement("style"); s.id="clr-styles";
    s.textContent=[
    ".clr-overlay{position:absolute;inset:0;z-index:26;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:none;",
      "font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#eef3ff;-webkit-font-smoothing:antialiased;",
      "background:radial-gradient(120% 90% at 50% -10%,#1b3a6b 0,transparent 60%),linear-gradient(160deg,#16294a,#0b1426);background-color:#0b1426;",
      "display:flex;justify-content:center;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;",
      "--clr-gold:#f0c14b;--clr-gold-d:#caa233;--clr-ink:#eef3ff;--clr-muted:#9fb0d0;--clr-card:#16233f;--clr-card2:#1d2f52;--clr-line:#26375c;--clr-good:#34d399;--clr-r:18px}",
    ".clr-overlay *{box-sizing:border-box}",
    ".clr-overlay button{font-family:inherit;cursor:pointer}",
    ".clr-overlay canvas,.clr-overlay img{display:block}",
    ".clr-app{width:100%;max-width:460px;min-height:100%;display:flex;flex-direction:column;padding:14px 14px 28px}",
    /* top */
    ".clr-top{display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#16294a,#0b1426);border:1px solid var(--clr-line);border-radius:var(--clr-r);padding:10px 12px}",
    ".clr-davi{width:44px;height:44px;border-radius:12px;background:linear-gradient(160deg,#243a63,#15224a);display:grid;place-items:center;font-size:24px;flex:none;box-shadow:inset 0 0 0 1px #2f4a7d}",
    ".clr-lvlwrap{flex:1;min-width:0}",
    ".clr-lvl{font-weight:800;font-size:14px;letter-spacing:.2px}",
    ".clr-lvl small{color:var(--clr-gold);font-weight:800}",
    ".clr-xpbar{height:9px;border-radius:99px;background:#0e1a34;border:1px solid #2a3f68;margin-top:5px;overflow:hidden}",
    ".clr-xpfill{height:100%;background:linear-gradient(90deg,var(--clr-gold),#ffd873);width:0;transition:width .5s cubic-bezier(.2,.8,.2,1)}",
    ".clr-coins{display:flex;align-items:center;gap:5px;background:#0e1a34;border:1px solid #2a3f68;padding:7px 11px;border-radius:99px;font-weight:800;font-size:15px;font-variant-numeric:tabular-nums;flex:none}",
    ".clr-sndbtn{width:40px;height:40px;border-radius:12px;flex:none;background:#0e1a34;border:1px solid #2a3f68;color:var(--clr-ink);font-size:18px;line-height:1}",
    ".clr-sndbtn:focus-visible{outline:3px solid var(--clr-gold);outline-offset:2px}",
    /* faíscas (globais, position fixed) */
    ".clr-spark{position:fixed;pointer-events:none;z-index:9999;font-size:16px;transform:translate(-50%,-50%);will-change:transform,opacity;animation:clrSp .5s ease-out forwards}",
    "@keyframes clrSp{from{opacity:1;transform:translate(-50%,-50%) scale(.6)}to{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(1.15)}}",
    /* tabs */
    ".clr-tabs{display:flex;gap:8px;margin:12px 0}",
    ".clr-tab{flex:1;padding:11px;border-radius:14px;border:1px solid var(--clr-line);background:#101d38;color:var(--clr-muted);font-weight:800;font-size:14px}",
    ".clr-ic{width:1.15em;height:1.15em;vertical-align:-.22em;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}",
    ".clr-tab .clr-ic,.clr-btn .clr-ic{margin-right:7px}",
    ".clr-pronto .clr-ic{margin-right:0;margin-left:7px}",
    ".clr-sndbtn .clr-ic{width:1.5em;height:1.5em;vertical-align:middle}",
    ".clr-davi .clr-ic{width:1.6em;height:1.6em;vertical-align:middle}",
    ".clr-tab.on{background:var(--clr-gold);color:#0b1426;border-color:var(--clr-gold)}",
    ".clr-tab:focus-visible{outline:3px solid #ffd873;outline-offset:2px}",
    /* exit btn */
    ".clr-exit{flex:none}",
    /* picker grid */
    ".clr-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}",
    ".clr-pick{background:var(--clr-card);border:1px solid var(--clr-line);border-radius:var(--clr-r);padding:10px;display:flex;flex-direction:column;gap:8px;transition:.15s;position:relative;cursor:pointer}",
    ".clr-pick:hover{transform:translateY(-3px);border-color:#3a5891}",
    ".clr-pick:focus-visible{outline:3px solid var(--clr-gold);outline-offset:2px}",
    ".clr-pick canvas{width:100%;aspect-ratio:1;border-radius:12px;background:#fff}",
    ".clr-pick .clr-nm{font-weight:800;font-size:13px}",
    ".clr-pick .clr-cl{font-size:11px;color:var(--clr-muted)}",
    ".clr-pick.done{border-color:var(--clr-good)}",
    ".clr-badge-done{position:absolute;top:14px;right:14px;background:var(--clr-good);color:#062a1c;font-weight:900;font-size:12px;padding:3px 8px;border-radius:99px}",
    /* capas */
    ".clr-covers{display:grid;gap:14px}",
    ".clr-cover{display:flex;gap:14px;align-items:center;background:var(--clr-card);border:1px solid var(--clr-line);border-radius:var(--clr-r);padding:12px;cursor:pointer;transition:.15s}",
    ".clr-cover:hover{transform:translateY(-3px);border-color:#3a5891}",
    ".clr-cover:focus-visible{outline:3px solid var(--clr-gold);outline-offset:2px}",
    ".clr-cvthumb{width:104px;height:104px;border-radius:14px;background:#fff;flex:none;object-fit:cover;box-shadow:inset 0 0 0 2px #ffe6a3}",
    ".clr-cvinfo{flex:1;min-width:0}",
    ".clr-cvsub{color:var(--clr-gold);font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase}",
    ".clr-cvname{font-weight:800;font-size:18px;margin:1px 0 9px}",
    ".clr-cvprog{height:9px;border-radius:99px;background:#0e1a34;border:1px solid #2a3f68;overflow:hidden}",
    ".clr-cvfill{height:100%;background:linear-gradient(90deg,var(--clr-good),#7ef0b8)}",
    ".clr-cvcount{font-size:12px;font-weight:800;color:var(--clr-good);margin-top:6px}",
    /* paint */
    ".clr-paint{display:none;flex-direction:column;gap:12px}",
    ".clr-paint.on{display:flex}",
    ".clr-pbar{display:flex;align-items:center;gap:10px}",
    ".clr-back{background:#101d38;border:1px solid var(--clr-line);color:var(--clr-ink);width:42px;height:42px;border-radius:12px;font-size:20px;flex:none}",
    ".clr-back:focus-visible{outline:3px solid var(--clr-gold);outline-offset:2px}",
    ".clr-ptitle{font-weight:800;font-size:16px}",
    ".clr-ptitle small{display:block;color:var(--clr-muted);font-weight:600;font-size:12px}",
    ".clr-stage{background:#fff;border-radius:22px;padding:10px;box-shadow:0 12px 30px rgba(0,0,0,.35),inset 0 0 0 3px #ffe6a3}",
    "#clr-cv{width:100%;aspect-ratio:1;border-radius:14px;display:block;touch-action:none;cursor:crosshair;background:#fff}",
    ".clr-palette{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}",
    ".clr-sw{aspect-ratio:1;border-radius:10px;cursor:pointer;border:2px solid rgba(255,255,255,.15);transition:.12s;position:relative}",
    ".clr-sw:hover{transform:scale(1.08)}",
    ".clr-sw.on{transform:scale(1.12);border-color:#fff;box-shadow:0 0 0 3px var(--clr-gold)}",
    ".clr-sw:focus-visible{outline:3px solid var(--clr-gold);outline-offset:2px}",
    ".clr-sens{display:flex;align-items:center;gap:10px;background:var(--clr-card);border:1px solid var(--clr-line);border-radius:14px;padding:9px 12px}",
    ".clr-sens label{font-weight:700;font-size:12.5px;color:var(--clr-muted);white-space:nowrap}",
    ".clr-sens input{flex:1;accent-color:var(--clr-gold)}",
    ".clr-tools{display:flex;gap:8px}",
    ".clr-btn{border:none;border-radius:14px;padding:13px;font-weight:800;font-size:15px;cursor:pointer;transition:.15s}",
    ".clr-btn.clr-ghost{background:#101d38;border:1px solid var(--clr-line);color:var(--clr-ink);flex:1}",
    ".clr-btn.clr-ghost:hover{border-color:#3a5891}",
    ".clr-btn.clr-pronto{background:linear-gradient(180deg,var(--clr-gold),var(--clr-gold-d));color:#0b1426;flex:1.6;box-shadow:0 8px 18px rgba(240,193,75,.28)}",
    ".clr-btn:active{transform:translateY(1px)}",
    ".clr-btn:focus-visible{outline:3px solid #ffd873;outline-offset:2px}",
    /* álbum */
    ".clr-album{display:none}",
    ".clr-album.on{display:block}",
    ".clr-albhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}",
    ".clr-albhead h2{margin:0;font-size:18px}",
    ".clr-prog{background:#0e1a34;border:1px solid #2a3f68;padding:6px 12px;border-radius:99px;font-weight:800;font-size:13px}",
    ".clr-sticks{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}",
    ".clr-st{aspect-ratio:1;border-radius:var(--clr-r);border:1px solid var(--clr-line);background:var(--clr-card);display:grid;place-items:center;overflow:hidden;position:relative}",
    ".clr-st.clr-empty{border-style:dashed;color:#42597f}",
    ".clr-st .clr-lock{font-size:30px;opacity:.55}",
    ".clr-st .clr-lock .clr-ic{vertical-align:middle}",
    ".clr-st canvas,.clr-st img{width:100%;height:100%;object-fit:cover}",
    ".clr-st .clr-cap{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.6));color:#fff;font-size:11px;font-weight:800;padding:14px 6px 5px;text-align:center}",
    /* celebração */
    ".clr-cel{position:absolute;inset:0;background:rgba(6,12,26,.72);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;padding:22px;z-index:50}",
    ".clr-cel.on{display:flex}",
    ".clr-celbox{background:linear-gradient(165deg,#1d2f52,#0e1a34);border:1px solid #35507f;border-radius:26px;padding:26px 22px;max-width:340px;width:100%;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.5);animation:clrPop .4s cubic-bezier(.2,1.3,.4,1)}",
    "@keyframes clrPop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}",
    /* display:block + margin auto porque a regra global .clr-overlay img{display:block}
       tira a imagem do fluxo inline — sem a margem ela ignora o text-align:center do card
       e cola na esquerda. Anima só a escala: pular e girar deixava o Davi torto. */
    ".clr-celdavi{width:auto;height:120px;object-fit:contain;display:block;margin:0 auto;animation:clrBreathe 2.4s ease-in-out infinite;filter:drop-shadow(0 7px 11px rgba(0,0,0,.35))}",
    "@keyframes clrBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}",
    ".clr-celbox h2{margin:6px 0 2px;font-size:24px;color:var(--clr-gold)}",
    ".clr-celbox p{margin:0 0 14px;color:var(--clr-ink);font-weight:600}",
    ".clr-rewards{display:flex;justify-content:center;gap:10px;margin-bottom:12px;flex-wrap:wrap}",
    ".clr-rw{background:#0e1a34;border:1px solid #2f4a7d;border-radius:12px;padding:9px 13px;font-weight:800;font-size:15px}",
    ".clr-rw b{color:var(--clr-gold)}",
    ".clr-stars{font-size:30px;letter-spacing:4px;margin-bottom:6px}",
    ".clr-newst{font-weight:800;color:var(--clr-good);margin-bottom:14px;font-size:14px}",
    ".clr-confetti{position:absolute;inset:0;pointer-events:none;z-index:60}",
    "@media (prefers-reduced-motion: reduce){.clr-celdavi{animation:none}.clr-xpfill{transition:none}.clr-celbox{animation:none}}"
    ].join("");
    document.head.appendChild(s);
  }

  /* ---------- montar / fechar ---------- */
  function buildOverlay(){
    injectStyles();
    rootEl=document.createElement("div");
    rootEl.className="clr-overlay";
    rootEl.setAttribute("role","dialog");
    rootEl.setAttribute("aria-label","Colorir figurinhas bíblicas");
    rootEl.innerHTML=overlayHTML();
    var host=document.getElementById("app")||document.body;
    host.appendChild(rootEl);
    cv=qs("#clr-cv"); ctx=cv.getContext("2d",{willReadFrequently:true});
    bindCanvas();
    qs("#clr-close").onclick=closeColorir;
    qs("#clr-snd").onclick=function(){ soundOn=!soundOn; ensureAudio(); var b=qs("#clr-snd"); if(b) b.innerHTML=soundOn?ICON.soundOn:ICON.soundOff; musicForView(); };
    qs("#clr-tabColorir").onclick=function(){ clrShow("covers"); };
    qs("#clr-tabAlbum").onclick=function(){ clrShow("collection"); };
    qs("#clr-back").onclick=function(){ clrShow("picker"); };        // do desenho -> volta pros desenhos do álbum
    qs("#clr-backCovers").onclick=function(){ clrShow("covers"); };  // dos desenhos -> volta pras capas
    qs("#clr-undo").onclick=function(){ var s=undoStack.pop(); if(s&&ctx) ctx.putImageData(s,0,0); };
    qs("#clr-clear").onclick=function(){ pushUndo(); paintBase(current); };
    qs("#clr-pronto").onclick=onPronto;
  }
  function closeColorir(){
    stopMusic();
    painting=false; work=null;
    if(rootEl && rootEl.parentNode) rootEl.parentNode.removeChild(rootEl);
    rootEl=null; cv=null; ctx=null; current=null; curAlbum=null;
  }

  /* ---------- API pública (ÚNICO global exposto) ---------- */
  function openColorir(){
    if(rootEl && document.body.contains(rootEl)) return; // já aberto
    buildOverlay();
    if(typeof state!=="undefined" && !Array.isArray(state.colored)) state.colored=[];
    ensureAudio();                 // criado dentro do gesto (clique no card)
    curColor="#f59e0b";
    clrRenderTop();
    clrRenderPalette();
    clrShow("covers");
  }

  window.openColorir = openColorir;
})();
