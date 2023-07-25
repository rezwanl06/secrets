import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in, redirect to the home route
      navigate('/home');
    }
  }, [navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password
      });

      if (response.status === 200) {
        // Successful registration, extract the token and store it in local storage
        const { token } = response.data;
        localStorage.setItem('token', token);

        // Successful registration, navigate to the home page
        navigate('/home'); 
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      console.log('Error registering user:', error);
      setError(`${error}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" className="form-control" name="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" name="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" name="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="btn btn-dark">Register</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
