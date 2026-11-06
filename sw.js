const CACHE="mathquest-20-hyper-build2";
const ASSETS=["./mq15-upgrade.js?v=19.1.1","./mq15-upgrade.css?v=19.1.1","./mq16-mascots.js?v=19.1.1","./mq16-mascots.css?v=19.1.1","./mq17-companions.js?v=19.1.1","./mq17-companions.css?v=19.1.1","./mq18-upgrade.js?v=19.1.1","./mq18-upgrade.css?v=19.1.1","./mq19-global-ranking.js?v=19.1.1","./mq19-global-ranking.css?v=20.0","./mq20-expansion.css?v=20.0","./mq20-expansion.js?v=20.0"];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())
    .then(()=>self.clients.matchAll({type:'window',includeUncontrolled:true}))
    .then(clients=>Promise.all(clients.map(client=>client.navigate(client.url).catch(()=>null)))));
});
async function upgradedPage(request){
  const network=await fetch(request,{cache:"no-store"});
  if(!network.ok)return network;
  let html=await network.text();
  html=html.replace(/<title>[^<]*<\/title>/i,"<title>MathQuest 20.0 — Learning Evolution</title>");
  html=html.replace(/(<small\b[^>]*>)\s*(?:10\.5|17\.0|18\.0|19\.1(?:\.1)?)\s*(<\/small>)/gi,"$1 20.0 $2");
  const bridgeAnchor="updateUltimatePanel();\n})();\n\n\n/* ===== MATHQUEST 16.0 EMPIRE UNIVERSE: progressive enhancement layer ===== */";
  if(html.includes(bridgeAnchor)&&!html.includes('Object.defineProperties(window,{\n  S:{configurable:true')){
    html=html.replace(bridgeAnchor,"updateUltimatePanel();\nObject.defineProperties(window,{\n  S:{configurable:true,get:()=>S,set:value=>{S=value}},\n  session:{configurable:true,get:()=>session,set:value=>{session=value}},\n  $:{configurable:true,get:()=>$},\n  save:{configurable:true,get:()=>save},\n  toast:{configurable:true,get:()=>toast},\n  render:{configurable:true,get:()=>render},\n  renderWorlds:{configurable:true,get:()=>renderWorlds},\n  renderShop:{configurable:true,get:()=>renderShop,set:value=>{renderShop=value}},\n  start:{configurable:true,get:()=>start,set:value=>{start=value}},\n  question:{configurable:true,get:()=>question,set:value=>{question=value}},\n  check:{configurable:true,get:()=>check,set:value=>{check=value}},\n  finish:{configurable:true,get:()=>finish,set:value=>{finish=value}},\n  Q:{configurable:true,get:()=>Q},\n  practice:{configurable:true,get:()=>practice,set:value=>{practice=value}},\n  showView:{configurable:true,get:()=>showView,set:value=>{showView=value}}\n});\n})();\n\n\n/* ===== MATHQUEST 16.0 EMPIRE UNIVERSE: progressive enhancement layer ===== */");
  }
  html=html.replaceAll("MATHQUEST 16.0","MATHQUEST 20.0").replaceAll("MathQuest 16.0","MathQuest 20.0").replaceAll("MATHQUEST 17.0","MATHQUEST 20.0").replaceAll("MathQuest 17.0","MathQuest 20.0").replaceAll("MATHQUEST 14.0","MATHQUEST 20.0").replaceAll("MathQuest 14.0","MathQuest 20.0").replaceAll("MathQuest 11.0","MathQuest 20.0");
  /* Remove any older injected references, then add the current build exactly once. */
  html=html.replace(/<link\b[^>]*href=["'][^"']*mq15-upgrade\.css[^"']*["'][^>]*>/gi,"");
  html=html.replace(/<script\b[^>]*src=["'][^"']*mq15-upgrade\.js[^"']*["'][^>]*>\s*<\/script>/gi,"");
  html=html.replace(/<link\b[^>]*href=["'][^"']*mq16-mascots\.css[^"']*["'][^>]*>/gi,"");
  html=html.replace(/<script\b[^>]*src=["'][^"']*mq16-mascots\.js[^"']*["'][^>]*>\s*<\/script>/gi,"");
  html=html.replace("</body>",'<link rel="stylesheet" href="./mq15-upgrade.css?v=20.0"><link rel="stylesheet" href="./mq16-mascots.css?v=20.0"><link rel="stylesheet" href="./mq17-companions.css?v=20.0"><link rel="stylesheet" href="./mq18-upgrade.css?v=20.0"><link rel="stylesheet" href="./mq19-global-ranking.css?v=20.0"><link rel="stylesheet" href="./mq20-expansion.css?v=20.0"><script defer src="./mq15-upgrade.js?v=20.0"></script><script defer src="./mq16-mascots.js?v=20.0"></script><script defer src="./mq17-companions.js?v=20.0"></script><script defer src="./mq18-upgrade.js?v=20.0"></script><script defer src="./mq19-global-ranking.js?v=20.0"></script><script defer src="./mq20-expansion.js?v=20.0"></script></body>');
  html=html.replace("</body>",'<script>(function(){function fix(){document.querySelectorAll("small").forEach(function(el){var t=(el.textContent||"").trim();if(["10.5","17.0","18.0","19.1","19.1.1"].includes(t))el.textContent="20.0";});}fix();new MutationObserver(fix).observe(document.documentElement,{subtree:true,childList:true,characterData:true});})();</script></body>');
  const headers=new Headers(network.headers);
  ["content-length","content-encoding","content-md5","etag","last-modified"].forEach(name=>headers.delete(name));
  headers.set("cache-control","no-store");
  const response=new Response(html,{status:network.status,statusText:network.statusText,headers});
  const cache=await caches.open(CACHE);
  await cache.put(new Request(new URL("./index.html",self.registration.scope)),response.clone());
  return response;
}
self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  if(request.mode==="navigate"||url.pathname.endsWith("/index.html")){
    event.respondWith(upgradedPage(request).catch(async()=>{
      const cache=await caches.open(CACHE);
      return await cache.match(request)||await cache.match(new URL("./index.html",self.registration.scope))||new Response("Conecte-se à internet para carregar a versão mais recente do MathQuest.",{status:503,headers:{"content-type":"text/plain;charset=utf-8"}});
    }));
    return;
  }
  event.respondWith(fetch(request).then(response=>{
    if(response.ok)caches.open(CACHE).then(cache=>cache.put(request,response.clone()));
    return response;
  }).catch(async()=> (await caches.match(request))||Response.error()));
});
