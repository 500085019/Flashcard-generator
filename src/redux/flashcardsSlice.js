import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  flashcards: [],
};

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
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
    deleteFlashcard(state, action) {
      state.flashcards = state.flashcards.filter(
        (fc) => fc.id !== action.payload
      );
    },
  },
});

export const { addFlashcard, deleteFlashcard } = flashcardsSlice.actions;
export default flashcardsSlice.reducer;