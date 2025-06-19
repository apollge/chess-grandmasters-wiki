import { Link } from "react-router-dom";
import { Crown, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const { isDark, toggle } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-emerald-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Chess Grandmasters
              </h1>
            </Link>
          </div>

          <button
            onClick={toggle}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                     hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
