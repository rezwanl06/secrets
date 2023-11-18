import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Font awesome libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';


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
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>

                  <div className="form-outline form-white mb-4">
                    <FontAwesomeIcon icon={faUser} size="lg" />
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder='Email'
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <FontAwesomeIcon icon={faKey} size="lg" />
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder='Password'
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                  <button className="btn btn-outline-light btn-lg btn-block px-5" type="submit" onClick={handleLogin}>Login</button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                        <FontAwesomeIcon icon={faFacebookF} size="lg" />
                    </a>
                    <a href="#!" className="text-white">
                        <FontAwesomeIcon icon={faTwitter} size="lg" className="mx-4 px-2" />
                    </a>
                    <a href="#!" className="text-white">
                        <FontAwesomeIcon icon={faGoogle} size="lg" />
                    </a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">Don't have an account? <Link to="/register" className="text-white-50 fw-bold">Sign Up</Link>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
