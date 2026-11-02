
(() => {
"use strict";

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const STORE = "mathquest_v1";

const units = [
 {title:"Operações essenciais",sub:"Domine os cálculos do dia a dia.",icon:"＋",topic:"Operações",ids:["op1","op2","op3","op4"],color:"purple"},
 {title:"O universo das frações",sub:"Entenda partes, equivalências e somas.",icon:"½",topic:"Frações",ids:["fr1","fr2","fr3"],color:"orange"},
 {title:"Primeiros passos na álgebra",sub:"Descubra valores e resolva equações.",icon:"x²",topic:"Álgebra",ids:["al1","al2"],color:"blue"},
 {title:"Formas e medidas",sub:"Explore perímetros e áreas.",icon:"△",topic:"Geometria",ids:["geo1","geo2"],color:"green"},
 {title:"Porcentagens na prática",sub:"Descontos e partes de um total.",icon:"％",topic:"Porcentagem",ids:["por1","por2"],color:"pink"},
 {title:"Potências e raízes",sub:"Descubra padrões numéricos.",icon:"ⁿ",topic:"Potências",ids:["pot1","pot2"],color:"yellow"}
];

const achievements = [
 {id:"first",icon:"🌱",name:"Primeiro passo",desc:"Conclua sua primeira questão.",test:s=>s.correct>=1},
 {id:"ten",icon:"🎯",name:"Foco total",desc:"Acerte 10 questões.",test:s=>s.correct>=10},
 {id:"xp100",icon:"⚡",name:"Centena de XP",desc:"Acumule 100 XP.",test:s=>s.xp>=100},
 {id:"unit",icon:"📘",name:"Unidade completa",desc:"Conclua todas as lições de uma unidade.",test:s=>units.some(u=>u.ids.every(id=>s.done.includes(id)))},
 {id:"streak3",icon:"🔥",name:"Constância",desc:"Alcance uma sequência de 3 dias.",test:s=>s.streak>=3},
 {id:"perfect",icon:"💎",name:"Precisão máxima",desc:"Acerte 5 questões seguidas.",test:s=>s.bestCombo>=5},
 {id:"xp500",icon:"🏆",name:"Mestre em progresso",desc:"Acumule 500 XP.",test:s=>s.xp>=500},
 {id:"all",icon:"👑",name:"Explorador completo",desc:"Conclua todas as questões da trilha.",test:s=>s.done.length>=window.MATHQUEST_QUESTIONS.length}
];

const fresh = () => ({
 name:"Matemático",
 xp:0,
 gems:0,
 correct:0,
 wrong:0,
 done:[],
 streak:0,
 lastDay:null,
 combo:0,
 bestCombo:0,
 unlocked:[],
 dailyXP:{},
 players:[],
 sound:true
});

let state = load();

let session = {
 questions:[],
 index:0,
 hearts:5,
 selected:null,
 answered:false,
 lessonUnit:null,
 correct:0,
 practice:false
};

function load(){
 try {
  return {...fresh(),...JSON.parse(localStorage.getItem(STORE)||"{}")};
 } catch {
  return fresh();
 }
}

function save(){
 localStorage.setItem(STORE,JSON.stringify(state));
 renderAll();
}

function today(){
 return new Date().toLocaleDateString("en-CA");
}

function registerDay(){
 const d = today();

 if(state.lastDay !== d){
  const y = new Date();
  y.setDate(y.getDate()-1);
  const yd = y.toLocaleDateString("en-CA");

  state.streak = state.lastDay === yd ? state.streak+1 : 1;
  state.lastDay = d;
 }
}

function level(){
 return Math.floor(state.xp/100)+1;
}

function toast(msg){
 const t = $("#toast");
 if(!t) return;

 t.textContent = msg;
 t.classList.add("show");

 setTimeout(()=>t.classList.remove("show"),2300);
}

function checkAchievements(){
 achievements.forEach(a=>{
  if(!state.unlocked.includes(a.id) && a.test(state)){
   state.unlocked.push(a.id);
   toast("Conquista desbloqueada: "+a.name);
  }
 });
}

function renderAll(){
 renderHeader();
 renderMap();
 renderAchievements();
 renderStats();
 renderRanking();

 $("#sideName").textContent = state.name;
 $("#sideLevel").textContent = level();
 $("#avatarInitial").textContent = (state.name[0]||"M").toUpperCase();
 $("#streakSide").textContent = state.streak+" dias";
}

function renderHeader(){
 $("#streakTop").textContent = state.streak;
 $("#gemsTop").textContent = state.gems;
 $("#xpTop").textContent = state.xp;

 $("#dateLabel").textContent =
  new Date().toLocaleDateString("pt-BR",{
   weekday:"long",
   day:"numeric",
   month:"long"
  }).toUpperCase();
}

function renderMap(){
 const done = state.done.length;
 const total = window.MATHQUEST_QUESTIONS.length;

 $("#progressLabel").textContent =
  `${done} de ${total} questões concluídas`;

 $("#overallBar").style.width = (done/total*100)+"%";

 $("#courseMap").innerHTML = units.map((u,i)=>{
  const completed = u.ids.every(id=>state.done.includes(id));

  const locked =
   i>0 && !units[i-1].ids.every(id=>state.done.includes(id));

  const count = u.ids.filter(id=>state.done.includes(id)).length;

  return `
   <article class="unit-card ${completed?"completed":""} ${locked?"locked":""}">
    <div class="unit-top">
     <div class="unit-icon">${u.icon}</div>
     <span class="unit-number">UNIDADE ${String(i+1).padStart(2,"0")}</span>
    </div>

    <h3>${u.title}</h3>
    <p>${u.sub}</p>

    <div class="unit-bottom">
     <small>${count}/${u.ids.length} questões concluídas</small>
     <button data-unit="${i}" ${locked?"disabled":""}>
      ${completed?"Revisar":locked?"🔒 Bloqueada":"Começar →"}
     </button>
    </div>
   </article>
  `;
 }).join("");

 $$("[data-unit]").forEach(b=>{
  b.addEventListener("click",()=>startUnit(+b.dataset.unit));
 });
}

function renderAchievements(){
 $("#achievementGrid").innerHTML = achievements.map(a=>{
  const ok = state.unlocked.includes(a.id);

  return `
   <div class="achievement ${ok?"":"locked"}">
    <div class="medal">${ok?a.icon:"🔒"}</div>
    <div>
     <b>${a.name}</b>
     <small>${a.desc}</small>
    </div>
   </div>
  `;
 }).join("");
}

function renderStats(){
 $("#statXP").textContent = state.xp;
 $("#statCorrect").textContent = state.correct;

 $("#statAccuracy").textContent =
  (state.correct+state.wrong
   ? Math.round(state.correct/(state.correct+state.wrong)*100)
   : 0)+"%";

 $("#statLessons").textContent = state.done.length;

 const days = [];

 for(let i=6;i>=0;i--){
  const d = new Date();
  d.setDate(d.getDate()-i);

  const k = d.toLocaleDateString("en-CA");

  days.push({
   k,
   label:d.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".",""),
   v:state.dailyXP[k]||0
  });
 }

 const max = Math.max(20,...days.map(x=>x.v));

 $("#weeklyChart").innerHTML = days.map(x=>`
  <div class="chart-day">
   <div class="chart-bar"
    title="${x.v} XP"
    style="height:${Math.max(4,x.v/max*100)}%">
   </div>
   <small>${x.label}</small>
  </div>
 `).join("");
}

function renderRanking(){
 const rows = [
  {name:state.name,xp:state.xp,you:true},
  ...(state.players||[])
 ].sort((a,b)=>b.xp-a.xp);

 $("#rankingRows").innerHTML = rows.map((p,i)=>`
  <div class="ranking-row">
   <b>#${i+1}</b>
   <div class="rank-user">
    <span class="rank-avatar">${p.name[0].toUpperCase()}</span>
    ${escapeHTML(p.name)} ${p.you?"(você)":""}
   </div>
   <b>${p.xp} XP</b>
  </div>
 `).join("");
}

function escapeHTML(s){
 return String(s).replace(/[&<>"']/g,c=>({
  "&":"&amp;",
  "<":"&lt;",
  ">":"&gt;",
  '"':"&quot;",
  "'":"&#39;"
 }[c]));
}

