import { useEffect, useState } from 'react';

// Reads the saved theme preference from localStorage on first load
// (defaulting to 'light' if nothing was saved before), then keeps
// the <html> element's "dark" class and localStorage in sync
// whenever the theme changes.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}