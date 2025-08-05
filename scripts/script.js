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


document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  const openModalBtns = document.querySelectorAll('[data-open-contact-modal]');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const contactForm = document.getElementById('contactForm');
  let lastFocusedElement = null;

  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-window').focus();
    document.body.style.overflow = 'hidden'; // запрет скролла страницы под модалкой
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement) lastFocusedElement.focus();
    document.body.style.overflow = ''; // вернуть скролл
  }

  // Открыть по кнопкам с data-атрибутом
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Закрыть кнопкой "Fermer"
  closeModalBtn.addEventListener('click', closeModal);

  // Закрыть кликом вне окна
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // Закрыть по Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Простая валидация при отправке
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    // Тут можно добавить отправку на сервер (fetch/ajax)
    alert('Merci pour votre message !');
    contactForm.reset();
    closeModal();
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('ageModal');
  const btnYes = document.getElementById('ageYes');
  const btnNo = document.getElementById('ageNo');

  function openModal() {
    modal.classList.add('show');
    modal.querySelector('.modal-window').focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  btnYes.addEventListener('click', () => {
    localStorage.setItem('isAdult', 'true');
    closeModal();
  });

  btnNo.addEventListener('click', () => {
    // Якщо вік менше 18 — редірект на Google
    window.location.href = 'https://www.google.com';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  if (localStorage.getItem('isAdult') !== 'true') {
    openModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');

  const COOKIE_KEY = 'cookiesAccepted';

  // Показуємо банер, якщо користувач ще не вибрав
  if (!localStorage.getItem(COOKIE_KEY)) {
  banner.classList.remove('hidden');
} else {
  banner.classList.add('hidden');
}

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    banner.style.display = 'none';
  });

  rejectBtn.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'false');
    banner.style.display = 'none';
  });
});

