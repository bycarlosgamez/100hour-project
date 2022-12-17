const flashBtn = document.querySelectorAll('.flash-btn');
const flash = document.querySelector('.flash-alert');
const userMenuBtn = document.querySelector('#user-menu-button');
const userMenu = document.querySelector('#user-menu');

//EVENT LISTENERS
document.addEventListener('click', toggleMenu);
flashBtn.forEach((btn) => btn.addEventListener('click', hide));

// FUNCTIONS
// Toogle user menu
function toggleMenu(e) {
  if (
    e.target.parentElement !== userMenuBtn &&
    !userMenu.classList.contains('hidden')
  ) {
    userMenu.classList.add('hidden');
  } else if (e.target.parentElement === userMenuBtn) {
    userMenu.classList.remove('hidden');
  }
}

// Close alert
function hide() {
  flash.classList.add('invisible');
}
