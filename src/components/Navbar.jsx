import { NavLink } from 'react-router-dom';

function Navbar() {
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