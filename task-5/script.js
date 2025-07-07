document.addEventListener('DOMContentLoaded', function () {
  // Sticky Header
  const header = document.querySelector('header');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
      backToTop.classList.add('active');
    } else {
      header.classList.remove('sticky');
      backToTop.classList.remove('active');
    }
  });

  // Add event listener for back to top button
  backToTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });

        // Close mobile menu if open
        document.getElementById('nav-toggle').checked = false;
      }
    });
  });

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector('nav ul li a[href*=' + sectionId + ']')
          .classList.add('active');
      } else {
        document
          .querySelector('nav ul li a[href*=' + sectionId + ']')
          .classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // Typing effect
  const typedTextSpan = document.querySelector('.typed-text');
  const cursorSpan = document.querySelector('.cursor');

  const textArray = [
    'Web Developer',
    'UI/UX Designer',
    'Freelancer',
    'Photographer',
  ];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains('typing')) {
        cursorSpan.classList.add('typing');
      }
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove('typing');
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains('typing')) {
        cursorSpan.classList.add('typing');
      }
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove('typing');
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (textArray.length) setTimeout(type, newTextDelay + 250);

  // Portfolio filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        if (
          filterValue === 'all' ||
          item.getAttribute('data-category') === filterValue
        ) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Here you would typically send the form data to a server
      // For this example, we'll just log it to the console
      console.log('Form submitted:', { name, email, subject, message });

      // Show success message (in a real application)
      alert('Thank you for your message! I will get back to you soon.');

      // Reset form
      contactForm.reset();
    });
  }

  // Animation on scroll (simple version)
  function revealOnScroll() {
    const elements = document.querySelectorAll(
      '.service-card, .portfolio-item, .about-image, .about-text, .contact-item'
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check on page load
});
