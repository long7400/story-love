import React, { useState } from "react";
import StorefrontLoginComponent from "@/components/storefront/LoginPage";

export default function StorefrontLoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (authStatus: boolean) => {
    setIsAuthenticated(authStatus);
  };

  return (
    <div>
      <StorefrontLoginComponent onLogin={handleLogin} />
    </div>
  );
}