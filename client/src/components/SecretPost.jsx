import React from 'react';
import { Link } from 'react-router-dom';

const SecretPost = ({ secrets }) => {
  return (
    <div>
      {secrets.map((secret) => (
        <div key={secret._id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{secret.content}</p>
            <p className="card-text">{new Date(secret.createdAt).toLocaleString()}</p>
            <Link to={`/secret/${secret._id}`} className="btn btn-dark">View Comments</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecretPost;
