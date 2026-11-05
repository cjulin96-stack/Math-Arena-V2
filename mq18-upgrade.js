/* MathQuest 18.0 — lições por assunto e conclusão protegida */
(() => {
"use strict";
if(window.MQ18UpgradeLoaded)return;
window.MQ18UpgradeLoaded=true;
const el=id=>document.getElementById(id);
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shuffle=a=>{const x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
function mascot(){const svg=document.querySelector("#mq16Current .mq16-current-art svg");if(svg)return svg.outerHTML;return '<div class="mq18-mascot-emoji">'+esc(window.S&&window.S.avatar||"🦊")+'</div>'}
function startTopic(q,isPractice){
 if(!q||!Array.isArray(window.Q))return;
 const state=window.S;
 if(state&&state.lives<=0){if(window.toast)window.toast("Sem vidas disponíveis. Volte depois para continuar.");return}
 const topic=q.topic;
 const bank=window.Q.filter(item=>item&&item.topic===topic);
 const items=[q].concat(shuffle(bank.filter(item=>item.id!==q.id))).slice(0,5);
 if(!items.length)return;
 window.practice=!!isPractice;
 window.session={q,items,index:0,correct:0,wrong:0,xp:0,gems:0,start:Date.now()};
 const modal=el("lessonModal"),body=el("lessonBody"),check=el("check");
 if(!modal||!body||!check)return;
 modal.classList.remove("hide");modal.style.display="grid";
 if(el("lessonBar"))el("lessonBar").style.width="0%";
 if(el("heartText")&&state)el("heartText").textContent="❤️".repeat(state.lives)+"🖤".repeat(5-state.lives);
 if(el("feedback"))el("feedback").className="feedback hidden";
 const maxXP=items.length*10;
 body.innerHTML='<section class="mq18-intro"><div class="mq18-kicker"><span></span> NOVA MISSÃO · MATHQUEST 18.0</div><div class="mq18-mascot-stage"><div class="mq18-aura"></div><div class="mq18-orbit mq18-orbit-a">＋　÷　×</div><div class="mq18-orbit mq18-orbit-b">π　x²　%</div><div class="mq18-mascot">'+mascot()+'</div><div class="mq18-mascot-caption">SEU COMPANHEIRO DE JORNADA</div></div><div class="mq18-topic-label">ASSUNTO DESTA LIÇÃO</div><h2>'+esc(topic)+'</h2><p>Nesta missão, todas as questões serão exclusivamente sobre <b>'+esc(topic)+'</b>.</p><div class="mq18-stats"><div><b>'+items.length+'</b><small>QUESTÕES DO TEMA</small></div><div><b>+'+maxXP+'</b><small>XP MÁXIMO</small></div><div><b>♥ '+(state?state.lives:5)+'</b><small>VIDAS</small></div></div><button type="button" class="mq18-start" id="mq18Start">COMEÇAR MISSÃO <span>➜</span></button><div class="mq18-foot">Nenhuma questão de outro assunto será adicionada.</div></section>';
 check.disabled=false;check.textContent="COMEÇAR MISSÃO";
 check.onclick=()=>{document.body.classList.add("mq18-lesson-active");if(typeof window.question==="function")window.question()};
 const startButton=el("mq18Start");if(startButton)startButton.addEventListener("click",()=>check.click());
 document.body.classList.add("mq18-lesson-active");
}
const oldStart=window.start;
if(typeof oldStart==="function"&&Array.isArray(window.Q))window.start=startTopic;
const oldFinish=window.finish;
if(typeof oldFinish==="function")window.finish=function(){
 const active=window.session;
 if(active&&active.__mq18Finished)return;
 if(active)active.__mq18Finishing=true;
 let result;
 try{result=oldFinish.apply(this,arguments);if(active)active.__mq18Finished=true}
 finally{if(active)active.__mq18Finishing=false}
 const lesson=el("lessonModal"),summary=el("summaryModal");
 if(lesson){lesson.classList.add("hide");lesson.style.display="none"}
 if(summary){summary.classList.remove("hide");summary.style.display="grid"}
 const done=el("summaryDone");
 if(done)done.onclick=event=>{
  if(event)event.preventDefault();
  if(summary){summary.classList.add("hide");summary.style.display="none"}
  if(lesson){lesson.classList.add("hide");lesson.style.display="none"}
  document.body.classList.remove("mq18-lesson-active");
  if(typeof window.showView==="function")window.showView("learn");
 };
 return result;
};
const close=el("closeLesson");if(close)close.addEventListener("click",()=>document.body.classList.remove("mq18-lesson-active"));
window.MQ18={version:"18.0.0",getQuestionsForTopic:topic=>Array.isArray(window.Q)?window.Q.filter(q=>q.topic===topic):[],getSessionTopics:()=>window.session&&Array.isArray(window.session.items)?[...new Set(window.session.items.map(q=>q.topic))]:[]};
})();