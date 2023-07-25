import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Check if user logged in already
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in, redirect to the home route
      navigate('/home');
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);

        // Successful login, navigate to home page
        navigate('/home'); 
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" name="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" name="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="btn btn-dark">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
