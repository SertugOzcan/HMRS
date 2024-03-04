
import { FaStar } from "react-icons/fa";
import "./RatingCommentComponentPersonnel.css"
// eslint-disable-next-line react/prop-types
const RatingCommentComponentPersonnel = ({comment}) => {
    
  return (
    <div className="rating-container-personnel">
        
        <div className="rating-stars-personnel">
        {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input 
            className="star-input"
            type="radio" 
            name="rating" 
            value={currentRating} 
            />
            <FaStar 
            className="stars" 
            size={22} 
            color={currentRating <= (comment.rating) ? "#ffc107" : "#e4e5e9"}
            />
          </label>
          
        );
      })}
        </div>
    
    </div>
  );
};

export default RatingCommentComponentPersonnel;
