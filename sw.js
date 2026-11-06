/* MathQuest recovery + module loader.
   No offline cache, no HTML version rewriting, and no asset interception. */
self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));

const BRIDGE_ANCHOR = "updateUltimatePanel();\n})();";
const BRIDGE = `updateUltimatePanel();
Object.defineProperties(window,{
  S:{configurable:true,get:()=>S,set:value=>{S=value}},
  session:{configurable:true,get:()=>session,set:value=>{session=value}},
  $:{configurable:true,get:()=>$},
  save:{configurable:true,get:()=>save},
  toast:{configurable:true,get:()=>toast},
  render:{configurable:true,get:()=>render},
  renderWorlds:{configurable:true,get:()=>renderWorlds},
  renderShop:{configurable:true,get:()=>renderShop,set:value=>{renderShop=value}},
  start:{configurable:true,get:()=>start,set:value=>{start=value}},
  question:{configurable:true,get:()=>question,set:value=>{question=value}},
  check:{configurable:true,get:()=>check,set:value=>{check=value}},
  finish:{configurable:true,get:()=>finish,set:value=>{finish=value}},
  Q:{configurable:true,get:()=>Q},
  practice:{configurable:true,get:()=>practice,set:value=>{practice=value}},
  showView:{configurable:true,get:()=>showView,set:value=>{showView=value}}
});
window.MQ18BridgeReady=true;
})();`;

const ASSETS = `
<link rel="stylesheet" href="./mq15-upgrade.css?v=20.4.1">
<link rel="stylesheet" href="./mq16-mascots.css?v=20.4.1">
<link rel="stylesheet" href="./mq17-companions.css?v=20.4.1">
<link rel="stylesheet" href="./mq18-upgrade.css?v=20.4.1">
<script defer src="./mq15-upgrade.js?v=20.4.1"><\\/script>
<script defer src="./mq16-mascots.js?v=20.4.1"><\\/script>
<script defer src="./mq17-companions.js?v=20.4.1"><\\/script>
<script defer src="./mq18-upgrade.js?v=20.4.1"><\\/script>`;

async function upgradedPage(request) {
  const response = await fetch(request, {cache:"no-store"});
  if (!response.ok) return response;
  let html = await response.text();
  if (!html.includes("MQ18BridgeReady")) {
    if (!html.includes(BRIDGE_ANCHOR)) return response;
    html = html.replace(BRIDGE_ANCHOR, BRIDGE);
  }
  if (!html.includes("mq18-upgrade.js?v=20.4.1")) {
    html = html.replace("</body>", ASSETS + "\n</body>");
  }
  const headers = new Headers(response.headers);
  ["content-length","content-encoding","content-md5","etag","last-modified"].forEach(h=>headers.delete(h));
  headers.set("cache-control","no-store");
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || request.mode !== "navigate") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(upgradedPage(request).catch(()=>fetch(request)));
});
