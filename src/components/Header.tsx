import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Crown } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/player/");

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {isProfilePage ? (
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 transition-colors dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to List
              </Link>
            ) : (
              <Link to="/" className="flex items-center space-x-2">
                <Crown className="w-8 h-8 text-emerald-600" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Chess Grandmasters
                </h1>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
