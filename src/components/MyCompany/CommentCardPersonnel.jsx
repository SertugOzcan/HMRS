import "./CommentCardPersonnel.css";
import RatingCommentComponentPersonnel from "./RatingCommentComponentPersonnel";
const CommentCardPersonnel = ({ comment }) => {
  const image = comment.personnel.image;
  const name = comment.personnel.name;
  const surName = comment.personnel.lastName;
  return (
    <div className="comment-card-container-personnel">
      <div className="comment-card-container-personnel-second">
        <div className="comment-card-img-div-personnel">
          <img src={image} alt="" />
        </div>
        <div className="comment-card-texts-personnel">
          <h4>
            {name} {surName}
          </h4>
          <div className="comment-card-texts-personnel-header-content">
            <h5>{comment.header}</h5>
            <p>{comment.content}</p>
          </div>
          <p className="creation-date-personnel">Comment date: {comment.creationDate}</p>
        </div>
      </div>
      <div className= "comment-rating-div-personnel">
        <RatingCommentComponentPersonnel comment={comment} />
      </div>
    </div>
  );
};

export default CommentCardPersonnel;
