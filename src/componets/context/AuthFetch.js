// AuthFetch.js

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the import path if necessary

/**
 * A custom hook for making authenticated API requests.
 * It automatically handles adding the Authorization header,
 * and will attempt to refresh the access token if a request
 * fails with a 401 Unauthorized status.
 *
 * @returns {Function} An async function that mimics the fetch API signature.
 */
export const useAuthFetch = () => {
  const { auth, refreshAccessToken, logout } = useAuth();
  const navigate = useNavigate();

  const authFetch = useCallback(async (url, options = {}) => {
    // Initial check: if user is not authenticated at all, redirect immediately.
    if (!auth || !auth.access) {
      console.error("User is not authenticated. Redirecting to login page.");
      // Make sure your login route is defined in your router
      navigate('/Login');
      // Return a rejected promise to stop execution
      return Promise.reject(new Error("User not authenticated"));
    }

    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${auth.access}`,
        // IMPORTANT: Don't set Content-Type here if you're sending FormData.
        // The browser will set it automatically with the correct boundary.
        // We'll only set it for non-FormData requests.
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      },
    });

    // If token expired (401 Unauthorized), try to refresh it
    if (response.status === 401) {
      console.warn("Access token has expired. Attempting to refresh...");
      const newAccess = await refreshAccessToken();

      // If refreshing token fails (e.g., refresh token is also expired)
      if (!newAccess) {
        console.error("Session expired. Could not refresh token. Redirecting to login page.");
        
        // Call the logout function to clear user data from context/storage
        logout();
        
        // Redirect to the login page
        navigate('/Login');
        
        // Return a rejected promise to ensure the calling component's catch block is triggered
        return Promise.reject(new Error("Session expired. Please log in again."));
      }

      // If refresh was successful, retry the original request with the new token
      console.log("Token refreshed successfully. Retrying the original request.");
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccess}`,
          ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        },
      });
    }

    return response;
  }, [auth, refreshAccessToken, logout, navigate]); // Dependency array for useCallback

  return authFetch;
};