import { describe, it, expect } from 'vitest';
import flashcardsReducer, { addFlashcard, deleteFlashcard } from './flashcardsSlice';

describe('flashcardsSlice', () => {
  it('should return the initial state', () => {
    const state = flashcardsReducer(undefined, { type: 'unknown' });
    expect(state.flashcards).toEqual([]);
  });

  it('should add a flashcard', () => {
    const initialState = { flashcards: [] };
    const newFlashcard = {
      title: 'Cell biology',
      description: 'Test set',
      image: '',
      terms: [{ term: 'Mitochondria', definition: 'Powerhouse of the cell' }],
    };
    const state = flashcardsReducer(initialState, addFlashcard(newFlashcard));
    expect(state.flashcards).toHaveLength(1);
    expect(state.flashcards[0].title).toBe('Cell biology');
    expect(state.flashcards[0].id).toBeDefined();
  });

  it('should delete a flashcard by id', () => {
    const initialState = {
      flashcards: [
        { id: '1', title: 'Set A', terms: [] },
        { id: '2', title: 'Set B', terms: [] },
      ],
    };
    const state = flashcardsReducer(initialState, deleteFlashcard('1'));
    expect(state.flashcards).toHaveLength(1);
    expect(state.flashcards[0].id).toBe('2');
  });
});