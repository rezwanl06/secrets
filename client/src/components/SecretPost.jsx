import React from 'react';
import { Link } from 'react-router-dom';

const SecretPost = ({ secrets }) => {
  return (
    <div>
      {secrets.map((secret) => (
        <div key={secret._id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{secret.content}</p>
            <p className="card-text">Posted at: {new Date(secret.createdAt).toLocaleString()}</p>
            {/* Link to the secret page */}
            <Link to={`/secret/${secret._id}`} className="btn btn-dark">View Secret</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecretPost;