function switchView(view){
 $$(".view").forEach(v=>{
  v.classList.toggle("active",v.id==="view-"+view);
 });

 $$(".nav-item[data-view]").forEach(b=>{
  b.classList.toggle("active",b.dataset.view===view);
 });

 const titles = {
  learn:"Continue aprendendo",
  practice:"Treine suas habilidades",
  achievements:"Suas conquistas",
  ranking:"Ranking local",
  stats:"Sua evolução",
  settings:"Configurações"
 };

 $("#pageTitle").textContent = titles[view]||"MathQuest";

 renderAll();
}

function startUnit(i){
 if(i>0 && !units[i-1].ids.every(id=>state.done.includes(id))){
  toast("Conclua a unidade anterior primeiro.");
  return;
 }

 const u = units[i];

 session = {
  questions:u.ids.map(id=>
   window.MATHQUEST_QUESTIONS.find(q=>q.id===id)
  ).filter(Boolean),
  index:0,
  hearts:5,
  selected:null,
  answered:false,
  lessonUnit:i,
  correct:0,
  practice:false
 };

 openLesson();
}

function startPractice(topic){
 let qs = window.MATHQUEST_QUESTIONS.filter(q=>q.topic===topic);

 if(!qs.length) return;

 session = {
  questions:shuffle(qs).slice(0,Math.min(5,qs.length)),
  index:0,
  hearts:5,
  selected:null,
  answered:false,
  lessonUnit:null,
  correct:0,
  practice:true
 };

 openLesson();
}

