(() => {
  const key = 'portfolio-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem(key); } catch (_) {}
  let theme = ['light', 'dark'].includes(saved) ? saved : (system.matches ? 'dark' : 'light');
  const apply = () => {
    document.documentElement.dataset.theme = theme;
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? '☀ Light mode' : '☾ Dark mode';
      button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  };
  apply();
  system.addEventListener('change', event => {
    if (!saved) { theme = event.matches ? 'dark' : 'light'; apply(); }
  });
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelector('.theme-toggle').addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark'; saved = theme;
      try { localStorage.setItem(key, theme); } catch (_) {}
      apply();
    });
  });
})();
