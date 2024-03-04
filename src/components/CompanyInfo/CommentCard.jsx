/* eslint-disable react/prop-types */

import "./CommentCard.css";
const CommentCard = ( {comment} ) => {

  // if (!comment || !comment.personnel) {
  //   return null; 
  // }

  
  const image = comment.personnel.image;
  const name = comment.personnel.name;
  const surName = comment.personnel.lastName;
  return (
    <div className="comment-card-container">
      <div className="comment-card-img-div">
        <img src={image} alt="" />
      </div>
      <div className="comment-card-texts">
        <h3>
          {name} {surName}
        </h3>
        <h4>{comment.header}</h4>
        <p>{comment.content}</p>
        <p className="creation-date">Comment date: {comment.creationDate}</p>
      </div>
    </div>
  );
};

export default CommentCard;
