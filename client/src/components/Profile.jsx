import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SecretPost from './SecretPost';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


const Profile = () => {
  const [userSecrets, setUserSecrets] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch the user's secrets
    const fetchUserSecrets = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${userId}`);
        setUserSecrets(response.data.userSecrets);
      } catch (error) {
        console.error('Error fetching user secrets:', error);
        // Handle error if needed
      }
    };

    // Call the function to fetch the user's secrets
    fetchUserSecrets();
  }, [userId]);

  // Function to handle viewing a secret
  const handleViewSecret = (secretId) => {
    // Redirect the user to the individual secret page using the secretId
    navigate(`/secret/${secretId}`);
  };

  return (
    <div className="container mt-5">
      <h2>Your Secrets</h2>
      <Link to="/home" className="btn btn-dark home-navigator">
        <FontAwesomeIcon icon={faHome} /> 
      </Link>
      {userSecrets.length === 0 ? (
        <p>No secrets posted yet.</p>
      ) : (
          <SecretPost secrets={userSecrets} />
      )}
    </div>
  );
};

export default Profile;
