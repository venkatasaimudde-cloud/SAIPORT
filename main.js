/**
 * VENKATA SAI PORTFOLIO
 * High-Performance Interactive Script (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Light / Dark Mode Toggle with Persistence
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('sai_portfolio_theme');

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('sai_portfolio_theme', 'dark');
        if (window.showToast) window.showToast('🌙 Dark Mode Activated');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('sai_portfolio_theme', 'light');
        if (window.showToast) window.showToast('☀️ Light Mode Activated');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Reading Progress Bar & Navbar Scroll Effect
  // --------------------------------------------------------------------------
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Hamburger Navigation
  // --------------------------------------------------------------------------
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Scrollspy (Active Navigation Link Highlighting)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(sec => scrollSpyObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 5. Scroll Reveal Animations
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-init');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 6. Animated Statistics Counters
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsCounted = false;

  const countUp = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const isPercent = element.getAttribute('data-type') === 'percent';
    const isPlus = element.getAttribute('data-type') === 'plus';
    const duration = 1800;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      let formattedVal = Math.floor(current);
      if (formattedVal < 10 && target < 10) {
        formattedVal = '0' + formattedVal;
      }
      
      if (isPercent) {
        element.textContent = `${formattedVal}%`;
      } else if (isPlus) {
        element.textContent = `${formattedVal}+`;
      } else {
        element.textContent = formattedVal;
      }
    }, stepTime);
  };

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach(stat => countUp(stat));
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // --------------------------------------------------------------------------
  // 7. Hero Profile Tilt Disabled (Photo remains completely still)
  // --------------------------------------------------------------------------
  // Tilt interaction removed as per user preference: photo stays rock solid and does not move

  // --------------------------------------------------------------------------
  // 8. Toast Notification & Copy-to-Clipboard
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  window.showToast = (message) => {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  window.copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(`✓ ${label} copied to clipboard!`);
    }).catch(() => {
      window.showToast(`Copied: ${text}`);
    });
  };

  // --------------------------------------------------------------------------
    // --------------------------------------------------------------------------
  // 10. Universal Gmail & Email Dispatch (Works seamlessly on Mobile & Laptop)
  // --------------------------------------------------------------------------
  const sendDirectEmail = (subject, body) => {
    const email = 'venkatasaimudde@gmail.com';
    const sub = encodeURIComponent(subject || 'Portfolio Inquiry for Venkata Sai Mudde');
    const bdy = encodeURIComponent(body || '');
    const mailtoUrl = `mailto:${email}?subject=${sub}&body=${bdy}`;
    const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${sub}&body=${bdy}`;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // On mobile devices, mailto directly launches the native Gmail / Mail app
      window.location.href = mailtoUrl;
    } else {
      // On laptops/desktops, open Gmail Web directly in a new tab AND trigger mailto
      window.open(webGmailUrl, '_blank');
      setTimeout(() => {
        try {
          window.location.href = mailtoUrl;
        } catch (e) {}
      }, 350);
    }
  };

  // Attach direct email opener to all Gmail buttons and icons across the site
  document.querySelectorAll('a[href*="mailto:venkatasaimudde@gmail.com"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.showToast) window.showToast('Opening Gmail to venkatasaimudde@gmail.com...');
      sendDirectEmail('Portfolio Inquiry for Venkata Sai Mudde', 'Hello Venkata Sai,\n\nI am reaching out via your developer portfolio.\n\n');
    });
  });

  // Contact Form Handling with dual delivery (FormSubmit AJAX + Device Email Composer)
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const subject = document.getElementById('cf-subject').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      if (!name || !email || !message) {
        if (window.showToast) window.showToast('Please complete all required fields.');
        return;
      }

      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-slow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        Sending to Sai's Mail...
      `;

      const fullSubject = subject || `Portfolio Inquiry from ${name}`;
      const fullBody = `Hello Venkata Sai,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

      // 1. Send via background AJAX delivery to FormSubmit
      fetch('https://formsubmit.co/ajax/venkatasaimudde@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: fullSubject,
          message: message
        })
      }).catch(() => {});

      // 2. Launch native/web email composer pre-filled directly on mobile or laptop
      setTimeout(() => {
        sendDirectEmail(fullSubject, fullBody);

        submitBtn.disabled = false;
        submitBtn.innerHTML = `✓ Message Sent`;

        if (window.showToast) window.showToast('✓ Message routed directly to venkatasaimudde@gmail.com!');

        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.innerHTML = `
            <div style="background: rgba(193, 0, 5, 0.15); border: 1px solid var(--accent-bright-green); padding: 14px; border-radius: var(--radius-sm); color: #FFFFFF; margin-top: 15px; font-size: 0.92rem; line-height: 1.5;">
              ✓ <strong>Message dispatched to venkatasaimudde@gmail.com!</strong> An email composer has also been launched on your device.
            </div>
          `;
        }

        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
        }, 5000);
      }, 700);
    });
  }
});