function shuffle(a){
 return [...a].sort(()=>Math.random()-.5);
}

function openLesson(){
 $("#lessonModal").classList.remove("hidden");
 renderQuestion();
}

function closeLesson(){
 if(session.answered || session.index===0){
  $("#lessonModal").classList.add("hidden");
  return;
 }

 if(confirm("Sair agora? Seu progresso desta rodada não será contado.")){
  $("#lessonModal").classList.add("hidden");
 }
}

function renderQuestion(){
 const q = session.questions[session.index];

 if(!q){
  finishLesson();
  return;
 }

 session.selected = null;
 session.answered = false;

 $("#lessonProgress").style.width =
  (session.index/session.questions.length*100)+"%";

 $("#heartsCount").textContent = session.hearts;

 $("#lessonContent").innerHTML = `
  <div class="lesson-kicker">
   ${session.practice?"PRÁTICA LIVRE":`UNIDADE ${session.lessonUnit+1}`}
   · QUESTÃO ${session.index+1} DE ${session.questions.length}
  </div>

  <h2>${q.title}</h2>
  <p class="lesson-prompt">${q.prompt}</p>

  <div class="question-box">${q.expression}</div>

  <div class="answer-options">
   ${q.options.map((o,i)=>`
    <button class="answer-option" data-answer="${escapeHTML(o)}">
     ${String.fromCharCode(65+i)}. &nbsp;${escapeHTML(o)}
    </button>
   `).join("")}
  </div>

  <div class="lesson-bottom">
   <div class="feedback" id="feedback">
    Escolha uma alternativa para continuar.
   </div>

   <button class="btn btn-primary" id="checkAnswer" disabled>
    Conferir
   </button>
  </div>
 `;

 $$("[data-answer]").forEach(b=>{
  b.addEventListener("click",()=>{
   if(session.answered) return;

   session.selected = b.dataset.answer;

   $$("[data-answer]").forEach(x=>{
    x.classList.toggle("selected",x===b);
   });

   $("#checkAnswer").disabled = false;
  });
 });

 $("#checkAnswer").addEventListener("click",()=>{
  session.answered ? nextQuestion() : checkAnswer();
 });
}

