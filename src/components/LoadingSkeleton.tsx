export const GrandmasterCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse dark:bg-gray-700" />
          </div>
          <div className="flex-1 space-y-3 min-w-0">
            <div className="flex items-center space-x-2">
              <div className="w-32 h-5 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              <div className="w-12 h-5 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
            </div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
            <div className="flex space-x-4">
              <div className="w-20 h-3 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              <div className="w-24 h-3 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
            </div>
            <div className="w-28 h-3 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="p-8 bg-white rounded-xl border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-start space-y-6 md:flex-row md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse dark:bg-gray-700" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 rounded animate-pulse dark:bg-gray-700"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
