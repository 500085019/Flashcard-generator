import { NavLink } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

function Navbar() {
  const {theme,toggleTheme} = useTheme()
  const tabClasses = ({ isActive }) =>
    `pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
      isActive
        ? 'border-violet-600 text-violet-700'
        : 'border-transparent text-slate-500 hover:text-slate-700'
    }`;

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-8 pt-6 pb-0">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">✦</span>
        <h1 className="text-lg font-semibold text-white">FlashCard Studio</h1>
      </div>
       <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
        </button>
      <nav className="flex gap-6 bg-white rounded-t-xl px-4 pt-3">
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