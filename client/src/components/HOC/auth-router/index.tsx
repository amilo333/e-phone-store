import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function withAuthRouter<T extends object>(
  Component: React.ComponentType<T>
) {
  return function EnhancedComponent(props: T) {
    const navigate = useNavigate();
    const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/auth/login", { replace: true });
      }
    }, [isAuthenticated, navigate]);

    return <Component {...props} />;
  };
}
