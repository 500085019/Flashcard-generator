import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFlashcard } from '../redux/flashcardsSlice';
import FlashcardForm from '../components/forms/FlashcardForm';
import TermForm from '../components/forms/TermForm';

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
          <Form className="space-y-5">
            <FlashcardForm />
            <TermForm />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-violet-200 transition-all"
            >
              Create
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateFlashcardPage;