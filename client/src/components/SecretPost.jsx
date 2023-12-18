import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const SecretPost = ({ secrets }) => {
  const [uid, setUserId] = useState('');
  const [updatedSecrets, setUpdatedSecrets] = useState({});
  const navigate = useNavigate();

  // Store the uid from the jwt token
  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    if (!token) {  // If not logged in, redirect to login page
      navigate('/login');
    } else {
      // Decode the token to get the user's information
      const decodedToken = jwt_decode(token);
      const { userId, username } = decodedToken;
      setUserId(userId);
      setUpdatedSecrets(secrets);
    }

  }, [secrets]);

  const handleLike = async (secretId) => {
    try {
      // Update in the backend
      const response = await axios.post(`http://localhost:5000/like/${secretId}`, {
        userId: uid,
      });

      // Find the secret in the updatedSecrets array
      const updatedSecretsCopy = [...updatedSecrets];
      const secretIndex = updatedSecretsCopy.findIndex((s) => s.secret._id === secretId);

      if (secretIndex !== -1) {
        // Update userLiked and secret based on the response
        updatedSecretsCopy[secretIndex].userLiked = response.data.liked;
        updatedSecretsCopy[secretIndex].secret = response.data.secret;

        // Update the state
        setUpdatedSecrets(updatedSecretsCopy);
      } else {
        console.error('Secret not found in the updatedSecrets array');
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  return (
    <div>
      {secrets.map(({ secret, userLiked }) => (
        <div key={secret._id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{secret.content}</p>
            <p className="card-text">{new Date(secret.createdAt).toLocaleString()}</p>
            <button
              onClick={() => handleLike(secret._id)}
              className={`btn btn-dark ${userLiked ? 'text-danger' : 'text-white'}`}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              {secret.likedUsers.length}
            </button>
            <Link to={`/secret/${secret._id}`} className="btn btn-dark">
              View Comments
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecretPost;
