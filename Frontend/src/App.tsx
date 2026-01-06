import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import OTPVerify from "./pages/OTPVerify";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import PGList from "./pages/PGList";
import PGDetails from "./pages/PGDetails";
import RoomDetails from "./pages/RoomDetails";
import RentManagement from "./pages/RentManagement";
import ElectricityManagement from "./pages/ElectricityManagement";
import IssuesPage from "./pages/IssuesPage";
import Announcements from "./pages/Announcements";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import AddPG from "./pages/AddPG";
import AddTenant from "./pages/AddTenant";
import UtilitiesSpending from "./pages/UtilitiesSpending";
import ChangePassword from "./pages/ChangePassword";
import ProfilePhoto from "./pages/ProfilePhoto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
}

interface PublicRouteProps {
  children: React.ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
      <Route path="/login" element={<Navigate to="/signin" replace />} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/otp-verify" element={<OTPVerify />} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/pgs" element={<ProtectedRoute><PGList /></ProtectedRoute>} />
      <Route path="/pgs/:id" element={<ProtectedRoute><PGDetails /></ProtectedRoute>} />
      <Route path="/pgs/:pgId/rooms/:roomId" element={<ProtectedRoute><RoomDetails /></ProtectedRoute>} />
      <Route path="/rent" element={<ProtectedRoute><RentManagement /></ProtectedRoute>} />
      <Route path="/electricity" element={<ProtectedRoute><ElectricityManagement /></ProtectedRoute>} />
      <Route path="/issues" element={<ProtectedRoute><IssuesPage /></ProtectedRoute>} />
      <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/add-pg" element={<ProtectedRoute><AddPG /></ProtectedRoute>} />
      <Route path="/add-tenant" element={<ProtectedRoute><AddTenant /></ProtectedRoute>} />
      <Route path="/utilities-spending" element={<ProtectedRoute><UtilitiesSpending /></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      <Route path="/profile-photo" element={<ProtectedRoute><ProfilePhoto /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
