/* MathQuest emergency recovery service worker.
   Temporarily disable HTML rewriting and aggressive cache replacement so GitHub Pages
   can serve the original application normally. No user progress/storage is touched. */
const RECOVERY_CACHE = "mathquest-recovery-1";
self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
// Deliberately no fetch interception: all pages and assets load from GitHub Pages.
