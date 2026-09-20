import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiDownload,
  FiPrinter,
  FiEye,
} from 'react-icons/fi';
import ShareModal from '../components/ShareModal';

function FlashcardDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Look up the flashcard set by id from the URL. If it doesn't exist
  // (e.g. it was deleted, or the URL was typed/shared incorrectly),
  // this will be undefined and we show a "not found" state below.
  
  const flashcard = useSelector((state) =>
    state.flashcards.flashcards.find((fc) => fc.id === id)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [revealed, setRevealed] = useState(false);
  // Whenever the user switches to a different term (via the sidebar,
  // or next/prev arrows), reset the flip card back to its hidden
  // (front) side. Without this, switching terms in Study Mode would
  // carry over whatever reveal state the previous term was left in.

  useEffect(() => {
    setRevealed(false);
  }, [activeIndex]);

  if (!flashcard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-4 sm:px-8 py-16 text-center">
        <p className="text-slate-500 mb-4">Flashcard not found.</p>
        <Link to="/my-flashcards" className="text-violet-600 font-medium text-sm">
          Back to my flashcards
        </Link>
      </div>
    );
  }

  const activeTerm = flashcard.terms[activeIndex];
  const total = flashcard.terms.length;
  // Carousel navigation with wrap-around: going "previous" from the
  // first term (index 0) jumps to the last term, and going "next"
  // from the last term jumps back to the first — so the carousel
  // loops continuously in either direction instead of dead-ending.

  const goPrev = () => setActiveIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === total - 1 ? 0 : i + 1));

  const shareUrl = `${window.location.origin}/flashcard/${flashcard.id}`;
  // In Study Mode, clicking the card flips it to reveal/hide the definition.
  // Outside Study Mode, the definition is always visible, so this is a no-op.
  const handleCardClick = () => {
    if (studyMode) {
      setRevealed((r) => !r);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-4 sm:px-8 py-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <button
          onClick={() => navigate('/my-flashcards')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600"
        >
          <FiArrowLeft /> {flashcard.title}
        </button>

        <button
          onClick={() => setStudyMode((s) => !s)}
          className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${
            studyMode
              ? 'bg-violet-600 text-white border-violet-600'
              : 'bg-white text-violet-600 border-violet-300 hover:bg-violet-50'
          }`}
        >
          <FiEye size={14} />
          {studyMode ? 'Study mode: On' : 'Study mode: Off'}
        </button>
      </div>

      {flashcard.image && (
        <img
          src={flashcard.image}
          alt={flashcard.title}
          className="w-16 h-16 rounded-xl object-cover mb-3"
        />
      )}

      <p className="text-sm text-slate-500 max-w-2xl mb-6">{flashcard.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_140px] gap-4 md:gap-5 max-w-4xl">
        {/* Left: term list */}
        <div className="bg-white/80 backdrop-blur rounded-xl border border-violet-100 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible h-fit">
          {flashcard.terms.map((t, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`whitespace-nowrap md:whitespace-normal text-left px-3 py-2 rounded-lg text-sm transition-colors shrink-0 md:w-full ${
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
        <div className="bg-white/80 backdrop-blur rounded-xl border border-violet-100 p-6 sm:p-8 flex flex-col items-center justify-center shadow-sm shadow-violet-50">
          {studyMode ? (
            <div
              className="[perspective:1000px] w-full max-w-sm cursor-pointer"
              onClick={handleCardClick}
            >
              <div
                className="relative min-h-[180px] transition-transform duration-500 [transform-style:preserve-3d]"
                style={{ transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* Front: term only */}
                <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center text-center rounded-xl border border-violet-100 bg-white p-6">
                  {activeTerm.image && (
                    <img
                      src={activeTerm.image}
                      alt={activeTerm.term}
                      className="w-16 h-16 object-cover rounded-lg mb-3"
                    />
                  )}
                  <p className="font-semibold text-slate-800 text-lg mb-2">{activeTerm.term}</p>
                  <span className="text-xs text-violet-400">Click to reveal</span>
                </div>

                {/* Back: definition only */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center text-center rounded-xl border border-violet-200 bg-violet-50 p-6"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <p className="text-sm text-slate-600">{activeTerm.definition}</p>
                  <span className="text-xs text-violet-400 mt-3">Click to hide</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center min-h-[180px] justify-center">
              {activeTerm.image && (
                <img
                  src={activeTerm.image}
                  alt={activeTerm.term}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mb-4"
                />
              )}
              <p className="font-semibold text-slate-800 text-lg mb-2">{activeTerm.term}</p>
              <p className="text-sm text-slate-500 max-w-sm">{activeTerm.definition}</p>
            </div>
          )}

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

         {/* Action buttons. Row on mobile, column on desktop; labels are
            hidden below the sm breakpoint so only icons show on very
            small screens, keeping the buttons compact. */}
        <div className="flex flex-row md:flex-col gap-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2 text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg px-3 py-2 hover:shadow-md"
          >
            <FiShare2 size={15} /> <span className="hidden sm:inline">Share</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2 text-sm text-slate-600 bg-white border border-violet-100 rounded-lg px-3 py-2 hover:bg-violet-50">
            <FiDownload size={15} /> <span className="hidden sm:inline">Download</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2 text-sm text-slate-600 bg-white border border-violet-100 rounded-lg px-3 py-2 hover:bg-violet-50">
            <FiPrinter size={15} /> <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Share modal */}
      {showShareModal && (
        <ShareModal url={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}

export default FlashcardDetailsPage;