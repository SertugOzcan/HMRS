import "./CommentCardListPersonnel.css"
import CommentCardPersonnel from "./CommentCardPersonnel";
const CommentCardListPersonnel = ({comments}) => {

    return (
        <div className="comment-card-list-personnel">
            {comments.map((comment, index) => (
                <CommentCardPersonnel key={index} comment={comment} />
            ))}
        </div>
    );
}

export default CommentCardListPersonnel