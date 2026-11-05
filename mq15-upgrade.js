/* MathQuest 15.0 — camada de atualização da página publicada */
(() => {
  "use strict";
  const versionText = "15.0";
  const avatarTypes = {
    "🦊":"fox", "🐉":"dragon", "🦉":"owl", "🐸":"frog",
    "🦄":"unicorn", "🐯":"tiger", "🤖":"robot", "🐙":"octo"
  };
  function applyIdentity() {
    document.title = "MathQuest 15.0 — Empire Universe Complete";
    const badge = document.querySelector(".brand small");
    if (badge) badge.textContent = versionText;
    document.querySelectorAll(".mq14-launch-tag").forEach(el => {
      el.textContent = "MATHQUEST 15.0 · PORTAL DE APRENDIZADO";
    });
  }
  function upgradeMascot() {
    const box = document.querySelector(".mq14-launch-mascot");
    if (!box || box.dataset.mq15Ready === "1") return;
    const avatar = box.textContent.trim();
    const type = avatarTypes[avatar] || "fox";
    if (typeof window.mq14Art === "function") {
      box.innerHTML = window.mq14Art(type);
      box.dataset.mq15Ready = "1";
      box.setAttribute("aria-label", "Mascote original do MathQuest");
    }
  }
  function animateLesson() {
    const body = document.getElementById("lessonBody");
    if (!body || body.dataset.mq15Observer === "1") return;
    body.dataset.mq15Observer = "1";
    const observer = new MutationObserver(() => {
      const question = body.querySelector(".question");
      if (question) question.classList.add("mq15-question-enter");
      body.querySelectorAll(".answer").forEach((answer, index) => {
        answer.style.setProperty("--mq15-order", index);
        answer.classList.add("mq15-answer-enter");
      });
      upgradeMascot();
    });
    observer.observe(body, { childList: true, subtree: true });
  }
  function wrapLessonStart() {
    if (window.__mq15StartWrapped || typeof window.start !== "function") return;
    const original = window.start;
    window.start = function () {
      const result = original.apply(this, arguments);
      applyIdentity();
      upgradeMascot();
      return result;
    };
    window.__mq15StartWrapped = true;
  }
  function boot() {
    applyIdentity();
    wrapLessonStart();
    animateLesson();
    upgradeMascot();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
  window.addEventListener("load", boot, { once: true });
})();
