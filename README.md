# FlashCard Studio

FlashCard Studio is a modern, responsive web application that allows users to create, manage, review, and share custom flashcard sets. The application provides an intuitive interface for organizing study material into reusable flashcard collections, making learning and revision simple and structured.

## 🚀 Features

* Create custom flashcard sets with a title, description, and optional image.
* Add multiple terms and definitions to each flashcard set.
* Dynamically add or remove terms while creating a set.
* Form validation for flashcard titles, terms, and definitions.
* View all created flashcard sets in a centralized dashboard.
* Open individual flashcard sets and navigate between cards.
* View the current card position while studying.
* Delete flashcard sets when they are no longer required.
* Share flashcard sets through a generated shareable URL.
* Copy flashcard links directly to the clipboard.
* Responsive and modern UI for a smooth user experience.
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
6. A generated URL can be copied and shared using the built-in sharing functionality.

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
* Quiz and practice modes
* Flashcard progress tracking
* Flashcard export and download
* Print-friendly flashcards
* Cloud synchronization across devices

## 👨‍💻 Project

**FlashCard Studio**
A React-based flashcard management and learning application designed to make creating and reviewing study material simple, organized, and accessible.
