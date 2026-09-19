import { Field, useFormikContext } from 'formik';

function FlashcardForm() {
  const { errors, touched, setFieldValue } = useFormikContext();

  return (
    <>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
          Group title
        </label>
        <Field
          id="title"
          name="title"
          placeholder="e.g. Cell biology"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        {errors.title && touched.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">
          Image (optional)
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-violet-50 file:text-violet-600 file:text-sm hover:file:bg-violet-100"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => setFieldValue('image', reader.result);
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <Field
          id="description"
          as="textarea"
          name="description"
          rows={3}
          placeholder="What's this flashcard set about?"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>
    </>
  );
}

export default FlashcardForm;