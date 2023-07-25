import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Comment from './Comment';

const SecretPage = () => {
    const [secret, setSecret] = useState('');
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const { secretId } = useParams();

    // Function to fetch the secret and comments by secretId
    const fetchSecretAndComments = async () => {
        try {
          // Fetch the secret and comments
          const response = await axios.get(`http://localhost:5000/secret/${secretId}`);
          const { content, comments } = response.data;
          setSecret(content);
          setComments(comments);
        } catch (error) {
          console.error('Error fetching secret and comments:', error);
          // Handle error if needed
        }
    };
  
    useEffect(() => {
      // Call the function to fetch the secret and comments
      fetchSecretAndComments();
    }, [secretId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      // Decode the token to get the user's information
      const decodedToken = jwt_decode(token);

      // Get the username from the decoded token
      const { username } = decodedToken;

      // Send a post request to create a new comment
      const response = await axios.post(`http://localhost:5000/secret/${secretId}`, {
        content: commentContent,
        username: username,
      });

      // Clear the commentContent state after submitting the comment
      setCommentContent('');

      fetchSecretAndComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="container mt-5">
      {secret ? (
        <div>
          <h2>Secret</h2>
          <p>{secret}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
        <Link className="btn btn-dark" to="/home">Home</Link>
      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit}>
        <div className="form-group">
          <label htmlFor="commentContent">Write a Comment:</label>
          <input
            type="text"
            className="form-control"
            id="commentContent"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Submit Comment
        </button>
      </form>
      {/* Display comments */}
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              username={comment.user}
              content={comment.content}
              time={new Date(comment.createdAt).toLocaleString()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SecretPage;
