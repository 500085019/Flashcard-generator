import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { deleteFlashcard } from '../redux/flashcardsSlice';
import DeleteModal from './DeleteModal';

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteFlashcard(flashcard.id));
    setShowDeleteModal(false);
  };

  return (
    <>
      {/* Flashcard */}
      <div className="relative bg-white/80 backdrop-blur rounded-2xl border border-violet-100 p-6 flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-100 transition-shadow">

        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDeleteClick}
          aria-label={`Delete ${flashcard.title}`}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <FiTrash2 size={15} />
        </button>

        {/* Avatar */}
        <div
          className={`w-14 h-14 rounded-full ${
            avatarColors[index % avatarColors.length]
          } mb-3 flex items-center justify-center text-violet-700 font-semibold text-lg`}
        >
          {flashcard.title.charAt(0).toUpperCase()}
        </div>

        {/* Title */}
        <p className="font-semibold text-slate-800 text-sm mb-1">
          {flashcard.title}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3">
          {flashcard.description || 'No description provided.'}
        </p>

        {/* Number of Cards */}
        <p className="text-xs text-violet-500 font-medium mb-4">
          {flashcard.terms.length} Cards
        </p>

        {/* View Cards */}
        <Link
          to={`/flashcard/${flashcard.id}`}
          className="text-xs font-semibold text-violet-600 border border-violet-300 rounded-lg px-4 py-1.5 hover:bg-violet-50 transition-colors"
        >
          View Cards
        </Link>
      </div>

      {/* Delete Modal OUTSIDE the card */}
      {showDeleteModal && (
        <DeleteModal
          flashcard={flashcard}
          onDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
export default FlashcardCard;