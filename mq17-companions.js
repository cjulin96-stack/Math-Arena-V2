/* MathQuest 17.0 — Companions: mascots inside the learning journey */
(function () {
  "use strict";
  if (window.MQ17CompanionsLoaded) return;
  window.MQ17CompanionsLoaded = true;

  const STORAGE = "mq17_companion_state_v1";
  const PERSONAS = {
    nexo: { name:"Nexo", hello:"Preparado? Vamos dominar esse assunto juntos!", good:["Mandou muito bem! +1 cristal para sua jornada!","Resposta certeira! Você está evoluindo!","Boa! Mais um passo rumo ao domínio da matemática!"], wrong:["Quase lá! Errar faz parte do aprendizado. Vamos entender juntos?","Respira e tenta de novo na próxima. Você consegue!","Toda tentativa ensina alguma coisa. Continue!"], combo:"Incrível! Você está em uma sequência de acertos!" },
    luma: { name:"Luma", hello:"Acenda sua curiosidade! Vamos aprender algo novo.", good:["Brilhou! Sua dedicação merece +1 cristal!","Que resposta iluminada! Continue assim!","Você está conectando as ideias. Muito bem!"], wrong:["Sem pressa: aprender também é descobrir o caminho.","Vamos olhar a explicação com calma. Você chega lá!","Uma nova tentativa é uma nova chance de aprender."], combo:"Sua sequência está brilhando!" },
    brasa: { name:"Brasa", hello:"Prepare a coragem! Hoje vamos vencer um desafio.", good:["FOGO! Acertou e ganhou +1 cristal!","Essa resposta veio com tudo!","Mais um desafio vencido. Não perca o ritmo!"], wrong:["Até dragões precisam treinar. Bora para a próxima!","Não desanime: transforme esse erro em experiência.","Coragem é continuar aprendendo!"], combo:"Essa sequência está pegando fogo!" },
    flora: { name:"Flora", hello:"Toda grande descoberta começa com uma pequena semente.", good:["Seu conhecimento floresceu! +1 cristal!","Muito bem! Cada acerto faz você crescer.","Aprendizado cultivado com sucesso!"], wrong:["Tudo cresce no seu tempo. Vamos aprender com essa questão.","Um erro também nutre o conhecimento.","Continue cuidando da sua evolução!"], combo:"Olha só como sua confiança está florescendo!" },
    pixel: { name:"Pixel", hello:"Sistema pronto! Vamos resolver alguns problemas?", good:["Cálculo perfeito! +1 cristal no sistema!","Processamento concluído: resposta correta!","Seu raciocínio está afiado!"], wrong:["Bug identificado, aprendizado iniciado!","Vamos depurar esse raciocínio juntos.","Recalcular faz parte da missão!"], combo:"Combo detectado! Desempenho excelente!" },
    astro: { name:"Astro", hello:"Missão iniciada! Vamos explorar novos conhecimentos.", good:["Acerto estelar! +1 cristal conquistado!","Você alcançou mais uma estrela!","Órbita perfeita: resposta correta!"], wrong:["Nem toda rota é direta. Vamos ajustar o caminho.","Missão continua! Aprenda com essa etapa.","Não desista da exploração!"], combo:"Sua sequência está em outra galáxia!" }
  };

  let state = load();
  let combo = 0;
  let currentQuestion = "";
  let introShownFor = "";
  let hideTimer = null;
  const handled = new Set();

  function load() {
    try { return Object.assign({ rewarded: [] }, JSON.parse(localStorage.getItem(STORAGE) || "{}")); }
    catch (_) { return { rewarded: [] }; }
  }
  function save() {
    try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch (_) {}
  }
  function equipped() {
    try {
      const data = JSON.parse(localStorage.getItem("mq16_mascot_collection_v1") || "{}");
      return data.selected || "nexo";
    } catch (_) { return "nexo"; }
  }
  function persona() { return PERSONAS[equipped()] || PERSONAS.nexo; }
  function mascotArt() {
    const live = document.querySelector("#mq16Current .mq16-current-art svg");
    if (live) return live.outerHTML;
    return '<div class="mq17-avatar-fallback" aria-hidden="true">✦</div>';
  }
  function ensurePanel() {
    let panel = document.getElementById("mq17Companion");
    if (panel) return panel;
    panel = document.createElement("aside");
    panel.id = "mq17Companion";
    panel.className = "mq17-companion";
    panel.setAttribute("aria-live", "polite");
    panel.innerHTML = '<div class="mq17-avatar" id="mq17Avatar"></div><div class="mq17-bubble"><div class="mq17-name" id="mq17Name">Nexo <span>SEU COMPANHEIRO</span></div><div class="mq17-message" id="mq17Message"></div><div class="mq17-meta" id="mq17Meta"></div></div><button type="button" class="mq17-dismiss" id="mq17Dismiss" aria-label="Dispensar mensagem">×</button>';
    document.body.appendChild(panel);
    panel.querySelector("#mq17Dismiss").addEventListener("click", () => panel.classList.remove("is-visible"));
    return panel;
  }
  function speak(message, mode, persistent) {
    const panel = ensurePanel();
    const p = persona();
    panel.classList.remove("is-good", "is-wrong", "is-intro", "is-visible");
    panel.classList.add(mode || "is-intro");
    panel.querySelector("#mq17Avatar").innerHTML = mascotArt();
    panel.querySelector("#mq17Name").innerHTML = p.name + ' <span>SEU COMPANHEIRO</span>';
    panel.querySelector("#mq17Message").textContent = message;
    panel.querySelector("#mq17Meta").textContent = combo >= 2 ? "COMBO ×" + combo : "MATHQUEST · APRENDER JOGANDO";
    requestAnimationFrame(() => panel.classList.add("is-visible"));
    clearTimeout(hideTimer);
    if (!persistent) hideTimer = setTimeout(() => panel.classList.remove("is-visible"), 6500);
  }
  function visible(el) {
    if (!el || !el.isConnected || el.hidden) return false;
    const style = getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden" && el.getClientRects().length > 0;
  }
  function questionNode() {
    const selectors = ".mq14-question-card,.mq14-question,.question,[class*='question-card'],[class*='QuestionCard'],#mq15Question";
    const nodes = Array.from(document.querySelectorAll(selectors)).filter(visible);
    return nodes.length ? nodes[nodes.length - 1] : null;
  }
  function lessonTitle(node) {
    const area = node && (node.closest("[class*='lesson'],[class*='Lesson'],main,section") || node.parentElement);
    if (area) {
      const h = area.querySelector("h1,h2,h3,[role='heading']");
      if (h && visible(h) && h.textContent.trim()) return h.textContent.trim().slice(0, 70);
    }
    return "";
  }
  function checkQuestion() {
    const node = questionNode();
    if (!node) return;
    const q = (node.textContent || "").replace(/\s+/g, " ").trim().slice(0, 220);
    if (!q || q === currentQuestion) return;
    const first = !currentQuestion;
    currentQuestion = q;
    const title = lessonTitle(node);
    const lessonKey = title || q.slice(0, 50);
    if (first && introShownFor !== lessonKey) {
      introShownFor = lessonKey;
      const p = persona();
      speak(title ? p.hello + " Tema de hoje: " + title : p.hello, "is-intro", false);
    } else if (!first) {
      speak("Próxima etapa! Leia com atenção e confie no seu raciocínio.", "is-intro", false);
    }
  }
  function statusOf(button) {
    const own = String(button.className || "").toLowerCase();
    if (/(^|[\s_-])(wrong|incorrect|is-wrong|error)([\s_-]|$)/.test(own) || button.getAttribute("aria-invalid") === "true") return "wrong";
    if (/(^|[\s_-])(correct|right|is-correct|success)([\s_-]|$)/.test(own) || button.getAttribute("aria-checked") === "true" && button.getAttribute("data-correct") === "true") return "good";
    const roots = [];
    let el = button;
    for (let i = 0; el && i < 5; i++, el = el.parentElement) roots.push(el);
    const text = roots.map(x => x.innerText || x.textContent || "").join(" ").toLowerCase();
    if (/(resposta correta|muito bem|parabéns|você acertou|acertou!|correct answer)/.test(text)) return "good";
    if (/(vamos aprender|resposta incorreta|resposta errada|tente novamente|não foi dessa vez|incorreto)/.test(text)) return "wrong";
    return "";
  }
  function answerText(button) { return (button.innerText || button.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80); }
  function handleAnswer(button) {
    const result = statusOf(button);
    if (!result) return;
    const q = currentQuestion || (questionNode() && questionNode().textContent) || "questao";
    const key = q + "|" + answerText(button);
    if (handled.has(key)) return;
    handled.add(key);
    if (handled.size > 80) handled.clear();

    const p = persona();
    if (result === "good") {
      combo++;
      const line = combo >= 3 ? p.combo : p.good[Math.floor(Math.random() * p.good.length)];
      speak(line, "is-good", false);
      const isDaily = !!button.closest(".mq15-dialog,.mq15-options");
      if (!isDaily) reward(key);
    } else {
      combo = 0;
      speak(p.wrong[Math.floor(Math.random() * p.wrong.length)], "is-wrong", false);
    }
  }
  function reward(key) {
    if (state.rewarded.includes(key)) return;
    state.rewarded.push(key);
    if (state.rewarded.length > 250) state.rewarded = state.rewarded.slice(-200);
    save();
    if (typeof window.MQ16RewardCrystal === "function") window.MQ16RewardCrystal(1);
  }
  function onClick(event) {
    const target = event.target && event.target.closest && event.target.closest(".mq15-option,.answer,.mq14-answer,button[data-answer],[role='radio'],button[class*='answer']");
    if (!target) return;
    setTimeout(() => handleAnswer(target), 80);
    setTimeout(() => handleAnswer(target), 260);
  }
  function observe() {
    checkQuestion();
    const observer = new MutationObserver(() => {
      checkQuestion();
      const panel = document.getElementById("mq17Companion");
      if (panel && panel.classList.contains("is-visible")) panel.querySelector("#mq17Avatar").innerHTML = mascotArt();
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class", "hidden", "aria-invalid"] });
    document.addEventListener("click", onClick, true);
    window.addEventListener("storage", event => {
      if (event.key === "mq16_mascot_collection_v1") {
        state = load();
        const panel = document.getElementById("mq17Companion");
        if (panel && panel.classList.contains("is-visible")) panel.querySelector("#mq17Avatar").innerHTML = mascotArt();
      }
    });
  }
  function boot() {
    ensurePanel();
    observe();
    window.MQ17Companions = {
      show: (message) => speak(String(message || ""), "is-intro", false),
      getCombo: () => combo,
      version: "17.0"
    };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();