/* MathQuest 16.0 — evolução funcional e visual */
(() => {
  "use strict";
  const KEY = "mq15_daily_challenge_v1";
  const questions = [
  {
    "id": "fa1",
    "topic": "Função afim",
    "q": "Na função f(x) = 2x + 3, quanto vale f(4)?",
    "a": [
      "9",
      "11",
      "14"
    ],
    "ok": 1,
    "why": "Substituímos x por 4: 2 × 4 + 3 = 11."
  },
  {
    "id": "fa2",
    "topic": "Função afim",
    "q": "Qual é o coeficiente angular de f(x) = -3x + 5?",
    "a": [
      "5",
      "-3",
      "3"
    ],
    "ok": 1,
    "why": "O coeficiente angular é o número que acompanha x: -3."
  },
  {
    "id": "fa3",
    "topic": "Função afim",
    "q": "Uma função é f(x) = x + 7. Qual é sua raiz?",
    "a": [
      "-7",
      "7",
      "0"
    ],
    "ok": 0,
    "why": "Fazemos x + 7 = 0, então x = -7."
  },
  {
    "id": "fa4",
    "topic": "Função afim",
    "q": "Se f(x) = 4x - 2, qual é f(2)?",
    "a": [
      "4",
      "6",
      "8"
    ],
    "ok": 1,
    "why": "4 × 2 - 2 = 6."
  },
  {
    "id": "geo1",
    "topic": "Geometria",
    "q": "Um retângulo mede 8 cm por 5 cm. Qual é sua área?",
    "a": [
      "13 cm²",
      "26 cm²",
      "40 cm²"
    ],
    "ok": 2,
    "why": "Área do retângulo = base × altura = 8 × 5 = 40 cm²."
  },
  {
    "id": "geo2",
    "topic": "Geometria",
    "q": "Qual é a soma dos ângulos internos de um triângulo?",
    "a": [
      "90°",
      "180°",
      "360°"
    ],
    "ok": 1,
    "why": "A soma dos ângulos internos de qualquer triângulo é 180°."
  },
  {
    "id": "geo3",
    "topic": "Geometria",
    "q": "Um quadrado tem lado de 6 cm. Qual é seu perímetro?",
    "a": [
      "12 cm",
      "24 cm",
      "36 cm"
    ],
    "ok": 1,
    "why": "O perímetro é 4 × 6 = 24 cm."
  },
  {
    "id": "geo4",
    "topic": "Geometria",
    "q": "Qual é o nome do polígono que possui 5 lados?",
    "a": [
      "Pentágono",
      "Hexágono",
      "Heptágono"
    ],
    "ok": 0,
    "why": "Um polígono de cinco lados é um pentágono."
  },
  {
    "id": "frac1",
    "topic": "Frações",
    "q": "Quanto é 3/4 de 20?",
    "a": [
      "5",
      "15",
      "16"
    ],
    "ok": 1,
    "why": "20 ÷ 4 = 5; depois 5 × 3 = 15."
  },
  {
    "id": "frac2",
    "topic": "Frações",
    "q": "Qual fração é equivalente a 2/3?",
    "a": [
      "4/6",
      "3/5",
      "2/6"
    ],
    "ok": 0,
    "why": "Multiplicando numerador e denominador por 2, obtemos 4/6."
  },
  {
    "id": "frac3",
    "topic": "Frações",
    "q": "Quanto é 1/2 + 1/4?",
    "a": [
      "2/6",
      "3/4",
      "1/8"
    ],
    "ok": 1,
    "why": "1/2 equivale a 2/4; então 2/4 + 1/4 = 3/4."
  },
  {
    "id": "frac4",
    "topic": "Frações",
    "q": "Em 5/8, qual número é o denominador?",
    "a": [
      "5",
      "8",
      "13"
    ],
    "ok": 1,
    "why": "O denominador é o número de baixo: 8."
  },
  {
    "id": "por1",
    "topic": "Porcentagem",
    "q": "Quanto é 15% de 200?",
    "a": [
      "15",
      "30",
      "45"
    ],
    "ok": 1,
    "why": "10% de 200 é 20 e 5% é 10; total: 30."
  },
  {
    "id": "por2",
    "topic": "Porcentagem",
    "q": "Um produto de R$ 80 teve desconto de 25%. Qual o novo preço?",
    "a": [
      "R$ 60",
      "R$ 65",
      "R$ 55"
    ],
    "ok": 0,
    "why": "25% de 80 é 20; 80 - 20 = 60."
  },
  {
    "id": "por3",
    "topic": "Porcentagem",
    "q": "Uma turma tem 40 alunos e 50% são meninas. Quantas meninas há?",
    "a": [
      "10",
      "20",
      "30"
    ],
    "ok": 1,
    "why": "50% é a metade: 40 ÷ 2 = 20."
  },
  {
    "id": "alg1",
    "topic": "Equações",
    "q": "Resolva: 3x + 4 = 19.",
    "a": [
      "x = 4",
      "x = 5",
      "x = 6"
    ],
    "ok": 1,
    "why": "3x = 15; dividindo por 3, x = 5."
  },
  {
    "id": "alg2",
    "topic": "Equações",
    "q": "Qual valor de x resolve 2x - 8 = 10?",
    "a": [
      "7",
      "8",
      "9"
    ],
    "ok": 2,
    "why": "2x = 18; portanto x = 9."
  },
  {
    "id": "alg3",
    "topic": "Equações",
    "q": "Se x/5 = 4, quanto vale x?",
    "a": [
      "9",
      "20",
      "25"
    ],
    "ok": 1,
    "why": "Multiplicamos os dois lados por 5: x = 20."
  },
  {
    "id": "pot1",
    "topic": "Potenciação",
    "q": "Quanto vale 2⁵?",
    "a": [
      "10",
      "16",
      "32"
    ],
    "ok": 2,
    "why": "2⁵ = 2 × 2 × 2 × 2 × 2 = 32."
  },
  {
    "id": "pot2",
    "topic": "Potenciação",
    "q": "Qual é o resultado de 10³?",
    "a": [
      "100",
      "1.000",
      "10.000"
    ],
    "ok": 1,
    "why": "10³ = 10 × 10 × 10 = 1.000."
  },
  {
    "id": "pot3",
    "topic": "Potenciação",
    "q": "Quanto é 3² + 2²?",
    "a": [
      "11",
      "13",
      "25"
    ],
    "ok": 1,
    "why": "3² = 9 e 2² = 4; 9 + 4 = 13."
  },
  {
    "id": "est1",
    "topic": "Estatística",
    "q": "Qual é a média de 4, 6 e 8?",
    "a": [
      "6",
      "7",
      "8"
    ],
    "ok": 0,
    "why": "(4 + 6 + 8) ÷ 3 = 6."
  },
  {
    "id": "est2",
    "topic": "Estatística",
    "q": "Na sequência 2, 3, 3, 5, 8, qual é a moda?",
    "a": [
      "2",
      "3",
      "5"
    ],
    "ok": 1,
    "why": "Moda é o valor que mais aparece: 3."
  },
  {
    "id": "est3",
    "topic": "Estatística",
    "q": "Qual é a mediana de 1, 4, 7, 9 e 12?",
    "a": [
      "4",
      "7",
      "9"
    ],
    "ok": 1,
    "why": "O valor central da lista ordenada é 7."
  },
  {
    "id": "prob1",
    "topic": "Probabilidade",
    "q": "Ao lançar um dado comum, qual a chance de sair 6?",
    "a": [
      "1/2",
      "1/6",
      "1/3"
    ],
    "ok": 1,
    "why": "Há 1 resultado favorável entre 6 resultados possíveis."
  },
  {
    "id": "prob2",
    "topic": "Probabilidade",
    "q": "Uma moeda é lançada. Qual a chance de sair cara?",
    "a": [
      "25%",
      "50%",
      "75%"
    ],
    "ok": 1,
    "why": "Cara é um dos dois resultados igualmente possíveis: 1/2 = 50%."
  },
  {
    "id": "raz1",
    "topic": "Razão e proporção",
    "q": "A razão entre 8 e 4, nessa ordem, é:",
    "a": [
      "2",
      "4",
      "12"
    ],
    "ok": 0,
    "why": "8 ÷ 4 = 2."
  },
  {
    "id": "raz2",
    "topic": "Razão e proporção",
    "q": "Se 2 cadernos custam R$ 10, quanto custam 6 cadernos iguais?",
    "a": [
      "R$ 20",
      "R$ 25",
      "R$ 30"
    ],
    "ok": 2,
    "why": "Cada caderno custa R$ 5; 6 custam R$ 30."
  },
  {
    "id": "un1",
    "topic": "Medidas",
    "q": "Quantos centímetros há em 2,5 metros?",
    "a": [
      "25 cm",
      "250 cm",
      "2.500 cm"
    ],
    "ok": 1,
    "why": "1 metro tem 100 cm; 2,5 × 100 = 250 cm."
  },
  {
    "id": "un2",
    "topic": "Medidas",
    "q": "Quantos minutos há em 2 horas e meia?",
    "a": [
      "120",
      "150",
      "180"
    ],
    "ok": 1,
    "why": "2 horas = 120 minutos; mais 30 = 150."
  }
];
  const today = () => new Date().toLocaleDateString("en-CA");
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) { return {}; } };
  const save = value => localStorage.setItem(KEY, JSON.stringify(value));
  function applyIdentity() {
    document.title = "MathQuest 17.0 — Empire Universe";
    const badge = document.querySelector(".brand small");
    if (badge) badge.textContent = "17.0";
    document.querySelectorAll(".mq14-launch-tag").forEach(el => {
      el.textContent = "MATHQUEST 17.0 · PORTAL DE APRENDIZADO";
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
    <div class="mq15-overlay" id="mq15Overlay" aria-hidden="true"><section class="mq15-dialog" role="dialog" aria-modal="true" aria-labelledby="mq15Title"><button class="mq15-close" id="mq15Close" aria-label="Fechar">×</button><div class="mq15-dialog-kicker">MATHQUEST 17.0 · MISSÃO EXTRA</div><h2 id="mq15Title">Desafio diário</h2><div class="mq15-progress"><i id="mq15Progress"></i></div><p class="mq15-counter" id="mq15Counter">Questão 1 de 3</p><p class="mq15-topic" id="mq15Topic"></p><h3 id="mq15Question"></h3><div class="mq15-options" id="mq15Options"></div><p class="mq15-feedback" id="mq15Feedback" aria-live="polite"></p><button class="mq15-next" id="mq15Next" disabled>CONTINUAR</button></section></div>`;
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
  let order=[], step=0, points=0, locked=false, completed=false, selectedQuestions=[];
  function dailySelection(day, data) {
    const seedText = day.replaceAll("-","");
    let seed = Number(seedText) || 1;
    const random = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const recent = (Array.isArray(data.history) ? data.history : []).slice(-6);
    const used = new Set(recent.flatMap(item => Array.isArray(item.ids) ? item.ids : []));
    let pool = questions.map((q,i)=>i).filter(i=>!used.has(questions[i].id));
    if (pool.length < 3) pool = questions.map((q,i)=>i);
    for (let i=pool.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
    const picked=[]; const topics=new Set();
    for (const i of pool) { const topic=questions[i].topic; if (!topics.has(topic)) { picked.push(i); topics.add(topic); } if (picked.length===3) break; }
    return picked;
  }
  function begin() {
    const d=read(), day=today();
    order = dailySelection(day,d);
    selectedQuestions = order.map(i=>questions[i]);
    step=0; points=0; locked=false; completed=false;
    if(d.day===day && d.completed){ showComplete(d.points||0,true); return; }
    renderQuestion();
  }
  function renderQuestion() {
    const q=questions[order[step]];
    document.getElementById("mq15Counter").textContent=`Questão ${step+1} de 3`;
    document.getElementById("mq15Topic").textContent=q.topic.toUpperCase();
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
    document.getElementById("mq15Feedback").textContent=(good?"Muito bem! +10 pontos e +1 cristal. ":"Vamos aprender: ")+q.why;
    const next=document.getElementById("mq15Next"); next.disabled=false;
    next.textContent=step===2?"FINALIZAR":"PRÓXIMA QUESTÃO";
  }
  function next() {
    if(completed){document.getElementById("mq15Overlay").classList.remove("is-open");return;}
    if(!locked)return;
    if(step<2){step++;locked=false;renderQuestion();return;}
    const d=read();
    const history=(Array.isArray(d.history)?d.history:[]).filter(item=>item.day!==today());
    history.push({day:today(),ids:selectedQuestions.map(q=>q.id)});
    const result={day:today(),completed:true,points,history:history.slice(-7)};
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
