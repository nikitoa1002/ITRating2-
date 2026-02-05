const menu = document.getElementById('menu');
const cover = document.getElementById("cover");
const back = document.getElementById('back');
const body = document.body;

menu.addEventListener("click", () => {
    cover.classList.add('active');
    body.style.overflow = 'hidden';
})

back.addEventListener("click", () => {
    cover.classList.remove('active');
    body.style.overflow = '';
})

// Закрытие меню при клике на ссылку
cover.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.classList.contains('header__link')) {
        cover.classList.remove('active');
        body.style.overflow = '';
    }
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cover.classList.contains('active')) {
        cover.classList.remove('active');
        body.style.overflow = '';
    }
});