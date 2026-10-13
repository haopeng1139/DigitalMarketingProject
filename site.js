(function () {
  function toast(msg) {
    var t = document.querySelector('.sp-toast');
    if (!t) { t = document.createElement('div'); t.className = 'sp-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(t._h); t._h = setTimeout(function () { t.hidden = true; }, 3200);
  }
  document.addEventListener('submit', function (e) {
    e.preventDefault();
    toast('Thanks! This is a preview of Slowpost, so nothing was sent yet.');
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href="#"]');
    if (a) { e.preventDefault(); toast('This part of Slowpost opens soon.'); }
  });
})();
