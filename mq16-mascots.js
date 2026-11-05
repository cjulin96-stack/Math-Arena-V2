/* MathQuest 16.0 — coleção de mascotes originais */
(function(){
"use strict";
var KEY="mq16_mascot_collection_v1";
var mascots=[
{id:"nexo",name:"Nexo",kind:"O guia prismático",price:0,tag:"GUIA",art:'<svg viewBox="0 0 120 120" aria-label="Nexo"><path d="M60 8 105 34 105 83 60 111 15 83 15 34Z" fill="#9874ed" stroke="#4e32a9" stroke-width="4"/><path d="M29 43Q60 29 91 43L86 76Q60 96 34 76Z" fill="#fff" stroke="#593cb4" stroke-width="3"/><ellipse cx="47" cy="58" rx="5" ry="8" fill="#282044"/><ellipse cx="73" cy="58" rx="5" ry="8" fill="#282044"/><path d="M49 72Q60 82 71 72" fill="none" stroke="#8a63e8" stroke-width="4" stroke-linecap="round"/></svg>'},
{id:"luma",name:"Luma",kind:"A estrela curiosa",price:12,tag:"LUZ",art:'<svg viewBox="0 0 120 120" aria-label="Luma"><path d="M60 7 73 39 108 41 81 64 90 101 60 81 30 101 39 64 12 41 47 39Z" fill="#58c9ef" stroke="#1677b2" stroke-width="4" stroke-linejoin="round"/><ellipse cx="48" cy="57" rx="4" ry="7" fill="#153a5c"/><ellipse cx="72" cy="57" rx="4" ry="7" fill="#153a5c"/><path d="M49 70Q60 78 71 70" fill="none" stroke="#1677b2" stroke-width="4" stroke-linecap="round"/></svg>'},
{id:"brasa",name:"Brasa",kind:"O dragão das ideias",price:20,tag:"FOGO",art:'<svg viewBox="0 0 120 120" aria-label="Brasa"><path d="M29 42 16 17 47 31 60 24 75 31 104 16 91 48Q105 72 87 96L60 109 33 96Q15 70 29 42Z" fill="#f79a48" stroke="#a94b20" stroke-width="4"/><path d="M32 40 43 51 29 57M88 40 77 51 91 57" fill="#ffe0a8" stroke="#a94b20" stroke-width="3"/><ellipse cx="47" cy="66" rx="5" ry="8" fill="#542a20"/><ellipse cx="73" cy="66" rx="5" ry="8" fill="#542a20"/><path d="M48 83Q60 91 72 83" fill="none" stroke="#a94b20" stroke-width="4" stroke-linecap="round"/></svg>'},
{id:"flora",name:"Flora",kind:"A guardiã das formas",price:28,tag:"NATUREZA",art:'<svg viewBox="0 0 120 120" aria-label="Flora"><path d="M60 31Q21 1 19 39Q20 57 48 61Q13 65 29 94Q45 108 60 88Q75 108 91 94Q107 65 72 61Q100 57 101 39Q99 1 60 31Z" fill="#83d98b" stroke="#247a57" stroke-width="4"/><path d="M60 33Q47 15 39 12M60 33Q73 15 81 12" fill="none" stroke="#247a57" stroke-width="4" stroke-linecap="round"/><ellipse cx="47" cy="62" rx="4.5" ry="7" fill="#164b3d"/><ellipse cx="73" cy="62" rx="4.5" ry="7" fill="#164b3d"/><path d="M49 77Q60 85 71 77" fill="none" stroke="#247a57" stroke-width="4" stroke-linecap="round"/></svg>'},
{id:"pixel",name:"Pixel",kind:"O inventor digital",price:36,tag:"TECNO",art:'<svg viewBox="0 0 120 120" aria-label="Pixel"><rect x="19" y="25" width="82" height="76" rx="17" fill="#56d1c5" stroke="#167c80" stroke-width="4"/><path d="M60 9v16M51 9h18" stroke="#167c80" stroke-width="5" stroke-linecap="round"/><rect x="31" y="42" width="58" height="39" rx="10" fill="#eafffc" stroke="#167c80" stroke-width="3"/><rect x="42" y="53" width="9" height="12" rx="3" fill="#14545b"/><rect x="69" y="53" width="9" height="12" rx="3" fill="#14545b"/><path d="M48 72h24" stroke="#24a8a6" stroke-width="3" stroke-linecap="round"/><path d="M10 55h9M101 55h9M38 101v9M82 101v9" stroke="#167c80" stroke-width="5" stroke-linecap="round"/></svg>'},
{id:"astro",name:"Astro",kind:"O explorador cósmico",price:48,tag:"ESPAÇO",art:'<svg viewBox="0 0 120 120" aria-label="Astro"><path d="M60 12Q93 12 98 52L91 91Q60 113 29 91L22 52Q27 12 60 12Z" fill="#ed9acb" stroke="#a83e83" stroke-width="4"/><path d="M34 31 17 8M86 31 103 8" stroke="#a83e83" stroke-width="5" stroke-linecap="round"/><circle cx="17" cy="8" r="6" fill="#ffc2e6"/><circle cx="103" cy="8" r="6" fill="#ffc2e6"/><ellipse cx="46" cy="57" rx="8" ry="12" fill="#54234b"/><ellipse cx="74" cy="57" rx="8" ry="12" fill="#54234b"/><path d="M48 78Q60 87 72 78" fill="none" stroke="#a83e83" stroke-width="4" stroke-linecap="round"/></svg>'}
];
var fresh=function(){return {crystals:0,unlocked:["nexo"],selected:"nexo"}};
var read=function(){try{return Object.assign(fresh(),JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){return fresh()}};
var data=read();
var today=function(){return new Date().toLocaleDateString("en-CA")};
try{var priorDaily=JSON.parse(localStorage.getItem("mq15_daily_challenge_v1")||"null");if(priorDaily&&priorDaily.completed&&priorDaily.day===today()&&data.importedDay!==priorDaily.day){data.crystals+=(priorDaily.points||0)/10;data.importedDay=priorDaily.day;localStorage.setItem(KEY,JSON.stringify(data))}}catch(e){}
var save=function(){localStorage.setItem(KEY,JSON.stringify(data))};
function markup(){return '<section class="mq16-mascot-hub" id="mq16Hub"><div class="mq16-hub-copy"><span class="mq16-kicker">MATHQUEST 16.0 · COLEÇÃO</span><h2>Seu universo de mascotes</h2><p>Conheça guias com formas, cores e personalidades diferentes. Desbloqueie novos mascotes usando cristais conquistados nos desafios.</p></div><div class="mq16-hub-side"><div class="mq16-crystal-count">💎 <b id="mq16Balance">0</b><small>CRISTAIS</small></div><button type="button" id="mq16Open">ABRIR COLEÇÃO ↗</button></div><div class="mq16-current" id="mq16Current"></div></section><div class="mq16-overlay" id="mq16Overlay" aria-hidden="true"><section class="mq16-shop" role="dialog" aria-modal="true" aria-labelledby="mq16Title"><button class="mq16-x" id="mq16Close" aria-label="Fechar">×</button><span class="mq16-kicker">CENTRAL DE PERSONALIZAÇÃO</span><h2 id="mq16Title">Escolha seu companheiro</h2><p class="mq16-shop-intro">Cada mascote tem arte própria. Acerte questões no Desafio Diário para ganhar cristais.</p><div class="mq16-shop-balance">Seu saldo: <b id="mq16ShopBalance">0</b> 💎</div><div class="mq16-grid" id="mq16Grid"></div><p class="mq16-note" id="mq16Note" aria-live="polite"></p></section></div>'}
function render(){
var balance=document.getElementById("mq16Balance"),shopBalance=document.getElementById("mq16ShopBalance");
if(balance)balance.textContent=data.crystals;if(shopBalance)shopBalance.textContent=data.crystals;
var current=document.getElementById("mq16Current"),selected=mascots.find(function(m){return m.id===data.selected})||mascots[0];
if(current)current.innerHTML='<div class="mq16-current-art">'+selected.art+'</div><span><b>Equipado: '+selected.name+'</b><small>'+selected.kind+'</small></span><em>✓ ATIVO</em>';
var grid=document.getElementById("mq16Grid");if(!grid)return;
grid.innerHTML=mascots.map(function(m){var owned=data.unlocked.indexOf(m.id)>=0,active=data.selected===m.id;var action=active?"EQUIPADO":owned?"EQUIPAR":"DESBLOQUEAR · "+m.price+" 💎";return '<article class="mq16-mascot-card '+(active?"is-active":"")+'"><div class="mq16-mascot-art">'+m.art+'</div><span class="mq16-mascot-tag">'+m.tag+'</span><h3>'+m.name+'</h3><p>'+m.kind+'</p><button type="button" data-mq16-mascot="'+m.id+'" '+(active?"disabled":"")+'>'+action+'</button></article>'}).join("");
grid.querySelectorAll("[data-mq16-mascot]").forEach(function(btn){btn.addEventListener("click",function(){act(btn.dataset.mq16Mascot)})});
}
function note(message){var el=document.getElementById("mq16Note");if(el)el.textContent=message}
function act(id){
var m=mascots.find(function(x){return x.id===id});if(!m)return;
if(data.unlocked.indexOf(id)>=0){data.selected=id;save();render();note(m.name+" agora acompanha sua jornada!");return}
if(data.crystals<m.price){note("Faltam "+(m.price-data.crystals)+" cristais para desbloquear "+m.name+".");return}
data.crystals-=m.price;data.unlocked.push(id);data.selected=id;save();render();note(m.name+" desbloqueado e equipado!");
}
function mount(){
if(document.getElementById("mq16Hub"))return;
var daily=document.getElementById("mq15DailyLaunch");
var host=daily&&daily.parentNode;
if(!host)host=document.querySelector("main")||document.querySelector(".main-content")||document.querySelector(".app-shell")||document.body;
if(!host)return;
var html=markup();
if(daily)daily.insertAdjacentHTML("afterend",html);
else host.insertAdjacentHTML("afterbegin",html);
var overlay=document.getElementById("mq16Overlay");
document.getElementById("mq16Open").addEventListener("click",function(){overlay.classList.add("is-open");overlay.setAttribute("aria-hidden","false");render();note("")});
var close=function(){overlay.classList.remove("is-open");overlay.setAttribute("aria-hidden","true")};
document.getElementById("mq16Close").addEventListener("click",close);
overlay.addEventListener("click",function(e){if(e.target===overlay)close()});
render();
}
window.MQ16RewardCrystal=function(amount){data=read();data.crystals+=amount||1;data.importedDay=today();save();render();var b=document.getElementById("mq16Balance");if(b){b.classList.remove("mq16-pop");requestAnimationFrame(function(){b.classList.add("mq16-pop")})}};
function boot(){mount();var observer=new MutationObserver(function(){if(!document.getElementById("mq16Hub"))mount()});observer.observe(document.body,{childList:true,subtree:true})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();