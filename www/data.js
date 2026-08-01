/* ============================================================
   Aventura com Jesus — dados (mock) para o protótipo navegável. (PT-BR)
   Sem áudio/ilustrações reais: cada item tem emoji + gradiente de capa.
   ============================================================ */

/* URL do áudio de narração: STREAMA do host (AUDIO_BASE) pra manter o APK leve;
   se AUDIO_BASE vazio, cai nos arquivos locais (offline/dev). Usado por data.js e app.js. */
function audioSrc(id){
  var b=(typeof window!=='undefined' && window.AUDIO_BASE) ? window.AUDIO_BASE : 'assets/audio/';
  var v=(typeof window!=='undefined' && window.AUDIO_VER) ? ('?v='+window.AUDIO_VER) : '';
  return b + id + '.m4a' + v;
}

/* paleta de gradientes reutilizáveis p/ capas ilustradas */
const GRADS = {
  night:  'linear-gradient(160deg,#2a3f6b,#16233f)',
  dawn:   'linear-gradient(160deg,#e8a04e,#c2663a)',
  sky:    'linear-gradient(160deg,#5aa6c9,#2f6f93)',
  gold:   'linear-gradient(160deg,#f0c14b,#caa233)',
  rose:   'linear-gradient(160deg,#d98a9e,#a85a72)',
  green:  'linear-gradient(160deg,#6fae84,#3f7d5a)',
  violet: 'linear-gradient(160deg,#8a7bc8,#5a4d96)',
  sand:   'linear-gradient(160deg,#e3c79a,#bd9a63)',
};

/* TIPOS de conteúdo (rótulo + cor do badge) */
const TYPES = {
  gospel:     { label:'Evangelho do Dia',  badge:'#f0c14b' },
  story:      { label:'História',          badge:'#7cc4e0' },
  bedtime:    { label:'História pra Dormir',badge:'#8a7bc8' },
  meditation: { label:'Meditação',         badge:'#6fae84' },
  affirmation:{ label:'Afirmação',         badge:'#e8a04e' },
  prayer:     { label:'Oração',            badge:'#d98a9e' },
  video:      { label:'Vídeo Curto',       badge:'#e0746a' },
};

/* biblioteca de conteúdos (id, tipo, título, descrição, emoji, grad, duração, premium, data)
   Campos opcionais por item:
     script: roteiro PT-BR da narração (anexado mais abaixo via SCRIPTS, por id) — usado no modo "Texto".
     audio:  URL da narração/áudio real (ex.: 'https://.../zaqueu.mp3'). Se presente, o player toca
             essa narração; se ausente, mantém a trilha ambiente (background.mp3). O dev só preenche aqui. */
const CONTENT = [
  { id:'gospel-0625', type:'gospel', title:'Evangelho do Dia – 25 de Junho', emoji:'📖', img:'illus_gospel.jpg', grad:GRADS.gold, dur:'4 min', date:'25 de Junho',
    desc:'Cada dia é uma nova oportunidade de ouvir a voz de Deus e encher nosso coração do Seu amor. A leitura de hoje nos convida a confiar e seguir.' },
  { id:'zacchaeus', type:'story', title:'Zaqueu', emoji:'🌳', img:'cover_zaqueu.jpg', grad:GRADS.green, dur:'6 min', video:'c33fe8b6ba650b4adbed8a7440133e94', badge:'Novo',
    desc:'Olá, amiguinhos! É o Jesus. Hoje você vai conhecer um homem bem baixinho que subiu numa árvore bem alta só pra me ver — e o que aconteceu depois mudou a vida dele.' },
  { id:'love-deep', type:'meditation', title:'Ame com Profundidade', emoji:'💛', img:'cover_love.jpg', grad:GRADS.rose, dur:'8 min',
    desc:'Uma meditação suave pra descansar no quanto Deus ama você, exatamente como você é.' },
  { id:'lost-sheep', type:'story', title:'A Ovelha Perdida', emoji:'🐑', img:'cover_lost_sheep.webp', grad:GRADS.sand, dur:'5 min', video:'31348c36b33a3b01c386b7d735835d3c',
    desc:'Um pastor deixa noventa e nove ovelhas pra encontrar a que se perdeu. Uma história sobre o quanto você importa pra Deus.' },
  { id:'made-for', type:'affirmation', title:'Deus Te Criou com um Propósito', emoji:'✨', img:'cover_made_for.webp', grad:GRADS.dawn, dur:'2 min',
    desc:'Afirmações curtas e calmas pra lembrar seu filho de que ele é amado e foi feito de propósito.' },
  { id:'abraham-grass', type:'meditation', title:'Abraão e a Grande Promessa', emoji:'⭐', img:'cover_abraham.webp', grad:GRADS.night, dur:'9 min', video:'739ccdc11b3c73f3d9fdffd9d1aac509',
    desc:'Uma meditação guiada pela jornada de fé de Abraão e a promessa das estrelas.' },
  { id:'night-protection', type:'prayer', title:'Proteção da Noite', emoji:'🙏', img:'illus_child_light.webp', grad:GRADS.violet, dur:'3 min',
    desc:'Uma oração de antes de dormir pedindo a Deus uma noite tranquila e protegida.' },
  { id:'sharing', type:'story', title:'Compartilhar', emoji:'🤝', img:'cover_sharing.jpg', grad:GRADS.sky, dur:'5 min',
    desc:'Descubra como um pequeno gesto de partilha pode trazer uma grande alegria — e o que Jesus ensinou sobre dar.' },
  { id:'pablos-gift', type:'story', title:'A Canção de Oração do Mel do Pablo', emoji:'🐻', img:'cover_pablo_prayer.webp', grad:GRADS.rose, dur:'6 min', premium:true,
    desc:'Pablo tem muito pouco, mas o presente que ele dá ensina a todos o verdadeiro sentido da generosidade.' },
  { id:'daniel-lions', type:'bedtime', title:'Daniel e os Leões', emoji:'🦁', img:'cover_daniel_bed.webp', grad:GRADS.sand, dur:'7 min', video:'ea552a1c3a11cec703f388fe5053f233',
    desc:'O corajoso Daniel confia em Deus durante uma longa noite com leões famintos.' },
  { id:'creation', type:'bedtime', title:'No Princípio', emoji:'🌍', img:'cover_creation.webp', grad:GRADS.sky, dur:'8 min', video:'e7697cc5ceeb3354322a5692c1ac7037', premium:true,
    desc:'Uma releitura suave da história da criação, perfeita pra relaxar antes de dormir.' },
  { id:'good-shepherd', type:'meditation', title:'O Bom Pastor', emoji:'🌿', img:'illus_jesus_child.webp', grad:GRADS.green, dur:'6 min',
    desc:'Descanse na calma dos campos verdes com uma meditação no Salmo 23.' },
  { id:'be-brave', type:'affirmation', title:'Seja Corajoso, Seja Gentil', emoji:'🦋', img:'cover_brave.webp', grad:GRADS.dawn, dur:'2 min',
    desc:'Afirmações de coragem e bondade pra começar ou terminar o dia.' },
  { id:'thank-you-god', type:'prayer', title:'Obrigado, Deus', emoji:'🌟', img:'cover_thanks.jpg', grad:GRADS.gold, dur:'3 min',
    desc:'Uma oração de gratidão lembrando as coisas boas do dia.' },
  { id:'noahs-ark', type:'video', title:'A Arca de Noé', emoji:'🚢', img:'cover_noah.jpg', grad:GRADS.sky, dur:'4 min', video:'09e78fdd86d67008cfe87152c2024d30', premium:true,
    desc:'Uma releitura animada e curtinha de Noé, a arca e a promessa do arco-íris de Deus.' },
  { id:'davi-golias', type:'story', title:'Davi e Golias', emoji:'🪨', img:'cover_davi.jpg', grad:GRADS.sand, dur:'7 min', video:'83da517579abd51222de1bcd5037a0cf', badge:'Novo',
    desc:'O pequeno Davi enfrenta o gigante Golias com coragem e confiança em Deus.' },
  { id:'jonas-baleia', type:'story', title:'Jonas e a Baleia', emoji:'🐳', img:'cover_jonas.webp', grad:GRADS.sky, dur:'6 min', video:'a31a3d291a9e6f47347fa4f976f9a474',
    desc:'Jonas aprende sobre obediência e perdão dentro de um grande peixe.' },
  { id:'bom-samaritano', type:'story', title:'O Bom Samaritano', emoji:'🤲', img:'cover_samaritano.jpg', grad:GRADS.dawn, dur:'5 min', video:'36f9cb21476a5ac371a92090b7023edd',
    desc:'Uma história sobre ajudar o próximo com bondade, do jeito que Jesus ensinou.' },
  { id:'jose-sonho', type:'story', title:'José e o Manto Colorido', emoji:'🌈', img:'cover_jose.webp', grad:GRADS.gold, dur:'8 min', video:'af84f2e5325b2c40a5afc7232d64c4e6',
    desc:'José confia em Deus mesmo nos momentos difíceis e aprende a perdoar.' },
  { id:'moises-mar', type:'bedtime', title:'Moisés e o Mar Vermelho', emoji:'🌊', img:'cover_moises_mar.webp', grad:GRADS.sky, dur:'7 min', video:'c405df8604c61ba272a85a3ddd8b777c',
    desc:'Deus abre o mar pra salvar Seu povo numa noite cheia de fé.' },
  { id:'natal-jesus', type:'bedtime', title:'O Nascimento de Jesus', emoji:'⭐', img:'cover_natal.webp', grad:GRADS.night, dur:'6 min', video:'36b7bc8faa6326f4cb036132436daa22',
    desc:'A noite tranquila em que Jesus nasceu em Belém sob a luz de uma estrela.' },
  { id:'dez-mandamentos', type:'story', title:'Os Dez Mandamentos', emoji:'📜', img:'cover_mandamentos.webp', grad:GRADS.sand, dur:'7 min', video:'bac15a14529ea5bf68d3f33b6a33ac37', premium:true,
    desc:'Moisés recebe de Deus dez regras de amor pra vivermos bem com todos.' },
  { id:'paz-coracao', type:'meditation', title:'Paz no Coração', emoji:'🕊️', img:'cover_paz.webp', grad:GRADS.green, dur:'5 min',
    desc:'Uma meditação suave pra acalmar o coração e descansar em Deus.' },
  { id:'oracao-manha', type:'prayer', title:'Oração da Manhã', emoji:'🌅', img:'cover_oracao_manha.webp', grad:GRADS.dawn, dur:'3 min',
    desc:'Comece o dia agradecendo e pedindo a bênção de Deus.' },
  { id:'sansao', type:'story', title:'Sansão, o Forte', emoji:'💪', img:'cover_sansao.webp', grad:GRADS.gold, dur:'7 min', video:'079a241033495b62020801b122783268',
    desc:'A força de Sansão vinha da sua fé — uma história de coragem e confiança.' },
  /* Afirmações */
  { id:'afirm-amado', type:'affirmation', title:'Sou Amado por Deus', emoji:'💗', img:'cover_af_amado.webp', grad:GRADS.rose, dur:'2 min',
    desc:'Lembre seu filho de que ele é profundamente amado por Deus, do jeitinho que é.' },
  { id:'afirm-corajoso', type:'affirmation', title:'Posso Ser Corajoso', emoji:'🦸', img:'cover_af_corajoso.webp', grad:GRADS.dawn, dur:'2 min',
    desc:'Pequenas afirmações de coragem pra encarar o dia com a força de Deus.' },
  { id:'afirm-cuida', type:'affirmation', title:'Deus Cuida de Mim', emoji:'🤲', img:'cover_af_cuida.webp', grad:GRADS.sky, dur:'2 min',
    desc:'Uma afirmação calmante de que estamos sempre seguros nas mãos de Deus.' },
  { id:'afirm-especial', type:'affirmation', title:'Sou Especial e Único', emoji:'🌟', img:'cover_af_especial.jpg', grad:GRADS.gold, dur:'2 min',
    desc:'Deus criou seu filho com cuidado e propósito — ele é único e especial.' },
  { id:'afirm-bondoso', type:'affirmation', title:'Tenho um Coração Bondoso', emoji:'🌷', img:'cover_af_bondoso.jpg', grad:GRADS.green, dur:'2 min',
    desc:'Afirmações de bondade e gentileza pra compartilhar amor com todos.' },
  /* Vídeos Curtos (animados) */
  { id:'video-daniel', type:'video', title:'Daniel na Cova dos Leões', emoji:'🦁', img:'cover_vd_daniel.jpg', grad:GRADS.sand, dur:'4 min', video:'ea552a1c3a11cec703f388fe5053f233',
    desc:'Uma releitura animada da fé corajosa de Daniel entre os leões.' },
  { id:'video-criacao', type:'video', title:'A Criação do Mundo', emoji:'🌍', img:'cover_vd_criacao.jpg', grad:GRADS.sky, dur:'4 min', video:'e7697cc5ceeb3354322a5692c1ac7037', premium:true,
    desc:'Veja o mundo ganhar vida em sete dias, num vídeo curtinho e encantador.' },
  { id:'video-prodigo', type:'video', title:'O Filho Pródigo', emoji:'🏡', img:'cover_vd_prodigo.jpg', grad:GRADS.dawn, dur:'5 min', video:'79594e630a5bc56b6224548fedf1e1b3',
    desc:'A história do amor e do perdão de um pai que recebe o filho de volta.' },
  { id:'video-paes', type:'story', title:'Os Pães e os Peixes', emoji:'🐟', img:'cover_vd_paes.jpg', grad:GRADS.gold, dur:'4 min',
    desc:'Jesus multiplica cinco pães e dois peixes pra alimentar uma multidão.' },
  { id:'video-aguas', type:'video', title:'Jesus Anda Sobre as Águas', emoji:'🌊', img:'cover_vd_aguas.jpg', grad:GRADS.night, dur:'4 min', video:'305b6ff28e6b9995cff0ba8d2866bea5', premium:true,
    desc:'Uma releitura animada do momento em que Jesus acalma o medo e o mar.' },
  /* Meditações */
  { id:'medit-gratidao', type:'meditation', title:'Meditação da Gratidão', emoji:'🙏', img:'cover_md_gratidao.webp', grad:GRADS.green, dur:'6 min',
    desc:'Uma meditação suave pra agradecer as coisas boas que Deus nos dá.' },
  { id:'medit-medo', type:'meditation', title:'Acalmando o Medo', emoji:'🕯️', img:'cover_md_medo.jpg', grad:GRADS.violet, dur:'7 min',
    desc:'Respire fundo e entregue seus medos a Deus, que está sempre pertinho.' },
  { id:'medit-descanso', type:'meditation', title:'Descanso em Deus', emoji:'☁️', img:'cover_md_descanso.webp', grad:GRADS.sky, dur:'8 min',
    desc:'Uma meditação tranquila pra descansar o corpo e o coração na paz de Deus.' },
  /* Histórias pra Dormir */
  { id:'bed-boanoite', type:'bedtime', title:'Boa Noite com Jesus', emoji:'🌙', img:'cover_bd_boanoite.jpg', grad:GRADS.night, dur:'6 min',
    desc:'Uma despedida tranquila do dia, com Jesus cuidando do seu sono.' },
  { id:'bed-estrelas', type:'bedtime', title:'Contando Estrelas com Abraão', emoji:'✨', img:'cover_bd_estrelas.jpg', grad:GRADS.violet, dur:'7 min', video:'739ccdc11b3c73f3d9fdffd9d1aac509',
    desc:'Conte as estrelas e lembre da grande promessa que Deus fez a Abraão.' },
  { id:'bed-ovelhinha', type:'bedtime', title:'A Ovelhinha que Voltou pra Casa', emoji:'🐑', img:'cover_bd_ovelhinha.jpg', grad:GRADS.sand, dur:'5 min', video:'31348c36b33a3b01c386b7d735835d3c',
    desc:'Uma ovelhinha se perde e encontra o caminho de volta pro pastor que a ama.' },
  /* Orações */
  { id:'oracao-noite', type:'prayer', title:'Oração da Noite', emoji:'🌜', img:'cover_or_noite.jpg', grad:GRADS.night, dur:'3 min',
    desc:'Uma oração calminha pra fechar o dia em paz e dormir tranquilo nos braços de Deus.' },
  { id:'oracao-gratidao', type:'prayer', title:'Oração de Gratidão', emoji:'🙌', img:'cover_or_gratidao.webp', grad:GRADS.gold, dur:'3 min',
    desc:'Agradeça a Deus por cada coisinha boa do dia, do café da manhã ao abraço da família.' },
  { id:'oracao-familia', type:'prayer', title:'Oração pela Família', emoji:'👨‍👩‍👧', img:'cover_or_familia.jpg', grad:GRADS.rose, dur:'3 min',
    desc:'Uma oração pedindo a bênção e a proteção de Deus sobre toda a família.' },
  { id:'oracao-protecao', type:'prayer', title:'Oração de Proteção', emoji:'😇', img:'cover_or_protecao.jpg', grad:GRADS.violet, dur:'3 min',
    desc:'Peça a Deus um anjo da guarda pra cuidar de você a noite inteira.' },
];

/* ============================================================
   ROTEIROS (script) — narração PT-BR de cada conteúdo, infantil,
   acolhedora e fiel à Bíblia. Mapeado por id e anexado a cada
   item de CONTENT abaixo (c.script). O dev pode revisar aqui.
   ============================================================ */
