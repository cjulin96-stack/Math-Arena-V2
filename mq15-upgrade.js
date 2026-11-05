/* MathQuest 16.0 — evolução funcional e visual */
(() => {
  "use strict";
  const KEY = "mq15_daily_challenge_v1";
  const questions = [
    {q:"Quanto é 15 × 6?",a:["80","90","96"],ok:1,why:"15 × 6 = 90."},
    {q:"Qual é 25% de 80?",a:["15","20","25"],ok:1,why:"25% é a quarta parte: 80 ÷ 4 = 20."},
    {q:"Resolva: 3x = 27",a:["6","8","9"],ok:2,why:"27 ÷ 3 = 9."},
    {q:"Qual é a área de um quadrado de lado 7?",a:["14","28","49"],ok:2,why:"Área = lado × lado = 7 × 7 = 49."},
    {q:"Quanto é 2/5 + 1/5?",a:["3/5","3/10","2/10"],ok:0,why:"Com denominadores iguais, somamos 2 + 1 e mantemos o 5."}
  ];
  const today = () => new Date().toLocaleDateString("en-CA");
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) { return {}; } };
  const save = value => localStorage.setItem(KEY, JSON.stringify(value));
  function applyIdentity() {
    document.title = "MathQuest 15.0 — Empire Universe";
    const badge = document.querySelector(".brand small");
    if (badge) badge.textContent = "15.0";
    document.querySelectorAll(".mq14-launch-tag").forEach(el => {
      el.textContent = "MATHQUEST 16.0 · PORTAL DE APRENDIZADO";
    });
    document.body.classList.add("mq15-active");
  }
  function enhanceLesson(root = document) {
    root.querySelectorAll(".question, .mq14-question, .mq14-question-card").forEach(el => {
      if (el.dataset.mq15Motion) return;
      el.dataset.mq15Motion = "1";
      el.classList.add("mq15-question-enter");
    });
    root.querySelectorAll(".answer, .mq14-answer, button[data-answer]").forEach((el, index) => {
      if (el.dataset.mq15Motion) return;
      el.dataset.mq15Motion = "1";
      el.style.setProperty("--mq15-order", index % 6);
      el.classList.add("mq15-answer-enter");
      el.addEventListener("click", () => {
        el.classList.remove("mq15-tap");
        requestAnimationFrame(() => el.classList.add("mq15-tap"));
      }, {passive:true});
    });
  }
  function upgradeMascot(root = document) {
    root.querySelectorAll(".mq14-launch-mascot").forEach(box => {
      if (box.dataset.mq15Ready === "1") return;
      const avatar = box.textContent.trim();
      const types = {"🦊":"fox","🐉":"dragon","🦉":"owl","🐸":"frog","🦄":"unicorn","🐯":"tiger","🤖":"robot","🐙":"octo"};
      const type = types[avatar] || "fox";
      if (typeof window.mq14Art === "function") {
        box.innerHTML = window.mq14Art(type);
        box.dataset.mq15Ready = "1";
        box.setAttribute("aria-label", "Mascote original do MathQuest");
      }
    });
  }
  function challengeMarkup() {
    return `<div class="mq15-daily-launch" id="mq15DailyLaunch"><span class="mq15-daily-icon">⚡</span><span><b>Desafio diário</b><small>Uma missão nova de matemática</small></span><button type="button" id="mq15DailyOpen">JOGAR</button></div>
    <div class="mq15-overlay" id="mq15Overlay" aria-hidden="true"><section class="mq15-dialog" role="dialog" aria-modal="true" aria-labelledby="mq15Title"><button class="mq15-close" id="mq15Close" aria-label="Fechar">×</button><div class="mq15-dialog-kicker">MATHQUEST 15.0 · MISSÃO EXTRA</div><h2 id="mq15Title">Desafio diário</h2><div class="mq15-progress"><i id="mq15Progress"></i></div><p class="mq15-counter" id="mq15Counter">Questão 1 de 3</p><h3 id="mq15Question"></h3><div class="mq15-options" id="mq15Options"></div><p class="mq15-feedback" id="mq15Feedback" aria-live="polite"></p><button class="mq15-next" id="mq15Next" disabled>CONTINUAR</button></section></div>`;
  }
  function mountChallenge() {
    if (document.getElementById("mq15DailyLaunch")) return;
    const host = document.querySelector("main") || document.querySelector(".main-content") || document.querySelector(".app-shell") || document.body;
    const wrap = document.createElement("div");
    wrap.innerHTML = challengeMarkup();
    host.prepend(wrap);
    const overlay = document.getElementById("mq15Overlay");
    const open = () => { overlay.classList.add("is-open"); overlay.setAttribute("aria-hidden","false"); begin(); };
    const close = () => { overlay.classList.remove("is-open"); overlay.setAttribute("aria-hidden","true"); };
    document.getElementById("mq15DailyOpen").addEventListener("click", open);
    document.getElementById("mq15Close").addEventListener("click", close);
    overlay.addEventListener("click", e => { if(e.target===overlay) close(); });
    document.getElementById("mq15Next").addEventListener("click", next);
    renderDailyStatus();
  }
  let order=[], step=0, points=0, locked=false, completed=false;
  function begin() {
    const d=read(), day=today();
    order = questions.map((_,i)=>i).sort((a,b)=>((a*17+Number(day.replaceAll("-","")))%31)-((b*17+Number(day.replaceAll("-","")))%31)).slice(0,3);
    step=0; points=0; locked=false; completed=false;
    if(d.day===day && d.completed){ showComplete(d.points||0,true); return; }
    renderQuestion();
  }
  function renderQuestion() {
    const q=questions[order[step]];
    document.getElementById("mq15Counter").textContent=`Questão ${step+1} de 3`;
    document.getElementById("mq15Progress").style.width=(step/3*100)+"%";
    document.getElementById("mq15Question").textContent=q.q;
    document.getElementById("mq15Feedback").textContent="";
    const options=document.getElementById("mq15Options"); options.innerHTML="";
    q.a.forEach((answer,i)=>{
      const b=document.createElement("button"); b.type="button"; b.className="mq15-option"; b.textContent=answer;
      b.addEventListener("click",()=>choose(i,b)); options.appendChild(b);
    });
    const next=document.getElementById("mq15Next"); next.disabled=true; next.textContent="CONTINUAR";
  }
  function choose(i,button) {
    if(locked)return; locked=true;
    const q=questions[order[step]], good=i===q.ok;
    document.querySelectorAll(".mq15-option").forEach((el,n)=>{el.disabled=true;if(n===q.ok)el.classList.add("is-correct");else if(n===i)el.classList.add("is-wrong");});
    if(good){points+=10;if(typeof window.MQ16RewardCrystal==='function')window.MQ16RewardCrystal(1);}
    document.getElementById("mq15Feedback").textContent=(good?"Muito bem! +10 pontos. ":"Vamos aprender: ")+q.why;
    const next=document.getElementById("mq15Next"); next.disabled=false;
    next.textContent=step===2?"FINALIZAR":"PRÓXIMA QUESTÃO";
  }
  function next() {
    if(completed){document.getElementById("mq15Overlay").classList.remove("is-open");return;}
    if(!locked)return;
    if(step<2){step++;locked=false;renderQuestion();return;}
    const d=read(); const result={day:today(),completed:true,points};
    save(result); showComplete(points,false); renderDailyStatus();
  }
  function showComplete(value,already) {
    completed=true;
    document.getElementById("mq15Progress").style.width="100%";
    document.getElementById("mq15Counter").textContent="MISSÃO CONCLUÍDA";
    document.getElementById("mq15Question").textContent=already?"Você já concluiu o desafio de hoje!":"Você concluiu o desafio diário!";
    document.getElementById("mq15Options").innerHTML="";
    document.getElementById("mq15Feedback").textContent=`Pontuação: ${value} de 30 pontos. Volte amanhã para uma nova missão.`;
    const nextButton=document.getElementById("mq15Next");nextButton.disabled=false;nextButton.textContent="FECHAR";
  }
  function renderDailyStatus() {
    const d=read(), todayDone=d.day===today()&&d.completed;
    const label=document.querySelector("#mq15DailyLaunch small");
    if(label)label.textContent=todayDone?`Concluído hoje · ${d.points||0} pontos`:"Uma missão nova de matemática";
    const button=document.getElementById("mq15DailyOpen");
    if(button)button.textContent=todayDone?"REVER":"JOGAR";
  }
  function boot() {
    applyIdentity(); enhanceLesson(); upgradeMascot(); mountChallenge();
    const observer=new MutationObserver(records=>{
      for(const record of records) record.addedNodes.forEach(node=>{
        if(node.nodeType===1){enhanceLesson(node);upgradeMascot(node);}
      });
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
