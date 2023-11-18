import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Compose = () => {
  const [secretContent, setSecretContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const handleSecretContentChange = (e) => {
    setSecretContent(e.target.value);
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      // Send the secret content and token to the backend
      const response = await axios.post('http://localhost:5000/compose',
        { content: secretContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Successfully created the secret
        const { message, secretId } = response.data;
        navigate(`/secret/${secretId}`);
      } else {
        setError('Error creating secret');
      }
    } catch (error) {
      console.log('Error creating secret:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Compose Your Secret</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="secretContent">Secret:</label>
          <textarea
            className="form-control"
            name="secretContent"
            rows="4"
            value={secretContent}
            onChange={handleSecretContentChange}
          />
        </div>
        <button type="submit" className="btn btn-dark">Post</button>
        <button type="button" className="btn btn-outline-dark" onClick={handleCancel} style={{ marginLeft: '4%' }}>Cancel</button>
      </form>
    </div>
  );
};

export default Compose;