const SCRIPTS = {
  'gospel-0625': `Bom dia, amiguinho! Hoje a gente vai ouvir uma parte muito especial da Bíblia, lá no livro de Mateus.

Um dia, um soldado bem importante, chamado centurião, veio correndo falar com Jesus. Ele estava muito preocupado, porque um amiguinho que trabalhava na casa dele estava doente, deitado na cama, sem conseguir levantar.

O soldado olhou pra Jesus com muito carinho e disse: — Senhor, eu sei que o Senhor pode curar! Mas eu nem mereço que o Senhor entre na minha casa. É só o Senhor falar uma palavrinha, que eu sei que ele vai ficar bom.

Jesus ficou admirado! Ele olhou pras pessoas que estavam ali e disse: — Olhem só que fé bonita esse homem tem! Ele acreditou de verdade, sem nem precisar ver.

E sabe o que aconteceu? Naquele mesmo instante, lá longe, o amiguinho doente ficou curado! Foi só Jesus falar.

Isso nos ensina uma coisa linda: Jesus é tão poderoso que basta uma palavra Dele. E a gente pode confiar Nele de olhos fechados, mesmo quando não consegue ver o que Ele está fazendo.

Hoje, quando você sentir medo ou preocupação, lembre do soldado. Feche os olhinhos e fale baixinho: "Jesus, eu confio em Você." Ele ouve, Ele cuida e Ele responde.

Vamos orar? Querido Jesus, obrigado porque a Tua palavra tem poder. Eu confio em Ti hoje. Amém.`,

  'zacchaeus': `Olá, amiguinhos! É o Jesus. Hoje você vai conhecer um homem bem baixinho chamado Zaqueu.

Zaqueu morava numa cidade chamada Jericó e era cobrador de impostos. Ele tinha muito dinheiro, mas ninguém gostava dele, porque às vezes ele pegava mais moedas do que devia. Por dentro, Zaqueu se sentia bem sozinho.

Um dia, eu estava passando pela cidade, e uma multidão enorme se juntou pra me ver. Zaqueu queria muito me conhecer, mas ele era tão baixinho que não conseguia enxergar por cima das pessoas. Então sabe o que ele fez? Ele saiu correndo e subiu numa árvore bem alta, lá no galho, só pra me ver passar!

Quando cheguei pertinho da árvore, eu olhei pra cima e falei: — Zaqueu, desce depressa! Hoje eu vou na sua casa.

Zaqueu quase caiu de tão feliz! Ninguém nunca tinha querido ser amigo dele assim. As pessoas ficaram cochichando: "Olha, Jesus vai na casa daquele homem?" Mas eu queria que ele soubesse que era amado.

Naquele dia, o coração de Zaqueu mudou. Ele disse: — Senhor, vou devolver tudo o que peguei errado, e vou dar metade do que tenho pra quem precisa!

Eu sorri e disse: — Hoje a salvação chegou nesta casa.

Sabe, amiguinho, não importa o que você fez nem o tamanho que você tem. Eu sempre te vejo, eu sempre te chamo pelo nome, e eu quero ser seu amigo. Você é muito importante pra mim. Te amo!`,

  'love-deep': `Vamos fazer um momentinho de calma juntos? Encontre um lugarzinho gostoso, deite ou sente, e respira bem devagar comigo. Inspira pelo narizinho... e solta o ar pela boca. De novo, bem suave.

Agora feche os olhos e imagine que você está num campo cheio de grama macia, com um solzinho quentinho tocando o seu rosto. Tudo está em paz.

Eu quero te contar uma verdade muito bonita: Deus ama você. Não é um amor pequeno, não. É um amor enorme, mais fundo que o mar e mais alto que o céu.

A Bíblia diz assim: "Eu amei você com amor eterno." Isso quer dizer que o amor de Deus por você nunca acaba, nunca cansa e nunca vai embora.

Deus te ama quando você está feliz e quando você está triste. Ele te ama quando você acerta e também quando você erra. Ele te ama do jeitinho que você é, agora mesmo, sem você precisar fazer nada pra merecer.

Respira fundo de novo... e sente esse amor te abraçando por dentro, como um cobertor quentinho.

Você não precisa ser perfeito pra ser amado. Você já é amado, profundamente, pra sempre.

Antes de terminar, fale baixinho no seu coração: "Deus me ama. Eu sou amado."

Guarde essa verdade com você o dia inteiro. Você é muito, muito querido. Que a paz de Deus fique com você.`,

  'lost-sheep': `Era uma vez um pastor que tinha cem ovelhinhas. Ele conhecia cada uma pelo nome e cuidava delas com muito amor.

Toda noite, o pastor contava as ovelhas pra ter certeza de que estavam todas seguras: uma, duas, três... Mas numa tarde, quando ele foi contar, faltava uma! Eram só noventa e nove.

Uma ovelhinha tinha se perdido. Ela tinha andado pra longe atrás de uma graminha mais verde e, sem perceber, se afastou do rebanho. Agora estava sozinha, com medo, num lugar cheio de pedras, e já estava ficando escuro.

Sabe o que o pastor fez? Ele deixou as noventa e nove ovelhas num lugar seguro e saiu correndo pra procurar a que tinha sumido. Ele subiu montes, atravessou ribeirões, chamou pelo nome dela e não desistiu, mesmo cansado.

Até que ele ouviu um "béééé" bem fraquinho. Era ela! A ovelhinha estava presa entre os espinhos, tremendo. O pastor a pegou com todo o cuidado, colocou nos ombros e disse: — Achei você! Não precisa mais ter medo.

E voltou pra casa cheio de alegria, chamando os amigos: — Venham comemorar comigo, porque eu encontrei a minha ovelhinha!

Jesus contou essa história pra nos ensinar uma coisa linda: Ele é o nosso Bom Pastor, e cada um de nós é importante pra Ele. Se você um dia se sentir perdido, longe ou com medo, lembre: Jesus vai atrás de você. Ele nunca desiste de você. Você vale muito pra Ele!`,

  'made-for': `Olá, pequenino! Vamos falar uma coisa linda sobre você?

Respira fundo e escuta com o coração: você foi feito de propósito. Deus pensou em você antes mesmo de você nascer.

Repita comigo, baixinho: Eu sou amado por Deus.

Deus me criou com muito carinho. Ele escolheu a cor dos meus olhos, o som da minha risada e o jeitinho do meu sorriso.

Eu não sou um erro. Eu sou um presente.

A Bíblia diz que eu fui feito de um jeito especial e maravilhoso. Deus não comete enganos!

Eu tenho um propósito. Deus tem coisas boas preparadas pra mim.

Quando eu acordo de manhã, Deus já está feliz por eu existir.

Eu sou pequeno, mas Deus me usa pra espalhar amor e bondade por onde eu passo.

Respira de novo... e sente como é bom ser quem você é.

Você não precisa ser igual a ninguém. Deus fez só um você no mundo inteiro, e Ele te ama do jeitinho que você é.

Hoje, leve essa verdade com você: Deus me criou, Deus me ama e Deus tem um plano lindo pra mim.

Você é amado. Você é especial. Você foi feito de propósito. Tenha um dia abençoado!`,

  'abraham-grass': `Vamos respirar fundo e fazer uma viagem com o coração até um tempo bem antigo, quando vivia um homem chamado Abraão.

Inspira devagar... solta o ar... e imagine um campo enorme, numa noite quente e silenciosa.

Abraão amava Deus, mas tinha um sonho guardado no coração: ele queria muito ter um filho, e já estava ficando velho. Às vezes ele ficava triste, achando que aquele sonho nunca ia se realizar.

Numa noite, Deus chamou Abraão pra fora da tenda e disse: — Abraão, olhe pro céu. Consegue contar as estrelas?

Abraão olhou pra cima. O céu estava cheinho, cheinho de estrelinhas brilhando. Eram tantas que era impossível contar todas.

Então Deus falou: — Assim será a sua família. Tão numerosa quanto as estrelas do céu.

Abraão acreditou em Deus. Ele não viu o filho naquela noite, mas confiou na promessa. E sabe o que aconteceu? Deus cumpriu! Mais tarde, Abraão teve um filho chamado Isaque, e dele veio uma família enorme, grande como as estrelas.

Respira fundo de novo... e pense nas promessas de Deus.

Às vezes a gente precisa esperar um pouquinho pelas coisas boas. Mas Deus nunca esquece o que promete. Ele sempre cumpre, no tempo certo.

Hoje, quando você olhar pro céu à noite, lembre de Abraão e das estrelinhas. E lembre que Deus tem promessas lindas guardadas pra você também. Pode confiar Nele. Durma tranquilo, sabendo que Deus cuida de tudo.`,

  'night-protection': `Chegou a hora de descansar, amiguinho. O dia já foi embora, as luzes estão ficando baixinhas e é hora de entregar a noite pra Deus.

Vamos juntar as mãozinhas e orar?

Querido Deus, obrigado por mais um dia. Obrigado pelas coisas boas que aconteceram e pelo seu cuidado o tempo todo.

Agora que vou dormir, eu peço que o Senhor cuide de mim a noite inteira. Coloque os seus anjos ao redor da minha cama, pra eu dormir em paz, sem medo nenhum.

A Bíblia diz: "Em paz me deito e logo adormeço, porque só Tu, Senhor, me fazes descansar seguro." Eu confio nessa promessa.

Cuide do papai, da mamãe, dos meus irmãos e de todas as pessoas que eu amo. Cuide também de quem está longe e de quem precisa de Você esta noite.

Se eu acordar no meio da noite, me lembra que o Senhor está bem pertinho, mais perto que o ar que eu respiro. Eu nunca estou sozinho.

Tira de mim qualquer medinho e enche o meu coração de paz, como um cobertor quentinho.

Obrigado, Senhor, porque eu sou seu filho amado, e o Senhor nunca dorme — fica acordado cuidando de mim a noite toda.

Em nome de Jesus eu oro. Amém.

Agora feche os olhinhos, respire fundo e durma tranquilo. Deus está cuidando de você. Boa noite!`,

  'sharing': `Era um dia de muito sol, e uma multidão enorme tinha ido pra beira de um monte ouvir Jesus contar histórias sobre Deus. Tinha gente por todo lado: papais, mamães e muitas crianças.

O tempo foi passando, e as pessoas começaram a sentir fome. Mas estavam longe de casa, e não tinha comida pra tanta gente.

Os amigos de Jesus ficaram preocupados: — Jesus, como vamos alimentar todo mundo?

Aí, no meio da multidão, havia um menininho. Ele tinha levado um lanchinho: cinco pãezinhos e dois peixinhos. Era pouquinho, mas o menino, com um coração generoso, ofereceu tudo o que tinha pra Jesus.

Jesus pegou o lanche nas mãos, olhou pro céu e agradeceu a Deus. Depois começou a repartir... e aconteceu uma coisa incrível! A comida foi se multiplicando, e não acabava nunca!

Todo mundo comeu até ficar bem satisfeito — e ainda sobraram doze cestos cheios! Tudo começou com a partilha de um único menininho.

Sabe, amiguinho, quando a gente compartilha o que tem, mesmo que seja pouquinho, Deus faz coisas grandes. Um brinquedo dividido, um lanche repartido, um abraço dado — tudo isso espalha alegria.

Jesus ensinou: "Há mais felicidade em dar do que em receber."

Hoje, que tal compartilhar alguma coisa com alguém? Pode ser um sorriso, um pedaço do seu lanche ou a sua vez de brincar. Quando você divide, o amor de Deus cresce e contagia todo mundo ao redor!`,

  'pablos-gift': `Numa vila pequenina, lá no alto da montanha, morava um ursinho chamado Pablo. Pablo não tinha muitos brinquedos nem muitas moedas, mas tinha o coração cheio de amor.

Um dia, a vila inteira ia fazer uma festa de gratidão a Deus. Cada bichinho ia levar um presente pra dividir. A raposa levou uma cesta de frutas brilhantes. O urso grandão levou um pote enorme de mel dourado. Todos traziam coisas lindas e caras.

Pablo ficou um pouquinho triste, olhando suas mãozinhas vazias. — O que eu posso dar? Eu tenho tão pouco... — ele pensou.

Mas então ele lembrou de uma coisa que tinha: um potinho bem pequeno de mel, o último que ele guardava pra si. Era tudo o que ele tinha. Mesmo assim, Pablo decidiu oferecer aquele potinho com todo o carinho, junto com uma canção de oração que ele mesmo inventou.

Na festa, quando chegou a vez de Pablo, ele entregou o potinho e cantou baixinho a sua canção de gratidão a Deus. A voz dele era tão sincera que todos os bichinhos pararam pra ouvir, e muitos ficaram com os olhinhos marejados.

Pablo deu pouco no tamanho, mas deu tudo o que tinha — e isso encheu a festa de alegria de verdade.

Essa historinha lembra uma coisa que Jesus ensinou sobre uma senhora que deu só duas moedinhas, mas deu de coração. Jesus disse que ela tinha dado mais que todos os ricos!

Deus não olha o tamanho do presente. Ele olha o tamanho do amor. Quando você dá com carinho, mesmo pouquinho, é o maior presente do mundo.`,

  'daniel-lions': `Está chegando a hora de dormir, então vamos relaxar e ouvir a história de um homem muito corajoso chamado Daniel.

Daniel amava a Deus de todo o coração. Todos os dias, três vezes ao dia, ele se ajoelhava perto da janelinha e fazia uma oração, agradecendo e conversando com Deus.

Daniel era tão bom e sábio que o rei gostava muito dele. Mas isso deixou alguns homens com inveja. Eles bolaram um plano malvado: convenceram o rei a fazer uma lei dizendo que ninguém podia orar a mais ninguém, só ao rei, senão seria jogado na cova dos leões.

Daniel ouviu a notícia, mas sabia o que era certo. Ele foi pra casa, abriu a janelinha e continuou orando a Deus, do mesmo jeitinho de sempre, sem medo.

Os homens correram pra contar ao rei. O rei ficou muito triste, porque gostava de Daniel, mas tinha que cumprir a lei. Então Daniel foi colocado na cova dos leões, e uma pedra enorme fechou a entrada.

A noite passou. O rei nem conseguiu dormir de preocupação. Logo cedo, ele correu até a cova e gritou: — Daniel! O seu Deus conseguiu te salvar?

E de lá de dentro veio a voz tranquila de Daniel: — Sim, ó rei! Deus mandou um anjo e fechou a boca dos leões. Eles não me fizeram nada!

Os leões tinham ficado mansinhos a noite toda. Deus tinha cuidado de Daniel.

Amiguinho, igual a Daniel, você pode confiar em Deus mesmo quando algo dá medo. Ele está sempre com você, até no escurinho da noite. Agora feche os olhos e durma em paz. Deus cuida de você. Boa noite.`,

  'creation': `Vamos deitar bem confortável, fechar os olhinhos e voltar lá pro comecinho de tudo, quando o mundo ainda nem existia.

No princípio, não havia nada: nem o sol, nem as estrelas, nem o mar, nem você. Só Deus. E Deus, com muito amor, resolveu criar um lugar lindo.

No primeiro dia, Deus falou: — Que exista a luz! E a luz apareceu, separando o dia da noite. Que aconchegante.

No segundo dia, Deus fez o céu lá em cima, azul e enorme.

No terceiro dia, Ele juntou as águas e fez o mar, e depois fez a terra seca brotar com gramas, flores e árvores cheias de frutinhas.

No quarto dia, Deus colocou o sol pra brilhar de dia e a lua com as estrelinhas pra enfeitar a noite, bem suave, como agora.

No quinto dia, Ele encheu o mar de peixinhos e o céu de passarinhos cantando.

No sexto dia, Deus criou os bichinhos da terra: o coelho saltitante, o leão, o cachorrinho... e, por último, com muito carinho, Ele criou as pessoas. Criou você, feito à imagem Dele, pra ser amado.

E Deus olhou pra tudo o que tinha feito e disse: — Está muito bom!

No sétimo dia, Deus descansou. E é isso que a gente vai fazer agora também: descansar.

Cada estrelinha lá fora, cada folhinha, cada batida do seu coração foi feita por um Deus que ama você. Respire fundo... solte o ar devagar... e durma tranquilo no mundo lindo que Deus criou. Boa noite, pequenino.`,

  'good-shepherd': `Vamos fazer um momento de paz juntos. Sente ou deite num lugar gostoso, feche os olhinhos e respire bem devagar.

Imagine um campo verdinho, com grama macia e um riozinho de águas calmas correndo bem devagar. O céu está azul, e tudo está tranquilo.

Nesse campo, há um pastor que cuida das suas ovelhas com muito amor. Esse pastor é Jesus, e você é uma ovelhinha muito querida.

A Bíblia diz, no Salmo 23: "O Senhor é o meu pastor; nada me faltará."

Isso quer dizer que, com Jesus cuidando de você, você tem tudo o que precisa. Ele te leva pra descansar na grama macia, te guia pertinho das águas tranquilas e refresca o seu coração.

Respira fundo... O Bom Pastor conhece você pelo nome. Ele sabe quando você está feliz e quando você está com medo.

Mesmo quando a gente passa por lugares escuros ou difíceis, a gente não precisa ter medo, porque o Pastor está sempre do nosso lado, cuidando de cada passinho.

Sente a paz desse campo te envolvendo, como um abraço suave.

Você é amado. Você está seguro. O Bom Pastor nunca deixa você sozinho.

Antes de terminar, fale baixinho no coração: "Jesus é o meu Pastor. Eu descanso Nele."

Leve essa calma com você hoje. Que a paz do Bom Pastor fique no seu coração. Amém.`,

  'be-brave': `Olá, amiguinho corajoso! Vamos repetir juntos algumas palavras fortes e gentis pra encher o nosso coração?

Respira fundo... e diga comigo:

Eu posso ser corajoso. Quando eu sinto medo, Deus me dá força.

A Bíblia diz: "Seja forte e corajoso, não tenha medo, porque o Senhor está com você por onde você for."

Eu sou corajoso pra tentar coisas novas, mesmo quando é um pouquinho difícil.

E eu também sou gentil. Eu trato as pessoas com carinho.

Eu uso palavras boas, que abraçam o coração dos outros.

Eu ajudo quem precisa e divido o que tenho com alegria.

Ser corajoso é fazer o que é certo, mesmo quando é difícil.

Ser gentil é cuidar dos outros do jeitinho que Deus cuida de mim.

Eu posso ser corajoso e gentil ao mesmo tempo, porque Deus está comigo.

Respira de novo... e sinta a coragem e a bondade crescendo dentro de você.

Hoje, eu vou espalhar coragem e gentileza por onde eu passar.

Quando o medo vier, eu lembro: Deus está comigo, e eu não estou sozinho.

Você é corajoso. Você é gentil. Você é amado por Deus.

Vá brilhar hoje, pequeno guerreiro do bem!`,

  'thank-you-god': `Que tal a gente parar um pouquinho pra dizer "obrigado" a Deus? Junte as mãozinhas comigo e vamos orar.

Querido Deus, obrigado por mais um dia lindo que o Senhor me deu.

Obrigado pelo solzinho que aquece e pela chuvinha que faz as plantas crescerem.

Obrigado pela minha família, que me ama e cuida de mim todos os dias.

Obrigado pelos meus amiguinhos, pelas brincadeiras e pelas risadas gostosas.

Obrigado pela comida no meu prato e pela minha caminha quentinha.

Obrigado, Deus, pelas coisas pequeninas que às vezes a gente esquece de agradecer: um abraço, um sorriso, um beijo de boa noite.

A Bíblia diz: "Deem graças em todas as situações." Por isso eu quero ser uma criança grata.

Quando eu agradeço, o meu coração fica leve e cheio de alegria, porque eu lembro de tudo de bom que o Senhor faz por mim.

Me ajuda a ser grato todos os dias, e a dizer "obrigado" também pras pessoas que cuidam de mim.

Obrigado, Deus, principalmente porque o Senhor me ama tanto e nunca solta a minha mão.

Em nome de Jesus, amém!

Agora, antes de terminar, pense em uma coisa boa que aconteceu hoje e diga baixinho: "Obrigado, Deus." Viu como dá um calorzinho gostoso no coração?`,

  'noahs-ark': `Há muito, muito tempo, vivia um homem chamado Noé. Noé amava a Deus e fazia o que era certo, mesmo quando as outras pessoas tinham esquecido de ser boas.

Um dia, Deus falou com Noé: — Noé, vai chover muito, muito mesmo, e vai vir uma grande enchente. Quero que você construa um barco bem grande, uma arca, pra salvar a sua família e os animais.

Noé obedeceu na hora! Ele e os filhos trabalharam bastante, martelando e serrando, até a arca ficar enorme e pronta.

Aí Deus mandou os animais entrarem, de dois em dois: dois leões, dois coelhinhos, dois elefantes, dois passarinhos... Tinha bicho de todo tipo entrando na fila da arca! Que zoeira gostosa devia ser.

Quando todos estavam dentro, seguros e quentinhos, Deus fechou a porta. E começou a chover. Choveu durante quarenta dias e quarenta noites! A água subiu, subiu, e a arca flutuou bem tranquila sobre as águas.

Lá dentro, Noé cuidava de todos os animais, e Deus cuidava de Noé.

Depois de muitos dias, a chuva parou. Noé soltou uma pombinha, que voltou trazendo uma folhinha verde no biquinho — sinal de que a terra já estava aparecendo de novo!

Quando todos saíram da arca, Deus pintou no céu uma coisa linda: um arco-íris colorido. E fez uma promessa: — Esse arco-íris vai lembrar que eu cuido de vocês e sempre cumpro o que prometo.

Amiguinho, toda vez que você ver um arco-íris no céu, lembre: Deus é fiel, Deus cuida de você e Deus sempre cumpre as suas promessas!`,

  'davi-golias': `Hoje você vai conhecer um pastorzinho corajoso chamado Davi.

Davi era o filho mais novo da família e cuidava das ovelhas do pai. Ele era pequeno, mas tinha um coração grande e confiava muito em Deus.

Naquele tempo, o povo de Israel estava com muito medo, porque havia um guerreiro gigante chamado Golias. Golias era altão, altão, do tamanho de quase três pessoas, e gritava com uma voz grossa, assustando todo mundo. Ninguém tinha coragem de enfrentá-lo.

Um dia, Davi foi levar comida pros irmãos no acampamento e ouviu o gigante gritando. Mas Davi não tremeu. Ele disse: — Eu não tenho medo, porque Deus está comigo!

O rei achou Davi pequeno demais pra lutar e quis colocar nele uma armadura pesada. Mas Davi tirou tudo. Ele pegou só o seu cajado, a sua funda e cinco pedrinhas lisas do riacho.

Davi olhou pro gigante e falou bem firme: — Você vem com espada, mas eu venho em nome do Senhor!

Então ele colocou uma pedrinha na funda, rodou e atirou. A pedra voou direitinho e... o gigante caiu! Davi venceu Golias, não pela força dele, mas pela força de Deus.

Sabe, amiguinho, às vezes a gente se sente pequeno diante de coisas que dão medo — como o escuro, uma prova ou um dia difícil. Mas você não está sozinho. Com Deus do seu lado, você é mais corajoso do que imagina.

Lembre de Davi: o tamanho do problema não importa, porque o nosso Deus é maior que qualquer gigante!`,

  'jonas-baleia': `Era uma vez um homem chamado Jonas. Um dia, Deus falou com ele: — Jonas, vá até a cidade de Nínive e avise as pessoas que elas precisam parar de fazer o mal e voltar pra mim.

Mas Jonas não quis obedecer. Ele pensou: "Ah, eu não quero ir!" Então fez uma coisa que não devia: fugiu pro lado contrário e entrou num navio que ia bem pra longe de Nínive.

No meio do mar, veio uma tempestade enorme! O vento soprava forte e as ondas balançavam o navio pra todo lado. Jonas sabia que aquilo tinha acontecido porque ele tinha desobedecido a Deus. Então os marinheiros, com o coração apertado, ajudaram Jonas a entrar na água, e na mesma hora o mar ficou calminho.

E aí... pluft! Um peixe enorme, do tamanho de uma baleia, engoliu Jonas inteirinho! Lá dentro da barriga do peixe, no escurinho, Jonas teve tempo pra pensar.

Sabe o que ele fez? Ele orou! Ele disse: — Senhor, me perdoa. Eu vou te obedecer.

Deus ouviu a oração de Jonas. Ele mandou o peixe levar Jonas até a praia e... blééé! O peixe colocou Jonas em terra firme, são e salvo.

Dessa vez, Jonas obedeceu na hora. Ele foi até Nínive, avisou as pessoas, e a cidade inteira se arrependeu e voltou pra Deus.

Amiguinho, essa história ensina duas coisas lindas: é sempre melhor obedecer a Deus, porque Ele sabe o que é bom pra gente. E mesmo quando a gente erra, Deus perdoa e dá uma nova chance. O amor Dele é assim, sem fim!`,

  'bom-samaritano': `Um dia, Jesus contou uma história pra ensinar como a gente deve tratar as pessoas. Vamos ouvir?

Um homem estava viajando por uma estrada quando, de repente, uns ladrões apareceram, tomaram as coisas dele e o deixaram caído no chão, machucado, sem conseguir levantar.

Logo depois, passou por ali um homem muito religioso. Ele viu o homem caído... mas, em vez de ajudar, desviou pro outro lado da estrada e seguiu em frente.

Daí a pouco, passou outro homem importante. Ele também viu o coitado machucado... mas também não parou. Continuou andando, como se nada estivesse acontecendo.

Que tristeza, né? Mas espera, que a história tem um final lindo.

Então passou por ali um terceiro homem, um samaritano. Naquele tempo, muita gente não gostava dos samaritanos. Mas esse homem tinha um coração bondoso. Quando ele viu o machucado, ficou com muita pena.

Ele parou na hora, cuidou dos ferimentos com todo o carinho, colocou o homem no seu animalzinho e o levou até um lugar seguro pra descansar. E ainda pagou pra cuidarem dele até ele ficar bom!

Quando Jesus terminou, Ele perguntou: — Qual desses três foi o verdadeiro amigo do homem machucado?

A resposta é fácil: foi aquele que ajudou, o samaritano bondoso!

E aí Jesus disse uma coisa importante pra todos nós: — Vá e faça a mesma coisa.

Amiguinho, Deus quer que a gente cuide das pessoas, não importa quem elas sejam. Quando você vê alguém triste ou precisando de ajuda, lembre do bom samaritano. Um gesto de amor pode mudar o dia de alguém!`,

  'jose-sonho': `Vamos conhecer a história de José, um menino que confiou em Deus mesmo quando a vida ficou difícil.

José era um dos doze filhos de Jacó, e o papai o amava muito. Um dia, Jacó deu pra José um presente lindo: um manto cheio de cores, brilhando como um arco-íris.

Os irmãos de José ficaram com ciúmes daquele manto colorido. E ficaram ainda mais bravos quando José contou que tinha sonhado que um dia seria muito importante.

Os irmãos ficaram tão chateados que fizeram uma coisa muito errada: venderam José pra uns viajantes, e ele foi levado pra bem longe, pra terra do Egito.

Coitado do José! Longe de casa, ele passou por momentos difíceis e até foi parar na cadeia, sem ter feito nada de errado. Mas, mesmo assim, ele nunca deixou de confiar em Deus. E Deus estava sempre com ele.

José tinha um dom especial: Deus o ajudava a entender o significado dos sonhos. Um dia, o rei do Egito, o faraó, teve um sonho que ninguém conseguia explicar. Chamaram José, e ele, com a ajuda de Deus, avisou que viriam sete anos de fartura e depois sete anos de fome.

O faraó ficou tão admirado que colocou José como governador de todo o Egito! José guardou comida durante os anos bons, e por isso salvou muita gente da fome — até os seus próprios irmãos, que vieram de longe procurar alimento.

E sabe o que José fez quando reencontrou os irmãos? Ele os perdoou com o coração cheio de amor! Ele disse: — Vocês pensaram em me fazer mal, mas Deus transformou tudo em bem.

Amiguinho, mesmo nos dias difíceis, Deus está cuidando de você e pode transformar tudo em algo bom. E, igual a José, a gente pode escolher perdoar. O perdão deixa o coração leve e cheio de paz!`,

  'moises-mar': `Está na hora de dormir, então respire fundo e venha ouvir uma história cheia de fé.

O povo de Deus, os israelitas, tinha vivido muitos anos no Egito como escravos, trabalhando demais e sofrendo. Eles pediam a Deus: — Senhor, nos ajude!

Deus ouviu e escolheu Moisés pra liderar o povo até a liberdade. Depois de muitas coisas incríveis, finalmente o rei do Egito deixou o povo ir embora. Que alegria! Todos saíram caminhando, cheios de esperança.

Mas logo o rei mudou de ideia e mandou seu exército atrás deles, com cavalos e carruagens. Quando o povo olhou pra frente, viu um problemão: um mar enorme bloqueando o caminho. E atrás vinha o exército correndo. Eles ficaram com medo, presos no meio.

Moisés disse, bem calmo: — Não tenham medo! Fiquem tranquilos e vejam o que Deus vai fazer.

Então Deus mandou Moisés esticar a mão sobre o mar. Naquela noite, soprou um vento bem forte, e aconteceu algo que ninguém nunca tinha visto: as águas se abriram ao meio, formando dois paredões enormes de água, com um caminho seco bem no meio!

O povo atravessou o mar pisando em chão sequinho, com a água parada dos dois lados, como se fossem muralhas. Que noite incrível!

Quando todos chegaram seguros do outro lado, as águas voltaram ao normal, e o povo de Deus estava livre, em paz.

Naquela noite, o povo aprendeu que Deus é poderoso e cuida dos seus filhos, mesmo quando o problema parece grande demais.

Amiguinho, se algum dia você sentir que um problema é do tamanho de um mar, lembre: o nosso Deus abre caminhos. Pode confiar Nele e descansar. Boa noite, durma com o coração em paz.`,

  'natal-jesus': `Chegou a hora de dormir. Vamos ouvir baixinho a história mais especial de todas: a noite em que Jesus nasceu.

Há muito tempo, numa cidadezinha chamada Nazaré, morava uma moça chamada Maria. Um anjo apareceu pra ela e disse: — Maria, não tenha medo. Você vai ter um bebê muito especial, o Filho de Deus, e vai chamá-lo de Jesus.

Quando estava quase na hora do bebê nascer, Maria e seu marido, José, precisaram viajar até uma cidade chamada Belém. O caminho era longo, e Maria foi montada num jumentinho, bem devagar.

Quando chegaram em Belém, a cidade estava cheia, e não havia lugar pra eles dormirem. Procuraram, procuraram, e só encontraram um cantinho simples, um estábulo onde ficavam os animais. Foi ali que eles se abrigaram naquela noite.

E foi ali, naquele lugarzinho humilde, que o menino Jesus nasceu. Maria o enrolou em panos quentinhos e o deitou com cuidado numa manjedoura, que é o cochinho onde os bichinhos comem.

Lá no céu, uma estrela enorme começou a brilhar bem forte sobre Belém, mostrando o caminho.

Nos campos perto dali, uns pastores cuidavam das ovelhas. De repente, anjos apareceram cantando: — Glória a Deus nas alturas! Nasceu o Salvador! Os pastores correram pra ver o bebê e ficaram cheios de alegria.

De bem longe, três sábios também seguiram a estrela e trouxeram presentes pro menino Jesus.

Naquela noite tranquila, o mundo ganhou o maior presente de todos: Jesus, que veio mostrar o amor de Deus por cada um de nós.

Agora feche os olhinhos, amiguinho. Assim como a estrela cuidou daquela noite, Deus cuida da sua. Durma em paz. Feliz e boa noite!`,

  'dez-mandamentos': `Vamos conhecer a história de quando Deus deu regras de amor pro seu povo.

Depois que Moisés ajudou os israelitas a saírem do Egito, eles caminharam pelo deserto até chegar perto de uma montanha bem alta, o monte Sinai.

Deus chamou Moisés pra subir a montanha pra conversar com Ele. Lá no alto, no meio das nuvens, Deus entregou a Moisés dez regrinhas muito importantes, escritas em duas placas de pedra. Elas se chamam os Dez Mandamentos.

Mas essas regras não eram pra atrapalhar a brincadeira, não! Elas eram um presente de amor, pra ensinar o povo a viver feliz e em paz com Deus e com todo mundo.

Vamos ver algumas delas, do jeitinho que dá pra entender?

Deus disse: amem a Deus acima de tudo, porque só Ele é o nosso Deus. Falem o nome de Deus com respeito e carinho. Separem um dia pra descansar e ficar pertinho de Deus.

Honrem o papai e a mamãe, obedecendo e amando eles. Cuidem da vida das pessoas e nunca machuquem ninguém. Sejam fiéis e verdadeiros. Não peguem o que é dos outros. Não contem mentiras. E não fiquem com inveja do que os outros têm.

Viu só? Tudo isso cabe em duas palavrinhas: amar a Deus e amar as pessoas. Foi o próprio Jesus que ensinou que esse é o resumo de tudo.

Amiguinho, quando a gente obedece a Deus, a nossa vida fica mais feliz e mais tranquila, como uma casa bem cuidada. As regras de Deus são abraços que nos protegem.

Hoje, escolha uma dessas regrinhas pra praticar. Que tal honrar o papai e a mamãe com um abraço bem apertado? Deus vai ficar feliz, e o seu coração também!`,

  'paz-coracao': `Vamos fazer um momentinho de paz juntos? Encontre um lugar gostoso, deixe o corpinho relaxar e respire bem devagar comigo. Inspira pelo nariz, contando até três... um, dois, três... e solta o ar pela boca, bem suave.

Às vezes o nosso coração fica agitado, cheio de pensamentos, como se fosse um marzinho com muitas ondas. Mas Deus quer dar pra você uma paz gostosa, que acalma tudo por dentro.

Jesus disse: "Deixo com vocês a paz; a minha paz eu lhes dou. Não fiquem com o coração aflito, nem com medo."

Então, agora, vamos entregar pra Deus tudo o que está pesando no coraçãozinho. Pode ser um medinho, uma briga, uma tristeza. Imagine que você coloca tudo isso nas mãos grandes e quentinhas de Deus. Pronto. Ele cuida.

Respira de novo... inspira a paz... solta a preocupação.

Imagine um lago bem calmo, sem nenhuma onda, refletindo o céu azul. É assim que o seu coração pode ficar: calminho, tranquilo, em paz.

Deus está bem pertinho de você agora. Você está seguro. Você é amado. Não precisa se preocupar com nada.

Mais uma respiração funda... e sinta a paz de Deus enchendo cada cantinho de você, dos pés à cabeça.

Antes de terminar, fale baixinho: "A paz de Deus está no meu coração."

Leve essa calma com você. Sempre que o coração ficar agitado, respire fundo e lembre: Deus está com você, e Ele dá a você a Sua paz. Amém.`,

  'oracao-manha': `Bom dia, amiguinho! O sol acabou de aparecer, os passarinhos estão cantando, e Deus preparou um novo dia só pra você. Que tal começar agradecendo? Junte as mãozinhas comigo.

Querido Deus, bom dia! Obrigado por mais uma manhã linda e por eu ter acordado bem.

Obrigado pelo descanso da noite e pelo novo dia que está só começando, cheio de coisas boas pra descobrir.

A Bíblia diz: "As misericórdias do Senhor se renovam a cada manhã." Isso quer dizer que, todo dia, o seu amor por mim é novinho em folha!

Hoje, eu peço que o Senhor caminhe comigo. Me ajude a ser uma criança gentil, obediente e alegre.

Me dá um coração bondoso pra tratar bem os meus amiguinhos, a minha família e todo mundo que eu encontrar.

Se hoje aparecer alguma coisa difícil, me dá coragem e me lembra que o Senhor está sempre do meu lado.

Abençoa o papai, a mamãe, os meus irmãos, os meus professores e os meus amiguinhos.

Que neste dia eu possa espalhar o seu amor com um sorriso, um abraço e palavras boas.

Obrigado, Deus, porque o Senhor me ama e cuida de mim do amanhecer até o anoitecer.

Em nome de Jesus, amém!

Agora respira fundo, dá um sorrisão e vai aproveitar esse dia que Deus fez especialmente pra você. Tenha uma manhã abençoada!`,

  'sansao': `Hoje você vai conhecer Sansão, o homem mais forte que já existiu.

Antes mesmo de Sansão nascer, Deus tinha um plano especial pra ele: usá-lo pra ajudar e proteger o povo de Israel. E Deus deu a Sansão uma força surpreendente.

Mas tinha um segredinho importante: a força de Sansão estava ligada à sua promessa a Deus. Enquanto ele nunca cortasse o cabelo, que era o sinal dessa promessa, ele ficaria forte. O cabelo de Sansão era bem comprido, e ele confiava em Deus.

Sansão era tão forte que conseguia coisas incríveis! Uma vez, ele enfrentou um leão sozinho, só com a força que Deus tinha dado. Outras vezes, ele protegeu o povo de inimigos que queriam fazer o mal.

Mas Sansão também cometeu erros e nem sempre foi cuidadoso com a promessa que tinha feito. Um dia, ele acabou contando o seu segredo, cortaram o seu cabelo, e ele ficou sem força. Que tristeza!

Sansão ficou triste, mas ele não desistiu de Deus. Lá no fundo, ele se arrependeu e orou: — Senhor, lembra de mim e me dá força mais uma vez.

E sabe o que aconteceu? Deus, que é cheio de bondade, ouviu a oração de Sansão e devolveu a sua força. No final, Sansão usou tudo o que tinha pra cumprir o plano de Deus.

Amiguinho, essa história ensina coisas importantes: a nossa verdadeira força vem de Deus, não de nós mesmos. E, mesmo quando a gente erra, Deus ouve quando o nosso coração se arrepende e pede ajuda.

Hoje, quando você precisar de força — pra ser corajoso, pra obedecer ou pra fazer o bem — peça pra Deus. Ele é a fonte da força de verdade!`,

  'afirm-amado': `Olá, pequenino! Vamos encher o coração de coisas boas? Respire fundo e repita comigo essas palavras lindas e verdadeiras.

Eu sou amado por Deus.

Deus me ama do jeitinho que eu sou, agora mesmo.

Não importa se eu acerto ou se eu erro, o amor de Deus por mim não muda nunca.

A Bíblia diz que nada, nada mesmo, pode me separar do amor de Deus.

Eu sou precioso. Eu sou querido. Eu sou um tesouro pra Deus.

Quando eu estou feliz, Deus me ama. Quando eu estou triste, Deus me ama do mesmo jeito.

Deus pensa em mim com carinho o tempo todo, de dia e de noite.

Eu não preciso fazer nada pra merecer esse amor. Ele é um presente de graça.

O amor de Deus é maior que o céu, mais fundo que o mar e mais forte que tudo.

Respira de novo... e sinta esse amor te abraçando por dentro, bem quentinho.

Eu sou amado ontem, hoje e pra sempre.

Eu posso amar os outros, porque Deus me amou primeiro.

Hoje eu vou guardar essa verdade no coração: Deus me ama.

Você é muito amado, pequenino. Nunca, nunca se esqueça disso. Tenha um lindo dia!`,

  'afirm-corajoso': `Vamos ficar fortes por dentro? Respire bem fundo, fique firme e repita comigo essas palavras de coragem.

Eu posso ser corajoso.

Quando o medo aparece, eu respiro fundo e lembro: Deus está comigo.

A Bíblia diz: "Seja forte e corajoso. Não tenha medo, porque o Senhor, o seu Deus, está com você por onde você for."

Eu não preciso enfrentar nada sozinho, porque Deus segura a minha mão.

Eu sou corajoso pra tentar coisas novas.

Eu sou corajoso pra dizer a verdade.

Eu sou corajoso pra fazer o que é certo, mesmo quando é difícil.

Eu sou corajoso no escuro, porque sei que Deus cuida de mim a noite toda.

A coragem não é não ter medo. A coragem é confiar em Deus mesmo sentindo medo.

Respira de novo... e sinta a força de Deus enchendo o seu coraçãozinho.

Eu sou forte, porque a minha força vem de Deus.

Quando algo der medo hoje, eu vou falar baixinho: "Deus está comigo, eu posso fazer isso."

Você é corajoso. Você é forte. Você não está sozinho.

Vá em frente, pequeno corajoso. Deus está bem do seu lado o tempo todo!`,

  'afirm-cuida': `Olá, amiguinho! Vamos descansar o coração com palavras suaves? Respire devagar e repita comigo.

Deus cuida de mim.

De dia e de noite, Deus está sempre olhando por mim.

A Bíblia diz: "Entreguem a Deus todas as suas preocupações, porque Ele cuida de vocês."

Então eu posso entregar pra Deus tudo o que me deixa preocupado.

Eu estou seguro nas mãos de Deus, como um passarinho no ninho.

Deus sabe do que eu preciso antes mesmo de eu pedir.

Ele me dá comida, uma casa, uma família e muito amor.

Quando eu fico com medo, Deus me acalma. Quando eu fico triste, Deus me consola.

Eu não preciso me preocupar, porque Deus já está cuidando de tudo.

Respira fundo... e sinta a paz de saber que você está seguro.

Como o pastor cuida das ovelhinhas, Deus cuida de mim com muito carinho.

Eu posso descansar tranquilo, porque Deus nunca dorme: Ele fica acordado cuidando de mim.

Hoje eu vou lembrar: eu não estou sozinho, Deus cuida de mim.

Você está seguro. Você é amado. Deus cuida de você sempre. Descanse tranquilo, pequenino.`,

  'afirm-especial': `Ei, você aí, tão especial! Vamos lembrar do quanto você é único? Respire fundo e repita comigo.

Eu sou especial e único.

No mundo inteiro, não existe ninguém igualzinho a mim.

A Bíblia diz que eu fui feito de um jeito especial e maravilhoso.

Deus escolheu a cor dos meus olhos, o som da minha risada e o jeito do meu sorriso.

Eu não preciso ser igual a ninguém. Deus me fez do jeito certo: do meu jeito.

Deus me criou com muito cuidado e muito amor.

Eu tenho dons e talentos que Deus colocou dentro de mim.

Tem coisas que só eu sei fazer do meu jeitinho, e isso é lindo.

Eu sou um presente de Deus pro mundo.

Respira de novo... e sinta como é bom ser exatamente quem você é.

Deus não comete erros. Eu sou obra das mãos Dele, feito com capricho.

Eu sou amado, eu sou querido e eu sou único.

Hoje eu vou celebrar quem eu sou, porque Deus me fez especial de propósito.

Você é único. Você é especial. Você é uma obra-prima de Deus. Brilhe hoje, do seu jeitinho!`,

  'afirm-bondoso': `Vamos encher o coração de bondade? Respire fundo e repita comigo essas palavras gentis.

Eu tenho um coração bondoso.

Deus colocou amor dentro de mim pra eu compartilhar com todo mundo.

A Bíblia diz: "Sejam bondosos uns com os outros."

Eu uso palavras boas, que alegram o coração das pessoas.

Eu ajudo quem precisa de ajuda, com alegria.

Eu divido os meus brinquedos e a minha vez de brincar.

Eu dou abraços, sorrisos e carinho pra quem está triste.

Quando alguém erra, eu sei perdoar, do jeitinho que Deus me perdoa.

Ser bondoso é tratar os outros como eu gosto de ser tratado.

A bondade é como uma sementinha: quando eu planto, ela vira um jardim de alegria.

Respira de novo... e sinta o seu coração ficando quentinho de tanto amor.

Eu posso ser bondoso em casa, na escola e em todo lugar que eu for.

Cada gesto de carinho deixa o mundo mais bonito.

Hoje, eu vou espalhar bondade por onde eu passar.

Você tem um coração bondoso. Vá espalhar amor por aí, pequeno coração gentil!`,

  'video-daniel': `Você está pronto pra uma aventura cheia de coragem? Vamos conhecer Daniel!

Daniel amava muito a Deus. Todos os dias, ele se ajoelhava perto da janela e fazia uma oração, conversando com Deus com todo o carinho.

Daniel era tão sábio e bom que o rei gostava muito dele. Mas alguns homens ficaram com inveja e bolaram um plano: fizeram uma lei dizendo que ninguém podia orar a Deus, só ao rei.

Mas Daniel não teve medo. Ele continuou orando a Deus do mesmo jeitinho, perto da janela, porque amava o Senhor e sabia o que era certo.

Por causa disso, os homens jogaram Daniel na cova dos leões! Imagine só: leões enormes, com juba e dentes grandes. Mas Daniel confiou em Deus.

Durante a noite, Deus mandou um anjo que fechou a boca dos leões. Eles ficaram mansinhos, igual a gatinhos, e não fizeram nada a Daniel!

De manhã cedo, o rei correu até a cova e gritou: — Daniel, você está bem?

E Daniel respondeu: — Estou sim! Deus me protegeu a noite toda!

O rei ficou tão feliz que mandou todo o reino conhecer o Deus poderoso de Daniel.

Amiguinho, igual a Daniel, você pode confiar em Deus, mesmo quando algo dá medo. Deus está sempre com você, cuidando de cada passo. Seja corajoso, porque Deus é maior que qualquer leão!`,

  'video-criacao': `Prepare os olhinhos pra ver uma coisa incrível: como Deus criou o mundo inteiro!

No comecinho de tudo, não existia nada. Só Deus. E Deus, com muito amor, resolveu criar um lugar lindo pra gente morar.

No primeiro dia, Deus falou: — Que exista a luz! E pluf! A luz apareceu, brilhando forte, separando o dia da noite.

No segundo dia, Deus fez o céu azul, bem grandão lá em cima.

No terceiro dia, Ele juntou as águas e criou o mar azul, e fez a terra brotar com gramas verdinhas, flores coloridas e árvores cheias de frutas.

No quarto dia, Deus acendeu o sol pra brilhar de dia, e a lua com um montão de estrelinhas pra enfeitar a noite.

No quinto dia, Ele encheu o mar de peixinhos coloridos e o céu de passarinhos cantando: piu, piu!

No sexto dia, Deus criou todos os bichinhos: o leão que ruge, o coelho que pula, o cachorrinho que late. E, por último, com muito carinho, Ele criou as pessoas — criou você!

Deus olhou pra tudo o que tinha feito, sorriu e disse: — Está muito bom!

E no sétimo dia, Ele descansou.

Amiguinho, tudo o que você vê — o sol, as estrelas, os bichinhos, as flores e você — foi feito por Deus, que ama você muito. Que mundo lindo Ele criou pra gente cuidar!`,

  'video-prodigo': `Jesus contou uma história linda sobre um pai e seus dois filhos. Vamos ver?

Era uma vez um pai que tinha dois filhos e os amava muito. Um dia, o filho mais novo disse: — Pai, eu quero a minha parte da herança agora. Eu quero ir embora viver longe.

O pai ficou triste, mas deixou o filho ir. O menino foi pra bem longe e gastou todo o seu dinheiro com bobagens, sem pensar no amanhã.

Logo o dinheiro acabou. O rapaz ficou sem comida, sem amigos, com muita fome. Ele teve até que cuidar de porquinhos pra sobreviver, e olhava com vontade pra comida dos bichos. Que tristeza!

Aí ele pensou: — Na casa do meu pai, até os empregados têm comida de sobra. Vou voltar e pedir desculpa.

Então ele se levantou e começou o caminho de volta pra casa.

E sabe o que aconteceu? Quando ele ainda estava longe, o pai o avistou. O pai estava esperando todos os dias! Ele saiu correndo, abraçou o filho bem apertado e encheu ele de beijos.

O filho disse: — Pai, eu errei. — Mas o pai, cheio de alegria, mandou fazer uma festa enorme: — Meu filho voltou! Vamos comemorar!

Amiguinho, esse pai é como Deus. Não importa o que a gente faça nem pra onde a gente vá: Deus está sempre esperando, de braços abertos, pra nos receber com amor. Quando a gente volta pra Ele, o céu faz festa!`,

  'video-paes': `Vem comigo ver um dos milagres mais legais que Jesus fez!

Num dia de sol, uma multidão enorme foi atrás de Jesus pra ouvir Ele falar sobre Deus. Tinha tanta, mas tanta gente, que era difícil contar: papais, mamães e um monte de crianças!

O dia foi passando, e todo mundo começou a ficar com fome. Mas eles estavam longe da cidade, e não havia comida pra tanta gente.

Os amigos de Jesus ficaram preocupados. Mas aí apareceu um menininho que tinha levado um lanchinho: cinco pãezinhos e dois peixinhos. Com o coração generoso, ele ofereceu tudo pra Jesus.

Era pouquinho pra tanta gente, né? Mas espere só pra ver o que Jesus fez!

Jesus pegou os pães e os peixes nas mãos, olhou pro céu e agradeceu a Deus. Depois começou a repartir... e aconteceu uma coisa incrível: a comida não acabava nunca!

Os amigos foram distribuindo, distribuindo, e todo mundo comeu até ficar satisfeito. E ainda sobraram doze cestos cheinhos de comida!

Mais de cinco mil pessoas comeram naquele dia, tudo a partir do lanche de um menininho que dividiu o que tinha.

Amiguinho, esse milagre nos ensina duas coisas: Jesus tem poder pra fazer coisas incríveis, e, quando a gente divide o que tem, mesmo pouquinho, Deus faz multiplicar a alegria. Que tal compartilhar algo bom hoje?`,

  'video-aguas': `Segura na minha mão que vamos ver Jesus fazer uma coisa surpreendente: andar sobre as águas!

Depois de um dia bem cheio, Jesus pediu pros seus amigos atravessarem o lago de barco, enquanto Ele ficava um pouquinho sozinho pra orar.

Os amigos entraram no barquinho e começaram a remar. Mas, no meio do caminho, veio um ventão forte! As ondas ficaram grandes, o barco balançava pra todo lado, e os amigos ficaram com muito medo.

De repente, no meio da noite, eles viram alguém andando por cima da água, vindo na direção deles. Eles se assustaram: — O que é aquilo?

Mas era Jesus! Ele caminhava tranquilo sobre as ondas, como se fosse chão firme. E Ele falou com uma voz calma: — Coragem! Sou eu. Não tenham medo.

Pedro, um dos amigos, ficou tão animado que pediu: — Senhor, manda eu ir até aí! E Jesus disse: — Vem!

Pedro saiu do barco e começou a andar sobre a água também! Mas, quando olhou pro vento forte, ficou com medo e começou a afundar. Ele gritou: — Senhor, me salva!

Na mesma hora, Jesus estendeu a mão e segurou Pedro. — Por que você teve medo? Confie em mim.

Quando os dois entraram no barco, o vento parou, e tudo ficou calmo.

Amiguinho, quando a gente olha pros nossos medos, a gente fica abalado, igual ao Pedro. Mas, quando a gente olha pra Jesus e confia Nele, Ele segura a nossa mão e acalma a tempestade. Jesus está sempre por perto pra te salvar. É só chamar!`,

  'medit-gratidao': `Vamos fazer um momentinho gostoso de gratidão? Sente ou deite confortável, feche os olhinhos e respire bem devagar comigo. Inspira... e solta o ar bem suave.

Hoje a gente vai pensar nas coisas boas que Deus nos dá, porque quando a gente agradece, o coração fica leve e feliz.

Respira fundo... e pense na sua família. Nas pessoas que cuidam de você, que te dão abraços e beijos de boa noite. Que presente lindo! Diga no coração: obrigado, Deus.

Agora pense na sua casa, na sua caminha quentinha, na comida gostosa no seu prato. Coisas simples, mas tão boas. Obrigado, Deus.

Pense nos seus amiguinhos, nas brincadeiras, nas risadas. Pense no solzinho, nas árvores, nos passarinhos cantando, nos bichinhos. Obrigado, Deus, por esse mundo tão bonito.

A Bíblia diz: "Deem graças ao Senhor, porque Ele é bom; o seu amor dura pra sempre."

Respira de novo... e sinta o coração ficando quentinho de tanta coisa boa.

Pense também em você mesmo: nas suas mãozinhas, nos seus pezinhos, na sua risada, no seu jeitinho especial. Você também é um presente de Deus. Obrigado, Deus, por mim.

Quando a gente é grato, a gente percebe que Deus cuida da gente o tempo todo, com carinho.

Antes de terminar, escolha uma coisa boa do seu dia e diga baixinho: "Obrigado, Deus."

Leve esse coração grato com você. Que a alegria de Deus te acompanhe. Amém.`,

  'medit-medo': `Vem cá, amiguinho. Às vezes a gente sente medo, e tudo bem. Vamos juntos acalmar esse medinho com a ajuda de Deus? Sente confortável, feche os olhos e respire bem devagar comigo.

Inspira pelo nariz, contando até quatro... um, dois, três, quatro... segura um pouquinho... e solta o ar bem devagar. De novo. Inspira a calma... solta o medo.

O medo é só um sentimento, e ele não manda em você. Quando o medo aparece, a gente pode conversar com Deus, que é mais forte que tudo.

A Bíblia diz: "Não tenha medo, porque eu estou com você; não fique assustado, porque eu sou o seu Deus."

Imagine que Deus está bem pertinho de você agora, como um abraço grande e quentinho. Você está seguro. Nada pode te tirar das mãos de Deus.

Agora pense no medinho que está no seu coração. Imagine que você coloca esse medo, como se fosse uma pedrinha, nas mãos de Deus. Pronto. Ele segura pra você. Você não precisa carregar isso sozinho.

Respira de novo... inspira a paz... solta o que assusta.

Você é corajoso, não porque você não sente medo, mas porque Deus está com você. Mesmo no escuro, Ele enxerga. Mesmo no silêncio, Ele está perto.

Sinta a calma chegando, devagarzinho, dos pés até a cabeça.

Antes de terminar, fale baixinho: "Deus está comigo, eu não preciso ter medo."

Leve essa paz com você. Sempre que o medo voltar, respire fundo e lembre: Deus está bem pertinho, cuidando de você. Amém.`,

  'medit-descanso': `Está na hora de descansar o corpinho e o coração. Vamos relaxar juntos? Deite bem confortável, feche os olhinhos e respire bem devagar comigo. Inspira... e solta o ar, soltando também o cansaço.

O dia foi cheio de coisas, né? Brincadeiras, aprendizados, talvez umas correrias. Agora é hora de descansar pertinho de Deus.

Jesus fez um convite lindo: "Venham a mim todos vocês que estão cansados, e eu farei vocês descansarem."

Então vamos aceitar esse convite. Imagine que você está deitado num lugar bem tranquilo, macio e seguro, com Deus cuidando de você.

Respira fundo... e relaxe os pezinhos. Agora as perninhas. A barriguinha sobe e desce devagar. Relaxe os bracinhos, as mãozinhas, os ombrinhos. Solte o pescoço e o rostinho. Tudo soltinho, leve, em paz.

Deus está com você agora. Você não precisa se preocupar com nada. Tudo o que aconteceu hoje, a gente entrega nas mãos Dele. E tudo o que vem amanhã, Ele também já cuida.

A Bíblia diz: "Em paz me deito e logo adormeço, porque só Tu, Senhor, me guardas em segurança."

Respira de novo, bem devagar... e sinta o descanso chegando, como um cobertor quentinho cobrindo você.

Você é amado. Você está seguro. Você pode descansar tranquilo.

Fale baixinho no coração: "Eu descanso em Deus."

Que o sono venha suave e que você acorde renovado. Deus cuida de você a noite toda. Descanse em paz, pequenino.`,

  'bed-boanoite': `O dia chegou ao fim, amiguinho. As estrelinhas já apareceram lá no céu, e está na hora de se despedir do dia e dormir pertinho de Jesus.

Vamos respirar fundo e relaxar? Inspira devagar... e solta o ar bem suave. O corpinho vai ficando leve e tranquilo.

Hoje foi um dia cheio de coisas: você brincou, aprendeu, riu e talvez tenha ficado um pouquinho triste ou cansado em algum momento. Tudo isso a gente pode entregar pra Jesus agora.

Imagine que Jesus está sentadinho bem do lado da sua cama, com um sorriso carinhoso, cuidando do seu sono. Ele está sempre por perto, mesmo quando a gente não vê.

A Bíblia diz que Deus dá um sono tranquilo aos que Ele ama. E Ele ama muito você!

Vamos agradecer pelo dia? Obrigado, Jesus, pelas coisas boas de hoje. Obrigado pela minha família, pela minha caminha quentinha e pelo seu cuidado o tempo todo.

Agora feche os olhinhos devagar. Solte os ombros. Deixe a respiração ficar bem suave, igual a uma ondinha do mar indo e voltando.

Jesus vai cuidar de você a noite inteira. Os seus anjos estão ao redor da sua cama. Você está seguro e em paz.

Fale baixinho: "Boa noite, Jesus. Eu te amo."

Que você durma com o coração tranquilo e tenha sonhos bonitos. Jesus está com você. Boa noite, pequenino. Durma bem.`,

  'bed-estrelas': `Está na hora de dormir. Vamos fazer uma coisa gostosa antes: imaginar um céu cheio de estrelinhas, igual ao que Abraão viu há muito, muito tempo.

Respira fundo... e solta o ar bem devagar. Agora imagine que você está deitado num campo macio, numa noite quentinha, olhando pra cima. O céu está pretinho e cheio, cheio de estrelas brilhando como pontinhos de luz.

Era assim a noite em que Deus levou Abraão pra fora da tenda e disse: — Abraão, olhe pro céu e conte as estrelas, se você conseguir!

Mas era impossível contar, eram tantas! E Deus prometeu: — A sua família será tão grande quanto essas estrelas.

Abraão acreditou na promessa de Deus e dormiu tranquilo, confiando.

Vamos contar algumas estrelinhas juntos, bem devagarzinho, pra ajudar o sono a chegar? Uma estrelinha... duas estrelinhas... três... cada uma brilhando suave... quatro... cinco... cada uma é uma promessa de amor de Deus pra você.

Sabe, amiguinho, cada estrela no céu lembra que Deus cumpre o que promete e cuida de você com todo o carinho.

Respira de novo, bem suave... e sinta o sono chegando, gostoso e tranquilo.

Você está seguro. Deus, que fez todas essas estrelas, está cuidando de você agora.

Fale baixinho: "Obrigado, Deus, por cuidar de mim."

Continue contando estrelinhas no coração e durma em paz, pequenino. Que Deus te dê uma noite tranquila e sonhos bonitos. Boa noite.`,

  'bed-ovelhinha': `Chegou a hora de dormir. Vamos ouvir baixinho a história de uma ovelhinha que voltou pra casa?

Era uma vez uma ovelhinha branquinha e fofinha que vivia com o seu pastor e muitas outras ovelhas. O pastor cuidava de todas com muito amor e conhecia cada uma pelo nome.

Numa tarde, a ovelhinha viu uma graminha mais verdinha um pouco mais longe e foi atrás dela. Deu uns passinhos... e mais uns... e foi se afastando do rebanho sem perceber. Quando olhou em volta, já estava ficando escuro, e ela estava sozinha, longe de casa.

A ovelhinha sentiu um medinho e soltou um "bééé" bem fraquinho. Ela queria muito voltar, mas não sabia o caminho.

Mas o pastor, que amava tanto a ovelhinha, percebeu logo que ela tinha sumido. Ele não esperou nem um pouquinho: saiu pra procurar, chamando pelo nome dela com a voz mansa.

Andou pelos montes, atravessou o riozinho e não desistiu, até que ouviu o "bééé" baixinho da ovelhinha. — Achei você! — disse o pastor, cheio de alegria.

Com todo o carinho, ele pegou a ovelhinha, colocou nos ombros, bem quentinho, e a levou de volta pra casa, pra junto das outras ovelhas. A ovelhinha se aconchegou, segura e feliz, e dormiu tranquila.

Sabe, amiguinho, Jesus é o nosso Bom Pastor, e você é a ovelhinha que Ele ama. Ele sempre sabe onde você está e nunca deixa você sozinho.

Agora feche os olhinhos, se aconchegue na sua caminha e durma tranquilo, igual à ovelhinha nos braços do pastor. Jesus está cuidando de você. Boa noite.`,

  'oracao-noite': `O dia foi embora devagarinho, e agora a noite chegou com o seu céu estrelado. É hora de fechar os olhinhos e conversar com Deus antes de dormir. Vamos juntar as mãozinhas e orar?

Querido Deus, obrigado por mais esse dia. Obrigado por tudo o que eu vivi, pelas brincadeiras, pelos abraços e até pelas coisas que eu aprendi.

Se hoje eu fiz algo errado, me perdoa, Senhor. E me ajuda a fazer melhor amanhã, com um coração bondoso.

Agora que vou dormir, eu coloco a minha noite nas Tuas mãos. Cuida de mim enquanto eu durmo. Manda os Teus anjos ficarem ao redor da minha cama, pra eu descansar em paz, sem medo nenhum.

A Bíblia diz: "Em paz me deito e logo adormeço, porque só Tu, Senhor, me guardas em segurança." Eu confio nisso.

Cuida do papai, da mamãe, dos meus irmãos e de todos que eu amo. Dá um sono tranquilo pra cada um.

Tira de mim qualquer preocupação e enche o meu coração de calma, como um cobertor quentinho me aquecendo.

Obrigado, Senhor, porque o Senhor nunca dorme e fica cuidando de mim a noite inteira.

Em nome de Jesus, amém.

Agora respira fundo, se aconchega na caminha e deixa o sono chegar devagarzinho. Deus está bem pertinho de você. Durma em paz e tenha sonhos bonitos. Boa noite!`,

  'oracao-gratidao': `Que tal a gente fazer uma oração só pra agradecer? Quando a gente diz "obrigado" a Deus, o coração fica cheio de alegria. Junte as mãozinhas comigo.

Querido Deus, obrigado por hoje. Obrigado por mais um dia de vida, com saúde pra brincar, correr e aprender.

Obrigado pelo café da manhã gostoso, pelo almoço e por cada comidinha que eu comi.

Obrigado pela minha família, que cuida de mim com tanto amor. Obrigado pelos abraços apertados e pelos beijinhos.

Obrigado pelos meus amiguinhos, pelas risadas e pelas brincadeiras divertidas.

Obrigado pelo solzinho que brilhou, pelo céu azul e pelos passarinhos cantando.

Obrigado, Senhor, por todas as coisinhas que às vezes eu nem percebo: a água fresquinha, a minha caminha, um sorriso de alguém querido.

A Bíblia diz: "Deem graças em todas as situações." Então eu quero ter sempre um coração grato.

Obrigado, principalmente, porque o Senhor me ama tanto, cuida de mim o tempo todo e nunca solta a minha mão.

Me ajuda a ser uma criança que agradece e que também alegra o coração das pessoas ao redor.

Em nome de Jesus, amém!

Agora pense numa coisa boa que aconteceu com você hoje e diga baixinho pra Deus: "Obrigado!" Sentiu o coraçãozinho ficar quentinho? É a alegria da gratidão!`,

  'oracao-familia': `Vamos fazer uma oração bem especial pela nossa família? A família é um presente de Deus, e a gente pode pedir a bênção Dele sobre cada pessoa que a gente ama. Junte as mãozinhas comigo.

Querido Deus, obrigado pela minha família. Obrigado por cada pessoa que cuida de mim e que eu amo.

Abençoa o papai e a mamãe. Dá pra eles saúde, alegria e descanso. Obrigado por todo o cuidado, o trabalho e o amor que eles têm comigo.

Abençoa os meus irmãos e irmãs. Ajuda a gente a brincar junto, a dividir as coisas e a se amar, mesmo quando às vezes a gente discute um pouquinho.

Abençoa os meus avós, tios, primos e todas as pessoas queridas da minha família, perto ou longe. Guarda cada um deles com o Teu carinho.

A Bíblia diz: "Eu e a minha casa serviremos ao Senhor." Que a nossa família seja sempre cheia de amor, de paz e de Ti, Senhor.

Ajuda a nossa casa a ser um lugar feliz, com abraços, perdão e palavras gentis.

Cuida de cada um quando estamos juntos e também quando estamos separados. Que o Teu amor una a nossa família como um laço que nunca se solta.

Obrigado, Deus, por eu fazer parte dessa família e, principalmente, por eu fazer parte da Tua grande família.

Em nome de Jesus, amém!

Agora, que tal dar um abraço bem apertado em alguém da sua família? É um jeito gostoso de espalhar o amor de Deus!`,

  'oracao-protecao': `Chegou a hora de dormir, e antes de fechar os olhinhos vamos pedir a proteção de Deus pra noite inteira. Junte as mãozinhas comigo e ore baixinho.

Querido Deus, obrigado por mais um dia. Agora que a noite chegou, eu peço que o Senhor cuide de mim enquanto eu durmo.

A Bíblia diz que o Senhor manda os Teus anjos cuidarem de nós em todos os caminhos. Então eu peço: coloca os Teus anjos da guarda ao redor da minha cama, pra me proteger a noite toda.

Tira de mim qualquer medinho do escuro. Me lembra que o Senhor está bem pertinho, mais perto que o ar que eu respiro, e que eu nunca estou sozinho.

Protege a minha casa, o meu quartinho e todas as pessoas que dormem aqui. Cuida do papai, da mamãe, dos meus irmãos e de todos que eu amo.

Cuida também das pessoas que estão longe, dos que estão doentes e dos que precisam de Você esta noite.

O Senhor é o meu refúgio e a minha força. Debaixo das Tuas asas, eu fico seguro e tranquilo, como um passarinho no ninho.

Enche o meu coração de paz, pra eu dormir gostoso e acordar feliz amanhã.

Obrigado, Senhor, porque o Senhor nunca dorme e fica acordado cuidando de mim a noite inteira.

Em nome de Jesus, amém.

Agora respira fundo, se aconchega bem na caminha e durma tranquilo. Os anjos de Deus estão cuidando de você. Boa noite, pequenino!`,
};

