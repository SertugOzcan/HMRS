/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './CommentRequestCard.css';
import { useContext,useState } from 'react';
import { AdminPagePendingCommentsAPIContext } from '../../../context/AdminPagePendingCommentsAPIContext';

const CommentRequestCard = ({request}) => {
    const { handleCommentRequest } = useContext(AdminPagePendingCommentsAPIContext);
    const [showFullText, setShowFullText] = useState(false);
    const maxLength = 30; 
    const handleShowFullText = () => {
        alert(`Name: ${request.personnelName} ${request.personnelLastName}\nYorum Başlığı: ${request.header}\nKonu: ${request.content}`);
    };

    return (
        <div className='comment-card-div'>
            <div className='comment-image-div'>
                <img src={request.personnelImage} alt="personnel" />
            </div>
            <div className='comment-details-div'>
                <div className={`comment-description-div ${showFullText ? 'show-full' : ''}`}>
                    <div className='text-div'>
                        <h4>Name: </h4>
                        <p>{request.personnelName} {request.personnelLastName}</p>
                    </div>
                    <div className='text-div'>
                        <h4>Header: </h4>
                        <p>{request.header}</p>
                    </div>
                    <div className='text-div'>
                        <h4>Content: </h4>
                        <p>{showFullText ? request.content : request.content.slice(0, maxLength) + (request.content.length > maxLength ? '...' : '')}</p>
                    </div>
                    
                    
                    
                </div>
                
                {!showFullText && request.content.length > maxLength && (
                    <div className="read-more" onClick={handleShowFullText}>
                        <span>Devamını Gör</span>
                    </div>
                )}
            </div>
            <div className='comment-button-div'> 
                        <div className='comment-add-to-fav-div' onClick={() => handleCommentRequest(request.commentId, true)}>
                            <span className='comment-fav-span'>Approve</span>   
                        </div>
                        <div className='comment-remove-from-fav-div' onClick={() => handleCommentRequest(request.commentId, false)}>
                            <span className='comment-fav-span'>Decline</span>   
                        </div>
                    </div>
        </div>
    );
}

export default CommentRequestCard;
