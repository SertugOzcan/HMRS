import React, { useContext, useState } from "react";
import "./AddComment.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AddComment = () => {
    const {isAuthenticated} = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [header, setHeader] = useState("");
  const [rating, setRating] = useState(0);


  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeHeader = (e) => {
    setHeader(e.target.value);
  };

  const handleChangeRating = (e) => {
    setRating(parseInt(e.target.value));
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
      const response = await axios.post('http://localhost:9097/api/v1/comment/add', newComment);
  
      if (response.status === 201) {
        console.log("succesfully")
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error', error);
    }
  
    setContent('');
    setHeader('');
    setRating(0);
  };

  return (
    <div className="add-comment-container">
      <input
        type="text"
        value={header}
        onChange={handleChangeHeader}
        placeholder="Header.."
        className="header-input"
      />
      <textarea
        placeholder="Content..."
        value={content}
        onChange={handleChangeContent}
        className="comment-input"
      />
      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        min="1"
        max="5"
        value={rating}
        className="rating-input"
        onChange={handleChangeRating}
        required
      />
      <button onClick={handleSubmit} className="submit-button">
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;
