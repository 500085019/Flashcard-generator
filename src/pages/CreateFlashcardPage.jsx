import { useRef } from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';
import { addFlashcard } from '../redux/flashcardsSlice';

const validationSchema = Yup.object({
  title: Yup.string().required('Group title is required'),
  description: Yup.string(),
  terms: Yup.array().of(
    Yup.object({
      term: Yup.string().required('Term is required'),
      definition: Yup.string().required('Definition is required'),
    })
  ).min(1, 'Add at least one term'),
});

function CreateFlashcardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const termRefs = useRef({});

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      addFlashcard({
        title: values.title,
        description: values.description,
        image: values.image,
        terms: values.terms,
      })
    );
    resetForm();
    navigate('/my-flashcards');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-xl shadow-violet-100 border border-violet-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-lg">
            ✦
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">
            New flashcard set
          </h1>
        </div>

        <Formik
          initialValues={{
            title: '',
            description: '',
            image: '',
            terms: [{ term: '', definition: '', image: '' }],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="space-y-5">
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

              <div>
                <h2 className="text-sm font-semibold text-slate-700 mb-3">Terms</h2>
                <FieldArray name="terms">
                  {({ push, remove }) => (
                    <div className="space-y-3">
                      {values.terms.map((termItem, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="flex-1">
                            <Field
                              name={`terms.${index}.term`}
                              placeholder="Enter term"
                              innerRef={(el) => (termRefs.current[index] = el)}
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                            />
                            {errors.terms?.[index]?.term && touched.terms?.[index]?.term && (
                              <p className="text-red-500 text-xs mt-1">{errors.terms[index].term}</p>
                            )}
                          </div>

                          <div className="flex-1">
                            <Field
                              name={`terms.${index}.definition`}
                              placeholder="Enter definition"
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                            />
                            {errors.terms?.[index]?.definition && touched.terms?.[index]?.definition && (
                              <p className="text-red-500 text-xs mt-1">{errors.terms[index].definition}</p>
                            )}
                          </div>

                          <button
                            type="button"
                            aria-label="Edit term"
                            onClick={() => termRefs.current[index]?.focus()}
                            className="p-2 rounded-lg border border-slate-300 text-slate-500 hover:bg-violet-50 hover:text-violet-600"
                          >
                            <FiEdit2 size={16} />
                          </button>

                          <button
                            type="button"
                            aria-label="Delete term"
                            disabled={values.terms.length === 1}
                            onClick={() => remove(index)}
                            className="p-2 rounded-lg border border-slate-300 text-slate-500 hover:bg-red-50 hover:text-red-500 disabled:opacity-40 disabled:hover:bg-transparent"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => push({ term: '', definition: '', image: '' })}
                        className="flex items-center gap-1 text-sm text-violet-600 font-semibold hover:text-violet-700"
                      >
                        <FiPlus size={16} /> Add more
                      </button>

                      {typeof errors.terms === 'string' && (
                        <p className="text-red-500 text-xs">{errors.terms}</p>
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-violet-200 transition-all"
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateFlashcardPage;