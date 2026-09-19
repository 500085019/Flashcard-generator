import { useState } from 'react';
import { FiCopy, FiX } from 'react-icons/fi';

function ShareModal({ url, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Could not copy link', err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-96 relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <FiX />
        </button>
        <p className="font-semibold text-slate-800 mb-4">Share this flashcard</p>
        <div className="flex items-center gap-2 mb-2">
          <input
            readOnly
            value={url}
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
  );
}

export default ShareModal;