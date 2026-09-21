# FlashCard Studio

FlashCard Studio is a modern, responsive web application that allows users to create, manage, review, and share custom flashcard sets. The application provides an intuitive interface for organizing study material into reusable flashcard collections, making learning and revision simple and structured.

## 🚀 Features

* Create custom flashcard sets with a title, description, and optional image.
* Add multiple terms and definitions to each flashcard set.
* Dynamically add or remove terms while creating a set.
* Form validation for flashcard titles, terms, and definitions.
* Uploaded images are automatically resized and compressed before being stored, keeping the app fast and within browser storage limits.
* View all created flashcard sets in a centralized dashboard.
* Open individual flashcard sets and navigate between cards.
* View the current card position while studying.
* **Study Mode** – toggle a reveal-on-click flip card that hides the definition until clicked, turning the details page into an active self-quiz tool instead of a passive viewer.
* Delete flashcard sets when they are no longer required.
* Share flashcard sets through a generated shareable URL.
* Copy flashcard links directly to the clipboard.
* Download a flashcard set as a PDF for offline studying.
* Print a flashcard set directly from the browser.
* Responsive and modern UI for a smooth user experience, with layouts that adapt from mobile to desktop.
* Client-side state management and browser-based persistence.

## 🛠️ Tech Stack

### Frontend

* **React.js** – Component-based UI development
* **Vite** – Fast development server and build tool
* **React Router** – Client-side routing
* **Tailwind CSS** – Responsive and modern UI styling
* **React Icons** – UI icons

### State Management

* **Redux Toolkit** – Centralized application state management
* **React Redux** – Connecting Redux state with React components

### Forms & Validation

* **Formik** – Form state management
* **Yup** – Form validation

### Storage

* **Browser LocalStorage** – Client-side persistence of flashcard data

## ⚙️ How It Works

The application follows a simple workflow:

**Create → Store → Manage → Review → Share**

1. Users create a flashcard set by entering a title, description, and terms with their definitions.
2. Formik manages the form state while Yup validates the input.
3. The flashcard data is dispatched to Redux Toolkit for centralized state management.
4. Flashcard collections are displayed on the **My Flashcards** page.
5. Users can open a collection to review individual terms and navigate between cards.
6. Toggling **Study Mode** flips each card between term and definition, so users can actively test recall instead of just reading through the set.
7. A generated URL can be copied and shared using the built-in sharing functionality.

## 🎓 Study Mode

Study Mode is a custom addition beyond the base project requirements, designed to make reviewing a flashcard set feel closer to real self-testing rather than passive reading.

* Toggled on/off from a pill button in the Flashcard Details page header.
* When enabled, each card shows only the **term** by default, using a 3D CSS flip animation (`rotateY`, `backface-visibility`, `perspective`) to reveal the **definition** on click.
* Switching to a new term automatically resets the card to its hidden (front) state, so every card is re-tested fresh.
* Built entirely with CSS transforms and React state — no external animation library required.

## 🧪 Testing

The application is tested using **Vitest** as the test runner and **React Testing Library** for component testing, alongside `@testing-library/user-event` for simulating real user interactions.

### What is tested

**Redux state logic** (`flashcardsSlice.test.js`)
- Verifies the initial state of the flashcards slice.
- Verifies that a new flashcard is correctly added to state via the `addFlashcard` action.
- Verifies that a flashcard is correctly removed from state via the `deleteFlashcard` action.

**Create Flashcard Page** (`CreateFlashcardPage.test.jsx`)
- Verifies that the form renders the Group title, Description, and Create button correctly.
- Verifies that a validation error ("Group title is required") is shown when the form is submitted empty, confirming Formik + Yup validation works as expected.
- Verifies that clicking "Add more" dynamically adds a new term input row, confirming the `FieldArray` behavior described in the project requirements.

**My Flashcards Page** (`MyFlashcardsPage.test.jsx`)
- Verifies that the empty-state message is shown correctly when no flashcards have been created yet.

**Flashcard Details Page** (`FlashcardDetailsPage.test.jsx`)
- Verifies that the flashcard title and description render correctly.
- Verifies that the first term is shown by default, along with its position indicator (e.g. `1/3`).
- Verifies carousel navigation — clicking the next/previous arrows moves to the correct term, including wrap-around from the last term back to the first.
- Verifies that clicking a term directly in the sidebar list switches the active term.
- Verifies that the Share button opens the share modal.
- Verifies that an invalid or non-existent flashcard ID shows a "not found" message instead of crashing.

### Running the tests

```bash
npm test
```

This runs all test files (`*.test.js` / `*.test.jsx`) using Vitest.

### Test results

All test suites pass successfully:

```
 Test Files  4 passed (4)
      Tests  14 passed (14)
```

This covers the core state management logic (Redux), form validation (Formik/Yup), dynamic UI behavior (term add/remove), and interactive carousel/navigation logic, in line with the project's requirement to test individual components using React Testing Library.

## 🏗️ Project Architecture

The project follows a component-based React architecture:

```text
src/
├── components/
│   ├── forms/
│   ├── FlashcardCard.jsx
│   ├── Navbar.jsx
│   └── ShareModal.jsx
│
├── pages/
│   ├── CreateFlashcardPage.jsx
│   ├── MyFlashcardsPage.jsx
│   └── FlashcardDetailsPage.jsx
│
├── redux/
│   ├── flashcardsSlice.js
│   └── store.js
│
├── utils/
│   └── localStorage.js
│
├── App.jsx
└── main.jsx
```

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm

### Installation

```bash
git clone https://github.com/500085019/Flashcard-generator.git

cd Flashcard-generator

npm install
```

### Run the application

```bash
npm run dev
```

The application will be available on the local development server provided by Vite.

### Build for production

```bash
npm run build
```

## 📌 Future Enhancements

* User authentication and authorization
* Backend API integration
* Database-based flashcard storage
* Edit existing flashcard sets
* Search and filtering
* Shuffle mode and "mark as known" progress tracking within Study Mode
* Cloud synchronization across devices

## 👨‍💻 Project

**FlashCard Studio**
A React-based flashcard management and learning application designed to make creating and reviewing study material simple, organized, and accessible.