/* MathQuest — safe recovery worker v20.5.0
   This worker intentionally does not intercept navigation requests,
   rewrite index.html, inject scripts, or cache application responses.
   It leaves the published app shell untouched and never changes local progress.
*/
self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
