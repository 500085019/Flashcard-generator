import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { deleteFlashcard } from '../redux/flashcardsSlice';

const avatarColors = [
  'bg-violet-100',
  'bg-indigo-100',
  'bg-sky-100',
  'bg-emerald-100',
  'bg-amber-100',
  'bg-rose-100',
];

function MyFlashcardsPage() {
  const flashcards = useSelector((state) => state.flashcards.flashcards);
  const dispatch = useDispatch();

  const handleDelete = (e, id, title) => {
    e.preventDefault(); // prevent the card's Link from navigating
    e.stopPropagation();
    const confirmed = window.confirm(`Delete "${title}"? This can't be undone.`);
    if (confirmed) {
      dispatch(deleteFlashcard(id));
    }
  };

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-8 py-16 text-center">
        <p className="text-slate-500 mb-4">No flashcards yet. Create one to get started.</p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-violet-200"
        >
          Create flashcard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
        {flashcards.map((fc, i) => (
          <div
            key={fc.id}
            className="relative bg-white/80 backdrop-blur rounded-2xl border border-violet-100 p-6 flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-100 transition-shadow"
          >
            <button
              onClick={(e) => handleDelete(e, fc.id, fc.title)}
              aria-label={`Delete ${fc.title}`}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <FiTrash2 size={15} />
            </button>

            <div
              className={`w-14 h-14 rounded-full ${avatarColors[i % avatarColors.length]} mb-3 flex items-center justify-center text-violet-700 font-semibold text-lg`}
            >
              {fc.title.charAt(0).toUpperCase()}
            </div>

            <p className="font-semibold text-slate-800 text-sm mb-1">{fc.title}</p>

            <p className="text-xs text-slate-400 line-clamp-2 mb-3">
              {fc.description || 'No description provided.'}
            </p>

            <p className="text-xs text-violet-500 font-medium mb-4">{fc.terms.length} Cards</p>

            <Link
              to={`/flashcard/${fc.id}`}
              className="text-xs font-semibold text-violet-600 border border-violet-300 rounded-lg px-4 py-1.5 hover:bg-violet-50 transition-colors"
            >
              View Cards
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyFlashcardsPage;