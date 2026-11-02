document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle — keeps aria-expanded in sync and closes on
  // link click, Escape or when the screen is resized back to desktop width
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  const setMenu = (open) => {
    mainNav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuToggle.textContent = open ? '✕' : '☰';
  };

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => setMenu(!mainNav.classList.contains('open')));
    mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mainNav.classList.contains('open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });
    window.matchMedia('(min-width: 851px)').addEventListener('change', (event) => {
      if (event.matches) setMenu(false);
    });
  }

  // Footer year — always shows the current year
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Open / closed indicator — office hours are Mon–Fri 07:00–17:00, checked
  // in South African time so it is correct wherever the visitor is
  const statusEls = document.querySelectorAll('[data-open-status]');

  const updateOpenStatus = () => {
    const parts = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date());
    const get = (type) => parts.find((part) => part.type === type).value;
    const minutes = Number(get('hour')) * 60 + Number(get('minute'));
    const isWeekday = !['Sat', 'Sun'].includes(get('weekday'));
    const isOpen = isWeekday && minutes >= 7 * 60 && minutes < 17 * 60;

    statusEls.forEach((el) => {
      el.classList.toggle('is-open', isOpen);
      el.classList.toggle('is-closed', !isOpen);
      el.textContent = isOpen
        ? 'Open now: call us until 17:00 today'
        : 'Closed now: send a quote request online and we will reply next business day';
    });
  };

  if (statusEls.length) {
    updateOpenStatus();
    setInterval(updateOpenStatus, 60000);
  }

  // Back-to-top button — appears after scrolling down the page
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.hidden = window.scrollY < 500;
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop.addEventListener('click', () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  // Form validation — friendly inline error messages instead of the
  // browser's default pop-ups (the HTML "required" attributes still work
  // as a fallback if JavaScript is disabled)
  const phonePattern = /^(\+27|0)[1-8]\d{8}$/;

  const getError = (field) => {
    const value = field.value.trim();
    const label = field.dataset.label || field.labels[0].textContent.toLowerCase();

    if (field.required && !value) {
      return field.tagName === 'SELECT' ? 'Please choose the service you need.' : `Please enter your ${label}.`;
    }
    if (!value) return '';
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address, e.g. name@example.com.';
    }
    if (field.type === 'tel' && !phonePattern.test(value.replace(/[\s()-]/g, ''))) {
      return 'Please enter a valid South African number, e.g. 071 000 0000.';
    }
    if (field.type === 'date' && field.min && value < field.min) {
      return 'Please choose today or a future date.';
    }
    if (field.minLength > 0 && value.length < field.minLength) {
      return `Please add a little more detail (at least ${field.minLength} characters).`;
    }
    return '';
  };

  const showError = (field) => {
    const message = getError(field);
    const errorEl = document.getElementById(`${field.id}-error`);
    errorEl.textContent = message;
    field.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  };

  document.querySelectorAll('form[data-validate]').forEach((form) => {
    form.noValidate = true;
    const fields = form.querySelectorAll('input, select, textarea');

    fields.forEach((field) => {
      const errorEl = document.createElement('p');
      errorEl.className = 'field-error';
      errorEl.id = `${field.id}-error`;
      field.after(errorEl);
      field.setAttribute('aria-describedby', errorEl.id);

      // Re-check a field once the visitor leaves it, and live while fixing it
      field.addEventListener('blur', () => showError(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') showError(field);
      });

      // Character counter for message boxes
      if (field.tagName === 'TEXTAREA' && field.maxLength > 0) {
        const counter = document.createElement('p');
        counter.className = 'char-counter';
        counter.setAttribute('aria-live', 'polite');
        const updateCounter = () => {
          counter.textContent = `${field.value.length} / ${field.maxLength} characters`;
        };
        field.addEventListener('input', updateCounter);
        updateCounter();
        errorEl.after(counter);
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const invalid = [...fields].filter((field) => !showError(field));

      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      const result = document.getElementById(form.id === 'quoteForm' ? 'quoteResult' : 'contactResult');
      const firstName = form.elements.name.value.trim().split(' ')[0];
      result.hidden = false;
      result.textContent = form.id === 'quoteForm'
        ? `Thank you, ${firstName}. Your quote request has been recorded for this website demonstration. A production website would send it to the company inbox.`
        : `Thank you, ${firstName}. Your message has been recorded for this demonstration. A real website would deliver it to the business.`;
      form.reset();
      form.querySelectorAll('textarea').forEach((textarea) => textarea.dispatchEvent(new Event('input')));
      form.dispatchEvent(new Event('change'));
      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // Quote form extras
  const serviceSelect = document.getElementById('service');
  const dateInput = document.getElementById('date');
  const emergencyNotice = document.getElementById('emergencyNotice');

  // Stop visitors picking a date in the past
  if (dateInput) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dateInput.min = now.toISOString().split('T')[0];
  }

  if (serviceSelect) {
    // Pre-select the service when arriving from a link such as
    // enquiry.html?service=lighting on the Services page
    const requested = new URLSearchParams(window.location.search).get('service');
    if (requested && serviceSelect.querySelector(`option[value="${CSS.escape(requested)}"]`)) {
      serviceSelect.value = requested;
    }

    // Point emergency callers to the phone number instead of the form
    const toggleEmergency = () => {
      emergencyNotice.hidden = serviceSelect.value !== 'emergency';
    };
    serviceSelect.form.addEventListener('change', toggleEmergency);
    toggleEmergency();
  }
});
