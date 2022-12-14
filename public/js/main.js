// Close alert
const flashBtn = document.querySelectorAll('.flash-btn');
const flash = document.querySelector('.flash-alert');

flashBtn.forEach((btn) => btn.addEventListener('click', hide));

function hide() {
  flash.classList.add('invisible');
}
