import { Field, useFormikContext } from 'formik';
import { compressImage } from '../../utils/imageCompression';

function FlashcardForm() {
  const { errors, touched, setFieldValue } = useFormikContext();

  return (
    <>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Group title
        </label>
        <Field
          id="title"
          name="title"
          placeholder="e.g. Cell biology"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        {errors.title && touched.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Image (optional)
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-violet-50 dark:file:bg-violet-900/40 file:text-violet-600 dark:file:text-violet-300 file:text-sm hover:file:bg-violet-100 dark:hover:file:bg-violet-900/60"
          onChange={async (e) => {
            const file = e.currentTarget.files[0];
            if (file) {
              try {
                const compressed = await compressImage(file);
                setFieldValue('image', compressed);
              } catch (err) {
                console.error('Image compression failed', err);
              }
            }
          }}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Description
        </label>
        <Field
          id="description"
          as="textarea"
          name="description"
          rows={3}
          placeholder="What's this flashcard set about?"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>
    </>
  );
}

export default FlashcardForm;