/* MathQuest 19.0 — ranking global Supabase */
(() => {
  "use strict";
  if (window.MQGlobalRankingLoaded) return;
  window.MQGlobalRankingLoaded = true;
  const TABLE = "global_rankings";
  const $ = (s, root=document) => root.querySelector(s);
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let client = null, user = null, lastSent = "", busy = false, timer = 0;

  function readStats() {
    const s = window.S || {};
    const candidates = [
      s.xp, s.totalXP, s.totalXp, s.points, s.score,
      s.stats && s.stats.xp, s.progress && s.progress.xp
    ];
    const xp = candidates.map(Number).find(n => Number.isFinite(n) && n >= 0) ?? null;
    const correctCandidates = [
      s.correct, s.correctAnswers, s.totalCorrect,
      s.stats && s.stats.correct, s.progress && s.progress.correct
    ];
    const correct = correctCandidates.map(Number).find(n => Number.isFinite(n) && n >= 0) ?? 0;
    return { xp: xp === null ? null : Math.floor(xp), correct: Math.floor(correct) };
  }

  function displayName() {
    return String(window.MQ_PROFILE?.display_name || window.MQ_PROFILE?.name ||
      user?.user_metadata?.display_name || user?.user_metadata?.name ||
      user?.email?.split("@")[0] || "Matemático").trim().slice(0, 24) || "Matemático";
  }

  function rankingHost() {
    const visible = el => !!el && el.getClientRects().length > 0 &&
      getComputedStyle(el).display !== "none" && getComputedStyle(el).visibility !== "hidden";
    const views = Array.from(document.querySelectorAll(".view,[data-view-panel],main > section,main > div"));
    const globalView = views.find(el => {
      if (!visible(el)) return false;
      const heading = el.querySelector("h1,h2,h3,.section-heading,[role=heading]");
      const label = (heading?.textContent || "").toLowerCase();
      return label.includes("ranking global") || (label.includes("global") && /ranking|classifica/.test((el.textContent||"").slice(0,700).toLowerCase()));
    });
    return globalView || $("#view-global") || $("#view-global-ranking") ||
      $('[data-view-panel="global"]') || $(".view-global") ||
      $("#view-ranking") || $('[data-view-panel="ranking"]') ||
      $(".view-ranking") || $("#rankingRows")?.closest(".view") ||
      $("#rankingRows")?.parentElement;
  }

  function ensurePanel() {
    const host = rankingHost();
    if (!host) return null;
    let panel = $("#mq-global-ranking");
    if (panel) return panel;
    panel = document.createElement("section");
    panel.id = "mq-global-ranking";
    panel.className = "mq-global-ranking";
    panel.innerHTML = `
      <div class="mqgr-head">
        <div><span class="mqgr-kicker">MATHQUEST · COMPETIÇÃO ONLINE</span><h2>🌍 Ranking Global</h2>
        <p>Jogadores de todas as contas, classificados pelo XP acumulado.</p></div>
        <button type="button" id="mqgr-refresh">↻ Atualizar</button>
      </div>
      <div id="mqgr-status" class="mqgr-status" role="status">Conectando ao ranking...</div>
      <div class="mqgr-table-wrap"><div class="mqgr-table-head"><span>POSIÇÃO</span><span>JOGADOR</span><span>XP</span></div><div id="mqgr-rows"></div></div>
      <p class="mqgr-foot">Desempate: respostas corretas. O ranking é atualizado quando o progresso é sincronizado.</p>`;
    host.prepend(panel);
    $("#mqgr-refresh", panel).addEventListener("click", refresh);
    return panel;
  }

  function status(message, kind="") {
    const node = $("#mqgr-status");
    if (node) { node.textContent = message; node.className = "mqgr-status " + kind; }
  }

  async function refresh() {
    const panel = ensurePanel();
    if (!panel) return;
    if (!client) { status("O serviço de conta ainda está carregando."); return; }
    status("Buscando os melhores jogadores...");
    const { data, error } = await client.from(TABLE)
      .select("user_id, display_name, xp, correct_answers, updated_at")
      .order("xp", { ascending: false })
      .order("correct_answers", { ascending: false })
      .order("updated_at", { ascending: true })
      .limit(100);
    if (error) {
      status(error.code === "42P01" || /does not exist|schema cache/i.test(error.message)
        ? "A tabela do ranking ainda não foi criada. Execute o arquivo global-ranking.sql no SQL Editor do Supabase."
        : "Não foi possível carregar o ranking: " + error.message, "error");
      return;
    }
    const rows = $("#mqgr-rows");
    if (!data?.length) {
      rows.innerHTML = '<div class="mqgr-empty">Ainda não há jogadores no ranking. Seja um dos primeiros!</div>';
      status("Ranking conectado · aguardando os primeiros jogadores.", "success");
      return;
    }
    rows.innerHTML = data.map((p, i) => `
      <div class="mqgr-row ${user && p.user_id === user.id ? "mqgr-you" : ""}">
        <b class="mqgr-position">${i+1}</b>
        <span class="mqgr-player"><i>${esc((p.display_name || "M").slice(0,1).toUpperCase())}</i><span>${esc(p.display_name || "Matemático")}${user && p.user_id === user.id ? " <small>(você)</small>" : ""}</span></span>
        <strong>${Number(p.xp || 0).toLocaleString("pt-BR")} XP</strong>
      </div>`).join("");
    status("Ranking global atualizado · " + data.length + " jogadores exibidos.", "success");
  }

  async function syncProgress() {
    if (!client || !user || busy) return;
    const stats = readStats();
    if (stats.xp === null) {
      status("Sua conta está conectada. Estou aguardando os dados de XP do jogo para sincronizar.");
      return;
    }
    const payload = {
      user_id: user.id,
      display_name: displayName(),
      xp: stats.xp,
      correct_answers: stats.correct,
      updated_at: new Date().toISOString()
    };
    const signature = JSON.stringify(payload);
    if (signature === lastSent) return;
    busy = true;
    const { error } = await client.from(TABLE).upsert(payload, { onConflict: "user_id" });
    busy = false;
    if (error) {
      status(/does not exist|schema cache/i.test(error.message)
        ? "Falta criar a tabela global_rankings no Supabase. Use o arquivo SQL incluído no repositório."
        : "Falha ao sincronizar seu XP: " + error.message, "error");
      return;
    }
    lastSent = signature;
    await refresh();
  }

  async function boot() {
    client = window.MATHQUEST_SUPABASE || window.MATHQUEST_AUTH || window.supabaseClient || null;
    if (!client || !client.auth) {
      status("O login do MathQuest não foi detectado neste carregamento.");
      return;
    }
    const { data, error } = await client.auth.getSession();
    if (error) { status("Não foi possível validar sua sessão: " + error.message, "error"); return; }
    user = data.session?.user || null;
    if (!user) { status("Entre na sua conta MathQuest para participar do ranking global."); return; }
    await syncProgress();
    await refresh();
    if (timer) clearInterval(timer);
    timer = setInterval(syncProgress, 12000);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) syncProgress(); });
    client.auth.onAuthStateChange((_event, session) => {
      user = session?.user || null;
      lastSent = "";
      if (user) syncProgress();
      else status("Entre na sua conta MathQuest para participar do ranking global.");
    });
  }

  function attach() {
    ensurePanel();
    document.addEventListener("click", event => {
      const nav = event.target.closest('[data-view="ranking"],[data-view="global-ranking"]');
      if (!nav) return;
      setTimeout(() => { ensurePanel(); refresh(); }, 80);
    });
    const host = rankingHost();
    if (host) { ensurePanel(); }
    boot();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", attach, { once: true });
  else attach();
  window.MQGlobalRanking = { refresh, sync: syncProgress };
})();