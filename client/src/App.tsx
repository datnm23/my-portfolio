import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ContentProvider } from "./contexts/ContentContext";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

// Get base path from Vite config
const base = import.meta.env.BASE_URL;

function AppRouter() {
  return (
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

