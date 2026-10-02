
/* tabs.js: the Login / Register switcher at the top of both pages */
(function () {
  const bar = document.querySelector('.page-tabs');
  if (!bar) { return; }                                          // a page without the switcher
 
  const tabs = Array.from(bar.querySelectorAll('.page-tab'));
  const SLIDE_MS = 250;                                          // must match the transition in styles.css
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      event.preventDefault();                                    // we open the page ourselves, after the slide
      if (tab.getAttribute('aria-current') === 'page') { return; }   // already on this page
 
      tabs.forEach(function (other) { other.removeAttribute('aria-current'); });
      tab.setAttribute('aria-current', 'page');                  // the CSS slides the highlight to this tab
 
      setTimeout(function () {
        window.location.href = tab.href;                         // now show the other page
      }, reduceMotion ? 0 : SLIDE_MS);
    });
  });
})();
 