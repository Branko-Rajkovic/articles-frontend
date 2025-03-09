import { ErrorBoundary } from "react-error-boundary";
import Error from "./pages/Error";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import { AuthProvider } from "./components/AuthProvider";

function App() {
  return (
    <>
      <ErrorBoundary fallback={<Error />}>
        <BrowserRouter>
          <AuthProvider>
            <AnimatedRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
