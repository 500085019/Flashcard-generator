# FlashCard Studio

> A modern React + Vite flashcard application for creating, organizing, reviewing, and sharing custom study flashcards.

FlashCard Studio provides a simple workflow for building flashcard sets from scratch, managing multiple sets in one place, and reviewing individual terms through an interactive card viewer.

## ✨ Features

- **Create flashcard sets** with a title, optional description, and optional cover image.
- **Add multiple terms and definitions** to each set.
- **Form validation** powered by Formik and Yup.
- **Manage your flashcard library** from the My Flashcards page.
- **Delete flashcard sets** with confirmation.
- **Review cards individually** from a dedicated flashcard details page.
- **Navigate between terms** using previous/next controls or the term list.
- **Share flashcards** by copying a generated URL to the clipboard.
- **Responsive UI** built with Tailwind CSS.
- **Centralized state management** using Redux Toolkit.
- **Client-side routing** using React Router.

## 🧠 How It Works

The application is entirely client-side.

### 1. Create a flashcard set

From **Create new**, enter:

- A group title
- An optional description
- An optional image
- One or more terms and definitions

Formik manages the form state, while Yup validates that the title and every term/definition are present.

When the form is submitted, the app dispatches an `addFlashcard` Redux action. Redux Toolkit generates a unique ID for the new flashcard set and stores it in the Redux store.

### 2. View your flashcard sets

The **My flashcards** page reads the flashcard collection from Redux and renders each set as a card.

Each flashcard set displays:

- Title
- Description
- Number of cards
- A link to open the full set
- A delete action

### 3. Review a flashcard set

Opening a set navigates to:

`/flashcard/:id`

The details page:

- Finds the selected flashcard set from Redux using its ID.
- Shows the list of all terms on the left.
- Displays the selected term and definition in the center.
- Supports previous/next navigation.
- Shows the current position, such as `2/10`.
- Displays an optional image associated with the active term.

### 4. Share a flashcard set

The **Share** button creates a URL using the current application origin and flashcard ID:

`/flashcard/:id`

A modal then allows the user to copy that URL to the clipboard.

> **Important:** sharing currently copies the route URL; the application does not use a backend/database to make flashcards globally accessible. Flashcard data is stored on the client side.

### 5. Store application state

Redux Toolkit manages the application state, and `src/utils/localStorage.js` contains helpers for persisting the store in browser localStorage.

This means the intended architecture is:

`User Input → Formik/Yup → Redux Toolkit → localStorage`

and

`Redux State → Flashcard List → Flashcard Details → Share URL`

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI development |
| **Vite** | Development server and production bundling |
| **React Router** | Client-side routing |
| **Redux Toolkit** | Application state management |
| **React Redux** | Connecting React components to Redux |
| **Formik** | Form state and form handling |
| **Yup** | Form validation |
| **Tailwind CSS** | Styling and responsive UI |
| **React Icons** | UI icons |

## 📁 Project Structure

```text
Flashcard-generator/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── forms/
│   │   │   ├── FlashcardForm.jsx
│   │   │   └── TermForm.jsx
│   │   ├── FlashcardCard.jsx
│   │   ├── Navbar.jsx
│   │   └── ShareModal.jsx
│   │
│   ├── pages/
│   │   ├── CreateFlashcardPage.jsx
│   │   ├── MyFlashcardsPage.jsx
│   │   └── FlashcardDetailsPage.jsx
│   │
│   ├── redux/
│   │   ├── flashcardsSlice.js
│   │   └── store.js
│   │
│   ├── utils/
│   │   └── localStorage.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── eslint.config.js
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- **Node.js** (LTS recommended)
- **npm**

Check your versions:

```bash
node -v
npm -v
```

### Installation

Clone the repository:

```bash
git clone https://github.com/500085019/Flashcard-generator.git
cd Flashcard-generator
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL, typically:

```text
http://localhost:5173
```

Open that URL in your browser.

## 📜 Available Scripts

### Start development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Build for production

```bash
npm run build
```

Creates the optimized production build.

### Preview production build

```bash
npm run preview
```

Serves the production build locally for verification.

### Lint the project

```bash
npm run lint
```

Runs ESLint against the project.

## 🧭 Application Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Create Flashcard | Create a new flashcard set |
| `/my-flashcards` | My Flashcards | View and manage saved sets |
| `/flashcard/:id` | Flashcard Details | Review, navigate, and share a set |

## 🔄 Application Flow

```text
                ┌──────────────────────┐
                │    Create New Set    │
                │ Title / Description  │
                │ Terms / Definitions  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │    Formik + Yup      │
                │ Validation + Form    │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │    Redux Toolkit     │
                │  flashcardsSlice     │
                └──────────┬───────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
   ┌───────────────────┐       ┌────────────────────┐
   │   My Flashcards   │       │  Browser Storage   │
   │   List / Delete   │       │    localStorage    │
   └─────────┬─────────┘       └────────────────────┘
             │
             ▼
   ┌───────────────────────┐
   │  Flashcard Details    │
   │  Review / Navigate    │
   │  Share                 │
   └───────────────────────┘
```

## 💡 Design Decisions

### Redux Toolkit for state management

Flashcard data is kept in a centralized Redux store so multiple pages can access the same collection without passing data through several component levels.

### Component-based architecture

The application separates:

- **Pages** for route-level screens
- **Components** for reusable UI
- **Redux** for application state
- **Utils** for browser persistence helpers

This keeps responsibilities separated and makes the project easier to extend.

### Client-side storage

No backend service is currently required. Flashcards are handled in the browser, which makes the project lightweight and easy to run locally.

## ⚠️ Current Limitations

The current implementation is intentionally client-side and has no authentication or remote database.

Also note that the localStorage utility currently reads the key `FlashcardAppState` but saves to `flashcardAppState`. Because localStorage keys are case-sensitive, this mismatch can prevent the saved state from being loaded after a page refresh.

The **Download** and **Print** controls are present in the UI, but their functionality is not implemented yet.

## 🔮 Future Improvements

Possible next steps include:

- Fix and strengthen localStorage persistence.
- Add edit/update functionality for existing flashcard sets.
- Implement real download/export functionality.
- Implement print-friendly flashcard layouts.
- Add search and filtering for large flashcard collections.
- Add categories/tags.
- Add user authentication.
- Add a backend and database for persistent cross-device storage.
- Make shared flashcard links load data remotely.
- Add study modes such as quiz, shuffle, and progress tracking.
- Add tests and CI/CD.

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Run linting and build checks:

```bash
npm run lint
npm run build
```

5. Commit your changes:

```bash
git commit -m "feat: add your feature"
```

6. Push the branch and open a pull request.

## 📄 License

No license file is currently included in the repository.

## 👨‍💻 Author

Built as a React/Vite project for creating and reviewing custom flashcard sets.

---

**FlashCard Studio** — create it, organize it, review it, share it.