function checkAnswer(){
 const q = session.questions[session.index];
 const correct = session.selected === q.answer;

 session.answered = true;

 const fb = $("#feedback");

 if(correct){
  session.correct++;
  state.correct++;
  state.combo++;

  state.bestCombo = Math.max(state.bestCombo,state.combo);

  state.xp += 10;
  state.gems += 2;

  state.dailyXP[today()] = (state.dailyXP[today()]||0)+10;

  registerDay();

  if(!session.practice && !state.done.includes(q.id)){
   state.done.push(q.id);
  }

  fb.textContent = "Muito bem! "+q.explain;
  fb.className = "feedback good";

  confetti();

 } else {
  state.wrong++;
  state.combo = 0;
  session.hearts--;

  fb.textContent = "Quase! "+q.explain;
  fb.className = "feedback bad";
 }

 $$("[data-answer]").forEach(b=>{
  b.disabled = true;

  if(b.dataset.answer===q.answer){
   b.classList.add("correct");
  } else if(b.dataset.answer===session.selected){
   b.classList.add("wrong");
  }
 });

 $("#heartsCount").textContent = session.hearts;

 $("#checkAnswer").textContent =
  session.hearts<=0 ? "Ver resultado" : "Continuar";

 checkAchievements();
 save();
}

function nextQuestion(){
 if(session.hearts<=0 || session.index>=session.questions.length-1){
  finishLesson();
  return;
 }

 session.index++;
 renderQuestion();
}

function finishLesson(){
 const total = session.questions.length;
 const score = session.correct;

 $("#lessonProgress").style.width = "100%";

 $("#lessonContent").innerHTML = `
  <div class="lesson-kicker">RODADA FINALIZADA</div>

  <h2>${score===total?"Excelente trabalho!":"Você avançou!"}</h2>

  <div class="question-box">
   ${score} / ${total}
   <small style="font-size:14px">acertos</small>
  </div>

  <p class="lesson-prompt">
   Você ganhou ${score*10} XP nesta rodada.
   Continue praticando para fortalecer suas habilidades.
  </p>

  <div class="lesson-bottom">
   <div class="feedback good">
    Cada tentativa ajuda você a aprender.
   </div>

   <button class="btn btn-primary" id="finishBtn">
    Concluir
   </button>
  </div>
 `;

 $("#finishBtn").addEventListener("click",()=>{
  $("#lessonModal").classList.add("hidden");
  renderAll();
  switchView("learn");
 });

 save();
}

function confetti(){
 const wrap = document.createElement("div");
 wrap.className = "confetti";

 for(let i=0;i<28;i++){
  const p = document.createElement("i");

  p.style.left = Math.random()*100+"%";
  p.style.animationDelay = Math.random()*.35+"s";

  p.style.background = [
   "#8b73f5",
   "#ffc46b",
   "#38c99a",
   "#f27d9c"
  ][i%4];

  wrap.appendChild(p);
 }

 document.body.appendChild(wrap);

 setTimeout(()=>wrap.remove(),1800);
}

/* NAVEGAÇÃO */

$$(".nav-item[data-view]").forEach(b=>{
 b.addEventListener("click",()=>switchView(b.dataset.view));
});

$("#continueBtn").addEventListener("click",()=>{
 const i = units.findIndex((u,j)=>
  j===0 ||
  units[j-1].ids.every(id=>state.done.includes(id)) &&
  !u.ids.every(id=>state.done.includes(id))
 );

 startUnit(i<0?0:i);
});

$$(".practice-card").forEach(b=>{
 b.addEventListener("click",()=>startPractice(b.dataset.topic));
});

$("#closeLesson").addEventListener("click",closeLesson);

/* PERFIL */

$("#saveNameBtn").addEventListener("click",()=>{
 const n = $("#playerName").value.trim();

 if(!n){
  toast("Digite um nome primeiro.");
  return;
 }

 state.name = n;
 save();
 toast("Nome atualizado!");
});

/* JOGADORES */

$("#addPlayerBtn").addEventListener("click",()=>{
 const n = prompt("Nome do novo jogador:");

 if(!n || !n.trim()) return;

 state.players.push({
  name:n.trim().slice(0,18),
  xp:0
 });

 save();
 toast("Perfil adicionado!");
});

/* SOM */

$("#soundToggle").checked = state.sound;

$("#soundToggle").addEventListener("change",e=>{
 state.sound = e.target.checked;
 save();
});

/* REINICIAR */

$("#resetBtn").addEventListener("click",()=>{
 if(confirm("Tem certeza? Todo o progresso salvo neste navegador será apagado.")){
  state = fresh();
  save();

  $("#playerName").value = "";

  toast("Progresso reiniciado.");
 }
});

$("#playerName").value = state.name;

renderAll();

})();
  
