import { useState, useEffect, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error?: Error;
}

// Custom hook for error boundary functionality
function useErrorBoundary() {
  const [errorState, setErrorState] = useState<ErrorState>({ hasError: false });

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Error caught by boundary:", error.error);
      setErrorState({ hasError: true, error: error.error });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      setErrorState({ hasError: true, error: event.reason });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  const resetError = () => {
    setErrorState({ hasError: false, error: undefined });
  };

  return { errorState, resetError };
}

export function ErrorBoundary({ children, fallback }: Props) {
  const { errorState, resetError } = useErrorBoundary();

  if (errorState.hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    const error = errorState.error;
    let errorMessage = "An unexpected error occurred";
    const errorDetails: string[] = [];

    if (error instanceof Error) {
      errorMessage = "An unexpected error occurred";
    }

    return (
      <div className="min-h-[400px] flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {errorMessage}
            </p>

            {errorDetails.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Error Details:
                </p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {errorDetails.map((detail, index) => (
                    <li key={index} className="font-mono">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={resetError}
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 
                       text-white font-medium rounded-lg transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
