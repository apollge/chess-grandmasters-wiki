import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Header from "./components/Header";
import { GrandmastersList } from "./pages/GrandmastersList";
import { GrandmasterProfile } from "./pages/GrandmasterProfile";

// Create a client with optimized defaults for Chess.com API
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // eslint-disable-next-line
      retry: (failureCount, error: any) => {
        // Don't retry validation errors
        if (error instanceof Error) {
          return false;
        }

        // Don't retry on 404 errors (player not found)
        if (
          error?.message?.includes("404") ||
          error?.message?.includes("not found")
        ) {
          return false;
        }

        // Retry up to 2 times for other errors
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000), // Exponential backoff
      staleTime: 2 * 60 * 1000, // 2 minutes - Chess.com data doesn't change very frequently
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
          <Header />
          <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<GrandmastersList />} />
              <Route
                path="/player/:username"
                element={<GrandmasterProfile />}
              />
            </Routes>
          </main>
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
