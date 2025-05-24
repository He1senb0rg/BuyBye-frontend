import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (auth && !auth.user) {
      const timeout = setTimeout(() => setShouldRedirect(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [auth]);

  if (!auth) return null; // Auth context not yet ready

  if (!auth.user) {
    if (shouldRedirect) {
      return <Navigate to="/login" replace />;
    }
    return null; // Wait briefly before redirecting
  }

  return children;
};

export default ProtectedRoute;