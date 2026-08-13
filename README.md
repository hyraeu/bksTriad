# Authentication Page - React Solution

A complete authentication interface built with React, featuring Login and Signup views with comprehensive form validation and a polished UI.

## 🚀 Features

- **Dual Mode Interface**: Toggle between Login and Signup views
- **Form Validation**: Real-time validation with user-friendly error messages
- **Password Management**: Show/hide toggle, strength indicator (stretch goal)
- **Mock Authentication**: Simulated login/signup with user persistence
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: ARIA labels, focus management, and semantic HTML

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd auth-page-solution
```
2. Install dependencies:

```bash
npm install
3. Start the development server:
```

```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

## 🛠️ Tech Stack

- **React 18**:  UI Framework
- **Vite**:  Build Tool and development server
- **TailWind CSS**:  Utility-first CSS Framework
- **Lucide React**:  Icon Library
- **React Hooks**:  State Management

## 📁 Project Structure

```text
src/
├── components/
│ ├── AuthPage.jsx          # Main authentication component
│ ├── Field.jsx             # Reusable form field component
│ └── PasswordStrength.jsx  # Password strength indicator
├── contexts/
│ └── AuthContext.jsx       # Authentication context provider
├── hooks/
│ └── useAuth.js            # Custom auth hook
├── App.jsx                 # Root component
├── main.jsx                # Entry point
└── index.css               # Global styles
```
