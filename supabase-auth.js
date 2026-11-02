(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const authScreen = $("authScreen");
  const appShell = $("appShell");
  const form = $("authForm");
  const message = $("authMessage");
  const submit = $("authSubmit");
  const supabaseLib = window.supabase;
  if (!supabaseLib || !window.MATHQUEST_SUPABASE_URL || !window.MATHQUEST_SUPABASE_KEY) {
    message.textContent = "Não foi possível carregar a conexão com o Supabase. Atualize a página.";
    return;
  }

  const client = supabaseLib.createClient(window.MATHQUEST_SUPABASE_URL, window.MATHQUEST_SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  window.MATHQUEST_SUPABASE = client;
  window.MQ_USER = null;
  window.MQ_PROFILE = null;
  let mode = "login";

  const setMessage = (text, type = "") => {
    message.textContent = text;
    message.className = "auth-message" + (type ? " " + type : "");
  };
  const setMode = (next) => {
    mode = next;
    $("authTitle").textContent = next === "signup" ? "Crie sua conta" : next === "recovery" ? "Nova senha" : "Entre na sua conta";
    $("authSubtitle").textContent = next === "signup" ? "Comece sua jornada no MathQuest." : next === "recovery" ? "Escolha uma senha nova para sua conta." : "Seu progresso começa aqui.";
    $("displayNameField").classList.toggle("hidden", next !== "signup");
    $("passwordField").classList.toggle("hidden", next === "recovery");
    $("confirmPasswordField").classList.toggle("hidden", next !== "recovery");
    submit.textContent = next === "signup" ? "Criar conta" : next === "recovery" ? "Salvar nova senha" : "Entrar";
    $("authSwitch").classList.toggle("hidden", next === "recovery");
    $("authPassword").required = next !== "recovery";
    $("authNewPassword").required = next === "recovery";
    $("showSignup").classList.toggle("hidden", next !== "login");
    $("showLogin").classList.toggle("hidden", next !== "signup");
    $("forgotPassword").classList.toggle("hidden", next !== "login");
    setMessage("");
  };

  async function showApp(user) {
    window.MQ_USER = user;
    const { data, error } = await client.from("profiles").select("id, display_name, avatar").eq("id", user.id).maybeSingle();
    if (error) {
      setMessage("Sua conta entrou, mas não consegui carregar o perfil. Confira se executou o SQL de configuração no Supabase.", "error");
      return;
    }
    window.MQ_PROFILE = data || { id: user.id, display_name: user.user_metadata?.display_name || "Matemático", avatar: null };
    authScreen.classList.add("hidden");
    appShell.classList.remove("auth-locked");
    document.dispatchEvent(new CustomEvent("mathquest:authenticated", { detail: { user, profile: window.MQ_PROFILE } }));
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;
    submit.disabled = true;
    setMessage("Aguarde...");
    try {
      if (mode === "signup") {
        const displayName = $("authDisplayName").value.trim();
        if (displayName.length < 2) throw new Error("Digite um nome com pelo menos 2 caracteres.");
        const { data, error } = await client.auth.signUp({
          email, password,
          options: { data: { display_name: displayName }, emailRedirectTo: window.location.href.split("#")[0] }
        });
        if (error) throw error;
        if (data.session) await showApp(data.user);
        else setMessage("Cadastro iniciado! Confira seu e-mail e confirme a conta antes de entrar.", "success");
      } else if (mode === "login") {
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await showApp(data.user);
      } else {
        const newPassword = $("authNewPassword").value;
        if (newPassword.length < 8) throw new Error("A nova senha precisa ter pelo menos 8 caracteres.");
        const { error } = await client.auth.updateUser({ password: newPassword });
        if (error) throw error;
        setMode("login");
        setMessage("Senha atualizada. Entre com sua nova senha.", "success");
      }
    } catch (error) {
      setMessage(error.message || "Não foi possível concluir. Tente novamente.", "error");
    } finally { submit.disabled = false; }
  });

  $("showSignup").addEventListener("click", () => setMode("signup"));
  $("showLogin").addEventListener("click", () => setMode("login"));
  $("forgotPassword").addEventListener("click", async () => {
    const email = $("authEmail").value.trim();
    if (!email) return setMessage("Digite seu e-mail primeiro para receber o link de recuperação.", "error");
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: window.location.href.split("#")[0] });
    setMessage(error ? error.message : "Enviamos um link de recuperação para seu e-mail.", error ? "error" : "success");
  });
  $("logoutBtn").addEventListener("click", async () => {
    const { error } = await client.auth.signOut();
    if (error) return alert("Não foi possível sair: " + error.message);
    window.MQ_USER = null; window.MQ_PROFILE = null;
    window.location.reload();
  });

  client.auth.onAuthStateChange(async (event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      authScreen.classList.remove("hidden"); appShell.classList.add("auth-locked"); setMode("recovery");
    } else if (session?.user && !window.MQ_USER) {
      await showApp(session.user);
    } else if (!session && window.MQ_USER) {
      window.MQ_USER = null; window.MQ_PROFILE = null;
      authScreen.classList.remove("hidden"); appShell.classList.add("auth-locked");
    }
  });

  (async () => {
    const { data, error } = await client.auth.getSession();
    if (error) setMessage(error.message, "error");
    if (data.session?.user) await showApp(data.session.user);
    else { authScreen.classList.remove("hidden"); appShell.classList.add("auth-locked"); }
  })();

  window.MQ_UPDATE_PROFILE_NAME = async (name) => {
    if (!window.MQ_USER) return { error: new Error("Sessão não encontrada.") };
    const { data, error } = await client.from("profiles").update({ display_name: name }).eq("id", window.MQ_USER.id).select("id, display_name, avatar").single();
    if (!error) window.MQ_PROFILE = data;
    return { data, error };
  };
})();
