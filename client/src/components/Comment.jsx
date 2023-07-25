import React from 'react';

const Comment = ({ username, content, time }) => {
    return (
        <div className="card mb-3">
          <div className="card-body">
            <h3 className="card-text">{username}</h3>
            <p className="card-text">{content}</p>
            <p className="card-text">Posted at: {time}</p>
          </div>
        </div>
      );
}

export default Comment;