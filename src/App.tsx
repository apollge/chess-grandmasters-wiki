import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/player/:username" element={<div>Player</div>} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
