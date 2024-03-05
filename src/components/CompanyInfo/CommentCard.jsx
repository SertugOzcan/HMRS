/* eslint-disable react/prop-types */
import "./CommentCard.css"

import RatingComponentForGuestPageComment from "./RatingComponentForGuestPageComment";
const CommentCard = ( {comment} ) => {

  // if (!comment || !comment.personnel) {
  //   return null; 
  // }

  
  const image = comment.personnel.image;
  const name = comment.personnel.name;
  const surName = comment.personnel.lastName;
  return (
    <div className="comment-card-container">
      <div className="comment-card-second-container">
        <div className="comment-card-img-div">
          <img src={image} alt="" />
        </div>
        <div className="comment-card-texts">
          <h4>
            {name} {surName}
          </h4>
          <h5>{comment.header}</h5>
          <p>{comment.content}</p>
          <p className="creation-date">Comment date: {comment.creationDate}</p>
        </div>
      </div>
      <div>
        <RatingComponentForGuestPageComment comment={comment}/>
      </div>
    </div>
  );
};

export default CommentCard;
