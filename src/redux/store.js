import { configureStore } from '@reduxjs/toolkit';
import flashcardsReducer from './flashcardsSlice';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    flashcards: flashcardsReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});