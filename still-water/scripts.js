/* ============================================
   Still Water — Moodboard Scripts
   ============================================ */

(function () {
  // Reveal-on-scroll via IntersectionObserver
  const reveals = document.querySelectorAll('.reveal, .reveal--slow');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));

  // Expandable sections
  document.querySelectorAll('.expandable-trigger').forEach((trigger) => {
    const content = trigger.nextElementSibling;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        // Close
        content.style.maxHeight = content.scrollHeight + 'px';
        // Force reflow so the browser registers the starting value
        content.offsetHeight;
        content.style.maxHeight = '0';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        // Open
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');

        // After transition, remove inline max-height so content can reflow
        const onEnd = () => {
          content.style.maxHeight = 'none';
          content.removeEventListener('transitionend', onEnd);
        };
        content.addEventListener('transitionend', onEnd);
      }
    });
  });
})();