/* anexa o roteiro a cada item de CONTENT (campo c.script) */
CONTENT.forEach(c => { if (SCRIPTS[c.id]) c.script = SCRIPTS[c.id]; });

// ---- CONTEÚDO BÍBLICO NOVO (histórias avulsas + episódios das séries) ----
const EXTRA_CONTENT = [
  {"id":"bencaos-ep1","type":"story","title":"As Bênçãos de Jesus (Parte 1) — Os Amados de Deus","emoji":"💛","img":"cover_bencaos_ep1.jpg","grad":"linear-gradient(160deg,#6fae84,#3f7d5a)","dur":"5 min","badge":"Novo","desc":"Olá, amiguinhos! É o Jesus. Hoje eu vou te contar um segredo lindo: quem Deus mais ama e abraça bem forte.","script":"Olá, amiguinhos! É o Jesus. Um dia eu subi bem devagarinho numa colina, sentei na grama verdinha, e uma multidão de gente se juntou pertinho de mim pra escutar. E sabe o que eu contei pra elas? Eu contei quem são os amados de Deus.\n\nEu disse assim: felizes são os pequeninos e humildes, aqueles que não ficam se gabando. Deus enche o coração deles de coisas boas, como quem enche um copinho até a boca.\n\nFelizes são os que ficam tristes e choram, porque Deus chega bem pertinho, enxuga cada lágrima e dá um abraço quentinho que acalma tudo por dentro.\n\nFelizes são os que têm o coração puro, limpinho como um céu sem nuvem. Esses vão poder ver o quanto Deus é lindo, bem de pertinho.\n\nE felizes são os que fazem as pazes, os que espalham carinho onde tem briga. Deus olha pra eles e sorri, e diz baixinho: esses são meus filhinhos amados.\n\nViu, amiguinho? Você não precisa ser o maior nem o mais forte pra Deus te amar. Basta ter um coraçãozinho gentil. E o seu é assim! Você é muito, muito especial. Te amo!"},
  {"id":"bencaos-ep2","type":"story","title":"As Bênçãos de Jesus (Parte 2) — Deixem as Crianças Virem a Mim","emoji":"🤗","img":"cover_bencaos_ep2.jpg","grad":"linear-gradient(160deg,#e0a94e,#c07f2a)","dur":"5 min","video":"84f18df76917e8f0739740ad4fd9ac5b","badge":"Novo","desc":"Olá, amiguinhos! É o Jesus. Um dia quiseram afastar as crianças de mim... mas eu abri bem os braços pra elas!","script":"Olá, amiguinhos! É o Jesus. Num dia bem ensolarado, muitas mamães e papais vieram me trazer seus filhinhos. Eles queriam que eu colocasse a mão na cabecinha de cada um e desse uma bênção bem carinhosa.\n\nMas alguns dos meus ajudantes acharam que as crianças iam me atrapalhar. Eles disseram: esperem, o Jesus está muito ocupado! E começaram a mandar os pequeninos embora.\n\nAí eu balancei a cabeça e falei com muito amor: não, não! Deixem as crianças virem a mim, não impeçam! Porque o Reino de Deus pertence a quem tem um coraçãozinho assim, cheio de confiança.\n\nAí as crianças correram e eu abri bem os meus braços. Sentei uns no colo, fiz cafuné em outros, ouvi as risadinhas e abençoei cada um, um por um, olhando bem nos olhinhos deles.\n\nE eu disse pra todo mundo escutar: quem quiser entrar no Reino de Deus precisa confiar como uma criança confia. Com o coração aberto, sem medo, cheio de amor.\n\nSabe, amiguinho? Se você estivesse lá naquele dia, eu ia te abraçar também. E hoje, mesmo de longe, eu te abraço com o meu amor. Você tem um lugar bem pertinho de mim. Te amo!"},
  {"id":"bencaos-ep3","type":"bedtime","title":"As Bênçãos de Jesus (Parte 3) — A Paz que Acalma","emoji":"⛵","img":"cover_bencaos_ep3.jpg","grad":"linear-gradient(160deg,#5f8fd0,#345d94)","dur":"5 min","badge":"Novo","desc":"Uma história bem tranquila pra dormir: quando o vento ficou bravo, Jesus mostrou como ter paz e confiar.","script":"Chegou a noite, e o céu ficou cheio de estrelinhas. O Jesus e seus amigos entraram num barquinho pra atravessar um grande lago. A água estava calma, e o barco balançava devagar, pra lá e pra cá, bem gostoso.\n\nO Jesus estava tão cansadinho que se deitou num cantinho do barco, colocou a cabeça num travesseiro macio e adormeceu, respirando fundo e sereno.\n\nMas de repente veio um vento bem forte! As ondas ficaram grandes e o barco balançou muito. Os amigos ficaram com medo e chamaram: Jesus, acorda! Será que a gente vai afundar?\n\nO Jesus abriu os olhos com toda calma. Ele se levantou, olhou pro vento e pras ondas e falou baixinho, com uma voz mansa: silêncio... aquietem-se. E na mesma hora tudo ficou parado. O vento parou. A água ficou lisinha como um espelho.\n\nAí o Jesus sorriu e disse aos amigos: não precisam ter medo, é só confiar. Eu estou sempre com vocês. E o barquinho voltou a balançar bem devagar, embaixo das estrelas.\n\nAgora feche os seus olhinhos, amiguinho. Assim como o Jesus acalmou a tempestade, ele acalma o seu coração pra você dormir tranquilo. Nada de medo. O Jesus cuida de você a noite inteira. Durma bem. Te amo!"},
  {"id":"davi-pastor","type":"video","title":"Jovem Davi","emoji":"🐑","img":"cover_davi_pastor.jpg","grad":"linear-gradient(160deg,#6fae84,#3f7d5a)","dur":"6 min","video":"7c389141231a69174fa68e387a842837","badge":"Novo","desc":"Conheça o pequeno Davi, o pastorzinho que cuidava das ovelhas e era muito corajoso porque confiava em Deus.","script":"Olá, amiguinhos! Deixa eu te contar sobre um menino chamado Davi. Ele era o mais novinho de muitos irmãos, e todo dia ele saía pro campo cuidando de um monte de ovelhas fofinhas.\n\nO Davi amava as suas ovelhas. Ele levava elas pra beber água fresquinha, achava a grama mais verdinha pra elas comerem, e contava uma por uma pra ver se nenhuma tinha sumido. À noite, ele tocava harpa e cantava pra elas dormirem.\n\nMas cuidar de ovelhas não era só brincadeira. Um dia, um leão faminto apareceu e agarrou uma ovelhinha! O Davi não fugiu. Ele foi lá, corajoso, e salvou a ovelha das garras do leão.\n\nOutro dia foi um urso enorme! E de novo o pequeno Davi enfrentou o perigo pra proteger o seu rebanho. Mas sabe qual era o segredo da coragem dele? O Davi orava assim: Deus, o Senhor me ajudou com o leão e com o urso, eu confio em Ti!\n\nO Davi sabia que ele não estava sozinho. Deus estava sempre do lado dele, forte como um escudo. Por isso ele não tremia de medo, ele confiava.\n\nE por ter um coração tão bom e tão cheio de fé, Deus tinha planos lindos e grandes pro pequeno Davi. Mas essa é uma outra parte da história!\n\nViu, amiguinho? Quando a gente confia em Deus, a gente fica corajoso também. Deus está sempre com você, cuidando de você como o Davi cuidava das ovelhinhas. Você é muito especial. Te amo!"},
  {"id":"anunciacao","type":"story","title":"A Anunciação","emoji":"👼","img":"cover_anunciacao.jpg","grad":"linear-gradient(160deg,#e0a94e,#c07f2a)","dur":"5 min","video":"422e6181674fa4085508dbc96d526496","badge":"Novo","desc":"Um anjo brilhante visita uma moça chamada Maria e traz a notícia mais linda de todas!","script":"Olá, amiguinhos! Deixa eu te contar de um dia muito, muito especial. Numa cidadezinha chamada Nazaré, morava uma moça bondosa chamada Maria. Ela amava a Deus de todo o coração.\n\nUm dia, aconteceu uma coisa incrível! De repente, um anjo brilhante apareceu na frente de Maria. Era o anjo Gabriel, cheio de luz. Maria se assustou um pouquinho, mas o anjo disse com carinho: não tenha medo, Maria! Deus está muito feliz com você.\n\nAí o anjo trouxe a notícia mais linda de todas. Ele disse: Maria, você vai ter um bebê muito especial. Você vai colocar o nome dele de Jesus. E ele será o Filho de Deus, e vai encher o mundo de amor!\n\nMaria ficou surpresa e perguntou como aquilo poderia acontecer. E o anjo respondeu com doçura: para Deus, nada é impossível. Deus vai cuidar de tudo.\n\nEntão Maria, com o coração cheio de fé, disse baixinho: eu sou serva de Deus. Que aconteça tudo como o Senhor quiser. Ela confiou em Deus com um sim cheio de amor.\n\nE assim começou a preparar-se a chegada do menino Jesus, aquele bebê que ia nascer pra ser o melhor amigo de todas as crianças do mundo, inclusive de você!\n\nViu como Deus escolheu uma pessoa de coração gentil? Deus também tem planos lindos pra você, amiguinho. Basta confiar, como a Maria confiou. Você é muito especial. Te amo!"},
  {"id":"pao-do-ceu","type":"story","title":"O Pão do Céu","emoji":"🍞","img":"cover_pao_do_ceu.jpg","grad":"linear-gradient(160deg,#d97b6a,#a94f3f)","dur":"5 min","badge":"Novo","desc":"O povo de Deus estava com fome no deserto... e Deus fez cair do céu um alimento especial toda manhã!","script":"Olá, amiguinhos! Deixa eu te contar de uma vez em que Deus cuidou do seu povo de um jeito bem surpreendente. Faz muito tempo, o povo de Israel estava caminhando por um deserto enorme, cheio de areia e sol quente.\n\nDepois de andar bastante, a barriguinha de todo mundo começou a roncar. Eles estavam com fome e não tinha comida por ali. Aí eles ficaram preocupados: o que vamos comer?\n\nMas Deus ouviu, e Deus cuida sempre. Ele disse: não se preocupem, eu vou mandar comida do céu pra vocês! E na manhã seguinte, quando o sol nasceu e o orvalho secou, apareceu no chão uma coisa branquinha, redondinha e cheirosa. Era o maná, o pão do céu!\n\nAs crianças corriam animadas juntando o maná nas mãozinhas. Ele era docinho, com gosto de mel, e dava pra fazer pãozinho. Todo mundo comeu e ficou bem satisfeito. Que delícia!\n\nE o mais legal: toda manhãzinha, todo dia, o maná aparecia de novo. Deus mandava exatamente o que cada família precisava. Ninguém passava fome, porque Deus nunca esquecia do seu povo.\n\nAssim o povo aprendeu uma coisa importante: podemos confiar em Deus todo dia. Ele sempre dá o que a gente precisa, na hora certa.\n\nViu, amiguinho? Deus cuida de você também, todos os dias. Você pode confiar nele de coração aberto. Você é muito amado. Te amo!"},
  {"id":"burrinho-jerusalem","type":"story","title":"O Burrinho de Jerusalém","emoji":"🌿","img":"cover_burrinho.jpg","grad":"linear-gradient(160deg,#6fae84,#3f7d5a)","dur":"5 min","video":"6cb7f997abcb2003617fe8a688c0661d","badge":"Novo","desc":"Um burrinho pequenininho teve a honra mais linda de todas: levar o Jesus na sua entrada em Jerusalém!","script":"Olá, amiguinhos! Sabe o nosso amigo burrinho? Deixa eu te contar de um burrinho muito especial que apareceu na Bíblia, num dia cheio de festa.\n\nEstava chegando um dia importante, e o Jesus ia entrar na grande cidade de Jerusalém. Aí ele pediu aos seus amigos: vão ali na frente, vocês vão encontrar um burrinho amarradinho. Tragam ele pra mim, com jeitinho.\n\nOs amigos foram e acharam o burrinho pequenininho, esperando. Era um burrinho novo, que nunca tinha carregado ninguém. Mas naquele dia, ele ia carregar a pessoa mais especial de todas: o Jesus!\n\nO Jesus subiu com carinho nas costas do burrinho, e eles foram caminhando devagar pela estrada. E sabe o que aconteceu? Uma multidão de gente apareceu pra receber o Jesus com alegria!\n\nAs pessoas pegavam ramos verdinhos de palmeira e balançavam no ar. Elas estendiam suas capas no chão pra fazer um tapete pro burrinho passar. E cantavam felizes: Hosana! Bendito é aquele que vem em nome de Deus!\n\nO burrinho andava com passinhos firmes e orgulhosos, cuidando pra levar o Jesus com toda a segurança. Ele era pequeno e humilde, mas Deus deu a ele a tarefa mais linda daquele dia.\n\nViu, amiguinho? Igual ao nosso amigo Davi, o burrinho! Não importa se a gente é pequenininho. Deus tem tarefas lindas e especiais pra cada um de nós. Você também é muito especial pra Deus. Te amo!"},
  {"id":"salmo-bom-pastor","type":"meditation","title":"O Salmo do Bom Pastor","emoji":"🌾","img":"cover_salmo_pastor.jpg","grad":"linear-gradient(160deg,#5f8fd0,#345d94)","dur":"4 min","badge":"Novo","desc":"Uma meditação bem tranquila pra descansar o coração, baseada no Salmo do pastor que cuida de tudo com amor.","script":"Vamos ficar bem quietinhos agora, amiguinho. Respire bem fundo... e solte o ar devagar. Vamos pensar juntos numa coisa muito bonita: Deus é como um pastor que cuida da gente com todo o carinho.\n\nO Senhor é o meu pastor, e por isso nada vai me faltar. Como uma ovelhinha bem cuidada, eu tenho tudo o que preciso. Deus está sempre olhando por mim.\n\nEle me leva pra descansar num campo de grama verdinha e macia. E me guia até uma água calma e fresquinha, onde eu posso beber e ficar tranquilo. Que lugar gostoso e seguro.\n\nMesmo quando o caminho fica escuro, eu não tenho medo. Porque Deus está bem do meu lado, segurando a minha mão. A presença dele me deixa calminho e em paz.\n\nO amor de Deus e a bondade dele vão me acompanhar todos os dias da minha vida, aonde quer que eu vá. Eu sou uma ovelhinha muito amada pelo Bom Pastor.\n\nAgora respire fundo mais uma vez... e sorria bem devagar. Deus está cuidando de você neste exato momentinho. Você está seguro, você está em paz, você é muito amado. Descanse tranquilo. Te amo!"}
];
CONTENT.push(...EXTRA_CONTENT);

