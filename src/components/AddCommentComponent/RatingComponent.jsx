import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./RatingComponent.css"
// eslint-disable-next-line react/prop-types
const RatingComponent = ({setRating, rating}) => {
    const [hover, setHover] = useState(null);
  return (
    <div className="rating-container">
        <p>What is your Rating ?</p>
        <div className="rating-stars">
        {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input 
            className="star-input"
            type="radio" 
            name="rating" 
            value={currentRating} 
            onClick={() => setRating(currentRating)}
            />
            <FaStar 
            className="stars" 
            size={25} 
            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
            />
          </label>
          
        );
      })}
        </div>
    
    </div>
  );
};

export default RatingComponent;
