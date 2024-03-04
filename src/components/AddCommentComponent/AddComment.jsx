import { useContext, useState } from "react";
import "./AddComment.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import RatingComponent from "./RatingComponent";

const AddComment = ({setIsShowAddCard}) => {
    const {isAuthenticated} = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [header, setHeader] = useState("");
  const [rating, setRating] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [visible, setVisible] = useState(false);


  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeHeader = (e) => {
    setHeader(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!header.trim() || !content.trim()) {
      alert("Header and content must not be empty!");
      return;
    }
  
    const newComment = {
      token: isAuthenticated.token,
      header: header.trim(),
      content: content.trim(),
      rating: rating
    };
  
    try {
      const response = await axios.post('http://localhost:80/comment/add', newComment);

      if (response.status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log("Error on creating new comment request! ", error);
      setIsSuccess(false);
    }
  
    setContent('');
    setHeader('');
    setRating(1);

    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 4000);

    // setIsShowAddCard(false)
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
        <span className={`add-comment-message ${visible ? "show" : ""} ${
              isSuccess ? "success" : "error"
            }`}>
        {isSuccess ? "Comment added! Waiting for admin approval..." : "Comment add failed, please try again later..."}
        </span>
      </div>
    </div>
  );
};

export default AddComment;
