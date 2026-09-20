import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  flashcards: [],
};

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    // addFlashcard uses the { reducer, prepare } pattern so we can generate
    // a unique id (via nanoid) for each new flashcard set BEFORE it reaches
    // the reducer. Without prepare, we'd have to generate the id in the
    // component itself, which would scatter id-generation logic outside Redux.
    addFlashcard: {
      reducer(state, action) {
        state.flashcards.push(action.payload);
      },
      prepare({ title, description, image, terms }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            image,
            terms,
          },
        };
      },
    },
     // Removes a single flashcard set by id, keeping all others intact.
    deleteFlashcard(state, action) {
      state.flashcards = state.flashcards.filter(
        (fc) => fc.id !== action.payload
      );
    },
  },
});

export const { addFlashcard, deleteFlashcard } = flashcardsSlice.actions;
export default flashcardsSlice.reducer;