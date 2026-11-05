const CACHE='mathquest-14-1-v2';
const CORE=['./','./index.html','./manifest.webmanifest'];

async function rewriteMathQuest(response){
  if(!response || !response.ok)return response;
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return response;
  let html=await response.text();
  html=html
    .replace(/10\.5/g,'14.1')
    .replace(/MathQuest 11\.0/g,'MathQuest 14.1')
    .replace(/MATHQUEST 11\.0/g,'MATHQUEST 14.1')
    .replace(/MathQuest 14\.0/g,'MathQuest 14.1')
    .replace(/MATHQUEST 14\.0/g,'MATHQUEST 14.1');
  const headers=new Headers(response.headers);
  headers.delete('content-length');
  headers.delete('content-encoding');
  headers.delete('etag');
  headers.delete('last-modified');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
      .then(()=>self.clients.matchAll({type:'window',includeUncontrolled:true}))
      .then(clients=>Promise.all(clients.map(client=>client.navigate(client.url).catch(()=>null))))
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin)return;

  if(event.request.mode==='navigate'){
    event.respondWith(
      fetch(event.request)
        .then(rewriteMathQuest)
        .then(async response=>{
          if(response && response.ok){
            const copy=response.clone();
            await caches.open(CACHE).then(cache=>cache.put('./index.html',copy));
          }
          return response;
        })
        .catch(async()=>{
          const cached=await caches.match('./index.html');
          return cached?rewriteMathQuest(cached):Response.error();
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
      if(response.ok){
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      }
      return response;
    }).catch(()=>caches.match('./index.html')))
  );
});
