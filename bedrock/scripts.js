/* ============================================
   Bedrock — Moodboard Scripts

   Two-speed motion:
   Speed A (fast surface): 200ms — close, hover-out, snappy transitions
   Speed B (measured reveal): 450ms spring — open, hover-in, scroll reveals
   ============================================ */

(function () {
  var isDebug = window.location.search.indexOf('debug') !== -1;
  var isTouch = window.matchMedia('(hover: none)').matches;

  // ---- Debug mode ----
  if (isDebug) {
    document.body.classList.add('debug');
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    // Open all expandables
    document.querySelectorAll('.expandable-trigger').forEach(function (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
      var content = trigger.nextElementSibling;
      if (content) content.style.maxHeight = 'none';
    });
    // Activate all hover targets
    document.querySelectorAll('[data-hover]').forEach(function (el) {
      el.classList.add('debug-hover');
    });
  }

  // ---- Scroll reveals ----
  if (!isDebug) {
    var reveals = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ---- Expandable sections ----
  document.querySelectorAll('.expandable-trigger').forEach(function (trigger) {
    var content = trigger.nextElementSibling;
    var expandable = trigger.closest('.expandable');

    trigger.addEventListener('click', function () {
      if (isDebug) return; // don't toggle in debug mode

      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        // Close: use Speed A (fast)
        expandable.classList.add('is-closing');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.offsetHeight; // force reflow
        content.style.maxHeight = '0';
        trigger.setAttribute('aria-expanded', 'false');

        content.addEventListener('transitionend', function onEnd() {
          expandable.classList.remove('is-closing');
          content.removeEventListener('transitionend', onEnd);
        });
      } else {
        // Open: uses Speed B (spring) via default CSS
        expandable.classList.remove('is-closing');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');

        content.addEventListener('transitionend', function onEnd() {
          content.style.maxHeight = 'none';
          content.removeEventListener('transitionend', onEnd);
        });
      }
    });
  });

  // ---- Touch: tap-to-reveal for results ----
  if (isTouch && !isDebug) {
    var results = document.querySelectorAll('.result[data-hover]');
    results.forEach(function (result) {
      result.addEventListener('click', function () {
        var wasActive = result.classList.contains('is-active');
        // Close all results
        results.forEach(function (r) { r.classList.remove('is-active'); });
        // Toggle this one
        if (!wasActive) result.classList.add('is-active');
      });
    });
  }

  // ---- Touch: tap-to-reveal for people ----
  if (isTouch && !isDebug) {
    var people = document.querySelectorAll('.person[data-hover]');
    people.forEach(function (person) {
      person.addEventListener('click', function () {
        var wasActive = person.classList.contains('is-active');
        // Close all people
        people.forEach(function (p) { p.classList.remove('is-active'); });
        // Toggle this one
        if (!wasActive) person.classList.add('is-active');
      });
    });
  }
})();
