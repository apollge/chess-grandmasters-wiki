export const GrandmasterCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
            <div className="flex space-x-4">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
