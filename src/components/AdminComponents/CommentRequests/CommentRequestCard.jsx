import React from 'react'
import './CommentRequestCard.css'
import { useContext } from 'react';
import { AdminPageAPIContext } from '../../../context/AdminPageAPIContext';

const CommentRequestCard = ({request}) => {
    const {handleCommentRequest} = useContext(AdminPageAPIContext);
    console.log(request);
  return (
    <div className='comment-card-div'>
            <div className='comment-image-div'>
                <img src={request.companyLogo} />
            </div>
            <div className='comment-details-div'>
                <div className='comment-description-div'>
                    <p>Name:{request.personnelName} {request.personnelLastName}</p>
                    <p>Yorum Basligi: {request.header}</p>
                    <p>Konu: {request.content}</p>
                </div>
                <div className='comment-difficulty-div'>              
                    <div className='comment-button-div'> 
                        <div className='comment-add-to-fav-div' onClick={() => handleCommentRequest(request.authId, true)}>
                            <span className='comment-fav-span'>Approve</span>   
                        </div>
                        <div className='comment-remove-from-fav-div' onClick={() => handleCommentRequest(request.authId, false)}>
                            <span className='comment-fav-span'>Decline</span>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CommentRequestCard