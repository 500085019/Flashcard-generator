import { useRef } from 'react';
import { Field, FieldArray, useFormikContext } from 'formik';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';

function TermForm() {
  const { values, errors, touched } = useFormikContext();
  const termRefs = useRef({});

  return (
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
  );
}

export default TermForm;