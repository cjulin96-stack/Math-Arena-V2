(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const modal = $("accountModal");
  if (!modal) return;
  let client = null, mode = "login", currentUser = null;
  const message = (text, good=false) => { $("accountMessage").textContent = text; $("accountMessage").classList.toggle("good", good); };
  const setMode = (next) => {
    mode = next;
    const signup = mode === "signup";
    $("accountTitle").textContent = signup ? "Criar sua conta" : "Entre na sua conta";
    $("accountDescription").textContent = signup ? "Cadastre seu e-mail e escolha uma senha." : "Use seu e-mail e senha para entrar.";
    $("accountNameLabel").classList.toggle("hidden", !signup);
    $("accountDisplayName").classList.toggle("hidden", !signup);
    $("accountDisplayName").required = signup;
    $("accountPassword").autocomplete = signup ? "new-password" : "current-password";
    $("accountSubmit").textContent = signup ? "Criar conta" : "Entrar";
    $("accountModeBtn").textContent = signup ? "Já tem conta? Entrar" : "Ainda não tem conta? Criar conta";
    message("");
  };
  const open = () => { modal.classList.remove("hidden"); message(""); };
  const close = () => modal.classList.add("hidden");
  const updateStatus = (user) => {
    currentUser = user || null;
    $("accountStatus").textContent = user ? "Conta conectada: " + user.email : "Conta não conectada";
    $("accountHint").textContent = user ? "Login ativo neste dispositivo. O progresso ainda permanece local nesta etapa." : "Crie uma conta para preparar seu acesso em outros dispositivos.";
    $("openAccountBtn").textContent = user ? "Gerenciar conta" : "Entrar / Criar conta";
    let logout = $("accountLogoutBtn");
    if (user && !logout) {
      logout = document.createElement("button"); logout.id = "accountLogoutBtn"; logout.className = "btn btn-secondary"; logout.textContent = "Sair";
      $("accountBox").appendChild(logout);
      logout.addEventListener("click", async () => { const { error } = await client.auth.signOut(); if(error) { alert("Não foi possível sair: " + error.message); return; } updateStatus(null); });
    } else if (!user && logout) logout.remove();
  };
  async function init() {
    if (!window.supabase || !window.MATHQUEST_SUPABASE_URL || !window.MATHQUEST_SUPABASE_KEY) {
      $("accountHint").textContent = "Serviço de conta indisponível. Verifique a conexão e tente novamente."; $("openAccountBtn").disabled = true; return;
    }
    client = window.supabase.createClient(window.MATHQUEST_SUPABASE_URL, window.MATHQUEST_SUPABASE_KEY);
    const { data, error } = await client.auth.getSession();
    if (!error) updateStatus(data.session?.user || null);
    client.auth.onAuthStateChange((_event, session) => updateStatus(session?.user || null));
  }
  $("openAccountBtn").addEventListener("click", open);
  $("closeAccountBtn").addEventListener("click", close);
  modal.addEventListener("click", e => { if(e.target === modal) close(); });
  $("accountModeBtn").addEventListener("click", () => setMode(mode === "login" ? "signup" : "login"));
  $("accountForm").addEventListener("submit", async e => {
    e.preventDefault(); if (!client) return message("Serviço de conta não está disponível.");
    const email = $("accountEmail").value.trim();
    const password = $("accountPassword").value;
    const name = $("accountDisplayName").value.trim();
    const submit = $("accountSubmit"); submit.disabled = true; submit.textContent = "Aguarde..."; message("");
    try {
      if (mode === "signup") {
        const { data, error } = await client.auth.signUp({ email, password, options: { data: { display_name: name } } });
        if (error) throw error;
        if (data.session) {
          const { error: profileError } = await client.from("profiles").upsert({ id: data.user.id, display_name: name }, { onConflict: "id" });
          if (profileError) throw profileError;
          updateStatus(data.user); message("Conta criada e conectada!", true); setTimeout(close, 900);
        } else {
          message("Cadastro iniciado. Confira seu e-mail para confirmar a conta antes de entrar.", true);
        }
      } else {
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        updateStatus(data.user); message("Login realizado com sucesso!", true); setTimeout(close, 700);
      }
    } catch (err) { message(err.message || "Não foi possível concluir. Tente novamente."); }
    finally { submit.disabled = false; submit.textContent = mode === "signup" ? "Criar conta" : "Entrar"; }
  });
  init();
})();
