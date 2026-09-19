import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import flashcardsReducer from '../redux/flashcardsSlice';
import FlashcardDetailsPage from './FlashcardDetailsPage';

const mockFlashcard = {
  id: 'test-id-1',
  title: 'Cell Biology',
  description: 'Key terms for the cell unit',
  image: '',
  terms: [
    { term: 'Mitochondria', definition: 'The powerhouse of the cell' },
    { term: 'Ribosome', definition: 'Builds proteins' },
    { term: 'Nucleus', definition: 'Controls cell activity' },
  ],
};

function renderWithProviders(flashcards = [mockFlashcard], route = '/flashcard/test-id-1') {
  const store = configureStore({
    reducer: { flashcards: flashcardsReducer },
    preloadedState: { flashcards: { flashcards } },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/flashcard/:id" element={<FlashcardDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('FlashcardDetailsPage', () => {
  it('renders the flashcard title and description', () => {
    renderWithProviders();
    expect(screen.getByText('Cell Biology')).toBeInTheDocument();
    expect(screen.getByText('Key terms for the cell unit')).toBeInTheDocument();
  });

  it('shows the first term by default', () => {
    renderWithProviders();
    expect(screen.getByText('Mitochondria', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText('The powerhouse of the cell')).toBeInTheDocument();
    expect(screen.getByText('1/3')).toBeInTheDocument();
  });

  it('navigates to the next term when the next arrow is clicked', async () => {
    renderWithProviders();
    const user = userEvent.setup();

    await user.click(screen.getByLabelText(/next term/i));

    expect(screen.getByText('Ribosome', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText('Builds proteins')).toBeInTheDocument();
    expect(screen.getByText('2/3')).toBeInTheDocument();
  });

  it('navigates to the previous term, wrapping to the last term from the first', async () => {
    renderWithProviders();
    const user = userEvent.setup();

    await user.click(screen.getByLabelText(/previous term/i));

    expect(screen.getByText('Nucleus', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText('3/3')).toBeInTheDocument();
  });

  it('switches to a term when clicked in the term list', async () => {
    renderWithProviders();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Ribosome' }));

    expect(screen.getByText('Builds proteins')).toBeInTheDocument();
    expect(screen.getByText('2/3')).toBeInTheDocument();
  });

  it('opens the share modal when Share is clicked', async () => {
    renderWithProviders();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /share/i }));

    expect(screen.getByText(/share this flashcard/i)).toBeInTheDocument();
  });

  it('shows a not-found message for an invalid flashcard id', () => {
    renderWithProviders([mockFlashcard], '/flashcard/does-not-exist');
    expect(screen.getByText(/flashcard not found/i)).toBeInTheDocument();
  });
});