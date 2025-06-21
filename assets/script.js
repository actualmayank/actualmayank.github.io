const scrollItems = document.querySelectorAll('.scroll-item');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  },
  { threshold: 0.3 }
);
scrollItems.forEach(item => observer.observe(item));
