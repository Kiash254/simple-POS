import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; // Optional: Add custom styles for the page
import LOGO from './images/powerstart.png';

function SignUpPage() {
  const [cashiers, setCashiers] = useState([]); // State to store the list of cashiers
  const [selectedName, setSelectedName] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  // Fetch the list of cashiers from the backend
  useEffect(() => {
    fetch('/api/welcome/') // Replace with your backend endpoint
      .then((response) => response.json())
      .then((data) => setCashiers(data.cashiers))
      .catch((error) => console.error('Error fetching cashiers:', error));
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();

    // Logic for verifying the PIN (e.g., API call)
    fetch('/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: selectedName, pin }),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/pos'); // Redirect to the POS page after successful login
        } else {
          alert('Invalid PIN. Please try again.');
        }
      })
      .catch((error) => console.error('Error during login:', error));
  };

  return (
    <div className="signup-page">
      <div className="text-center">
        <img src={LOGO} alt="Power Star Supermarket" className="logo" />
        <h1>Welcome to Power Star Supermarket</h1>
        <p>Please select your name and enter your PIN to continue</p>
      </div>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <select
            className="form-control"
            id="name"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            required
          >
            <option value="">Select your name</option>
            {cashiers.map((cashier) => (
              <option key={cashier.id} value={cashier.name}>
                {cashier.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="pin" className="form-label">PIN</label>
          <input
            type="password"
            className="form-control"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
}

export default SignUpPage;