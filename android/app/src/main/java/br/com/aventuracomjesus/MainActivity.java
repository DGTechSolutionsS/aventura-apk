package br.com.aventuracomjesus;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;

import androidx.core.view.WindowCompat;

import com.getcapacitor.BridgeActivity;

/**
 * Modo imersivo: a barra de status (relógio, wi-fi, notificações) e os botões de
 * navegação ficam escondidos e só aparecem quando a pessoa desliza da borda — e
 * somem sozinhos depois, sem empurrar o layout.
 *
 * BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE é o ponto: sem ele o primeiro toque na tela
 * já traria as barras de volta, o que numa tela cheia de botões (é um app infantil)
 * significaria elas piscando o tempo todo.
 *
 * Precisa ser reaplicado no onWindowFocusChanged: sair pra outro app, atender uma
 * ligação ou puxar as notificações devolve as barras, e sem isso elas nunca mais
 * sumiriam até reabrir o app.
 */
public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // o conteúdo desenha atrás das barras; o env(safe-area-inset-*) do CSS já cuida
    // de não deixar nada embaixo do recorte da câmera
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    esconderBarras();
  }

  @Override
  public void onWindowFocusChanged(boolean temFoco) {
    super.onWindowFocusChanged(temFoco);
    if (temFoco) esconderBarras();
  }

  private void esconderBarras() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      WindowInsetsController c = getWindow().getInsetsController();
      if (c != null) {
        c.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
        c.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
      }
    } else {
      // Android 10 e abaixo: a API antiga, com as mesmas flags
      getWindow().getDecorView().setSystemUiVisibility(
          View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
              | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
              | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
              | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
              | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
              | View.SYSTEM_UI_FLAG_FULLSCREEN);
    }
  }
}
