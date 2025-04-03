
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Customizer from "./pages/Customizer";
import EventPage from "./pages/EventPage";
import Dashboard from "./pages/Dashboard";
import PublishEvent from "./pages/PublishEvent";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import UseCase from "./pages/UseCase";
import PricingCalculator from "./pages/PricingCalculator";
import Resources from "./pages/Resources";

// Auth component to check if user is logged in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/signup" element={<Auth />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/:templateId/customize" 
        element={
          <ProtectedRoute>
            <Customizer />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/events/:id/publish" 
        element={
          <ProtectedRoute>
            <PublishEvent />
          </ProtectedRoute>
        } 
      />
      <Route path="/:username/:eventSlug" element={<EventPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      {/* New routes for navigation menu */}
      <Route path="/templates" element={<Templates />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/pricing-calculator" element={<PricingCalculator />} />
      <Route path="/use-cases/:type" element={<UseCase />} />
      <Route path="/resources" element={<Resources />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
