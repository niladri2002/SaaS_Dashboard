import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Add custom styles here

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Registration failed.');
        setSuccess('');
      } else {
        setError('');
        setSuccess('Registration successful!');
        console.log('Registration successful:', data);
        alert("Registered Successfully");
        navigate('/');
      }
    } catch (err) {
      setError('Something went wrong.');
      console.error(err);
    }
  };
  

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="button-group">
        <button type="submit" className="register-button">Register</button>
        <button
            type="button"
            className="login-button"
            onClick={() => navigate('/')}
          >
            Login
          </button>
          </div>
      </form>
    </div>
  );
};

export default Register;
