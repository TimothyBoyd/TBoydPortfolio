// Timothy Boyd portfolio — shared behavior
document.addEventListener('DOMContentLoaded', () => {
  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // active nav link
  const here = document.body.dataset.page;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.dataset.page === here) a.classList.add('active');
  });

  // fake lat/long cursor readout — only on hero (desktop, fine pointer)
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(pointer:fine)').matches) {
    const readout = document.createElement('div');
    readout.className = 'readout';
    document.body.appendChild(readout);

    // San Diego-ish origin, purely decorative
    const baseLat = 32.7757, baseLng = -117.0719;

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const lat = (baseLat + (0.5 - py) * 0.6).toFixed(4);
      const lng = (baseLng + (px - 0.5) * 0.6).toFixed(4);
      readout.textContent = `${lat}° N, ${Math.abs(lng)}° W · ${Math.round(20 + py * 140)}m ELEV`;
      readout.style.left = e.clientX + 'px';
      readout.style.top = e.clientY + 'px';
      readout.classList.add('show');
    });
    hero.addEventListener('mouseleave', () => readout.classList.remove('show'));
  }

  // reveal panels on scroll
  const revealables = document.querySelectorAll('.panel, .legend-card, .embed-card, .preview-card, .embed-preview');
  if ('IntersectionObserver' in window) {
    revealables.forEach(el => { el.style.opacity = 0; el.style.transform = 'translateY(16px)'; el.style.transition = 'opacity .6s ease, transform .6s ease'; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealables.forEach(el => io.observe(el));
  }
});
