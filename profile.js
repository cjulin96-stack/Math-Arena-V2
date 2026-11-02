
/* ==========================================
   MATHQUEST — MEU PERFIL
   Perfil conectado ao Supabase
========================================== */
(() => {
  "use strict";

  const waitForApp = () => {
    const auth = window.MATHQUEST_AUTH;

    if (!auth || !document.querySelector(".main-content")) {
      setTimeout(waitForApp, 300);
      return;
    }

    if (document.getElementById("view-profile")) return;

    const main = document.querySelector(".main-content");
    const nav = document.querySelector(".main-nav");
    const footer = main.querySelector(".main-footer");

    if (!nav || !footer) return;

    // Estilos do perfil
    const style = document.createElement("style");
    style.textContent = `
      .profile-hero {
        background: linear-gradient(135deg,#252d61,#6746b8);
        color: white; border-radius: 22px; padding: 25px;
        display: flex; align-items: center; gap: 18px;
        margin-bottom: 22px; flex-wrap: wrap;
      }
      .profile-avatar {
        width: 76px; height: 76px; border-radius: 24px;
        background: #ffffff25; border: 2px solid #ffffff70;
        display: grid; place-items: center; font-size: 32px;
        font-weight: 800;
      }
      .profile-hero h2 { margin: 0 0 6px; }
      .profile-hero p { margin: 0; opacity: .85; overflow-wrap:anywhere; }
      .profile-grid {
        display: grid; grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 13px; margin-bottom: 22px;
      }
      .profile-card {
        background: var(--panel,#fff); border: 1px solid var(--border,#e5e7ef);
        border-radius: 16px; padding: 19px; min-width: 0;
      }
      .profile-card small { display:block; opacity:.7; margin-bottom:8px; }
      .profile-card strong { font-size: 25px; }
      .profile-section {
        background: var(--panel,#fff); border: 1px solid var(--border,#e5e7ef);
        border-radius: 17px; padding: 20px; margin-bottom: 17px;
      }
      .profile-section h3 { margin-top:0; }
      .profile-form { display:flex; gap:10px; flex-wrap:wrap; }
      .profile-form input {
        flex:1; min-width:160px; padding:13px;
        border:1px solid #cbd2e1; border-radius:10px;
        font-size:16px;
      }
      .profile-action {
        border:0; border-radius:10px; padding:13px 17px;
        background:#7157e8; color:white; font-weight:700;
        cursor:pointer;
      }
      .profile-message { min-height:20px; font-size:13px; }
      .profile-muted { opacity:.7; font-size:13px; }
      @media(max-width:520px) {
        .profile-grid { grid-template-columns:1fr 1fr; }
        .profile-hero { padding:18px; }
        .profile-avatar { width:62px; height:62px; }
      }
    `;
    document.head.appendChild(style);

    // Botão no menu lateral
    const navButton = document.createElement("button");
    navButton.className = "nav-item";
    navButton.dataset.view = "profile";
    navButton.innerHTML = "<span>◉</span> Meu Perfil";

    const statsButton = nav.querySelector('[data-view="stats"]');
    if (statsButton) {
      statsButton.after(navButton);
    } else {
      nav.appendChild(navButton);
    }

    // Tela do perfil
    const view = document.createElement("section");
    view.id = "view-profile";
    view.className = "view";

    view.innerHTML = `
      <div class="section-heading">
        <div>
          <p class="eyebrow">SUA IDENTIDADE</p>
          <h2>Meu Perfil</h2>
          <p class="muted">Sua jornada no MathQuest.</p>
        </div>
      </div>

      <div class="profile-hero">
        <div class="profile-avatar" id="mq-profile-avatar">J</div>
        <div>
          <h2 id="mq-profile-name">JC-DONO</h2>
          <p id="mq-profile-email">Verificando conta...</p>
          <p style="margin-top:8px">🏅 Explorador MathQuest</p>
        </div>
      </div>

      <div class="profile-grid">
        <div class="profile-card">
          <small>⚡ XP acumulado</small>
          <strong id="mq-profile-xp">0</strong>
        </div>
        <div class="profile-card">
          <small>🔥 Sequência</small>
          <strong id="mq-profile-streak">0 dias</strong>
        </div>
        <div class="profile-card">
          <small>💎 Gemas</small>
          <strong id="mq-profile-gems">0</strong>
        </div>
        <div class="profile-card">
          <small>📚 Nível</small>
          <strong id="mq-profile-level">1</strong>
        </div>
      </div>

      <div class="profile-section">
        <h3>✏️ Personalizar nome</h3>
        <p class="profile-muted">
          Seu nome será salvo no perfil da sua conta.
        </p>
        <form class="profile-form" id="mq-profile-form">
          <input id="mq-profile-name-input"
            maxlength="24" minlength="2"
            placeholder="Seu nome de jogador" required>
          <button class="profile-action" type="submit">
            Salvar nome
          </button>
        </form>
        <p class="profile-message" id="mq-profile-message"
          role="status"></p>
      </div>

      <div class="profile-section">
        <h3>🏆 Sua atividade</h3>
        <p>Respostas corretas:
          <strong id="mq-profile-correct">0</strong>
        </p>
        <p>Precisão:
          <strong id="mq-profile-accuracy">0%</strong>
        </p>
        <p>Lições concluídas:
          <strong id="mq-profile-lessons">0</strong>
        </p>
      </div>

      <div class="profile-section">
        <h3>🔐 Conta</h3>
        <p class="profile-muted">
          Sua conta está conectada ao Supabase.
        </p>
        <button class="profile-action" id="mq-profile-logout"
          type="button">Sair da conta</button>
      </div>

      <p class="profile-muted">
        XP, gemas e estatísticas ainda são dados locais.
        A sincronização online será implementada na próxima etapa.
      </p>
    `;

    main.insertBefore(view, footer);

    const $ = id => document.getElementById(id);

    function showProfile() {
      document.querySelectorAll(".view").forEach(item => {
        item.classList.remove("active");
      });

      document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
      });

      view.classList.add("active");
      navButton.classList.add("active");

      const title = $("pageTitle");
      if (title) title.textContent = "Meu Perfil";

      updateLocalStats();
      loadProfile();
    }

    function updateLocalStats() {
      const read = id => {
        const element = $(id);
        return element ? element.textContent.trim() : "0";
      };

      $("mq-profile-xp").textContent = read("xpTop");
      $("mq-profile-streak").textContent =
        read("streakTop") + " dias";
      $("mq-profile-gems").textContent = read("gemsTop");
      $("mq-profile-level").textContent = read("sideLevel");
      $("mq-profile-correct").textContent = read("statCorrect");
      $("mq-profile-accuracy").textContent = read("statAccuracy");
      $("mq-profile-lessons").textContent = read("statLessons");
    }

    function showName(name) {
      $("mq-profile-name").textContent = name;
      $("mq-profile-avatar").textContent =
        name.charAt(0).toUpperCase();

      if ($("sideName")) $("sideName").textContent = name;
      if ($("avatarInitial")) {
        $("avatarInitial").textContent =
          name.charAt(0).toUpperCase();
      }
      if ($("playerName")) $("playerName").value = name;
    }

    async function loadProfile() {
      const { data: sessionData, error: sessionError } =
        await auth.auth.getSession();

      if (sessionError || !sessionData.session) {
        $("mq-profile-email").textContent = "Entre na sua conta";
        $("mq-profile-message").textContent =
          "Faça login para carregar seu perfil.";
        return;
      }

      const user = sessionData.session.user;
      $("mq-profile-email").textContent = user.email || "";

      const { data, error } = await auth
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        $("mq-profile-message").textContent =
          "Não foi possível carregar o nome salvo.";
        console.error("MathQuest perfil:", error.message);
        return;
      }

      const name = data?.display_name || "JC-DONO";
      showName(name);
    }

    $("mq-profile-form").addEventListener("submit", async event => {
      event.preventDefault();

      const name = $("mq-profile-name-input").value.trim();
      const message = $("mq-profile-message");

      if (name.length < 2 || name.length > 24) {
        message.textContent =
          "Use um nome entre 2 e 24 caracteres.";
        return;
      }

      message.textContent = "Salvando...";

      const { data: sessionData, error: sessionError } =
        await auth.auth.getSession();

      const user = sessionData?.session?.user;

      if (sessionError || !user) {
        message.textContent = "Entre na sua conta primeiro.";
        return;
      }

      const { data, error } = await auth
        .from("profiles")
        .update({ display_name: name })
        .eq("id", user.id)
        .select("display_name")
        .maybeSingle();

      if (error || !data) {
        message.textContent =
          "Não foi possível salvar. Verifique sua conexão.";
        console.error("MathQuest salvar perfil:", error?.message);
        return;
      }

      showName(data.display_name);
      message.textContent = "Nome salvo na sua conta!";
    });

    $("mq-profile-logout").addEventListener("click", async () => {
      const { error } = await auth.auth.signOut();

      if (error) {
        $("mq-profile-message").textContent =
          "Não foi possível sair da conta.";
        return;
      }

      $("mq-profile-message").textContent =
        "Você saiu da sua conta.";
    });

    navButton.addEventListener("click", showProfile);

    auth.auth.onAuthStateChange(() => {
      if (view.classList.contains("active")) {
        loadProfile();
      }
    });

    console.log("MathQuest: Meu Perfil carregado.");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForApp);
  } else {
    waitForApp();
  }
})();
          
