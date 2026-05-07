// Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navLinks.classList.contains('active') ? '✕' : '☰';
      mobileBtn.textContent = icon;
    });
  }

  // Active Navigation Link Highlighting
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-link');
  
  navItems.forEach(link => {
    if (link.getAttribute('href') === currentPath || (currentPath === '/' && link.getAttribute('href') === '/index.html') || (currentPath === '/index.html' && link.getAttribute('href') === '/')) {
      link.classList.add('active');
    }
  });

  // Sticky Navigation Shadow on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileBtn.textContent = '☰';
        }
      }
    });
  });

  // Simple Intersection Observer for Fade-in Animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .section h2').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // ==========================================================
  // Activity Gallery: filter pills + lightbox
  // ==========================================================
  const grid = document.getElementById('activity-grid');
  if (grid) {
    const cards = Array.from(grid.querySelectorAll('.activity-card'));
    const pills = document.querySelectorAll('#filter-bar .filter-pill');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.dataset.filter;
        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });

    // Deep-link filter via hash (#feeding, #women, etc.)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const target = document.querySelector(`#filter-bar .filter-pill[data-filter="${hash}"]`);
      if (target) target.click();
    }

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');
    const lbClose = document.getElementById('lightbox-close');

    const openLightbox = (card) => {
      const cardImg = card.querySelector('img');
      lbImg.src = cardImg ? cardImg.currentSrc || cardImg.src : card.dataset.full;
      lbImg.alt = card.dataset.title || '';
      lbCap.innerHTML = `<strong>${card.dataset.title || ''}</strong>${card.dataset.caption || ''}`;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    cards.forEach(card => card.addEventListener('click', () => openLightbox(card)));
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  // Carousel Functionality
  const carousel = document.querySelector('.carousel-wrapper');
  if (carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(n) {
      currentSlide = (n + totalSlides) % totalSlides;
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index));
    });

    // Auto-play carousel
    let autoplay = setInterval(nextSlide, 5000);

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
      });

      carouselContainer.addEventListener('mouseleave', () => {
        autoplay = setInterval(nextSlide, 5000);
      });
    }

    // Initialize
    goToSlide(0);
  }
});
