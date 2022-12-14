// Close alert
const flashBtn = document.querySelector('#flash-btn');
const flash = document.querySelector('.flash-alert');

flashBtn.addEventListener('click', hide);

function hide() {
  flash.classList.add('invisible');
}
