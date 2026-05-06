// Открытие/закрытие бокового меню
const menuBtn = document.getElementById('menu');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('sideMenuClose');
const body = document.body;

const overlay = document.createElement('div');
overlay.className = 'side-menu-overlay';
document.body.appendChild(overlay);

function openMenu() {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    body.style.overflow = 'hidden';
}

function closeMenu() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
}

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Закрытие при клике на ссылку
sideMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
        closeMenu();
    }
});