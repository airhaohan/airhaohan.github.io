/**
 * App.tsx — Frutiger Aero Classic Revival
 * Main router with global layout: BubbleBackground + Navbar + Pages
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import BubbleBackground from "./components/BubbleBackground";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Videos from "./pages/Videos";
import Publications from "./pages/Publications";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/videos" component={Videos} />
      <Route path="/publications" component={Publications} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          {/* Frutiger Aero floating bubbles */}
          <BubbleBackground />
          {/* Fixed navigation */}
          <Navbar />
          {/* Page content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
