/* ============================================
   Castaway Research — Island Vibes JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Generate starfield --- */
  const starfield = document.querySelector('.starfield');
  if (starfield) {
    const count = 120;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = star.style.height = Math.random() * 2.5 + 0.5 + 'px';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 70 + '%'; // stars only in upper portion (sky)
      star.style.setProperty('--dur', (Math.random() * 4 + 2) + 's');
      star.style.setProperty('--brightness', (Math.random() * 0.6 + 0.3).toFixed(2));
      star.style.animationDelay = Math.random() * 5 + 's';
      starfield.appendChild(star);
    }
  }

  /* --- Navigation scroll effect --- */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* --- Mobile nav toggle --- */
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  /* --- Scroll reveal --- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  /* --- Stagger reveal --- */
  const staggerContainers = document.querySelectorAll('[data-stagger]');
  staggerContainers.forEach(container => {
    const children = container.children;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Array.from(children).forEach((child, i) => {
            child.style.transitionDelay = `${i * 120}ms`;
            child.classList.add('visible');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);
  });

  /* --- Role filter --- */
  const filterButtons = document.querySelectorAll('.role-filter');
  const roleCards = document.querySelectorAll('.role-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      roleCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'grid';
          card.style.animation = 'fadeInUp 0.5s var(--ease-out-expo) forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --- Animated counters --- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 2000;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          el.textContent = prefix + Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* --- Smooth scroll --- */
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

  /* --- Parallax palm trees on scroll --- */
  const palmElements = document.querySelectorAll('.palm-tree');
  if (palmElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      palmElements.forEach((palm, i) => {
        const speed = 0.02 + (i * 0.01);
        const sway = Math.sin(scrollY * 0.003 + i) * 3;
        palm.style.transform = `translateY(${scrollY * speed}px) rotate(${sway}deg)`;
      });
    }, { passive: true });
  }

  /* --- Gentle wave speed variation on scroll --- */
  const waves = document.querySelectorAll('.wave');
  if (waves.length > 0) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          // As user scrolls down, waves slow down (calmer ocean)
          waves.forEach((wave, i) => {
            const baseDuration = [18, 12, 8, 6][i] || 10;
            const newDuration = baseDuration + (scrollPercent * 10);
            wave.style.animationDuration = newDuration + 's';
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  console.log('%c🏝️ Castaway Research ', 'background: linear-gradient(135deg, #14b8a6, #38bdf8); color: white; font-size: 14px; padding: 6px 14px; border-radius: 20px;');
  console.log('%c🌺 Island Vibes Edition ', 'color: #ff6d3a; font-size: 12px;');

});
