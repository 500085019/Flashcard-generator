import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { deleteFlashcard } from '../redux/flashcardsSlice';
import DeleteModal from './DeleteModal';

const avatarColors = [
  'bg-violet-100 dark:bg-violet-900/40',
  'bg-indigo-100 dark:bg-indigo-900/40',
  'bg-sky-100 dark:bg-sky-900/40',
  'bg-emerald-100 dark:bg-emerald-900/40',
  'bg-amber-100 dark:bg-amber-900/40',
  'bg-rose-100 dark:bg-rose-900/40',
];

function FlashcardCard({ flashcard, index }) {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteFlashcard(flashcard.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl border border-violet-100 dark:border-slate-700 p-6 flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-100 dark:hover:shadow-none transition-shadow">
      <button
        onClick={handleDeleteClick}
        aria-label={`Delete ${flashcard.title}`}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors"
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
          className={`w-14 h-14 rounded-full ${avatarColors[index % avatarColors.length]} mb-3 flex items-center justify-center text-violet-700 dark:text-violet-300 font-semibold text-lg`}
        >
          {flashcard.title.charAt(0).toUpperCase()}
        </div>
      )}

      <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">{flashcard.title}</p>

      <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 mb-3">
        {flashcard.description || 'No description provided.'}
      </p>

      <p className="text-xs text-violet-500 dark:text-violet-400 font-medium mb-4">
        {flashcard.terms.length} Cards
      </p>

      <Link
        to={`/flashcard/${flashcard.id}`}
        className="text-xs font-semibold text-violet-600 dark:text-violet-300 border border-violet-300 dark:border-violet-600 rounded-lg px-4 py-1.5 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
      >
        View Cards
      </Link>

      {showDeleteModal && (
        <DeleteModal
          flashcard={flashcard}
          onDelete={handleConfirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default FlashcardCard;