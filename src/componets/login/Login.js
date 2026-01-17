// src/componets/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if necessary

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the login function from AuthContext
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_or_phone: emailOrPhone,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // On successful login, call the login function from AuthContext
        // This will save the tokens and update the authentication state globally
        login(data);

        // --- ROLE-BASED REDIRECTION LOGIC ---
        let redirectTo;
        if (data.role === 'admin') {
          redirectTo = "/DashBoard"; // Admin dashboard
        } else {
          // Default to user dashboard for 'user' role or any other role
          redirectTo = "/UserDashBoard";
        }

        // Redirect the user to their role-specific dashboard
        navigate(redirectTo, { replace: true });
      } else {
        // If the server returns an error, display the error message
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              
              {/* Display error message if it exists */}
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="emailOrPhone" className="form-label">Email or Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emailOrPhone"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {' '}Logging in...
                      </>
                    ) : (
                      'Log In'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;