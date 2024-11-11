import { RouterProvider, createBrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import KitchenStaffPage from "./pages/KitchenStaffPage";
import WaiterPage from "./pages/WaiterPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

import Main from "./layouts/Main";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  },
]);

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

// Redirect authenticated users to the appropriate page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user.isVerified) {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "kitchenStaff") {
        navigate("/kitchenstaff");
      } else if (user.role === "waiter") {
        navigate("/waiter");
      } else {
        navigate("/"); // Regular user goes to home page
      }
    }
  }, [isAuthenticated, user, navigate]);

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape color="bg-red-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-black" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-white" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* Add role-based routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kitchenstaff"
          element={
            <ProtectedRoute>
              <KitchenStaffPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waiter"
          element={
            <ProtectedRoute>
              <WaiterPage />
            </ProtectedRoute>
          }
        />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
