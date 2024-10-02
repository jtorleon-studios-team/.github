const rainContainer = document.querySelector(".rain-emoji");
const emojis = [
  "🎮", "🖥️", "😜", "🎲", "🎁", "🎉", "🎈", "💎", "⚡",
  "💩", "🫧", "🍎", "🍊", "🍋", "🍉", "🍇", "👾",
  "🍑", "🕹️", "✨", "🦊", "🐹", "🎯", "🚀", "🍒", "😁",
  "🛸", "🥭", "🌕", "🌖", "🐶", "🌗", "🌘", "🪐", "⭐️",
  "💣", "✨", "🌟", "🌠", "🍓", "🐰", "🌌", "👨‍🚀", "🛰️",
  "🍌", "🍈", "🍑", "🐱", "💎", "😍", "🎶", "🔮", "🍍",
  "👑", "⚜️", "😎", "🔶", "🔷", "🟣",
];
const _requestAnimation = callback => (
  window.requestAnimationFrame(callback)
  || window.webkitRequestAnimationFrame(callback)
  || window.mozRequestAnimationFrame(callback)
  || window.oRequestAnimationFrame(callback)
  || window.msRequestAnimationFrame(callback)
  || window.setTimeout(callback, 1000 / 60));
const _loop = () => {
  const v = document.createElement("div");
  v.classList.add("emoji-fall-effect");
  v.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  v.style.setProperty("--emoji-size", `${Math.floor(Math.random() * (30 - 10 + 1)) + 10}px`);
  const p = Math.floor(Math.random() * 101);
  v.style.setProperty("--emoji-pos-l", `${p}%`);
  v.style.setProperty("--emoji-opacity", Math.max(0, 1 - (Math.abs(49.5 - p) / 49.5) * (0.9)).toString());
  const a = (Math.random() * 2 + 1) * 3000;
  v.style.animationDuration = `${a}ms`;
  rainContainer.appendChild(v);
  setTimeout(() => v.remove(), (a) + 100);
  _requestAnimation(() => _loop());
};
_requestAnimation(() => _loop());
