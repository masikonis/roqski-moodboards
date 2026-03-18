/* ============================================
   Counsel — Moodboard Scripts
   ============================================ */

(function () {
  var isDebug = new URLSearchParams(window.location.search).has('debug');

  // Stagger-group reveal via IntersectionObserver
  var groups = document.querySelectorAll('.stagger-group');

  if (isDebug) {
    // Debug mode: show everything immediately, open all expandables
    groups.forEach(function (group) {
      group.querySelectorAll('.reveal, .reveal--slow').forEach(function (el) {
        el.classList.add('is-visible');
      });
    });
    document.querySelectorAll('.expandable-trigger').forEach(function (trigger) {
      var content = trigger.nextElementSibling;
      trigger.setAttribute('aria-expanded', 'true');
      content.style.maxHeight = 'none';
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal--slow').forEach(function (el) {
              el.classList.add('is-visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    groups.forEach(function (group) {
      observer.observe(group);
    });
  }

  // Expandable sections
  document.querySelectorAll('.expandable-trigger').forEach(function (trigger) {
    var content = trigger.nextElementSibling;

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.offsetHeight; // force reflow
        content.style.maxHeight = '0';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');

        var onEnd = function () {
          content.style.maxHeight = 'none';
          content.removeEventListener('transitionend', onEnd);
        };
        content.addEventListener('transitionend', onEnd);
      }
    });
  });
})();
