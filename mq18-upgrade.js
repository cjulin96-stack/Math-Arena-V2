/* MathQuest 18.0 — lições por assunto e conclusão protegida */
(() => {
"use strict";
if(window.MQ18UpgradeLoaded)return;
window.MQ18UpgradeLoaded=true;
const el=id=>document.getElementById(id);
let lessonRun=0,lessonTimer=0;
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

 const runId=++lessonRun;
 document.body.classList.add("mq18-lesson-active");
 body.innerHTML='<section class="mq18-loading" role="status" aria-live="polite"><div class="mq18-loading-kicker">MATHQUEST · PREPARANDO SUA MISSÃO</div><div class="mq18-loading-stage"><div class="mq18-loading-aura"></div><div class="mq18-loading-mascot">'+mascot()+'</div><div class="mq18-loading-stars">✦　＋　✧　÷　✦</div></div><h2>Preparando '+esc(topic)+'</h2><p>Seu próximo desafio está quase pronto...</p><div class="mq18-loading-track"><i></i></div></section>';
 check.disabled=true;
 check.textContent="CARREGANDO...";
 clearTimeout(lessonTimer);
 lessonTimer=setTimeout(()=>{
   if(runId!==lessonRun)return;
   body.innerHTML="";
   check.disabled=false;
   check.textContent="VERIFICAR";
   if(typeof window.question==="function")window.question();
 },1550);
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
document.addEventListener("click",event=>{
 const closeButton=event.target&&event.target.closest&&event.target.closest("#closeLesson");
 if(!closeButton)return;
 event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
 if(!confirm("Sair agora? O progresso desta rodada não será contado."))return;
 lessonRun++;clearTimeout(lessonTimer);
 const modal=el("lessonModal");
 if(modal){modal.classList.add("hide");modal.style.display="none"}
 document.body.classList.remove("mq18-lesson-active");
 if(typeof window.showView==="function")window.showView("learn");
},true);
function successSound(){
 try{
  const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
  const ctx=new Ctx();const now=ctx.currentTime;
  [[659.25,0],[880,0.13]].forEach(([frequency,delay])=>{
   const osc=ctx.createOscillator(),gain=ctx.createGain();
   osc.type="sine";osc.frequency.setValueAtTime(frequency,now+delay);
   gain.gain.setValueAtTime(0.0001,now+delay);
   gain.gain.exponentialRampToValueAtTime(0.12,now+delay+0.02);
   gain.gain.exponentialRampToValueAtTime(0.0001,now+delay+0.19);
   osc.connect(gain);gain.connect(ctx.destination);osc.start(now+delay);osc.stop(now+delay+0.2);
  });
  setTimeout(()=>ctx.close().catch(()=>{}),650);
 }catch(_){}
}
function observeCelebration(){
 const panel=el("mq17Companion");if(!panel||panel.dataset.mq18Observed==="1")return;
 panel.dataset.mq18Observed="1";
 let played=false;
 const observer=new MutationObserver(()=>{
  if(panel.classList.contains("is-good")&&!played){
   played=true;panel.classList.add("mq18-celebrate");successSound();
   setTimeout(()=>panel.classList.remove("mq18-celebrate"),900);
  }
  if(!panel.classList.contains("is-good"))played=false;
 });
 observer.observe(panel,{attributes:true,attributeFilter:["class"]});
}
function bootCelebration(){
 observeCelebration();
 const observer=new MutationObserver(()=>observeCelebration());
 observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bootCelebration,{once:true});else bootCelebration();
window.MQ18={version:"18.0.0",getQuestionsForTopic:topic=>Array.isArray(window.Q)?window.Q.filter(q=>q.topic===topic):[],getSessionTopics:()=>window.session&&Array.isArray(window.session.items)?[...new Set(window.session.items.map(q=>q.topic))]:[]};
})();