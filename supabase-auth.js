/* MATHQUEST — AUTENTICAÇÃO SUPABASE */
(() => {
  "use strict";

  const URL = window.MATHQUEST_SUPABASE_URL;
  const KEY = window.MATHQUEST_SUPABASE_KEY;

  if (!window.supabase || !URL || !KEY) {
    console.error("MathQuest: configuração do Supabase não encontrada.");
    return;
  }

  const client = window.supabase.createClient(URL, KEY);
  window.MATHQUEST_AUTH = client;

  const style = document.createElement("style");
  style.textContent = `
    #mq-auth-button {
      border: 0; border-radius: 12px; padding: 11px 16px;
      background: #7157e8; color: white; font-weight: 700;
      cursor: pointer; margin-left: 10px;
    }
    #mq-auth-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(5,10,25,.78); display: none;
      align-items: center; justify-content: center; padding: 16px;
    }
    #mq-auth-box {
      width: 100%; max-width: 410px; background: #fff;
      color: #17213a; border-radius: 20px; padding: 25px;
      box-shadow: 0 20px 70px #0006; font-family: Arial,sans-serif;
    }
    #mq-auth-box h2 { margin: 0 0 8px; font-size: 25px; }
    #mq-auth-box p { color: #68738b; line-height: 1.5; }
    #mq-auth-box input {
      box-sizing: border-box; width: 100%; padding: 13px;
      margin: 7px 0 12px; border: 1px solid #d8deea;
      border-radius: 10px; font-size: 16px;
    }
    #mq-auth-box button {
      padding: 12px; border: 0; border-radius: 10px;
      cursor: pointer; font-weight: bold;
    }
    #mq-auth-submit {
      width: 100%; color: white; background: #7157e8;
      margin-top: 8px;
    }
    #mq-auth-switch {
      background: #eeeafd; color: #6047d5; width: 100%;
      margin-top: 10px;
    }
    #mq-auth-close {
      float: right; background: #f0f1f5; color: #333;
    }
    #mq-auth-message {
      min-height: 22px; font-size: 13px; overflow-wrap: anywhere;
    }
    #mq-auth-logout {
      background: #fce9e9; color: #b52d2d;
      margin-top: 10px; width: 100%; display: none;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.id = "mq-auth-overlay";
  overlay.innerHTML = `
    <div id="mq-auth-box">
      <button id="mq-auth-close" type="button">Fechar ✕</button>
      <h2 id="mq-auth-title">Entrar no MathQuest</h2>
      <p id="mq-auth-description">Entre na sua conta para acessar seu perfil.</p>

      <form id="mq-auth-form">
        <div id="mq-auth-name-area" style="display:none">
          <label for="mq-auth-name">Seu nome</label>
          <input id="mq-auth-name" maxlength="24"
            minlength="2" placeholder="Como devemos chamar você?">
        </div>

        <label for="mq-auth-email">E-mail</label>
        <input id="mq-auth-email" type="email"
          autocomplete="email" required placeholder="seu@email.com">

        <label for="mq-auth-password">Senha</label>
        <input id="mq-auth-password" type="password"
          autocomplete="current-password" required
          minlength="6" placeholder="Mínimo de 6 caracteres">

        <button id="mq-auth-submit" type="submit">Entrar</button>
      </form>

      <button id="mq-auth-switch" type="button">
        Criar uma conta
      </button>

      <button id="mq-auth-reset" type="button"
        style="background:transparent;color:#6047d5;width:100%">
        Esqueci minha senha
      </button>

      <button id="mq-auth-logout" type="button">
        Sair da conta
      </button>

      <p id="mq-auth-message" role="status"></p>
    </div>
  `;
  document.body.appendChild(overlay);

  const $ = id => document.getElementById(id);

  let mode = "login";
  let currentUser = null;

  function message(text, error = false) {
    $("mq-auth-message").textContent = text;
    $("mq-auth-message").style.color = error ? "#c0392b" : "#27834a";
  }

  function openPanel() {
    overlay.style.display = "flex";
    message("");
  }

  function closePanel() {
    overlay.style.display = "none";
  }

  function setMode(newMode) {
    mode = newMode;

    const signup = mode === "signup";
    $("mq-auth-title").textContent =
      signup ? "Criar conta" : "Entrar no MathQuest";

    $("mq-auth-description").textContent = signup
      ? "Crie sua conta para começar sua jornada."
      : "Acesse sua conta MathQuest.";

    $("mq-auth-name-area").style.display =
      signup ? "block" : "none";

    $("mq-auth-password").autocomplete =
      signup ? "new-password" : "current-password";

    $("mq-auth-submit").textContent =
      signup ? "Criar minha conta" : "Entrar";

    $("mq-auth-switch").textContent =
      signup ? "Já tenho uma conta" : "Criar uma conta";

    $("mq-auth-reset").style.display =
      signup ? "none" : "block";

    message("");
  }

  function updateButton(user) {
    currentUser = user || null;

    const button = $("mq-auth-button");
    if (!button) return;

    button.textContent = user
      ? "Minha conta"
      : "Entrar / Cadastrar";

    $("mq-auth-logout").style.display =
      user ? "block" : "none";

    if (user) {
      loadProfile(user);
    }
  }

  async function loadProfile(user) {
    const { data, error } = await client
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Erro ao carregar perfil:", error.message);
      return;
    }

    if (data?.display_name) {
      const name = data.display_name;

      const sideName = $("sideName");
      const playerName = $("playerName");
      const avatar = $("avatarInitial");

      if (sideName) sideName.textContent = name;
      if (playerName) playerName.value = name;
      if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
    }
  }

  function init() {
    const topbar = document.querySelector(".topbar");

    if (!topbar) {
      console.error("MathQuest: cabeçalho não encontrado.");
      return;
    }

    const button = document.createElement("button");
    button.id = "mq-auth-button";
    button.type = "button";
    button.textContent = "Entrar / Cadastrar";
    button.addEventListener("click", openPanel);
    topbar.appendChild(button);

    $("mq-auth-close").addEventListener("click", closePanel);

    overlay.addEventListener("click", event => {
      if (event.target === overlay) closePanel();
    });

    $("mq-auth-switch").addEventListener("click", () => {
      setMode(mode === "login" ? "signup" : "login");
    });

    $("mq-auth-form").addEventListener("submit", async event => {
      event.preventDefault();

      const email = $("mq-auth-email").value.trim();
      const password = $("mq-auth-password").value;
      const name = $("mq-auth-name").value.trim();

      const submit = $("mq-auth-submit");
      submit.disabled = true;
      message("Aguarde...");

      try {
        if (mode === "signup") {
          if (name.length < 2) {
            throw new Error("Digite um nome com pelo menos 2 caracteres.");
          }

          const { data, error } = await client.auth.signUp({
            email,
            password,
            options: {
              data: { display_name: name }
            }
          });

          if (error) throw error;

          if (data.session) {
            message("Conta criada com sucesso!");
            closePanel();
          } else {
            message("Cadastro iniciado! Confira seu e-mail para confirmar a conta.");
          }
        } else {
          const { error } = await client.auth.signInWithPassword({
            email,
            password
          });

          if (error) throw error;

          message("Login realizado!");
          closePanel();
        }
      } catch (error) {
        message(error.message || "Não foi possível concluir.", true);
      } finally {
        submit.disabled = false;
      }
    });

    $("mq-auth-reset").addEventListener("click", async () => {
      const email = $("mq-auth-email").value.trim();

      if (!email) {
        message("Digite seu e-mail primeiro.", true);
        return;
      }

      try {
        const { error } = await client.auth.resetPasswordForEmail(email);

        if (error) throw error;

        message("Se o e-mail estiver cadastrado, você receberá as instruções de recuperação.");
      } catch (error) {
        message(error.message || "Erro ao solicitar recuperação.", true);
      }
    });

    $("mq-auth-logout").addEventListener("click", async () => {
      const { error } = await client.auth.signOut();

      if (error) {
        message(error.message, true);
        return;
      }

      message("Você saiu da sua conta.");
      closePanel();
    });

    client.auth.onAuthStateChange((event, session) => {
      updateButton(session?.user || null);
    });

    client.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Erro ao verificar sessão:", error.message);
        return;
      }

      updateButton(data.session?.user || null);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
