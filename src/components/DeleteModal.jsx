import { createPortal } from 'react-dom';
import {
  FiAlertTriangle,
  FiX,
  FiTrash2,
} from 'react-icons/fi';

function DeleteModal({ flashcard, onDelete, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
        >
          <FiX size={18} />
        </button>

        {/* Warning Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30">
            <FiAlertTriangle
              size={24}
              className="text-red-500 dark:text-red-400"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-slate-800 dark:text-slate-100">
          Delete flashcard?
        </h2>

        {/* Description */}
        <p className="mt-2 text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            "{flashcard.title}"
          </span>
          ?
        </p>

        <p className="mt-1 text-center text-xs text-slate-400 dark:text-slate-500">
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-200 dark:border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={onDelete}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            <FiTrash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeleteModal;