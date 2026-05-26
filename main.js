/* ⚙️ CONFIGURACIÓN CENTRAL */
const WA_CONFIG = {
  numero: '593958894099',     // Código país + número, sin + ni espacios
  mensajeBase: 'Hola Hexmet, quiero empezar mi página web',
  waUrl: function(texto = '') {
    const msg = texto || this.mensajeBase;
    return `https://api.whatsapp.com/send/?phone=${this.numero}&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  /* --- Header Scroll --- */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);

    /* --- Hero Parallax --- */
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg && y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.15}px) scale(1)`;
    }
  }, { passive: true });

  /* --- Mobile Menu --- */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* --- Centralizar WhatsApp Links --- */
  document.querySelectorAll('[data-wa-link]').forEach(link => {
    const texto = link.dataset.waLink || '';
    link.href = WA_CONFIG.waUrl(texto);
  });

  /* --- Scroll Reveal (IntersectionObserver) --- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseFloat(el.dataset.delay) || 0;
        el.style.transitionDelay = `${delay}s`;
        el.classList.add('visible');
        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- Hexagonal Particles --- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId = null;

    function resize() {
      const hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 18 + 8,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: Math.random() * 0.08 + 0.02,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      };
    }

    function drawHex(x, y, size, rotation, opacity, pulseVal) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      const s = size * (0.9 + 0.1 * Math.sin(pulseVal));
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = s * Math.cos(a);
        const py = s * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(212, 168, 67, ${opacity * (0.7 + 0.3 * Math.sin(pulseVal))})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (size > 14) {
        ctx.fillStyle = `rgba(212, 168, 67, ${opacity * 0.15})`;
        ctx.fill();
      }

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.pulse += p.pulseSpeed;

        if (p.x < -30) p.x = canvas.width + 30;
        if (p.x > canvas.width + 30) p.x = -30;
        if (p.y < -30) p.y = canvas.height + 30;
        if (p.y > canvas.height + 30) p.y = -30;

        drawHex(p.x, p.y, p.size, p.rotation, p.opacity, p.pulse);
      });

      animId = requestAnimationFrame(animate);
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < 25; i++) {
        particles.push(createParticle());
      }
      if (animId) cancelAnimationFrame(animId);
      animate();
    }

    init();

    window.addEventListener('resize', resize);

    window.addEventListener('beforeunload', () => {
      if (animId) cancelAnimationFrame(animId);
    });
  }

  /* --- FAQ Accordion --- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* --- Contact Form → WhatsApp --- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const feedback = document.getElementById('formFeedback');
  const formFields = form ? form.querySelectorAll('.form-field') : [];

  function validarFormulario(data) {
    const errores = [];

    // Limpiar errores visuales previos
    formFields.forEach(f => f.classList.remove('error'));

    // Honeypot: si el campo oculto tiene contenido, es un bot
    const hp = data.get('_hp')?.trim() || '';
    if (hp) {
      errores.push('Error de validación.');
      return errores;
    }

    const nombre = data.get('nombre')?.trim() || '';
    const whatsapp = data.get('whatsapp')?.trim() || '';
    const tipo = data.get('tipo') || '';

    if (!nombre) {
      errores.push('Por favor ingresa tu nombre.');
      const campo = form.querySelector('[name="nombre"]');
      if (campo) campo.classList.add('error');
    }

    if (!whatsapp) {
      errores.push('Por favor ingresa tu número de WhatsApp.');
      const campo = form.querySelector('[name="whatsapp"]');
      if (campo) campo.classList.add('error');
    } else {
      const digitos = whatsapp.replace(/\D/g, '');
      if (digitos.length < 10) {
        errores.push('El número de WhatsApp debe tener al menos 10 dígitos.');
        const campo = form.querySelector('[name="whatsapp"]');
        if (campo) campo.classList.add('error');
      }
    }

    if (!tipo) {
      errores.push('Selecciona el tipo de página que necesitas.');
    }

    return errores;
  }

  function mostrarFeedback(mensaje, tipo) {
    if (!feedback) return;
    feedback.textContent = mensaje;
    feedback.className = `form-feedback form-feedback--${tipo}`;
  }

  function limpiarFeedback() {
    if (!feedback) return;
    feedback.textContent = '';
    feedback.className = 'form-feedback';
  }

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('is-loading', loading);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      limpiarFeedback();

      const data = new FormData(form);
      const errores = validarFormulario(data);

      if (errores.length > 0) {
        mostrarFeedback(errores[0], 'error');
        // Scroll suave hasta el formulario
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const nombre = data.get('nombre')?.trim() || '';
      const whatsapp = data.get('whatsapp')?.trim() || '';
      const correo = data.get('correo')?.trim() || '';
      const tipo = data.get('tipo') || '';

      // Construir mensaje profesional para el negocio
      const cuerpo = [
        '🆕 *Nuevo lead - Hexmet Landing*',
        '',
        `👤 *Nombre:* ${nombre}`,
        `📱 *WhatsApp:* ${whatsapp}`,
        `📧 *Correo:* ${correo || '—'}`,
        `🌐 *Interés:* ${tipo}`,
        '',
        `💬 *Responder directo:* wa.me/${whatsapp.replace(/\D/g, '')}`,
        '',
        '— Mensaje generado desde hexmet.io'
      ].join('\n');

      const url = WA_CONFIG.waUrl(cuerpo);

      // Mostrar loading
      setLoading(true);
      mostrarFeedback('Abriendo WhatsApp...', 'info');

      // Pequeño delay para que se vea el loading state
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
        setLoading(false);
        mostrarFeedback('¡Mensaje listo! Solo presiona "Enviar" en WhatsApp.', 'success');
        form.reset();
      }, 400);
    });

    // Limpiar error visual al escribir
    formFields.forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
        limpiarFeedback();
      });
      field.addEventListener('change', () => {
        field.classList.remove('error');
      });
    });
  }

  /* --- Hero Stats Counter (Cascada) --- */
  const statNumbers = document.querySelectorAll('.hero-stat-number');

  if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const duration = 2000; // ms
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          let step = 0;

          function animate() {
            step++;
            current = Math.min(current + increment, target);
            el.textContent = Math.floor(current);
            el.classList.add('visible');

            if (current < target) {
              requestAnimationFrame(animate);
            } else {
              // Valor final
              el.textContent = target;
            }
          }

          // Pequeño delay antes de empezar
          setTimeout(() => {
            requestAnimationFrame(animate);
          }, 300);

          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));
  }

  /* --- Urgency Countdown Timer --- */
  const countdownEl = document.getElementById('urgencyCountdown');

  if (countdownEl) {
    const STORAGE_KEY = 'hexmet_offer_deadline';
    const OFFER_DAYS = 7;

    // Get or set deadline
    let deadline = localStorage.getItem(STORAGE_KEY);

    if (!deadline || new Date(deadline) <= new Date()) {
      // First visit or expired — set new 7-day deadline
      const now = new Date();
      now.setDate(now.getDate() + OFFER_DAYS);
      deadline = now.toISOString();
      localStorage.setItem(STORAGE_KEY, deadline);
    }

    const deadlineDate = new Date(deadline);

    function updateCountdown() {
      const now = new Date();
      const diff = deadlineDate - now;

      if (diff <= 0) {
        // Expired — reset for next cycle
        const newDeadline = new Date();
        newDeadline.setDate(newDeadline.getDate() + OFFER_DAYS);
        localStorage.setItem(STORAGE_KEY, newDeadline.toISOString());
        countdownEl.textContent = '¡Últimas horas!';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      parts.push(`${String(hours).padStart(2, '0')}h`);
      parts.push(`${String(minutes).padStart(2, '0')}m`);
      parts.push(`${String(seconds).padStart(2, '0')}s`);

      countdownEl.textContent = parts.join(' : ');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});