// ---- SÉRIES (agrupam episódios que já são conteúdos normais; davi-golias reusa o item existente) ----
const SERIES = [
  { id:'serie-bencaos', title:'As Bênçãos de Jesus', img:'cover_serie_bencaos.jpg', grad:'linear-gradient(160deg,#5f8fd0,#345d94)', badge:'3 Episódios', desc:'Três histórias curtinhas em que Jesus ensina, acolhe e abençoa — perfeitas pra ver em sequência.', eps:['bencaos-ep1','bencaos-ep2','bencaos-ep3'] },
];

/* ===== 50 LEITURAS DO DIA (rotativas; setGospelDate escolhe a de hoje) ===== */
const DAILY_READINGS = [
{
"id": "dr-01",
"title": "A Fé do Soldado",
"ref": "Mateus 8",
"verse": "Jesus, é só o Senhor falar uma palavrinha, e tudo vai ficar bem!",
"script": "Oi, amiguinho! Chega mais pertinho, que hoje tem uma história cheia de coragem e confiança. Era uma vez um soldado muito importante, que mandava em muitos outros soldados. Ele era forte, usava uma capa bonita e tinha uma voz firme. Mas naquele dia o coração dele estava tristinho. Um ajudante muito querido, que morava na casa dele, estava doente na caminha e não conseguia levantar. Então o soldado ouviu falar de Jesus e correu bem depressa até Ele. Com muito respeito, disse baixinho: \"Jesus, o Senhor nem precisa ir até a minha casa. É só o Senhor falar uma palavrinha, e eu sei que o meu ajudante vai ficar bom.\" Jesus ficou tão feliz com aquela confiança tão bonita! Ele olhou para o soldado e disse: \"Vá para casa. Aconteceu como você acreditou.\" E sabe de uma coisa? Naquele mesmo instante, lá longe, o ajudante ficou curadinho e sorriu de novo! Que lindo, não é? A palavra de Jesus tem um poder enorme, cheio de amor. Nós também podemos confiar assim, com o coração tranquilo. Vamos orar? Querido Jesus, obrigado porque a Tua palavra cuida da gente. Ajuda a gente a confiar em Ti sempre, com o coração cheinho de fé. Amém."
},
{
"id": "dr-02",
"title": "Zaqueu Sobe na Árvore",
"ref": "Lucas 19",
"verse": "Jesus olhou lá pra cima e disse: \"Zaqueu, desce depressa, porque hoje eu vou à sua casa!\"",
"script": "Oi, meu amiguinho! Vem cá, senta pertinho de mim, o burrinho Davi. Hoje eu vou te contar uma história muito especial! Numa cidade cheia de gente, morava um homem chamado Zaqueu. Ele era bem baixinho, sabia? Tão baixinho que não conseguia enxergar nada quando a multidão se juntava. E naquele dia, Jesus ia passar por ali! O coração de Zaqueu batia forte, forte: ele queria muito, muito ver Jesus. Mas todas as pessoas eram mais altas, e ele ficou lá atrás, sem ver nadinha. Então Zaqueu teve uma ideia esperta! Ele correu, correu e subiu numa árvore bem grandona, o pé de sicômoro. De cima dos galhos, ele podia ver tudinho! E adivinha? Jesus parou bem embaixo da árvore, olhou lá pra cima e chamou pelo nome: \"Zaqueu, desce depressa, que hoje eu vou à sua casa!\" Nossa, que alegria! Jesus sabia o nome dele! Jesus queria ser amigo dele! Sabe, meu bem, Jesus também sabe o seu nome. Você não precisa ser grande nem forte. Ele te ama do jeitinho que você é, hoje e sempre. Vamos orar? Querido Jesus, obrigado por saber o meu nome e me amar tanto. Quero ser seu amiguinho pra sempre. Amém."
},
{
"id": "dr-03",
"title": "A Ovelhinha Perdida",
"ref": "Lucas 15",
"verse": "O pastorzinho nunca desiste: ele procura a ovelhinha perdida até achar e trazer para casa com muito amor.",
"script": "Oi, amiguinho! Chega bem pertinho do burrinho Davi, que hoje ele tem uma história cheia de carinho para te contar. Era uma vez um pastor muito bondoso que tinha cem ovelhinhas fofinhas. Toda tarde ele contava: uma, duas, três... até chegar em cem! Mas um dia, quando ele contou, faltou uma. Só tinha noventa e nove. Cadê a ovelhinha número cem? Ela tinha se perdido no caminho. O pastor não pensou duas vezes. Deixou as noventa e nove bem seguras e saiu procurando pela pequenina. Andou pelo campo, subiu a montanha e chamou baixinho: \"Ovelhinha, cadê você?\" Até que, atrás de uma pedra, ele ouviu um \"béééé\" bem manhoso. Achou! O pastor sorriu, colocou a ovelhinha no colo e voltou feliz para casa. Sabe, meu amor? Você é como aquela ovelhinha. Deus te ama tanto, mas tanto, que Ele nunca, nunca desiste de você. Você é muito importante para Ele! Vamos orar juntinhos? Querido Deus, obrigado por me amar assim, do tamanho do céu. Obrigado por sempre cuidar de mim e nunca me deixar sozinho. Eu sou a Sua ovelhinha querida. Amém."
},
{
"id": "dr-04",
"title": "Cinco Pães e Dois Peixes",
"ref": "João 6",
"verse": "Quando a gente reparte com carinho, Jesus faz o pouquinho virar bastante pra todo mundo.",
"script": "Oi, meu amiguinho! Chega bem pertinho, que hoje eu, o burrinho Davi, tenho uma aventura muito gostosa pra te contar. Era um dia bem cheio. Uma multidão enorme foi ouvir Jesus falar do amor de Deus. Todo mundo escutou, escutou... e a barriguinha começou a roncar de fome! Ninguém tinha comida por ali. Mas sabe quem tinha? Um menininho! Ele tinha só cinco pãezinhos e dois peixinhos, guardados com muito cuidado. Era pouquinho, mas ele fez uma coisa linda: ofereceu o seu lanche pra Jesus, de coração aberto. Então Jesus segurou aquele lanchinho, olhou para o céu e agradeceu ao Papai do Céu. E aconteceu uma coisa incrível! O pão não acabava, o peixe não acabava... e todos, todinhos, comeram até ficar bem cheios e felizes! Viu que bonito? Quando a gente divide com amor, mesmo que seja pouquinho, Deus faz virar muito. Você também pode repartir: um brinquedo, um abraço, um sorriso. Bora orar juntinho? Querido Jesus, obrigado por cuidar de nós e encher a nossa barriguinha e o nosso coração. Me ajuda a dividir com carinho, igual aquele menininho. Eu te amo muito! Amém."
},
{
"id": "dr-05",
"title": "Silêncio, Tempestade!",
"ref": "Marcos 4",
"verse": "Jesus falou baixinho e o vento parou: quando Ele está pertinho, o meu coração fica em paz.",
"script": "Oi, amiguinho! Chega mais pertinho do burrinho Davi. Vou te contar uma aventura linda que aconteceu num barquinho. Era noite, e Jesus estava atravessando o mar com os amigos. Ele estava tão cansado que dormia com a cabecinha num travesseiro. Que sono gostoso! De repente, veio um ventão bem forte. As ondas subiam, subiam, e batiam no barco: chuá, chuá! Os amigos ficaram assustados e chamaram: \"Jesus, acorda!\" Sabe o que Jesus fez? Ele levantou, olhou para a tempestade e falou com uma voz mansa: \"Silêncio! Fica quietinho.\" Na mesma hora, o vento parou e o mar ficou calminho, calminho, como um lençol bem lisinho. Que coisa boa! Jesus é tão forte que até o vento obedece a Ele. Sabe, meu bem, às vezes o nosso coração também fica agitado, com medinho do escuro ou de coisas novas. Mas Jesus está sempre pertinho de você. É só chamar, e Ele traz paz. Vamos orar juntinhos? Querido Jesus, obrigado porque você é forte e cuida de mim. Quando eu ficar com medo, acalma o meu coraçãozinho, do jeitinho que acalmou o mar. Eu te amo muito. Amém."
},
{
"id": "dr-06",
"title": "O Amigo que Ajudou",
"ref": "Lucas 10",
"verse": "Ame as pessoas ao seu redor com todo o seu coração, do mesminho jeito que você cuida de você.",
"script": "Oi, amiguinho! Chega mais pertinho, que o burrinho Davi vai te contar uma história linda que Jesus contou.\n\nEra uma vez um homem que andava por um caminho e se machucou. Ele ficou caidinho no chão, sem forças, precisando muito de ajuda.\n\nPassou uma pessoa importante, olhou e foi embora depressa. Passou outra e também não parou. Que pena, né?\n\nAí chegou um homem de um lugar bem diferente, alguém que ninguém achava que ia ajudar. Mas o coração dele ficou cheio de carinho! Ele parou, cuidou dos machucados com jeitinho, deu água e levou o homem para um lugar quentinho e seguro. Que amor!\n\nJesus contou essa história para ensinar uma coisa preciosa: quando a gente vê alguém precisando, a gente ajuda! Não importa se a pessoa é diferente, fala diferente ou mora longe. Todo mundo é amado por Deus, e você também pode ser um ajudante do bem, igual a esse homem bondoso.\n\nVamos orar juntinhos?\n\nQuerido Jesus, obrigado por cuidar de mim com tanto amor. Me ajuda a ter um coração bondoso para ajudar quem precisa, com um sorriso e um abraço. Eu te amo. Amém!"
},
{
"id": "dr-07",
"title": "Jesus Ama as Criancinhas",
"ref": "Marcos 10",
"verse": "Jesus disse com carinho: \"Deixem as criancinhas chegarem bem pertinho de mim!\"",
"script": "Oi, amiguinho! Chega mais pertinho, que hoje eu, o burrinho Davi, tenho uma história bem doce pra te contar. Num dia cheio de sol, muitas famílias caminhavam pela estrada pra ver Jesus. As mães e os pais seguravam a mãozinha dos seus filhos e diziam: \"Vamos, meu amor, o Jesus está bem ali!\" As crianças corriam animadas, com o coração batendo forte de alegria. Mas alguns adultos acharam que os pequeninos iam atrapalhar. \"Isso não é lugar de criança!\", eles disseram. Que tristeza, né? Só que Jesus, com o olhar mais gentil do mundo, chamou todo mundo e falou: \"Não! Deixem as criancinhas virem a mim, porque o meu coração é a casinha delas.\" Então Jesus abraçou cada um, colocou a mão na cabecinha deles e abençoou com muito amor. Sabe o que isso quer dizer, amiguinho? Que você também é muito, muito amado! Você nunca atrapalha o Jesus. Ele quer você pertinho, do jeitinho que você é. Vamos orar juntos? Querido Jesus, obrigado por me amar tanto e por me querer pertinho de você. Guarda o meu coração hoje e me abraça com o seu carinho. Eu também te amo, Jesus. Amém!"
},
{
"id": "dr-08",
"title": "O Filho que Voltou pra Casa",
"ref": "Lucas 15",
"verse": "Quando o filho ainda estava bem longe, o pai correu, abraçou ele bem forte e encheu o rostinho dele de beijinhos.",
"script": "Oi, amiguinho! Chega mais pertinho, que o Davi, o burrinho, quer te contar uma história de abraço bem apertado. Era uma vez um menino que resolveu ir embora, bem longe de casa. Ele achou que ia ser mais divertido sozinho. Mas, sabe? Longe do papai, o coraçãozinho dele foi ficando triste, cheio de saudade. A comida acabou, o dinheiro acabou, e ele ficou com muita fome. Então o menino pensou: \"Vou voltar pra casa!\" E foi caminhando de voltinha, com um pouquinho de medo, sem saber se o papai ainda gostava dele. Mas olha só que lindo: o papai estava lá, olhando a estradinha todo dia, esperando. Quando ele viu o filho lá bem longe, não esperou nem um segundinho. Saiu correndo, correndo, e deu o abraço mais gostoso do mundo, cheinho de beijinhos! Ele não brigou. Só ficou feliz, feliz, feliz, porque o filho tinha voltado. É assim que Deus é com você, meu amor. Quando a gente erra e volta pra Ele, Deus corre pra te abraçar e perdoa com muito carinho. Vamos orar? Querido Deus, obrigado por me amar e me perdoar sempre. Obrigado pelo seu abraço tão quentinho. Eu te amo muito. Amém."
},
{
"id": "dr-09",
"title": "Jesus e o Amigo que Não Enxergava",
"ref": "Marcos 10",
"verse": "\"Jesus, tenha carinho de mim!\" — e Jesus parou pra escutar.",
"script": "Oi, amiguinho! Chega bem pertinho que o burrinho Davi vai te contar uma história muito bonita. Numa cidade cheia de gente, morava um homem chamado Bartimeu. Os olhinhos dele não enxergavam nadinha — nem o céu, nem as flores, nem o rostinho de quem passava. Um dia, ele ouviu muita, muita gente andando na estrada. Era Jesus que estava chegando! O coração de Bartimeu ficou tão feliz que ele gritou bem alto: \"Jesus, tenha carinho de mim!\" As pessoas diziam \"shhh, fica quietinho!\", mas ele chamou de novo, mais forte ainda. E sabe o que Jesus fez? Ele parou. No meio de toda aquela gente, Jesus parou só pra escutar Bartimeu. Que lindo, né? Com todo o amor, Jesus perguntou: \"O que você quer?\" E Bartimeu pediu pra enxergar. Naquele mesmo instante, os olhinhos dele se abriram, e a primeira coisa que ele viu foi o sorriso de Jesus! Amiguinho, quando você chama Jesus, Ele também para pra te ouvir. Você é muito importante pra Ele. Vamos orar? Querido Jesus, obrigado porque Você sempre me escuta e cuida de mim com muito carinho. Eu te amo. Amém."
},
{
"id": "dr-10",
"title": "A Sementinha que Cresce",
"ref": "Marcos 4",
"verse": "Até a menorzinha das sementes, quando Deus cuida dela, vira a maior plantinha do jardim.",
"script": "Oi, meu amiguinho! Sou eu, o burrinho Davi, e hoje eu trouxe uma coisinha bem pequenina na palma da mãozinha. Olha só: é uma sementinha! Ela é tão miudinha que quase some entre os dedos. Você acha que uma coisa tão pequena assim pode virar algo bem grande? Pois foi isso que Jesus contou pra gente! Ele disse que a sementinha foi plantada na terra fofinha. Ela ficou lá, quietinha, no escurinho. E, devagarzinho, sem ninguém ver, ela começou a crescer. Primeiro um brotinho verde, depois folhinhas, depois um galho, e mais outro. Até que virou uma plantona bem grande e forte! Os passarinhos voavam e faziam ninho nos galhos dela pra descansar. Sabe, meu amiguinho, você também é assim. Você é pequenininho agora, mas cheio de amor no coração. E cada coisinha boa que você faz — um abraço, um obrigado, dividir um brinquedo — é uma sementinha que Deus faz crescer bem grande. Não precisa ter pressa. Deus cuida de você com muito carinho, todinho dia. Vamos orar juntinhos? Querido Deus, obrigado por cuidar de mim como cuida da sementinha. Me ajuda a crescer forte e cheio de amor. Eu te amo muito. Amém."
},
{
"id": "dr-11",
"title": "A Mão que Segura",
"ref": "Mateus 14",
"verse": "Jesus disse: \"Tenha coragem, sou eu! Não precisa ter medo.\"",
"script": "Oi, amiguinho! Chega mais pertinho que o Davi, o burrinho, tem uma história linda pra contar. Era noite, e os amigos de Jesus estavam num barquinho no meio do lago. O vento soprava forte e as ondas balançavam pra lá e pra cá. De repente, eles viram uma coisa incrível: Jesus vinha andando por cima da água, como se o lago fosse um chão bem firme! O Pedro ficou tão animado que pediu: \"Jesus, deixa eu ir também!\" E Jesus, com um sorriso, respondeu: \"Vem!\" Pedro pisou fora do barco e começou a caminhar sobre as águas. Que alegria! Mas aí ele olhou para o vento forte batendo e ficou com medinho, e começou a afundar. \"Jesus, me ajuda!\", ele gritou. Na mesma hora, Jesus esticou a mão e segurou o Pedro com todo o carinho. Não deixou ele cair, não! Sabe, meu bem? Quando a gente fica com medo, Jesus também estica a mão pra nós. É só chamar por Ele. Vamos orar juntinhos? Querido Jesus, obrigado por segurar a nossa mãozinha quando temos medo. A gente confia em Você, que é tão bom e tão forte. Fica sempre pertinho de nós. Amém."
},
{
"id": "dr-12",
"title": "O Toque que Curou",
"ref": "Marcos 5",
"verse": "Jesus falou com carinho: \"Filha, a sua fé curou você. Vá em paz!\"",
"script": "Oi, amiguinho! Chega bem pertinho que o burrinho Davi quer te contar uma história cheia de esperança. Havia uma mulher que estava doentinha fazia muito tempo. Ela já tinha tentado de tudo, mas nada melhorava, e o coração dela estava cansado e triste. Um dia, ela ouviu falar de Jesus. E pensou, bem baixinho: \"Se eu tocar só a pontinha do manto dele, eu vou ficar boa.\" Que fé grandona, não é? Tinha tanta gente na rua! Mas ela foi chegando devagarzinho, esticou a mãozinha e tocou o manto de Jesus. Na mesma hora, ela sentiu que estava curada! Jesus parou e olhou em volta com um sorriso tão bom. Ele não ficou bravo, não. Ele a chamou de um jeito lindo: \"Filha\". Você viu? Filha! Como se ela fosse muito, muito querida. E disse: \"A sua fé curou você. Vá em paz.\" Sabe, amiguinho? Jesus também te ama assim, com um amor enorme, e está pertinho de você agora. Vamos orar? Querido Jesus, obrigado por me amar e me chamar de filho, de filha. Cuida de mim com o Teu carinho gostoso. Eu confio em Ti. Amém."
},
{
"id": "dr-13",
"title": "O Bom Pastor",
"ref": "Salmo 23",
"verse": "O Senhor cuida de mim como um pastor cheio de amor, e pertinho dele nada vai me faltar.",
"script": "Oi, amiguinho! O burrinho Davi chegou pertinho de você, com o coração cheio de alegria. Hoje ele quer te contar sobre o Bom Pastor. Sabe o que faz um pastor? Ele cuida das suas ovelhinhas com muito amor. De manhã, ele leva o rebanho para um campo verdinho e macio, cheio de graminha gostosa. As ovelhas comem, correm e ficam bem felizes. Quando dá sede, o pastor acha uma aguinha calma e limpa, e todas bebem. À noite, ele conta uma por uma, para nenhuma ficar perdida. E se uma ovelhinha fica com medo do escuro, o pastor chega bem pertinho, e o medo vai embora. Você sabe quem é o nosso Pastor tão bom? É o Senhor! Ele conhece o seu nome, sabe do que você gosta e cuida de você o dia inteirinho. Perto dele, nada, nada mesmo, vai faltar no seu coração. Que lindo, não é? Agora vamos orar juntinhos, de olhinhos fechados. Querido Deus, obrigado por ser o meu Pastor tão bom. Pertinho de Você eu me sinto seguro e feliz. Cuida de mim, da minha mãe, do meu pai e de todos que eu amo. Eu confio no seu amor. Amém."
},
{
"id": "dr-14",
"title": "Conversando com o Paizinho do Céu",
"ref": "Mateus 6",
"verse": "Quando você orar, fale com carinho: \"Paizinho do Céu, o Teu nome é lindo!\"",
"script": "Oi, meu amiguinho, minha amiguinha! Sou eu, o burrinho Davi, e hoje eu quero te contar um segredinho gostoso que Jesus ensinou.\n\nUm dia, muita gente se juntou pertinho de Jesus. E alguém perguntou: \"Jesus, como a gente ora?\" Sabe o que Ele respondeu? Com um sorriso, Ele disse que orar não é difícil, não! Orar é simplezinho: é conversar com o Paizinho do Céu, que ama a gente muito, muito.\n\nVocê não precisa de palavras enroladas nem de voz de gente grande. É só falar do seu coração, do jeitinho que você fala com a sua mãe. Pode agradecer pelo dia, pedir ajuda, contar uma alegria ou até uma tristezinha. Deus escuta tudo, sempre, porque Ele está bem pertinho de você, mais perto que o ar.\n\nQue coisa boa, né? A qualquer hora do dia você pode chamar: \"Paizinho!\" E Ele já está ouvindo, cheio de amor.\n\nEntão vamos orar juntinhos, de olhinhos fechados?\n\n\"Paizinho do Céu, obrigado por me ouvir sempre. Eu Te amo. Fica pertinho de mim hoje e me ajuda a ser feliz. Amém.\""
},
{
"id": "dr-15",
"title": "Daniel e os Leões",
"ref": "Daniel 6",
"verse": "Deus manda o Seu anjo e cuida de quem confia Nele, até no meio dos leões.",
"script": "Oi, meu amiguinho! Sou eu, o burrinho Davi, e hoje eu tenho uma história bem corajosa pra contar. Vem sentar pertinho de mim!\n\nEra uma vez um homem muito bom chamado Daniel. Todo dia, de manhãzinha, ele fechava os olhinhos e conversava com Deus. Falava assim: \"Deus, muito obrigado por cuidar de mim!\" Daniel amava Deus de todo o seu coração.\n\nMas umas pessoas invejosas não gostaram disso e criaram uma regra bem boba pra tentar pegar o Daniel. E, sabe o que aconteceu? Colocaram ele numa cova cheia de leões grandões!\n\nSó que Daniel não ficou com medo, porque ele sabia que Deus estava ali, bem pertinho dele. E Deus fez uma coisa surpreendente: fechou a boca de todos os leões! Os bichões ficaram mansinhos e quietinhos, como gatinhos dormindo. Nem um arranhãozinho o Daniel levou!\n\nNo dia seguinte, o rei correu para ver e encontrou o Daniel sorrindo, sãozinho. Que alegria!\n\nSabe, meu amiguinho? Quando a gente sente medo, é só chamar por Deus. Ele é forte e está sempre com você.\n\nVamos orar? Querido Deus, obrigado por cuidar de mim como cuidou do Daniel. Me dá coragem quando eu tiver medo. Eu te amo! Amém."
},
{
"id": "dr-16",
"title": "Davi e o Gigante",
"ref": "1 Samuel 17",
"verse": "Não precisa ter medo: Deus está do seu lado e é bem maior que qualquer gigante!",
"script": "Oi, amiguinho! Chega bem pertinho, porque hoje eu tenho uma história cheia de coragem para você. Era uma vez um menino chamado Davi. Ele era pequeno, cuidava das ovelhinhas no campo e amava muito a Deus. Um dia, um gigante enorme e barulhento chamado Golias apareceu gritando e assustando todo mundo. Ele era altão, altão! Mas Davi não tremeu de medo. Sabe por quê? Porque Davi lembrou de uma coisa muito importante: Deus estava com ele. Davi pegou só uma funda e cinco pedrinhas lisinhas do riacho. Aí ele falou baixinho no coração: \"Deus vai me ajudar.\" Ele girou a funda, soltou uma pedrinha... e o gigante caiu! Não foi a força de Davi que venceu: foi a confiança dele em Deus. Que legal, né? Você também é pequeno agora, mas o seu Deus é bem grandão. Quando aparecer um \"gigante\" na sua vida, como um medinho do escuro ou de um dia novo, você pode confiar em Deus, igualzinho o Davi. Vamos orar? Papai do céu, obrigado por ser tão forte e por cuidar de mim. Me ajuda a ser corajoso e a confiar em Você sempre. Eu te amo! Amém."
},
{
"id": "dr-17",
"title": "A Arca e o Arco-íris",
"ref": "Gênesis 6-9",
"verse": "Deus falou assim: \"Vou colocar o meu arco-íris no céu para lembrar a todos que eu cuido de você para sempre.\"",
"script": "Oi, amiguinho! Sou eu, o burrinho Davi, e hoje eu tenho uma historinha bem bonita pra te contar. Há muito, muito tempo, morava um homem chamado Noé, que amava a Deus de todo o coração. Deus pediu pra ele construir um barco enorme, bem grandão, chamado arca. Sabe por quê? Porque uma chuva bem forte ia cair, e Deus queria cuidar de Noé, da família dele e de cada bichinho. Que legal! Vieram os leõezinhos, os passarinhos, os coelhos fofos, os elefantes... um casalzinho de cada, tudo bem juntinho e quentinho lá dentro. A chuva caiu, caiu, e a arca flutuou por cima da água, segura como um abraço. E quando o sol voltou a brilhar, Deus fez uma coisa linda no céu: um arco-íris cheio de cores! Ele disse assim: \"Esse arco-íris é a minha promessa. Eu vou cuidar de você sempre.\" Sabe, meu amiguinho? Deus também cuida de você todos os dias, com muito carinho. Vamos orar juntinhos? Querido Deus, obrigado por cuidar de mim, da minha família e de cada bichinho. Quando eu vir o arco-íris, vou lembrar que Você me ama. Te amo, Jesus. Amém."
},
{
"id": "dr-18",
"title": "No Princípio Deus Criou",
"ref": "Gênesis 1",
"verse": "No comecinho de tudo, Deus fez o céu e a terra com muito carinho.",
"script": "Oi, meu amiguinho! Venha aqui pertinho do burrinho Davi que eu vou te contar uma história linda de alegrar o coração. No comecinho de tudo, tudo era escurinho e vazio. Aí Deus falou baixinho: \"Que exista luz!\" E pluft, a luz apareceu, iluminando tudo! No segundo dia, Deus fez o céu bem azul lá em cima. Depois Ele juntou as águas e fez os mares e a terra sequinha, com florzinhas e árvores cheias de frutas gostosas. No quarto dia, veio o sol quentinho, a lua e as estrelinhas piscando à noite. No quinto dia, Deus encheu o mar de peixinhos e o céu de passarinhos cantando. No sexto dia, Ele fez os bichinhos e, com todo o amor, criou você e eu! E no sétimo dia, Deus descansou e olhou tudo com um sorriso, dizendo: \"Que bom, ficou lindo!\" Sabe, cada estrelinha e cada bichinho foi feito com carinho por Deus, do mesmo jeitinho que Ele fez você. Vamos orar? Querido Deus, obrigado por fazer o mundo tão bonito e por me criar com tanto amor. Eu te amo! Amém."
},
{
"id": "dr-19",
"title": "Jonas e o Grande Peixe",
"ref": "Jonas 1-3",
"verse": "Deus é bondoso e sempre nos dá uma nova chance para recomeçar.",
"script": "Oi, amiguinho! Chega mais pertinho, que o burrinho Davi quer te contar uma história cheia de água e de amor. Era uma vez um homem chamado Jonas. Deus pediu com muito carinho: \"Jonas, vá até a cidade grande e conte às pessoas que eu as amo.\" Mas Jonas ficou com medinho e correu para o outro lado! Entrou num barquinho e fugiu para bem longe. Aí veio um ventão forte no mar, e as ondas balançavam tudo! Jonas caiu na água... e sabe o que aconteceu? Deus mandou um peixe bem grandão, que abriu a boca e — gulp! — guardou Jonas lá dentro, sãozinho e protegido. No escurinho da barriga do peixe, Jonas fechou os olhos e conversou com Deus: \"Me desculpa, Deus. Agora eu vou.\" E Deus, que é tão bondoso, deu uma nova chance para ele! O peixe levou Jonas de volta pra praia, e dessa vez ele foi feliz contar do amor de Deus. Viu só? Quando a gente erra, Deus não fica bravo pra sempre. Ele abre os bracinhos e diz: \"Vamos tentar de novo, juntinhos.\" Vamos orar? Querido Deus, obrigado por me amar sempre e me dar uma nova chance. Me ajuda a te ouvir com o coração feliz. Amém."
},
{
"id": "dr-20",
"title": "Deus Abre o Caminho",
"ref": "Êxodo 14",
"verse": "Deus falou assim: \"Fiquem calminhos, que Eu vou abrir o caminho pra vocês!\"",
"script": "Oi, amiguinho! Chega mais pertinho do Davi, o burrinho. Hoje eu vou te contar uma história cheia de coragem e de Deus cuidando da gente.\n\nMoisés estava levando muita, muita gente pra bem longe, pra um lugar seguro. Mas de repente eles chegaram na beirinha de um mar enorme, cheio de água. E não dava pra passar! A água estava na frente, e não tinha ponte, nem barco, nem caminho. O coração deles ficou apertadinho de medo.\n\nAí Moisés falou baixinho: \"Não tenham medo. Deus vai cuidar de nós.\" E sabe o que aconteceu? Deus soprou um ventinho bem forte e abriu o mar bem no meio! A água ficou pra um lado e pro outro, igual a duas paredes grandes. E no meio apareceu um caminho sequinho pra todo mundo atravessar. Que coisa linda!\n\nVocê viu? Onde não tinha caminho nenhum, Deus fez um caminho. Quando a gente ficar com um probleminha grande e achar que não tem jeito, é só lembrar: Deus é bem forte e sabe abrir o caminho pra você também.\n\nVamos orar juntinhos? Papai do Céu, obrigado porque Você abre caminho onde a gente nem imagina. Cuida de mim com carinho. Amém."
},
{
"id": "dr-21",
"title": "José e o Abraço do Perdão",
"ref": "Gênesis 45",
"verse": "Deus me mandou na frente pra guardar vida e cuidar de vocês com muito amor.",
"script": "Oi, amiguinho! Chega mais pertinho do Davi, o burrinho, que hoje tem uma história linda de perdão. Quando José era mais novo, os irmãos dele fizeram uma coisa bem triste: mandaram José pra bem longe, pra uma terra muito distante. O coração de José ficou machucadinho. Mas Deus estava sempre com ele, cuidando de cada pedacinho do caminho. Passou o tempo, e José virou um homem importante no Egito, que guardava comida pra ninguém passar fome. Um dia, adivinha quem chegou com fome? Os irmãos dele! Eles ficaram com medo. Será que José ia brigar? Não! José chorou de alegria, abriu os braços e disse bem baixinho: \"Não fiquem tristes. Deus fez o bem nascer de tudo isso.\" E deu um abraço apertado, gostoso, cheio de amor. Sabe, meu amor? Perdoar é deixar Deus curar o nosso coração e trocar a mágoa por carinho. Quando alguém te machuca, você também pode escolher amar. Vamos orar juntinhos? Querido Deus, obrigado por perdoar a gente. Ajuda o meu coração a perdoar com carinho, do jeitinho que José perdoou. E obrigado porque o Senhor sabe fazer o bem nascer de tudo. Te amo, Jesus. Amém."
},
{
"id": "dr-22",
"title": "A Rainha Corajosa Ester",
"ref": "Ester 4",
"verse": "Quem sabe foi para um momento assim que Deus colocou você bem aqui?",
"script": "Oi, amiguinho! Chega mais pertinho do Davi, o burrinho, que hoje tem uma história de uma rainha muito, muito corajosa. O nome dela era Ester. Ela morava num palácio bem bonito, cheio de janelas brilhantes. Mas um dia Ester ficou sabendo de uma coisa triste: alguém queria machucar o povo dela, o povo de Deus. O coração da Ester bateu apertadinho. Ela pensou: \"E se eu falar com o rei e ele ficar bravo comigo?\" Dava um friozinho na barriga, sabia? Então o primo dela, o Mardoqueu, falou com muito carinho: \"Ester, quem sabe foi para uma hora como esta que você virou rainha.\" Aí Ester respirou fundo, fechou os olhinhos e pediu ajuda pra Deus. E deu certo! Com o coração cheinho de coragem, ela foi falar com o rei e ajudou o seu povo a ficar bem seguro. Que menina valente! Você também pode ser corajoso assim. Quando alguém precisa de ajuda, ou quando é hora de fazer o certo, Deus fica pertinho de você, dando força no seu coraçãozinho. Vamos orar? Querido Deus, obrigado por cuidar da gente. Me dá coragem pra fazer o certo e ajudar quem precisa, como a Ester fez. Eu sei que Você está sempre comigo. Amém."
},
{
"id": "dr-23",
"title": "Rute, a Amiga Fiel",
"ref": "Rute 1",
"verse": "\"Aonde você for, eu vou junto, e o seu Deus vai ser o meu Deus também.\"",
"script": "Oi, amiguinho querido! Chega mais pertinho do burrinho Davi, que hoje tem uma história muito bonita pra contar. Era uma vez uma moça chamada Rute. Ela morava junto com a Noemi, que era a mãe do marido dela, uma senhorinha com o coração muito triste e sozinho. Um dia, a Noemi precisou voltar pra sua terra, bem longe. E disse, com carinho: \"Rute, você pode ficar aqui, tá tudo bem.\" Mas sabe o que a Rute respondeu? Ela abraçou a Noemi bem forte e falou: \"Não! Aonde você for, eu vou junto. Eu nunca vou te deixar sozinha.\" Que amor bonito, não é? A Rute foi fiel. Ser fiel é amar de um jeito que não desiste, que fica do lado do amigo até nos dias difíceis. E o mesmo Deus que cuidou da Rute e da Noemi cuida de você também, sempre, sempre. Você pode ser um amiguinho fiel assim, dando a mãozinha pra quem está triste. Vamos orar? Querido Deus, obrigado pelo amor que não desiste. Me ajuda a ser fiel, carinhoso e a cuidar dos meus amigos, do jeitinho que a Rute cuidou. Eu te amo, Papai do Céu. Amém."
},
{
"id": "dr-24",
"title": "Elias e os Corvinhos",
"ref": "1 Reis 17",
"verse": "Deus falou com Elias: \"Vá para perto do riacho, que eu vou mandar os passarinhos levarem comida para você.\"",
"script": "Oi, amiguinho! Chega bem pertinho, que hoje o burrinho Davi tem uma historinha cheia de carinho para você. Era uma vez um homem de Deus chamado Elias. Naquele tempo, choveu pouquinho, muito pouquinho, e ficou difícil de achar comida. Mas Deus falou com Elias numa voz bem mansa: \"Vá morar perto daquele riacho de água fresquinha. Lá eu vou cuidar de você.\" E sabe como Deus cuidou? De um jeito surpreendente! Ele mandou uns passarinhos pretos, os corvos, voarem até Elias. De manhãzinha, eles chegavam batendo as asas e traziam pãozinho no biquinho. De tardinha, voltavam de novo com mais comida gostosa. Todo dia, sem faltar nenhum! Elias bebia a água limpinha do riacho e comia o que os corvinhos traziam. Que Deus cuidadoso, não é? Ele nunca esqueceu do seu amigo. E olha que coisa linda: Deus cuida de você também. Ele sabe de tudo que você precisa e prepara cada coisinha com muito amor, do jeitinho certo. Vamos orar? Querido Deus, obrigado por cuidar de mim todos os dias, assim como você cuidou do Elias. Obrigado pela minha comida, pela minha casa e pelo seu amor tão grande. Eu confio em você! Amém."
},
{
"id": "dr-25",
"title": "As Duas Moedinhas",
"ref": "Marcos 12",
"verse": "Deus não repara no tamanho do presente; Ele olha o tamanho do amor que mora no seu coração.",
"script": "Oi, amiguinho! Chega mais pertinho, que o burrinho Davi tem uma historinha bem bonita pra você. Um dia, Jesus estava sentado no Templo, olhando as pessoas colocarem moedinhas numa caixinha de ofertas. Tlim, tlim! Gente muito rica passava e colocava um montão de moedas grandes e douradas. Que barulhão! Aí chegou, bem devagarzinho, uma senhorinha. Ela era pobrezinha e só tinha duas moedinhas pequeninas, do tamanho de um botãozinho. A senhorinha olhou pras suas moedinhas, sorriu e colocou as duas na caixinha. Plim, plim! Um barulho bem baixinho. Sabe o que Jesus fez? Ele sorriu e disse: \"Olhem! Essa senhorinha deu mais que todo mundo!\" Como assim, se ela deu tão pouquinho? É que ela deu com todo o coração, com todo o amor que cabia dentro dela. Deus não fica contando as moedas, meu bem. Deus olha o carinho. E você também pode dar coisas assim: um abraço apertado, uma ajudinha pra mamãe, dividir seu brinquedo, dizer \"eu te amo\". Tudo o que fazemos com amor deixa o coração de Deus bem feliz! Vamos orar? Querido Jesus, obrigado por me amar tanto. Me ajuda a dar sempre com o coração cheio de amor, como a senhorinha das moedinhas. Amém!"
},
{
"id": "dr-26",
"title": "O Semeador e as Sementinhas",
"ref": "Mateus 13",
"verse": "A sementinha que cai no coração bom cresce e dá muitos frutos!",
"script": "Oi, meu amiguinho! Chega mais pertinho do Davi, o burrinho, que hoje tem uma história linda que Jesus contou. Era uma vez um lavrador que saiu para plantar. Ele pegou um punhado de sementinhas e foi jogando pelo caminho. Algumas caíram na beira da estrada, bem dura, e os passarinhos vieram e comeram. Outras caíram nas pedras: brotaram rapidinho, mas, sem terra fofa, logo murcharam no calor do sol. Outras caíram no meio dos espinhos, que apertaram e não deixaram elas crescerem. Mas, olha só, algumas caíram na terra boa e macia! Ali elas cresceram bem fortes e deram muitos frutos, cheios de alegria. Sabe o que Jesus quis dizer? A sementinha é a Palavra de Deus, e o seu coração é a terra. Quando você escuta as coisas de Deus com atenção e carinho, o seu coraçãozinho vira terra boa, e coisas lindas crescem dentro de você: amor, bondade e paz. Que gostoso, não é? Agora vamos orar juntinhos. Querido Jesus, faz do meu coração uma terra boa, macia e cheia de amor. Ajuda a Tua Palavra a crescer bem forte dentro de mim. Eu Te amo muito. Amém."
},
{
"id": "dr-27",
"title": "O Rei no Burrinho",
"ref": "Mateus 21",
"verse": "Que alegria! O nosso Rei chegou cheio de amor: Hosana ao Rei Jesus!",
"script": "Oi, meu amiguinho querido! Vem cá pertinho, que hoje eu tenho uma alegria enorme pra contar. Sabe o que aconteceu num dia bem lindo? Jesus, o Rei do céu, foi entrar na cidade de Jerusalém. E adivinha em quem Ele montou? Não foi num cavalo grandão e brilhante. Foi num burrinho pequenininho e mansinho! Que Rei diferente, né? Um Rei tão gentil, que não precisa se mostrar pra ser o maior de todos. Quando o povo viu Jesus chegando, o coração de todo mundo ficou quentinho de felicidade. As crianças pularam, as mãozinhas bateram palmas, e todos colocaram capinhas e folhas verdes no chão, como um tapete pra Ele passar. E cantavam bem alto: \"Hosana! Hosana!\" Isso quer dizer: \"Viva o nosso Rei que veio nos salvar!\" Você percebeu uma coisa linda? Jesus é grande, mas é humilde e cheio de carinho. E Ele gosta de você exatamente do jeitinho que você é. Então vamos cantar juntos pra Ele também! Vamos orar? Querido Jesus, obrigado por ser um Rei tão gentil e cheio de amor. Hoje eu também canto pra Você: Hosana! Você mora no meu coraçãozinho, e eu Te amo muito. Amém!"
},
{
"id": "dr-28",
"title": "O Maná do Céu",
"ref": "Êxodo 16",
"verse": "Deus disse: \"Vou fazer chover pãozinho lá do céu pra vocês, um pouquinho todo dia.\"",
"script": "Oi, amiguinho! Chega mais pertinho, que o burrinho Davi tem uma história bem gostosa pra contar. Faz muito tempo, o povo de Deus caminhava pelo deserto. O deserto é um lugar quentinho, cheio de areia, e lá quase não tinha comida. As barriguinhas começaram a roncar: \"rooonc, rooonc!\" As pessoas ficaram tristes, com medo de passar fome. Mas sabe de uma coisa? Deus estava cuidando de todos eles! De manhãzinha, quando o sol nascia, aconteceu uma surpresa linda. O chão ficou coberto de umas florzinhas branquinhas, docinhas como pãozinho fresco. Era o maná, um presente que vinha lá do céu! Todo mundo comeu e ficou bem cheinho e feliz. E o mais bonito: cada dia, quando o sol voltava, o maná aparecia de novo. Deus alimentava o Seu povo todo santo dia, sem esquecer ninguém. Sabe, amiguinho? Deus cuida de você do mesmo jeitinho. Todo dia Ele te dá o que você precisa, com muito carinho. Vamos orar juntinhos? Querido Deus, obrigado por cuidar de mim todo dia, igual o maná do céu. Eu confio no Teu amor, hoje e sempre. Amém."
},
{
"id": "dr-29",
"title": "Pertinho de Jesus",
"ref": "Lucas 10",
"verse": "Maria escolheu a coisa mais linda de todas: ficar bem pertinho de Jesus, ouvindo cada palavrinha dele.",
"script": "Oi, meu amiguinho! O burrinho Davi chegou com uma história bem gostosa pra você. Jesus foi visitar duas irmãs muito queridas: a Marta e a Maria. A Marta ficou toda animada e correu pra cozinha. Ela queria deixar tudo bonito: arrumar a mesa, preparar a comidinha e deixar a casa cheirosa. Trabalhou, trabalhou, trabalhou! Já a Maria fez uma coisa diferente. Ela sentou no chãozinho, bem pertinho de Jesus, e ficou ouvindo tudo o que ele falava, com o coração cheio de alegria. Aí a Marta ficou cansada e disse: \"Jesus, pede pra Maria me ajudar!\" E Jesus, com muito carinho, respondeu: \"Marta, Marta, você se preocupa com tantas coisinhas. Mas a Maria escolheu o melhor: ficar bem juntinho de mim.\" Sabe, ajudar é lindo, e a Marta era tão boa! Mas Jesus ensinou uma coisa importante: nada é mais especial do que parar um pouquinho e ficar pertinho dele. E você também pode! É só fechar os olhinhos e conversar com Jesus. Vamos orar? Querido Jesus, obrigado por gostar de ficar pertinho de mim. Me ajuda a parar, escutar você e sentir o seu amor todo dia. Eu te amo muito! Amém."
},
{
"id": "dr-30",
"title": "Os Amigos que Ajudaram",
"ref": "Marcos 2",
"verse": "Que bom levar o amiguinho até Jesus, porque juntos a gente chega bem pertinho do amor de Deus!",
"script": "Oi, meu amiguinho querido! Chega mais pertinho, que o burrinho Davi tem uma história cheia de carinho pra você. Numa cidade bem cheia de gente, Jesus estava dentro de uma casinha ensinando com muito amor. Do lado de fora, quatro amigos queriam levar um coleguinha que estava doentinho, deitado no colchão. Ele não conseguia andar sozinho. Mas os amigos não desistiram! Eles pegaram o colchão pelas quatro pontinhas e carregaram juntos, com muito cuidado. A casa estava tão cheia que não dava pra entrar pela porta. Sabe o que eles fizeram? Subiram lá no teto e desceram o amigo bem devagarzinho, pertinho de Jesus. Que amigos corajosos e amorosos! Jesus olhou pra eles e sorriu. Ele viu o amor no coração daqueles amigos e curou o coleguinha, que se levantou feliz da vida! Você viu, meu bem? Quando a gente ajuda um amiguinho, a gente leva ele mais pertinho de Jesus. Ajudar é amar de pertinho. Agora vamos orar juntinhos? Querido Jesus, obrigado pelos meus amiguinhos. Me ajuda a cuidar deles com carinho e a ajudar sempre que alguém precisar. Eu te amo muito. Amém!"
},
{
"id": "dr-31",
"title": "A Luz Linda de Jesus",
"ref": "Mateus 17",
"verse": "Jesus brilhou como o sol, e uma voz do céu falou: \"Este é o meu Filho amado. Escutem o que ele diz!\"",
"script": "Oi, amiguinho! Chega bem pertinho, que o burrinho Davi vai te contar uma história cheia de luz. Um dia, Jesus subiu num monte bem alto com três amigos: Pedro, Tiago e João. As perninhas ficaram cansadas de tanto subir! Mas lá em cima aconteceu uma coisa tão linda que dava até para prender a respiração. De repente, o rostinho de Jesus começou a brilhar como o sol! E as roupinhas dele ficaram branquinhas, branquinhas, brilhando como a luz mais bonita que você já viu. Nossa, que maravilha! Os amigos ficaram de olhos bem abertos, cheios de alegria. Aí uma nuvem macia apareceu, e uma voz muito carinhosa falou do céu: \"Este é o meu Filho amado. Escutem ele com o coração!\" Sabe por que Jesus brilhou assim? Para mostrar que ele é muito, muito especial. Ele é o Filho amado de Deus, e ama você desse jeitinho também! Quando a gente escuta Jesus, uma luzinha de alegria acende dentro do coração. Vamos orar juntinhos? Querido Jesus, obrigado pela sua luz tão linda. Ajuda a gente a te escutar todos os dias e a brilhar de amor com os amiguinhos. Te amamos muito! Amém."
},
{
"id": "dr-32",
"title": "Lázaro, o Amigo de Jesus",
"ref": "João 11",
"verse": "Jesus falou com carinho: \"Eu sou quem dá vida nova, e quem confia em mim nunca fica sozinho.\"",
"script": "Oi, meu amiguinho! Chega bem pertinho, que hoje o burrinho Davi tem uma história cheia de amor pra te contar. Jesus tinha um amigo muito querido chamado Lázaro. Eles gostavam de conversar, rir e ficar juntinhos. Lázaro também tinha duas irmãs, a Marta e a Maria, que amavam Jesus de coração. Um dia, Lázaro ficou muito doentinho e depois adormeceu num sono bem profundo. As irmãs ficaram tristes e sentiram muita saudade. Sabe o que Jesus fez quando chegou? Ele olhou para elas com muito carinho e chorou também. É isso mesmo: Jesus chorou! Quando você está triste, Jesus fica pertinho de você e sente junto com você. Depois, Jesus conversou com Deus e chamou bem alto: \"Lázaro, venha!\" E aconteceu uma coisa maravilhosa: Lázaro acordou e saiu andando, cheinho de vida! Todo mundo ficou feliz e deu um monte de abraço. Jesus mostra pra gente que Ele tem um poder muito grande, cuida de nós e sempre traz uma esperança nova. Vamos orar? Querido Jesus, obrigado porque você me ama e chora comigo quando eu fico triste. Obrigado por nunca me deixar sozinho e por encher meu coração de esperança. Cuida de mim e de quem eu amo. Amém."
},
{
"id": "dr-33",
"title": "A Água Viva",
"ref": "João 4",
"verse": "Jesus disse: quem beber da água que eu dou nunca mais vai ter sede de amor no coração.",
"script": "Oi, amiguinho! Vem cá, chega pertinho do Davi, o burrinho. Hoje o sol estava bem quentinho, e Jesus sentou pra descansar do lado de um poço. Sabe o que é um poço? É um buraco bem fundo na terra, com água lá embaixo, de onde a gente tira água com um baldinho. Aí chegou uma moça pra pegar água. Ela estava sozinha e meio tristinha, achando que ninguém gostava dela. Mas Jesus olhou pra ela com muito carinho e disse: \"Você me dá um pouquinho de água?\" A moça ficou surpresa! Ninguém falava com ela de um jeito tão gentil. Então Jesus contou um segredo lindo: \"Eu tenho uma água bem especial, a Água Viva. Quem bebe dela sente o coração cheiinho de alegria e nunca mais fica com sede de amor.\" A moça ficou tão feliz que saiu correndo pra contar pra todo mundo! Sabe por quê, meu amor? Porque Jesus gosta de todos, todinhos. Ninguém é esquecido por Ele. E você também é muito, muito amado! Vamos orar? Querido Jesus, obrigado por gostar de mim assim, do jeitinho que eu sou. Enche o meu coração com a sua Água Viva de amor. Amém."
},
{
"id": "dr-34",
"title": "O Tesouro Escondido",
"ref": "Mateus 13",
"verse": "O Reino de Deus é como um tesouro tão lindo que a gente guarda no coração para sempre.",
"script": "Oi, meu amiguinho querido! Aqui é o burrinho Davi, e hoje eu tenho uma aventura brilhante pra você. Vem chegando pertinho!\n\nJesus contou uma historinha sobre um homem que estava andando por um campo. De repente, ele achou um tesouro escondido na terra! Sabe o que era? Um bauzinho cheio de coisas preciosas, brilhando como estrelinhas. O coração dele ficou tão feliz, tão feliz, que ele guardou o tesouro com muito carinho. Ele pensou assim: \"Isso é a coisa mais valiosa de todas!\"\n\nJesus disse que esse tesouro é como o Reino de Deus. E o que é o Reino de Deus? É estar pertinho de Jesus, com o coração cheio de amor, de paz e de alegria. Não dá pra comprar em nenhuma loja. É o presente mais lindo do mundo inteiro!\n\nE sabia de uma coisa? Você também é um tesouro pra Deus! Ele te ama tanto, tanto, que guardou você bem no coraçãozinho dele. E o maior tesouro que você pode ter é a amizade com Jesus, que nunca, nunquinha acaba.\n\nVamos orar juntinhos? Querido Jesus, obrigado porque você é o meu maior tesouro. Ajuda o meu coração a te amar mais a cada dia. Eu te amo, Jesus! Amém."
},
{
"id": "dr-35",
"title": "Sansão, o Forte",
"ref": "Juízes 16",
"verse": "É Deus quem me deixa forte e cuida de mim todos os dias.",
"script": "Oi, amiguinho! Vem cá pertinho do Davi, o burrinho, que hoje a gente vai conhecer um homem muito, muito forte. O nome dele era Sansão. Sabe uma coisa? Sansão conseguia carregar coisas bem pesadas e até enfrentar um leão! As pessoas ficavam de olho arregalado e diziam: \"Nossa, como ele é forte!\". Mas você sabe de onde vinha toda aquela força? Não era só dos bracinhos dele, não. A força de Sansão vinha de Deus! Deus deu esse presente especial pra ele ajudar e cuidar do povo. Uma vez, Sansão esqueceu disso e achou que a força era só dele. Aí ficou fraquinho, coitado. Mas quando ele voltou a lembrar de Deus e pediu ajuda de coraçãozinho, Deus foi muito bom e o deixou forte de novo. Que legal! Sabe, amiguinho, você também fica forte quando anda pertinho de Deus. Quando você é gentil, quando ajuda a mamãe, quando abraça um amigo triste, é Deus que dá essa forcinha bonita no seu coração. Vamos orar juntinhos? Querido Deus, obrigado por me deixar forte e por cuidar de mim todos os dias. Me ajuda a lembrar sempre de Você. Amém."
},
{
"id": "dr-36",
"title": "As Muralhas de Jericó",
"ref": "Josué 6",
"verse": "Deus disse: \"Confie em mim e obedeça, e até as muralhas mais altas vão cair!\"",
"script": "Oi, meu amiguinho! Chega mais pertinho que hoje eu vou te contar uma aventura cheia de coragem! Havia uma cidade chamada Jericó, com muralhas enormes, altas, altas, feitas de pedra bem dura. Ninguém conseguia entrar. Mas Deus tinha um plano bem diferente. Ele falou com Josué e pediu uma coisa curiosa: \"Marche em volta da cidade, uma voltinha por dia, durante seis dias.\" E no sétimo dia, sete voltas! Depois, era só gritar bem forte e tocar as trombetas. Que plano engraçado, né? Josué até podia achar estranho, mas ele confiou em Deus de coração e obedeceu. O povo marchou, marchou, e ficou bem quietinho, esperando com fé. No sétimo dia, todos gritaram juntos, e as muralhas gigantes desabaram no chão! Bum! Deus fez tudo o que tinha prometido. Sabe, meu amorzinho, às vezes Deus pede coisas que a gente não entende. Mas quando a gente confia e obedece, coisas lindas acontecem. As suas muralhas de medo também podem cair! Vamos orar juntinhos? Querido Deus, obrigado por cuidar de mim. Me ajuda a confiar em Ti e a obedecer com alegria, sabendo que Tu sempre cumpres o que promete. Eu Te amo! Amém."
},
{
"id": "dr-37",
"title": "Os Três Amigos no Fogo",
"ref": "Daniel 3",
"verse": "Não precisa ter medo, porque Deus fica pertinho de você o tempo todo.",
"script": "Oi, amiguinho! Vem cá, senta pertinho do burrinho Davi. Hoje eu vou te contar a história de três amigos muito, muito corajosos: Sadraque, Mesaque e Abede-Nego. Que nomes engraçados, né? Um dia, um rei mandou que todo mundo se ajoelhasse diante de uma estátua bem grandona de ouro. Mas os três amigos disseram baixinho no coração: \"Nós só adoramos a Deus.\" O rei não gostou e mandou colocar os três dentro de um forno bem quentinho. Mas sabe de uma coisa? Deus não deixou os amigos sozinhos, nem um pouquinho. Quando o rei olhou lá dentro, ele viu não três, mas QUATRO pessoas caminhando no meio do fogo, sem nenhum machucadinho! Deus estava ali, bem juntinho, cuidando deles com muito carinho. Os três amigos saíram inteirinhos, sem nem cheirinho de fumaça no cabelo! Sabe, meu amor, às vezes a gente também fica com medo do escuro, de barulhos ou de coisas difíceis. Mas Deus faz assim com a gente: Ele fica pertinho, pertinho, e nunca solta a nossa mãozinha. Vamos orar juntinhos? Querido Deus, obrigado porque Você fica comigo quando eu tenho medo. Me dá coragem igual aos três amigos. Eu te amo muito. Amém."
},
{
"id": "dr-38",
"title": "O Recado do Anjo para Maria",
"ref": "Lucas 1",
"verse": "O anjo disse: \"Não tenha medo, Maria! Deus está muito feliz com você.\"",
"script": "Oi, amiguinho! Chega mais pertinho, que o burrinho Davi quer te contar uma história cheia de surpresa. Era um dia comum na cidadezinha de Nazaré. Uma moça chamada Maria estava em casa quando, de repente, uma luz linda encheu o quarto. Era um anjo de Deus! Maria ficou surpresa, com o coraçãozinho batendo forte. Mas o anjo falou com muito carinho: \"Não tenha medo, Maria. Deus te ama e escolheu você para uma coisa muito especial.\" Sabe qual era a novidade? O anjo contou que Maria ia ser mãe de um bebê muito, muito importante: Jesus, o Filho de Deus! Maria não entendeu tudo, mas confiou. Ela abriu o coração e disse baixinho: \"Sim, eu quero fazer o que Deus pedir.\" Que resposta linda, não é? Assim como Maria, a gente também pode confiar em Deus, mesmo quando não entende tudo. Ele sempre cuida de nós com muito amor. Vamos orar juntinhos? Querido Deus, obrigado por amar cada um de nós. Ajuda a gente a confiar em Ti como a Maria confiou, com o coração cheio de paz e alegria. Obrigado por mandar Jesus para pertinho de nós. Amém."
},
{
"id": "dr-39",
"title": "A Noite Mais Linda de Belém",
"ref": "Lucas 2",
"verse": "Hoje nasceu para você um Salvador cheiinho de amor: é Jesus, o presente de Deus!",
"script": "Oi, meu amiguinho! Vem cá pertinho do burrinho Davi que eu vou te contar uma história muito especial. Numa noite bem quietinha, na cidadezinha de Belém, aconteceu a coisa mais linda do mundo inteiro. A Maria e o José procuravam um lugar para descansar, mas todas as portas estavam cheias. Então acharam um estábulo aconchegante, com cheirinho de feno e bichinhos dormindo. E foi ali, numa manjedoura fofinha, que nasceu o bebê Jesus! Lá no alto, uma estrela grandona começou a brilhar, brilhar, como se o céu estivesse sorrindo. Nos campos, uns pastores cuidavam das ovelhinhas quando um anjo chegou e disse baixinho: \"Não tenham medo! Nasceu um bebê muito especial, o presente de Deus para vocês!\" Os pastores correram felizes para ver Jesus e ficaram com o coração quentinho de alegria. Sabe, meu amor? Deus mandou Jesus porque te ama muito, muito mesmo. E você também é um presente para Ele! Vamos orar juntinhos? Querido Jesus, obrigado por ter vindo para o mundo numa noite tão linda. Obrigado por me amar do jeitinho que eu sou. Eu também te amo. Boa noite, com muita paz no meu coração. Amém."
},
{
"id": "dr-40",
"title": "O Amiguinho que Voltou pra Agradecer",
"ref": "Lucas 17",
"verse": "Um dos dez voltou correndo e disse bem alto: \"Muito obrigado, Jesus, você me deixou curado!\"",
"script": "Oi, meu amiguinho querido! Chega mais pertinho que o burrinho Davi tem uma história linda pra você. Um dia, dez pessoinhas estavam muito, muito doentes. A pele delas estava machucada, e elas moravam longe de casa, tristes e sozinhas. Aí passou uma pessoa muito especial: Jesus! Elas chamaram bem alto: \"Jesus, tem pena da gente!\" E sabe o que Jesus fez? Com muito carinho, Ele disse: \"Podem ir andando.\" E, no caminho, uma coisa maravilhosa aconteceu: a pele de cada um ficou sarada, novinha, sem nenhum machucado! Que alegria! Todos os dez saíram correndo felizes. Mas só um deles parou, olhou pra trás e pensou: \"Eu preciso dizer obrigado!\" Então voltou pulando de tanta gratidão e agradeceu a Jesus de coração. E Jesus ficou tão contente com aquele coraçãozinho grato! Sabe, meu amiguinho, Deus faz tantas coisas boas por nós: a comidinha gostosa, o abraço da mamãe, o sol lá fora. Que tal, como aquele amiguinho que voltou, a gente lembrar de dizer \"obrigado\"? Vamos orar juntinhos? Querido Jesus, obrigado por cuidar de mim com tanto amor. Me ajuda a ter um coração grato todo dia. Eu te amo muito! Amém."
},
{
"id": "dr-41",
"title": "Deus Cuida de Você",
"ref": "Mateus 6",
"verse": "Olhe os passarinhos e as florzinhas: Deus cuida deles com carinho, e cuida ainda mais de você!",
"script": "Oi, amiguinho! Chega mais pertinho com o burrinho Davi. Hoje eu quero te contar uma coisa que enche o coração de paz. Um dia, Jesus estava sentadinho numa colina, com o vento gostoso batendo no rosto. Ele apontou para os passarinhos que voavam no céu e disse: \"Olhem só! Eles não plantam nem guardam comida em casa, mas o Papai do Céu dá comidinha para cada um.\" Depois, Jesus mostrou as florzinhas do campo, os lírios coloridos que balançavam felizes com a brisa. \"Vejam como elas são lindas! Nem os reis têm roupas tão bonitas assim.\" E sabe o que Jesus falou por último? Que, se Deus cuida com tanto carinho dos passarinhos e das florzinhas, Ele cuida muito, muito mais de você, que é filhinho amado d'Ele. Então, quando aquele friozinho de preocupação apertar a sua barriga, respira fundo e lembra: Deus está sempre pertinho, cuidando de tudo. Você é precioso para Ele! Vamos orar juntinhos? Querido Deus, obrigado por cuidar dos passarinhos, das florzinhas e de mim também. Quando eu ficar preocupado, me ajuda a lembrar que Você me ama e nunca me deixa sozinho. Eu confio em Você! Amém."
},
{
"id": "dr-42",
"title": "Um Coração Cheio de Obrigado",
"ref": "Salmo 100",
"verse": "Vamos cantar de alegria para Deus, porque Ele é bom e cuida da gente com muito amor!",
"script": "Oi, amiguinho! O burrinho Davi acordou hoje com o coraçãozinho pulando de alegria. Sabe por quê? Porque ele parou para olhar tudo de bom que Deus deu para ele! Davi olhou para o céu azul e falou baixinho: \"Obrigado, Deus!\" Olhou para a grama fresquinha embaixo dos cascos e falou de novo: \"Obrigado, Deus!\" Sentiu o solzinho quentinho nas orelhas e sorriu: \"Ai, que gostoso! Obrigado, Deus!\" O Salmo 100 conta um segredinho lindo para a gente: quando a gente agradece a Deus, o coração fica leve e feliz, feito um balãozinho colorido subindo no céu. Deus é tão bom com você! Ele te deu a sua mamãe para te abraçar, a sua caminha quentinha, a comidinha gostosa e amiguinhos para brincar. Que tal fazer igual o Davi? Feche os olhinhos e pense numa coisa boa que aconteceu hoje. Achou? Agora é só falar para Deus: \"Obrigado!\" Vamos orar juntinhos? Querido Deus, obrigado por tudo de bom que Você me dá. Obrigado pela minha família, pela comidinha e por cuidar de mim com tanto amor. O meu coraçãozinho está cheio de alegria por Você. Eu te amo muito! Amém."
},
{
"id": "dr-43",
"title": "Seja Forte e Corajoso",
"ref": "Josué 1",
"verse": "Seja corajoso e não tenha medo, porque Deus vai com você para todo lugar que você for!",
"script": "Oi, meu amiguinho! Vem cá, senta pertinho do burrinho Davi. Hoje eu quero te contar sobre um homem muito especial chamado Josué. Ele ia levar todo o povo de Deus para uma terra novinha, cheia de coisas boas. Mas Josué estava com o coração um pouquinho apertado, sabe? Era um caminho bem grande, e ele pensava assim: \"Será que eu vou conseguir?\" Aí Deus falou com muito carinho no ouvido dele: \"Josué, seja forte e corajoso! Não fique com medo, porque Eu vou com você para todo lugar que você for.\" Que abraço gostoso, não é? Josué ficou tão feliz que caminhou de cabeça erguida, sabendo que nunca, nunquinha estava sozinho. E olha só: essa mesma promessa é para você também! Quando você vai para a escolinha, quando dorme com a luz apagada, quando conhece gente nova, Deus está bem do seu ladinho, segurando a sua mãozinha. Você pode ser corajoso porque o maior Amigo do mundo vai junto com você. Vamos orar? Querido Deus, obrigado porque Você está comigo em todo lugar. Me ajuda a ser forte e corajoso, sabendo que nunca fico sozinho. Eu te amo muito. Amém!"
},
{
"id": "dr-44",
"title": "Um Coração Bondoso",
"ref": "Efésios 4",
"verse": "Seja bondoso e carinhoso com todo mundo, do mesmo jeitinho que Deus é bondoso e carinhoso com você.",
"script": "Oi, amiguinho! Chega mais pertinho, que hoje tem uma história cheia de carinho pra você. Você sabe onde mora a bondade? Lá dentro do seu peito tem uma casinha, e Deus quer enchê-la de uma coisa muito linda: o amor pelos outros. Um coração bondoso é aquele que trata todo mundo com carinho. É dividir o brinquedo com o amiguinho. É abraçar a mamãe bem apertado. É falar palavras gostosas, como \"obrigado\" e \"eu te amo\". Quando alguém está tristinho, o coração bondoso chega bem pertinho e dá um sorriso, um carinho, um colinho. A Bíblia conta que Deus é muito, muito bondoso com a gente. Ele cuida, Ele perdoa, Ele abraça. E depois Ele sussurra baixinho no nosso ouvidinho: \"Faça o mesmo, meu pequenino.\" Que tal hoje espalhar bondade por onde você passar? Um sorriso aqui, um abracinho ali. Assim o seu coração vai ficando quentinho e feliz! Vamos orar? Querido Jesus, obrigado por ser tão bondoso comigo. Coloca no meu coraçãozinho muito amor pra dividir com todo mundo. Me ajuda a ser gentil, a abraçar e a deixar os outros felizes. Eu te amo, Jesus. Amém."
},
{
"id": "dr-45",
"title": "Soltar a Mágoa e Perdoar",
"ref": "Mateus 18",
"verse": "Deus nos perdoa com todo o carinho, e Ele quer que a gente perdoe também, bem do fundo do coração.",
"script": "Oi, meu amiguinho querido! O burrinho Davi chegou pertinho de você com uma pergunta bem gostosa: você sabe o que é perdoar? Um dia, Jesus contou uma historinha sobre um moço que devia muitas, muitas moedas a um rei. Era tanta coisa que ele nunca conseguiria pagar! Mas o rei olhou pra ele com todo o carinho e disse: \"Pode ficar tranquilo. Eu perdoo você.\" Que alívio gostoso, não é? O coração do moço ficou levinho como uma pluminha. Só que, na saída, esse mesmo moço encontrou um amigo que lhe devia só um pouquinho e ficou bravo, sem querer perdoar. Ai, ai... Jesus ensinou que não é assim que a gente faz. Deus nos perdoa com um amor enorme, então nós também podemos perdoar quem nos deixou tristinhos. Sabe quando alguém pega o seu brinquedo ou fala uma coisa feia? Dói no coração, né? Mas guardar aquela mágoa deixa a gente pesado. Perdoar é soltar, é deixar a tristeza ir embora, como um balãozinho voando lá no céu. E o coração fica leve outra vez! Vamos orar? Querido Deus, obrigado por me perdoar sempre. Me ajuda a soltar a mágoa e perdoar meus amiguinhos, com o coração bem leve e feliz. Te amo, Jesus. Amém."
},
{
"id": "dr-46",
"title": "A Paz de Jesus",
"ref": "João 14",
"verse": "Jesus disse: \"Eu deixo a minha paz com você. Não deixe o seu coração ficar assustado.\"",
"script": "Oi, meu amiguinho! O burrinho Davi está aqui pertinho de você, com as orelhinhas quentinhas e macias. Você sabia que, às vezes, o coração fica batendo forte, tum-tum-tum, quando a gente sente medo? Medo do escuro, medo de dormir sozinho, medo do barulhão do trovão. Isso acontece com todo mundo, viu? Até o Davi sente!\n\nMas Jesus contou uma coisa muito, muito especial para os amiguinhos dele. Ele falou baixinho, com todo o carinho: \"Eu deixo para você a minha paz. Não deixe o seu coração ficar assustado.\" A paz de Jesus é como um cobertorzinho macio que abraça o coração por dentro. Ela acalma tudinho e faz a gente ficar tranquilo, respirando bem devagarinho.\n\nQuando o medo chegar, você pode fechar os olhinhos e lembrar: Jesus está aqui, do meu ladinho, sempre. Ele nunca vai embora! E aí o coração vai ficando calminho, calminho, como um lago paradinho.\n\nVamos orar juntos? Feche os olhinhos com o Davi. Querido Jesus, obrigado pela sua paz tão gostosa. Quando eu tiver medo, me abrace bem forte e acalme o meu coraçãozinho. Eu sei que você está sempre comigo. Amém."
},
{
"id": "dr-47",
"title": "Dividir é Bom",
"ref": "Atos 2",
"verse": "Quando a gente reparte com amor, o coração de todo mundo fica cheinho de alegria!",
"script": "Oi, amiguinho! Sou eu, o burrinho Davi, e hoje eu tenho uma historinha bem gostosa pra te contar. Cochicha comigo? Faz muito tempo, os amigos de Jesus moravam bem juntinhos e adoravam ficar pertinho um do outro. Um dia, eles descobriram uma coisa linda: quando alguém tinha muito pãozinho e o vizinho tinha pouco, era só repartir! Aí todo mundo comia, todo mundo ria, e ninguém ficava com fome. Que legal, né? Eles dividiam o pão, dividiam a mesa, dividiam o carinho. E sabe o que acontecia? O coração deles ficava tão cheinho de alegria que dava vontade de cantar! Porque dividir é bom demais. Quando você dá um pedacinho do seu lanche pra um amiguinho, ou empresta o seu brinquedo, você está fazendo igualzinho aos amigos de Jesus. E olha o segredo: a gente não fica com menos, não. A gente fica com mais amor no peito! Vamos tentar hoje? Agora vem orar comigo, bem baixinho. Querido Jesus, obrigado por tudo que Você me dá. Me ajuda a repartir com carinho, a dar do meu lanchinho e do meu abraço. Quero deixar os outros felizes e sentir a alegria de dividir. Eu Te amo muito. Amém!"
},
{
"id": "dr-48",
"title": "A Verdade que Constrói Pontes",
"ref": "Provérbios 12",
"verse": "Palavras verdadeiras e cheias de carinho são como uma ponte forte que liga o seu coração ao coração de quem você ama.",
"script": "Oi, amiguinho! O burrinho Davi chegou dando um pulinho de alegria pra ficar pertinho de você hoje. Sabe uma coisa muito bonita? Quando a gente fala a verdade com o coração cheio de amor, é como se estivesse construindo uma ponte bem forte entre você e as pessoas que você ama. Davi conta que um dia ele derrubou sem querer o potinho de mel da mamãe. Ai, ai! O coração dele ficou apertadinho. Ele pensou em ficar quietinho, mas respirou fundo e falou baixinho: \"Mãe, fui eu que derrubei.\" E sabe o que aconteceu? A mamãe deu um abraço bem gostoso nele! A verdade não estragou nada, não. Ela deixou a confiança ainda mais fortinha, como um tijolinho em cima do outro. Quando falamos a verdade com jeitinho carinhoso, as pessoas descobrem que podem confiar em nós. E confiança é uma das coisas mais lindas do mundo! Então, meu amor, seja sempre verdadeiro e gentil, tá bom? Agora vamos orar juntinhos: Querido Jesus, obrigado por me ensinar a falar a verdade com amor. Me ajuda a ser um amiguinho em quem todos podem confiar. Eu te amo muito. Amém."
},
{
"id": "dr-49",
"title": "Esperar com o Coração Calminho",
"ref": "Salmo 27",
"verse": "Vou esperar em Deus com coragem, porque Ele cuida de mim na hora certinha.",
"script": "Oi, amiguinho! Chega mais pertinho, que o burrinho Teo quer te contar uma coisa gostosa. Você já plantou uma sementinha? A gente coloca ela na terra, joga um pouquinho de água e depois... espera. No começo não aparece nada. Mas Deus está lá dentro, cuidando bem devagarzinho, até que um dia surge uma folhinha verde. Que alegria!\n\nEsperar é assim. Às vezes a gente quer tudo agorinha: o lanche, o brinquedo, o abraço da mamãe. Mas nem tudo vem na hora que a gente pede. E sabe de uma coisa? Está tudo bem. Deus conhece a horinha certa de cada coisa, e a horinha Dele é sempre boa.\n\nO rei Davi, lá na Bíblia, aprendeu esse segredinho. Ele disse assim para Deus: \"Vou esperar em Ti com o coração corajoso.\" Quando a gente confia em Deus, o coraçãozinho fica calminho, sem medo, como quem sabe que o Papai do Céu está bem pertinho.\n\nEntão, se hoje você precisar esperar, respira fundo e sorri. Deus nunca, nunca se esquece de você!\n\nVamos orar? Querido Deus, obrigado por cuidar de mim. Me ajuda a esperar com o coração calminho e confiante, sabendo que a Tua hora é sempre a melhor. Amém!"
},
{
"id": "dr-50",
"title": "Todo Mundo Canta pra Deus",
"ref": "Salmo 150",
"verse": "Tudo o que respira pode cantar pra Deus com muita alegria!",
"script": "Oi, meu amiguinho querido! Você já reparou que o mundo inteiro é cheio de música? Hoje o burrinho Davi acordou bem cedinho, ficou bem quietinho escutando... e adivinha o que ele ouviu? Os passarinhos cantando \"piu-piu\" no galho, o ventinho fazendo \"shhh\" nas folhas e a chuvinha caindo \"plic, ploc\" no telhado. Sabe o que é tudo isso? É a natureza inteira louvando a Deus! No Salmo 150, a Bíblia conta uma coisa linda: tudo o que respira pode louvar a Deus. E isso quer dizer você também! Você pode bater palminha, pular, tocar tambor, chacoalhar, dançar rodopiando e cantar bem alto: \"Eu te amo, Deus!\" Deus fica tão feliz quando a gente canta pra Ele! Não precisa ter a voz mais bonita do mundo, não. Ele só quer ouvir o seu coraçãozinho cheio de alegria. Então amanhã, quando você acordar, que tal soltar a voz e cantar pra Ele? Vamos orar juntinhos? Querido Deus, obrigado por me dar uma voz pra cantar! Eu quero te louvar batendo palminha e pulando de alegria. Você é muito bom comigo, e eu te amo com todo o meu coração! Amém."
}
];

