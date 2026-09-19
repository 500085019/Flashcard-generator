import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

function FlashcardCard({ flashcard, index }) {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmed = window.confirm(`Delete "${flashcard.title}"? This can't be undone.`);
    if (confirmed) {
      dispatch(deleteFlashcard(flashcard.id));
    }
  };

  return (
    <div className="relative bg-white/80 backdrop-blur rounded-2xl border border-violet-100 p-6 flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-100 transition-shadow">
      <button
        onClick={handleDelete}
        aria-label={`Delete ${flashcard.title}`}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        <FiTrash2 size={15} />
      </button>

      {flashcard.image ? (
        <img
          src={flashcard.image}
          alt={flashcard.title}
          className="w-14 h-14 rounded-full object-cover mb-3"
        />
      ) : (
        <div
          className={`w-14 h-14 rounded-full ${avatarColors[index % avatarColors.length]} mb-3 flex items-center justify-center text-violet-700 font-semibold text-lg`}
        >
          {flashcard.title.charAt(0).toUpperCase()}
        </div>
      )}

      <p className="font-semibold text-slate-800 text-sm mb-1">{flashcard.title}</p>

      <p className="text-xs text-slate-400 line-clamp-2 mb-3">
        {flashcard.description || 'No description provided.'}
      </p>

      <p className="text-xs text-violet-500 font-medium mb-4">
        {flashcard.terms.length} Cards
      </p>

      <Link
        to={`/flashcard/${flashcard.id}`}
        className="text-xs font-semibold text-violet-600 border border-violet-300 rounded-lg px-4 py-1.5 hover:bg-violet-50 transition-colors"
      >
        View Cards
      </Link>
    </div>
  );
}

export default FlashcardCard;