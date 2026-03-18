(function () {
  var isDebug = new URLSearchParams(window.location.search).has('debug');

  if (isDebug) {
    document.body.classList.add('is-debug');
    document.querySelectorAll('.reveal, .rule-draw').forEach(function (el) {
      el.classList.add('is-visible');
    });
    document.querySelectorAll('.expandable-trigger').forEach(function (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
    });
    document.querySelectorAll('.expandable-content').forEach(function (content) {
      content.style.maxHeight = 'none';
    });
  }

  // Scroll-triggered animations
  if (!isDebug) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .rule-draw').forEach(function (el) {
      observer.observe(el);
    });
  }

  // Expandable sections
  document.querySelectorAll('.expandable-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      var content = trigger.nextElementSibling;
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });
  });
})();