/* itens com narração gerada (voz clonada) -> liga o campo audio */
const NARRATED = ["afirm-amado", "afirm-bondoso", "afirm-corajoso", "afirm-cuida", "afirm-especial", "be-brave", "bed-boanoite", "good-shepherd", "gospel-0625", "love-deep", "made-for", "medit-descanso", "medit-gratidao", "medit-medo", "night-protection", "oracao-familia", "oracao-gratidao", "oracao-manha", "oracao-noite", "oracao-protecao", "pablos-gift", "paz-coracao", "sharing", "thank-you-god", "video-paes"];  // zacchaeus tem vídeo (áudio nunca tocaria)
const DR_NARRATED = ["dr-01", "dr-02", "dr-03", "dr-04", "dr-05", "dr-06", "dr-07", "dr-08", "dr-09", "dr-10", "dr-11", "dr-12", "dr-13", "dr-14", "dr-15", "dr-16", "dr-17", "dr-18", "dr-19", "dr-20", "dr-21", "dr-22", "dr-23", "dr-24", "dr-25", "dr-26", "dr-27", "dr-28", "dr-30", "dr-31", "dr-32", "dr-33", "dr-34", "dr-35", "dr-36", "dr-37", "dr-38"];  // leituras do dia COM narração (crescer conforme o lote gera)
CONTENT.forEach(c => { if (NARRATED.indexOf(c.id) >= 0) c.audio = audioSrc(c.id); });

