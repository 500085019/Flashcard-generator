import { useState } from 'react';
import {
  FiCopy,
  FiX,
  FiFacebook,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi';
import { FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

function ShareModal({ url, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Could not copy link', err);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,

    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,

    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `Check out this flashcard: ${url}`
    )}`,

    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent('Check out this flashcard!')}`,

    email: `mailto:?subject=${encodeURIComponent(
      'Check out this flashcard'
    )}&body=${encodeURIComponent(
      `I thought you might find this flashcard useful:\n\n${url}`
    )}`,
  };

  const openShareLink = (shareUrl) => {
    window.open(
      shareUrl,
      '_blank',
      'noopener,noreferrer,width=600,height=500'
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <FiX size={18} />
        </button>

        {/* Heading */}
        <p className="font-semibold text-slate-800 dark:text-slate-100 text-base mb-4">
          Share this flashcard
        </p>

        {/* Link + Copy */}
        <div className="flex items-center gap-2 mb-5">
          <input
            readOnly
            value={url}
            className="flex-1 min-w-0 text-xs border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2.5 text-slate-600 dark:text-slate-200 bg-slate-50 dark:bg-slate-700 outline-none"
          />

          <button
            onClick={handleCopyLink}
            aria-label="Copy link"
            className="flex-shrink-0 p-2.5 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            <FiCopy size={15} />
          </button>
        </div>

        {/* Copied Message */}
        {copied && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-4">
            Link copied to clipboard!
          </p>
        )}

        {/* Social Share Buttons */}
        <div className="flex items-center justify-center gap-3">
          {/* Facebook */}
          <button
            onClick={() => openShareLink(shareLinks.facebook)}
            aria-label="Share on Facebook"
            className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <FiFacebook size={18} />
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => openShareLink(shareLinks.linkedin)}
            aria-label="Share on LinkedIn"
            className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <FiLinkedin size={18} />
          </button>

          {/* WhatsApp */}
          <button
            onClick={() => openShareLink(shareLinks.whatsapp)}
            aria-label="Share on WhatsApp"
            className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
          >
            <FaWhatsapp size={18} />
          </button>

          {/* X / Twitter */}
          <button
            onClick={() => openShareLink(shareLinks.twitter)}
            aria-label="Share on X"
            className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <FaXTwitter size={16} />
          </button>

          {/* Email */}
          <button
            onClick={() => openShareLink(shareLinks.email)}
            aria-label="Share by email"
            className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <FiMail size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;