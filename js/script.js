const subs = document.querySelectorAll('.recent-block-button');

subs.forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList.contains('Подписан')) {
      item.classList.remove('Подписан')
      item.innerText = "Подписаться";
    } else {
      item.classList.add('Подписан');
      item.innerText = "Подписан";
    }
  });
});

// Управление фокусом в модальных окнах
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
