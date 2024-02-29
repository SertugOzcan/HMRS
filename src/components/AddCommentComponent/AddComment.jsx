import { useContext, useState } from "react";
import "./AddComment.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import RatingComponent from "./RatingComponent";

const AddComment = () => {
    const {isAuthenticated} = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [header, setHeader] = useState("");
  const [rating, setRating] = useState(1);


  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeHeader = (e) => {
    setHeader(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newComment = {
      token: isAuthenticated.token,
      header: header,
      content: content,
      rating: rating
    };
  
    try {
      const response = await axios.post('http://localhost:80/comment/add', newComment);

      if (response.status === 200) {
        console.log("Add Comment Successfull")
      }
    } catch (error) {
      console.log("Error on creating new comment request! ", error);
    }
  
    setContent('');
    setHeader('');
    setRating(1);
  };

  return (
    <div className="add-comment-container">
      <div className="second-container">
        <div className="input-box">
          <input
            type="text"
            value={header}
            onChange={handleChangeHeader}
            className="header-input"
            required="required"
          />
          <span>Header</span>
        </div>
        <div className="input-box">
          <textarea
            value={content}
            onChange={handleChangeContent}
            className="comment-input"
            required="required"
          />
          <span>Content</span>
        </div>
        
        <RatingComponent rating={rating} setRating={setRating}/>
        <button onClick={handleSubmit} className="submit-button">
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
