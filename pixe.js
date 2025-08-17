document.addEventListener('DOMContentLoaded', () => {
  /* ================= Video Section ================= */
  const video = document.getElementById('customVideo');
  const playIcon = document.getElementById('playIcon');

  function toggleVideo() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  if (video && playIcon) {
    video.addEventListener('click', toggleVideo);
    playIcon.addEventListener('click', toggleVideo);

    video.addEventListener('pause', () => (playIcon.style.display = 'flex'));
    video.addEventListener('play', () => (playIcon.style.display = 'none'));

    // Ensure correct icon state on load
    if (video.paused) playIcon.style.display = 'flex';
  }

  /* ================= Testimonial Carousel ================= */
  const carouselInner = document.getElementById('carousel-inner');
  const carouselDots = document.getElementById('carousel-dots');
  const testimonials = document.querySelectorAll('.testimonial');
  let currentSlide = 0;
  let autoSlideTimer = null;

  function buildDots() {
    testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      carouselDots.appendChild(dot);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }

  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function startCarouselAutoSlide() {
    stopCarouselAutoSlide();
    autoSlideTimer = setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonials.length;
      updateCarousel();
    }, 5000);
  }

  function stopCarouselAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  if (carouselInner && carouselDots && testimonials.length) {
    buildDots();
    startCarouselAutoSlide();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        stopCarouselAutoSlide();
        goToSlide((currentSlide + 1) % testimonials.length);
        startCarouselAutoSlide();
      }
      if (e.key === 'ArrowLeft') {
        stopCarouselAutoSlide();
        goToSlide((currentSlide - 1 + testimonials.length) % testimonials.length);
        startCarouselAutoSlide();
      }
    });
  }

  /* ================= Form Validation Helpers ================= */
  function isGmail(addr) {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(String(addr || '').trim());
  }

  /* ================= Contact Form ================= */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const emailField = document.getElementById('email');
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !emailField.value.trim() || !subject || !message) {
        emailField.reportValidity();
        return;
      }

      if (!isGmail(emailField.value)) {
        emailField.setCustomValidity("Please enter a Gmail address (e.g., name@gmail.com).");
        emailField.reportValidity();
        return;
      } else {
        emailField.setCustomValidity("");
      }

      // Show Success Modal
      const successModal = document.getElementById('success-modal');
      if (successModal) {
        successModal.classList.add('active');
        successModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open'); // lock scroll
      }
    });
  }

  /* ================= Newsletter Form ================= */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      if (!isGmail(newsletterEmail.value)) {
        e.preventDefault();
        newsletterEmail.setCustomValidity("Please enter a Gmail address (e.g., name@gmail.com).");
        newsletterEmail.reportValidity();
      } else {
        newsletterEmail.setCustomValidity("");
      }
    });
  }

  /* ================= Modal ================= */
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalOkBtn = document.getElementById('modal-ok');

  function closeModal() {
    if (successModal) {
      successModal.classList.remove('active');
      successModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open'); // allow scrolling again
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === successModal) closeModal();
  });

  /* ================= Smooth Scrolling ================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
});
