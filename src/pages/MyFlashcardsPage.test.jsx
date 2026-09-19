import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import flashcardsReducer from '../redux/flashcardsSlice';
import MyFlashcardsPage from './MyFlashcardsPage';

function renderWithProviders(ui) {
  const store = configureStore({ reducer: { flashcards: flashcardsReducer } });
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}

describe('MyFlashcardsPage', () => {
  it('shows empty state when no flashcards exist', () => {
    renderWithProviders(<MyFlashcardsPage />);
    expect(screen.getByText(/no flashcards yet/i)).toBeInTheDocument();
  });
});