const byId = id => CONTENT.find(c => c.id === id);

/* "Conheça o Davi" — carrossel na tela do pet (só conteúdo existente) */
const THEO_MEET = ['made-for','good-shepherd','sharing','be-brave'];

/* carrossel "Destaque" da Today */
const FEATURED = ['gospel-0625','zacchaeus','love-deep'];

/* "Missões do Dia" (id de conteúdo + título da missão + recompensa em moedas) */
const MISSIONS = [
  { id:'gospel-0625', title:'Leituras do Dia', reward:10, current:true },
  { id:'lost-sheep',  title:'História de Hoje',  reward:15 },
  { id:'thank-you-god', title:'Oração de Hoje', reward:15 },
];

/* Missões do Dia cards — visual rico p/ Today (ilustração grande + label) */
const MISSION_VISUALS = {
  'gospel-0625':   { label:'Leituras do Dia',    img:'mission_gospel.jpg',   emoji:'📖' },
  'lost-sheep':    { label:'História de Hoje',     img:'mission_theater.webp', emoji:'🎭' },
  'thank-you-god': { label:'Oração de Hoje', img:'mission_chest.webp', emoji:'🪙' },
};

/* Versículo do dia (card central da Today) */
const BIBLE_VERSE = {
  ref:'MATEUS 8:8',
  text:'"Senhor, não sou digno de que entres em minha casa; mas dize uma só palavra e o meu servo será curado."'
};

