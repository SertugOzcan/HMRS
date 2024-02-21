import React from "react";
import "./CommentCard.css";
const CommentCard = ({ comment }) => {

  if (!comment || !comment.personnel) {
    return null; 
  }

  const imageUrl = comment.personnel.image || "";
  const name = comment.personnel.name || "";
  const surName = comment.personnel.lastName || "";

  return (
    <div className="comment-card-container">
      <div className="comment-card-img-div">
        <img src={imageUrl} alt="" />
      </div>
      <div className="comment-card-texts">
        <h4>
          {name} {surName}
        </h4>
        <p>{comment.content}</p>
        <p className="creation-date">Creation Date: {comment.creationDate}</p>
      </div>
    </div>
  );
};

export default CommentCard;
