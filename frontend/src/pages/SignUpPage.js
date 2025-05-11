import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; // Optional: Add custom styles for the page
import LOGO from './images/powerstart.png'
function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Logic for signing up (e.g., API call)
    navigate('/pos'); // Redirect to the POS page after signing up
  };

  return (
    <div className="signup-page">
      <div className="text-center">
        <img
          src={LOGO}
          alt="Power Star Supermarket"
          className="logo"
        />
        <h1>Welcome to Power Star Supermarket</h1>
        <p>Please sign up to continue</p>
      </div>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="pin" className="form-label">PIN</label>
          <input type="password" className="form-control" id="pin" required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;