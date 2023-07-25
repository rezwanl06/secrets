import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RootPage = () => {
    const navigate = useNavigate();
    
    // Check if user logged in already
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // User is logged in, redirect to the home route
            navigate('/home');
        }
    }, [navigate]);

  return (
    <div className="jumbotron centered">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="lead">Don't keep your secrets, share them anonymously!</p>
        <hr />
        <Link to="/register" className="btn btn-light btn-lg" role="button">Register</Link>
        <Link to="/login" className="btn btn-dark btn-lg" role="button">Login</Link>
      </div>
    </div>
  );
};

export default RootPage;
