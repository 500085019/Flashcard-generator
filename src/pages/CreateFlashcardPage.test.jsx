import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import flashcardsReducer from '../redux/flashcardsSlice';
import CreateFlashcardPage from './CreateFlashcardPage';

function renderWithProviders(ui) {
  const store = configureStore({ reducer: { flashcards: flashcardsReducer } });
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}

describe('CreateFlashcardPage', () => {
  it('renders the form fields', () => {
    renderWithProviders(<CreateFlashcardPage />);
    expect(screen.getByLabelText(/group title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/create/i)).toBeInTheDocument();
  });

  it('shows a validation error when submitted empty', async () => {
    renderWithProviders(<CreateFlashcardPage />);
    const user = userEvent.setup();
    const createButton = screen.getByRole('button', { name: /create/i });
    await user.click(createButton);

    await waitFor(() => {
      expect(screen.getByText(/group title is required/i)).toBeInTheDocument();
    });
  });

  it('adds a new term row when "Add more" is clicked', async () => {
    renderWithProviders(<CreateFlashcardPage />);
    const user = userEvent.setup();
    const termInputsBefore = screen.getAllByPlaceholderText(/enter term/i);
    expect(termInputsBefore).toHaveLength(1);

    await user.click(screen.getByText(/add more/i));

    const termInputsAfter = screen.getAllByPlaceholderText(/enter term/i);
    expect(termInputsAfter).toHaveLength(2);
  });
});