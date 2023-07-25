import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import SecretPost from './SecretPost';

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
      const response = await axios.get('http://localhost:5000/home');
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
      <h2>Welcome, {userName}!</h2>
      <button className="btn btn-dark" onClick={handleLogout}>
        Logout
      </button>
      <Link to="/compose" className="btn btn-dark">
        Compose
      </Link>
      <button className="btn btn-dark" onClick={handleProfileRedirect}>
        Your Profile
      </button>
      <h3 className="mt-3">Posted Secrets</h3>
      {/* {secrets.map((secret) => (
        <div key={secret._id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{secret.content}</p>
            <p className="card-text">Posted at: {new Date(secret.createdAt).toLocaleString()}</p>
            <Link to={`/secret/${secret._id}`} className="btn btn-dark">
              View Secret
            </Link>
          </div>
        </div>
      ))} */}
      <SecretPost secrets={secrets} />
    </div>
  );
};

export default Home;
