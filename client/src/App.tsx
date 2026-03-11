import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ContentProvider } from "./contexts/ContentContext";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";

// Lazy-load non-critical pages for better initial load performance
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
    </div>
  );
}


// Get base path from Vite config
const base = import.meta.env.BASE_URL;

function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useGoogleAnalytics();

  return (
    <ErrorBoundary>
      <ContentProvider>
        <LanguageProvider>
          <ThemeProvider
            defaultTheme="light"
            switchable
          >
            <TooltipProvider>
              <Toaster />
              <WouterRouter base={base.endsWith('/') ? base.slice(0, -1) : base}>
                <AppRouter />
              </WouterRouter>
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </ContentProvider>
    </ErrorBoundary>
  );
}

export default App;

