import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search grandmasters...",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block py-3 pr-10 pl-10 w-full placeholder-gray-500 text-gray-900 bg-white rounded-lg border border-gray-300 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="flex absolute inset-y-0 right-0 items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
