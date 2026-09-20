import { configureStore } from '@reduxjs/toolkit';
import flashcardsReducer from './flashcardsSlice';
import { loadState, saveState } from '../utils/localStorage';
// Load any previously saved flashcards from localStorage on app startup,
// so the user's data survives a page refresh.
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    flashcards: flashcardsReducer,
  },
  preloadedState: persistedState,
});
// Save the entire store to localStorage every time state changes
// (e.g. after adding or deleting a flashcard).
store.subscribe(() => {
  saveState(store.getState());
});