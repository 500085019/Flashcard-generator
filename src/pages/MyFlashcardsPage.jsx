import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FlashcardCard from '../components/FlashcardCard';

function MyFlashcardsPage() {
  const flashcards = useSelector((state) => state.flashcards.flashcards);

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 px-8 py-16 text-center">
        <p className="text-slate-500 dark:text-slate-400 mb-4">No flashcards yet. Create one to get started.</p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-violet-200 dark:hover:shadow-none"
        >
          Create flashcard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
        {flashcards.map((fc, i) => (
          <FlashcardCard key={fc.id} flashcard={fc} index={i} />
        ))}
      </div>
    </div>
  );
}

export default MyFlashcardsPage;