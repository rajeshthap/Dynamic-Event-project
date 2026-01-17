// AuthContext.js for your eventmanagement project
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    access: null,
    refresh: null,
    role: null,
    unique_id: null,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // LOGIN
  const login = (data) => {
    console.log("Login function called with data:", data); // Debug log
    
    // This logic correctly handles the login API response you provided:
    // { "access": "...", "refresh": "...", "unique_id": "...", "role": "..." }
    const authData = {
      access: data.access || data.token || data.accessToken,
      refresh: data.refresh || data.refreshToken,
      role: data.role || data.userRole,
      unique_id: data.unique_id || data.user_id || data.id || data.userId || data.pk,
    };
    
    console.log("Processed auth data:", authData); // Debug log
    
    setAuth(authData);
    setIsAuthenticated(true);
    
    // Store in localStorage for persistence
    localStorage.setItem('auth', JSON.stringify(authData));
  };

  // LOGOUT
  const logout = () => {
    setAuth({
      access: null,
      refresh: null,
      role: null,
      unique_id: null,
    });
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('auth');
  };

  // Initialize auth state from localStorage on app load
  React.useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuth(parsedAuth);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored auth data:", error);
        localStorage.removeItem('auth');
      }
    }
  }, []);

  // REFRESH ACCESS TOKEN (uses in-memory refresh token)
  const refreshAccessToken = async () => {
    try {
      if (!auth.refresh) {
        logout();
        return null;
      }
      // Updated to your eventmanagement project's API endpoint
      const response = await fetch(
        "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/refresh-token/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: auth.refresh }),
        }
      );

      const data = await response.json();

      // NOTE: This logic assumes your refresh API returns a new `access` token.
      // This is standard practice. If your API only returns a `refresh` token,
      // you will need to adjust the logic below.
      if (response.ok && data.access) {
        const updatedAuth = {
          ...auth,
          access: data.access,
        };
        
        setAuth(updatedAuth);
        localStorage.setItem('auth', JSON.stringify(updatedAuth));
        
        return data.access;
      } else {
        logout();
        return null;
      }
    } catch (error) {
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshAccessToken,
        // Expose auth properties directly for convenience
        token: auth.access,
        refreshToken: auth.refresh,
        role: auth.role,
        unique_id: auth.unique_id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};