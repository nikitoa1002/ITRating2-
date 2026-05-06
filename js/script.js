// Подписка на архитекторов
const subs = document.querySelectorAll('.recent-block-button');
subs.forEach(btn => {
  btn.addEventListener('click', () => {
    const isFollowed = btn.classList.contains('followed');
    const name = btn.closest('.recent-block')?.querySelector('h4')?.textContent || '';
    if (isFollowed) {
      btn.classList.remove('followed');
      btn.innerText = "Подписаться";
      btn.setAttribute('aria-pressed', 'false');
      if (name) btn.setAttribute('aria-label', `Подписаться на ${name}`);
    } else {
      btn.classList.add('followed');
      btn.innerText = "Подписан";
      btn.setAttribute('aria-pressed', 'true');
      if (name) btn.setAttribute('aria-label', `Вы подписаны на ${name}`);
    }
  });
});

// Блокировка фокуса в модалках
function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  });
}