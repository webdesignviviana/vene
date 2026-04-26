// === Menú móvil ===
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // === Filtros de proyectos ===
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.category;
        card.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });
    });
  });

  // === FAQ acordeón ===
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // === Formulario contacto (EmailJS) ===
  const EMAILJS_PUBLIC_KEY = 'u6ZwGT5EOlYYokJyV';
  const EMAILJS_SERVICE_ID = 'service_eezu8pe';
  const EMAILJS_TEMPLATE_ID = 'template_4i4xje3';

  const form = document.getElementById('contact-form');
  if (form && window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    const btn = document.getElementById('contact-submit');
    const feedback = document.getElementById('contact-feedback');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Enviando...';
      feedback.textContent = '';
      feedback.style.color = '';

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(() => {
          btn.textContent = '✓ Mensaje enviado';
          feedback.style.color = '#2a7a3b';
          feedback.textContent = '¡Gracias! Te respondo a la brevedad.';
          form.reset();
          setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 4000);
        })
        .catch((err) => {
          console.error('EmailJS error:', err);
          btn.textContent = original;
          btn.disabled = false;
          feedback.style.color = '#b3261e';
          feedback.textContent = 'Hubo un error al enviar. Probá de nuevo o escribime por WhatsApp.';
        });
    });
  }
});