/* seção "Recomendados" — meditações/orações (só conteúdo real, todo card abre) */
const RECOMMENDED = [
  { id:'good-shepherd',  title:'O Bom Pastor',              img:'illus_jesus_child.webp' },
  { id:'love-deep',      title:'Ame com Profundidade',      img:'cover_love.jpg' },
  { id:'abraham-grass',  title:'Abraão e a Grande Promessa',img:'cover_abraham.webp' },
  { id:'paz-coracao',    title:'Paz no Coração',            img:'cover_paz.webp' },
  { id:'medit-gratidao', title:'Meditação da Gratidão',     img:'cover_md_gratidao.webp' },
  { id:'medit-medo',     title:'Acalmando o Medo',          img:'cover_md_medo.jpg' },
  { id:'medit-descanso', title:'Descanso em Deus',          img:'cover_md_descanso.webp' },
  { id:'oracao-manha',   title:'Oração da Manhã',           img:'cover_oracao_manha.webp' },
];

/* seção "Lançamentos" — só conteúdo real */
const NEW_RELEASES = [
  { id:'anunciacao',         title:'A Anunciação',            kind:'História',      img:'cover_anunciacao.jpg', isNew:true },
  { id:'burrinho-jerusalem', title:'O Burrinho de Jerusalém', kind:'História',      img:'cover_burrinho.jpg', isNew:true },
  { id:'pao-do-ceu',         title:'O Pão do Céu',            kind:'História',      img:'cover_pao_do_ceu.jpg', isNew:true },
  { id:'salmo-bom-pastor',   title:'O Salmo do Bom Pastor',   kind:'Meditação',     img:'cover_salmo_pastor.jpg', isNew:true },
  { id:'davi-golias',  title:'Davi e Golias',           kind:'História',      img:'cover_davi.jpg' },
  { id:'natal-jesus',  title:'O Nascimento de Jesus',   kind:'História pra Dormir', img:'cover_natal.webp' },
  { id:'video-daniel', title:'Daniel na Cova dos Leões',kind:'Vídeo Curto',   img:'cover_vd_daniel.jpg' },
  { id:'video-prodigo',title:'O Filho Pródigo',         kind:'Vídeo Curto',   img:'cover_vd_prodigo.jpg' },
  { id:'jose-sonho',   title:'José e o Manto Colorido', kind:'História',      img:'cover_jose.webp' },
  { id:'jonas-baleia', title:'Jonas e a Baleia',        kind:'História',      img:'cover_jonas.webp' },
  { id:'zacchaeus',    title:'Zaqueu',                  kind:'História',      img:'cover_zaqueu.jpg' },
];

