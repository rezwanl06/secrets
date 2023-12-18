import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import SecretPost from './SecretPost';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  const [userName, setUserName] = useState('');
  const [uid, setUserId] = useState('');
  const [secrets, setSecrets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    if (! token) {  // If not logged in, redirect to login page
      navigate('/login');
    } else {
        // Decode the token to get the user's information
        const decodedToken = jwt_decode(token);

        // Assuming the username is stored in the token's 'username' field
        const { userId, username } = decodedToken;

        // Set the username state
        setUserName(username);

        setUserId(userId);

        // Fetch all posted secrets
        fetchSecrets();
    }
    
  }, []);

  const fetchSecrets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/home', {userId: uid});
      setSecrets(response.data.secrets);
    } catch (error) {
      console.error('Error fetching secrets:', error);
      // Handle error if needed
    }
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect the user to the login page
    navigate('/login');
  };

  const handleProfileRedirect = () => {
    // Redirect the user to their profile page using their userId
    navigate(`/${uid}`);
  }

  return (
    <div className="container mt-5">
      <h2 className='home-contents'>Welcome, {userName}!</h2>
      <button className="btn btn-outline-dark logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Log out
      </button>
      <Link to="/compose" className="btn btn-dark home-contents">
        Share a secret
      </Link>
      <button className="btn btn-dark profile-button" onClick={handleProfileRedirect}>
        <FontAwesomeIcon icon={faUser} /> {userName}
      </button>
      <h3 className="mt-3 home-contents">Home</h3>
      <SecretPost secrets={secrets} />
    </div>  
  );
};

export default Home;
