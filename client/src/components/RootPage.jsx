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
    <div className="jumbotron centered root-page-body">
      <div className="container text-center d-flex flex-column align-items-center">
        <i className="fas fa-key icon"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="lead">Don't keep your secrets, share them anonymously!</p>
        <hr />
        <div className="d-grid gap-2 col-6 mx-auto">
            <Link to="/register" id="register-btn" className="btn btn-light btn-dark-outline" role="button">
                Register
            </Link>
            <Link to="/login" id="login-btn" className="btn btn-dark btn-large" role="button">
                Login
            </Link>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
