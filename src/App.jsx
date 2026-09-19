import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import CreateFlashcardPage from './pages/CreateFlashcardPage';
import MyFlashcardsPage from './pages/MyFlashcardsPage';
import FlashcardDetailsPage from './pages/FlashcardDetailsPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CreateFlashcardPage />} />
          <Route path="/my-flashcards" element={<MyFlashcardsPage />} />
          <Route path="/flashcard/:id" element={<FlashcardDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;