/* seção "Top 10 hoje no Brasil" — ranking (só conteúdo real) */
const TOP10_BR = [
  { rank:1,  id:'davi-golias',    title:'Davi e Golias',           kind:'História',    img:'cover_davi.jpg' },
  { rank:2,  id:'natal-jesus',    title:'O Nascimento de Jesus',   kind:'História pra Dormir', img:'cover_natal.webp' },
  { rank:3,  id:'zacchaeus',      title:'Zaqueu',                  kind:'História',    img:'cover_zaqueu.jpg' },
  { rank:4,  id:'moises-mar',     title:'Moisés e o Mar Vermelho', kind:'História pra Dormir', img:'cover_moises_mar.webp' },
  { rank:5,  id:'jonas-baleia',   title:'Jonas e a Baleia',        kind:'História',    img:'cover_jonas.webp' },
  { rank:6,  id:'bom-samaritano', title:'O Bom Samaritano',        kind:'História',    img:'cover_samaritano.jpg' },
  { rank:7,  id:'sansao',         title:'Sansão, o Forte',         kind:'História',    img:'cover_sansao.webp' },
  { rank:8,  id:'video-daniel',   title:'Daniel na Cova dos Leões',kind:'Vídeo Curto', img:'cover_vd_daniel.jpg' },
  { rank:9,  id:'dez-mandamentos',title:'Os Dez Mandamentos',      kind:'História',    img:'cover_mandamentos.webp' },
  { rank:10, id:'jose-sonho',     title:'José e o Manto Colorido', kind:'História',    img:'cover_jose.webp' },
];

/* categorias da Explorar (slug, título, descrição, emoji, grad, tipos incluídos) */
const CATEGORIES = [
  { slug:'meditations',   title:'Meditações',    emoji:'🧘', img:'cat_meditations.webp',   grad:GRADS.green,  type:'meditation',
    desc:'Meditações guiadas e calmas pra sentir Deus pertinho e descansar o coração.' },
  { slug:'bedtime',       title:'Histórias pra Dormir',emoji:'🌙', img:'cat_bedtime.webp',       grad:GRADS.violet, type:'bedtime',
    desc:'Histórias suaves feitas pra ajudar seu filho a dormir em paz.' },
  { slug:'stories',       title:'Histórias',        emoji:'📚', img:'cat_stories.webp',       grad:GRADS.sand,   type:'story',
    desc:'Descubra histórias divertidas que ensinam sobre Deus e ajudam você a crescer na fé!' },
  { slug:'affirmations',  title:'Afirmações',   emoji:'✨', img:'cat_affirmations.webp',  grad:GRADS.dawn,   type:'affirmation',
    desc:'Afirmações curtas e animadoras enraizadas no amor de Deus.' },
  { slug:'videos',        title:'Vídeos Curtos',   emoji:'🎬', img:'cat_videos.webp',        grad:GRADS.sky,    type:'video',
    desc:'Clipinhos animados que dão vida a momentos da Bíblia.' },
  { slug:'prayers',       title:'Orações',         emoji:'🙏', img:'cat_prayers.webp',       grad:GRADS.violet, type:'prayer',
    desc:'Orações curtinhas pra falar com Deus e dormir em paz, cheias de carinho.' },
];

/* playlists de música (capa img, nº faixas, duração) */
const PLAYLISTS = [
  { id:'reflection', title:'Um Momento de Reflexão', img:'music_reflection.webp',     emoji:'🧘', grad:GRADS.sky,   songs:15, dur:'50:47 m' },
  { id:'theo-orig',  title:'Originais Aventura com Jesus',         img:'music_theo_originals.jpg', emoji:'🎶', grad:GRADS.gold,  songs:10, dur:'36:44 m' },
  { id:'deep-sleep', title:'Sono Profundo',             img:'music_deep_sleep.webp',     emoji:'😴', grad:GRADS.violet,songs:6,  dur:'13:47 m' },
  { id:'brain-dev',  title:'Desenvolvimento do Cérebro',      img:'music_brain_dev.webp',      emoji:'🧠', grad:GRADS.rose,  songs:14, dur:'40:33 m' },
  { id:'louvor',     title:'Louvor Infantil',         img:'music_louvor.jpg',         emoji:'🎵', grad:GRADS.dawn,  songs:12, dur:'38:20 m' },
  { id:'bible-songs',title:'Canções da Bíblia',       img:'music_bible.jpg',          emoji:'📖', grad:GRADS.green, songs:11, dur:'34:05 m' },
];

/* músicas de cada playlist */
const SONGS = {
  'reflection': [
    { id:'s1', title:'Piano Suave e Gentil', dur:'01:11 m' },
    { id:'s2', title:'Quietude Interior',  dur:'02:27 m' },
    { id:'s3', title:'Piano Celestial',    dur:'07:40 m' },
    { id:'s4', title:'Sussurros de Paz', dur:'04:12 m' },
    { id:'s5', title:'Devoção Silenciosa',    dur:'05:33 m' },
    { id:'s6', title:'Quietude Nele',  dur:'06:18 m' },
    { id:'s7', title:'Águas Tranquilas', dur:'03:48 m' },
    { id:'s8', title:'Manhã de Oração', dur:'02:55 m' },
    { id:'s9', title:'Luz Serena', dur:'04:02 m' },
    { id:'s10', title:'Coração em Paz', dur:'03:21 m' },
    { id:'s11', title:'Respiro de Fé', dur:'02:40 m' },
    { id:'s12', title:'Jardim do Silêncio', dur:'05:10 m' },
    { id:'s13', title:'Melodia da Alma', dur:'03:33 m' },
    { id:'s14', title:'Refúgio Tranquilo', dur:'04:27 m' },
    { id:'s15', title:'Descanso Sagrado', dur:'06:05 m' },
  ],
  'theo-orig': [
    { id:'t1', title:'Música Tema do Davi',         dur:'02:30 m' },
    { id:'t2', title:'O Senhor é Meu Pastor', dur:'03:45 m' },
    { id:'t3', title:'A Canção do Amor de Deus',        dur:'04:12 m' },
    { id:'t4', title:'Davi e os Amigos', dur:'02:58 m' },
    { id:'t5', title:'Brilha a Luz de Deus', dur:'03:20 m' },
    { id:'t6', title:'Cante com o Davi', dur:'02:44 m' },
    { id:'t7', title:'Aventura da Fé', dur:'03:36 m' },
    { id:'t8', title:'Pequeno Coração Grato', dur:'02:50 m' },
    { id:'t9', title:'Anjos ao Redor', dur:'04:05 m' },
    { id:'t10', title:'Caminho com Jesus', dur:'03:54 m' },
  ],
  'deep-sleep': [
    { id:'d1', title:'Canção de Ninar do Sono Profundo',  dur:'05:20 m' },
    { id:'d2', title:'Noite de Estrelas',      dur:'04:18 m' },
    { id:'d3', title:'Sonhos Tranquilos',     dur:'06:45 m' },
    { id:'d4', title:'Embalo da Lua', dur:'05:02 m' },
    { id:'d5', title:'Acalanto Celeste', dur:'04:40 m' },
    { id:'d6', title:'Sono Abençoado', dur:'06:12 m' },
  ],
  'brain-dev': [
    { id:'b1', title:'Notas Alegres',        dur:'03:00 m' },
    { id:'b2', title:'Sons do Encanto',       dur:'02:45 m' },
    { id:'b3', title:'Hora da Descoberta',     dur:'04:10 m' },
    { id:'b4', title:'Curiosidade Feliz', dur:'02:38 m' },
    { id:'b5', title:'Ritmo da Imaginação', dur:'03:15 m' },
    { id:'b6', title:'Brincadeira Sonora', dur:'02:52 m' },
    { id:'b7', title:'Pequeno Gênio', dur:'03:08 m' },
    { id:'b8', title:'Mente Brilhante', dur:'02:47 m' },
    { id:'b9', title:'Cores e Sons', dur:'03:24 m' },
    { id:'b10', title:'Aventura dos Sentidos', dur:'02:59 m' },
    { id:'b11', title:'Dança das Notas', dur:'03:11 m' },
    { id:'b12', title:'Jardim das Ideias', dur:'02:43 m' },
    { id:'b13', title:'Floresta Musical', dur:'03:30 m' },
    { id:'b14', title:'Sininhos do Saber', dur:'02:36 m' },
  ],
  'louvor': [
    { id:'l1', title:'Aleluia Pequenino', dur:'02:50 m' },
    { id:'l2', title:'Bom é Louvar', dur:'03:10 m' },
    { id:'l3', title:'Deus é Bom pra Mim', dur:'02:44 m' },
    { id:'l4', title:'Pula de Alegria', dur:'02:30 m' },
    { id:'l5', title:'Mãozinhas pro Alto', dur:'03:05 m' },
    { id:'l6', title:'Coração Feliz', dur:'02:58 m' },
    { id:'l7', title:'Cantando pra Jesus', dur:'03:22 m' },
    { id:'l8', title:'Luz do Mundo', dur:'03:40 m' },
    { id:'l9', title:'Sou da Família de Deus', dur:'02:48 m' },
    { id:'l10', title:'Sorriso de Anjo', dur:'03:14 m' },
    { id:'l11', title:'Festa no Céu', dur:'03:02 m' },
    { id:'l12', title:'Gratidão em Canção', dur:'02:37 m' },
  ],
  'bible-songs': [
    { id:'bs1', title:'Davi Tocou a Harpa', dur:'03:08 m' },
    { id:'bs2', title:'A Arca de Noé', dur:'02:55 m' },
    { id:'bs3', title:'Daniel e os Leões', dur:'03:20 m' },
    { id:'bs4', title:'O Bom Pastor', dur:'03:44 m' },
    { id:'bs5', title:'Jonas no Mar', dur:'02:50 m' },
    { id:'bs6', title:'Cinco Pães e Dois Peixes', dur:'03:02 m' },
    { id:'bs7', title:'Moisés no Rio', dur:'02:46 m' },
    { id:'bs8', title:'A Estrela de Belém', dur:'03:30 m' },
    { id:'bs9', title:'O Filho que Voltou', dur:'03:12 m' },
    { id:'bs10', title:'Zaqueu na Árvore', dur:'02:40 m' },
    { id:'bs11', title:'Sansão Forte', dur:'03:18 m' },
  ],
};

/* ruído branco — "cores" */
const NOISES = [
  { name:'Branco',  c:'#e9edf2' }, { name:'Vermelho',   c:'#c75d5d' }, { name:'Rosa',  c:'#d98aa6' },
  { name:'Cinza',   c:'#8b94a3' }, { name:'Verde', c:'#6fae84' }, { name:'Marrom', c:'#9c7a55' },
  { name:'Azul',   c:'#5a86c9' }, { name:'Preto', c:'#2a3142' }, { name:'Roxo',c:'#8a7bc8' },
];

/* perfis de criança (multi-perfil) */
const PROFILES = [
  { id:'p1', name:'Sofia', avatar:'🦋', born:'2019-04-12' },
  { id:'p2', name:'Bento',  avatar:'🦉', born:'2021-09-03' },
  { id:'p3', name:'Lucas', avatar:'🐑', born:'2024-06-14' },
];

/* itens da barra do Davi — cada um abre uma função diferente */
const PET_ITEMS = [
  { img:'pet_ic_mood.webp',    emoji:'🫏', label:'Humor',     action:'mood' },
  { img:'pet_ic_duck.webp',    emoji:'🦆', label:'Brincar',   action:'play' },
  { img:'pet_ic_feed.webp',    emoji:'🍉', label:'Alimentar', action:'feed' },
  { img:'pet_ic_joke.webp',    emoji:'🎭', label:'Piada',     action:'joke' },
  { img:'pet_ic_outfits.webp', emoji:'🎁', label:'Roupas',    action:'outfits' },
];

/* Check-in de Humor — 6 emoções com cor + mensagem que aparece em balão */
const MOODS = [
  { id:'happy',      label:'Feliz',      color:'#f4c84e', img:'mood_happy.webp',      msg:'A felicidade é como pão quentinho do céu — obrigado por compartilhar!' },
  { id:'relaxed',    label:'Tranquilo',    color:'#7cc474', img:'mood_relaxed.webp',    msg:'Descansar na paz Dele é um presente. Solte os ombros e respire.' },
  { id:'neutral',    label:'Neutro',    color:'#5fa7e0', img:'mood_neutral.webp',    msg:'Cada dia é uma chance de caminhar com Deus, um passo de cada vez.' },
  { id:'sad',        label:'Triste',        color:'#7e7eb4', img:'mood_sad.webp',        msg:'Tudo bem ficar triste. Jesus está pertinho de quem tem o coração sensível.' },
  { id:'angry',      label:'Bravo',      color:'#d75049', img:'mood_angry.webp',      msg:'Quando a raiva vier, respire fundo. Deus ouve cada sentimento.' },
  { id:'frustrated', label:'Frustrado', color:'#e89438', img:'mood_frustrated.webp', msg:'A frustração faz parte do crescer. Confie que Deus está agindo nisso.' },
];

/* Roupas — pro burrinho comprar com moedas (🥖) */
const OUTFITS = [
  { id:'beanie',   emoji:'🧢', price:20 },
  { id:'shorts-b', emoji:'🩳', price:30 },
  { id:'santa',    emoji:'🎅', price:80 },
  { id:'antlers',  emoji:'🦌', price:30 },
  { id:'shorts-r', emoji:'❤️', price:30 },
  { id:'santa-cap',emoji:'🎄', price:40 },
  { id:'boots',    emoji:'👢', price:50 },
  { id:'sweater',  emoji:'🧥', price:60 },
  { id:'halo',     emoji:'😇', price:90 },
];

/* Decoração — cenários alternativos do quarto */
/* `img` = a miniatura é o PRÓPRIO cenário. Antes o cartão era um emoji (🌗🌃🌇🎄) e
   a criança pagava 300 sem ter visto o que ia levar. */
const DECORATIONS = [
  // 'padrao' é o quarto original. Sem esta entrada não havia como VOLTAR: quem aplicava
  // o Natal ficava com ele pra sempre, e o cartão grátis virava o "padrão" de fato.
  { id:'padrao',    img:'pet_room_bg.webp',        price:0,   label:'Meu Quarto', owned:true },
  { id:'day-night', img:'pet_room_day-night.webp', price:230, label:'Dia & Noite' },
  { id:'neon',      img:'pet_room_neon.webp',      price:300, label:'Quarto Neon' },
  { id:'sunset',    img:'pet_room_sunset.webp',    price:300, label:'Pôr do Sol' },
  { id:'christmas', img:'pet_room_christmas.webp', price:0,   label:'Natal', owned:true },
];

/* Recompensas Diárias — 6 dias de pão crescente + presente */
const DAILY_REWARDS = [
  { day:1, label:'Hoje',  ic:'pao', pao:1, amount:10 },
  { day:2, label:'Dia 2', ic:'pao', pao:1, amount:20 },
  { day:3, label:'Dia 3', ic:'pao', pao:2, amount:40 },
  { day:4, label:'Dia 4', ic:'pao', pao:3, amount:100 },
  { day:5, label:'Dia 5', ic:'pao', pao:3, amount:200 },
  { day:6, label:'Dia 6', ic:'gift', amount:'Presente' },
];

/* Piada do Dia — piadas (Q+A) */
const JOKES = [
  { q:'O que o zero disse pro oito?', a:'Que cinto bonito! 😄' },
  { q:'Por que o jumentinho Davi é tão sábio?', a:'Porque ele sempre escuta as histórias da Bíblia! 🫏📖' },
  { q:'Qual é o lanche preferido do anjinho?', a:'Pão... de Deus! 🥖😇' },
];

/* FAQ do Davi (accordion) */
const PET_FAQ = [
  { q:'Quem é o Davi?', a:'O Davi é o companheiro espiritual do seu filho. Ele caminha junto todos os dias por meio de mensagens, atividades e conteúdos que ajudam a criança a crescer na fé de um jeito próximo, alegre e seguro. Ele não é só um bichinho — é uma forma carinhosa de aproximar seu filho de Deus.' },
  { q:'O que o Davi faz?', a:'O Davi ajuda seu filho a se conectar com Deus todos os dias de um jeito simples e cheio de significado. Ele incentiva hábitos de oração e reflexão adequados à idade, faz a criança se sentir acompanhada enquanto aprende valores cristãos, e a convida a descobrir o Evangelho, orações e mensagens positivas brincando.' },
  { q:'Posso esconder o Davi?', a:'Sim. O bichinho é totalmente opcional — você pode escondê-lo a qualquer momento e o app continua funcionando com todo o conteúdo.' },
  { q:'Como ligo/desligo?', a:'Vá em Ajustes → Configurações de conteúdo → Bichinho e use o botão.' },
];

/* FAQ geral do app (tela de Ajustes → Perguntas Frequentes) */
const SETTINGS_FAQ = [
  { q:'O que é o app Aventura com Jesus?', a:'É um app cristão para crianças, cheio de histórias bíblicas, meditações, orações e afirmações que ajudam seu filho a crescer na fé de um jeito leve, divertido e seguro.' },
  { q:'Para qual faixa etária o app foi feito?', a:'Foi pensado para crianças de cerca de 2 a 11 anos, com conteúdos adequados a cada fase. Os pais podem acompanhar e escolher o que faz mais sentido para a família.' },
  { q:'O app é seguro para crianças?', a:'Sim. Todo o conteúdo é revisado por especialistas, sem anúncios e sem links externos. É um ambiente protegido para a criança explorar a fé com tranquilidade.' },
  { q:'Podemos usar em família?', a:'Com certeza! O app tem perfis de criança prontos pra alternar entre os pequenos da família, e os conteúdos foram feitos pra curtir juntos — na rotina, no carro e na hora de dormir.' },
  { q:'Posso usar em vários dispositivos?', a:'Sim. Sua assinatura vale em qualquer aparelho: é só entrar com o mesmo e-mail. O progresso do dia a dia fica guardado em cada aparelho.' },
  { q:'Como peço o programa de ajuda financeira?', a:'Queremos que ninguém fique sem o app por questões financeiras. Fale com o nosso suporte e teremos prazer em ajudar com uma opção acessível para a sua família.' },
  { q:'Como cancelo minha assinatura?', a:'Você pode cancelar quando quiser: toque em "Fale conosco" aqui nos Ajustes ou mande um e-mail pro nosso suporte pedindo o cancelamento — confirmamos em até 24 horas, sem burocracia.' },
  { q:'Posso pedir reembolso?', a:'Sim. Se você não ficou satisfeito, fale com a gente em até 7 dias da cobrança e fazemos o reembolso, sem complicação.' },
  { q:'Como falo com o suporte?', a:'É só tocar em "Fale conosco" aqui nos Ajustes, ou mandar um e-mail para o nosso suporte. Respondemos o mais rápido possível!' },
];

/* FAQ geral / assinatura */
const SUB_BENEFITS = [
  'Acesso ilimitado ao conteúdo Premium',
  'Histórias e sons relaxantes pra hora de dormir',
  '+50 histórias, orações e meditações',
  'Novos conteúdos a cada atualização',
  'Conteúdo revisado por especialistas',
];

/* dias da semana p/ o tracker de streak */
const WEEK = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
