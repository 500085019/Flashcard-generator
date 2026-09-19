import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiDownload,
  FiPrinter,
  FiCopy,
  FiX,
} from 'react-icons/fi';

function FlashcardDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const flashcard = useSelector((state) =>
    state.flashcards.flashcards.find((fc) => fc.id === id)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!flashcard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-8 py-16 text-center">
        <p className="text-slate-500 mb-4">Flashcard not found.</p>
        <Link to="/my-flashcards" className="text-violet-600 font-medium text-sm">
          Back to my flashcards
        </Link>
      </div>
    );
  }

  const activeTerm = flashcard.terms[activeIndex];
  const total = flashcard.terms.length;

  const goPrev = () => setActiveIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === total - 1 ? 0 : i + 1));

  const shareUrl = `${window.location.origin}/flashcard/${flashcard.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Could not copy link', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-8 py-6">
      <button
        onClick={() => navigate('/my-flashcards')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 mb-4"
      >
        <FiArrowLeft /> {flashcard.title}
      </button>
      <p className="text-sm text-slate-500 max-w-2xl mb-6">{flashcard.description}</p>

      <div className="grid grid-cols-[200px_1fr_140px] gap-5 max-w-4xl">
        {/* Left: term list */}
        <div className="bg-white/80 backdrop-blur rounded-xl border border-violet-100 p-3 space-y-1 h-fit">
          {flashcard.terms.map((t, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                index === activeIndex
                  ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium'
                  : 'text-slate-600 hover:bg-violet-50'
              }`}
            >
              {t.term}
            </button>
          ))}
        </div>

        {/* Center: active term + carousel */}
        <div className="bg-white/80 backdrop-blur rounded-xl border border-violet-100 p-8 flex flex-col items-center justify-center text-center min-h-[280px] shadow-sm shadow-violet-50">
          {activeTerm.image && (
            <img
              src={activeTerm.image}
              alt={activeTerm.term}
              className="w-24 h-24 object-cover rounded-lg mb-4"
            />
          )}
          <p className="font-semibold text-slate-800 text-lg mb-2">{activeTerm.term}</p>
          <p className="text-sm text-slate-500 max-w-sm">{activeTerm.definition}</p>

          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={goPrev}
              aria-label="Previous term"
              className="p-2 rounded-full border border-violet-200 text-violet-500 hover:bg-violet-50"
            >
              <FiChevronLeft />
            </button>
            <span className="text-xs text-slate-400">
              {activeIndex + 1}/{total}
            </span>
            <button
              onClick={goNext}
              aria-label="Next term"
              className="p-2 rounded-full border border-violet-200 text-violet-500 hover:bg-violet-50"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg px-3 py-2 hover:shadow-md"
          >
            <FiShare2 size={15} /> Share
          </button>
          <button className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-violet-100 rounded-lg px-3 py-2 hover:bg-violet-50">
            <FiDownload size={15} /> Download
          </button>
          <button className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-violet-100 rounded-lg px-3 py-2 hover:bg-violet-50">
            <FiPrinter size={15} /> Print
          </button>
        </div>
      </div>

      {/* Share modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-96 relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowShareModal(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <FiX />
            </button>
            <p className="font-semibold text-slate-800 mb-4">Share this flashcard</p>
            <div className="flex items-center gap-2 mb-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 text-xs border border-violet-200 rounded-lg px-2 py-2 text-slate-600"
              />
              <button
                onClick={handleCopyLink}
                aria-label="Copy link"
                className="p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
              >
                <FiCopy size={14} />
              </button>
            </div>
            {copied && <p className="text-xs text-emerald-600">Copied!</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardDetailsPage;