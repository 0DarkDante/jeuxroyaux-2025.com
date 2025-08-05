document.querySelectorAll('.faq__question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = document.getElementById(button.getAttribute('aria-controls'));

    if (expanded) {
      button.setAttribute('aria-expanded', 'false');
      answer.setAttribute('hidden', '');
    } else {
      // Закриваємо всі відкриті відповіді (щоб гармошка була тільки по одному пункту)
      document.querySelectorAll('.faq__question[aria-expanded="true"]').forEach(openBtn => {
        openBtn.setAttribute('aria-expanded', 'false');
        document.getElementById(openBtn.getAttribute('aria-controls')).setAttribute('hidden', '');
      });
      // Відкриваємо поточний
      button.setAttribute('aria-expanded', 'true');
      answer.removeAttribute('hidden');
    }
  });
});


