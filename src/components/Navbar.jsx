import { NavLink } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const tabClasses = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white dark:bg-slate-800 text-violet-700 dark:text-violet-300 shadow-sm'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-4 sm:px-8 py-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xl">✦</span>
          <h1 className="text-lg sm:text-xl font-semibold text-white">FlashCard Studio</h1>
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors shadow-sm"
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>

      <nav className="inline-flex gap-1 bg-white/10 rounded-full p-1">
        <NavLink to="/" end className={tabClasses}>
          Create new
        </NavLink>
        <NavLink to="/my-flashcards" className={tabClasses}>
          My flashcards
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;