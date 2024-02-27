import './CommentRequestCard.css'
import { useContext } from 'react';
import { AdminPagePendingCommentsAPIContext } from '../../../context/AdminPagePendingCommentsAPIContext';

const CommentRequestCard = ({request}) => {
    const {handleCommentRequest} = useContext(AdminPagePendingCommentsAPIContext);
    
  return (
    <div className='comment-card-div'>
            <div className='comment-image-div'>
                <img src={request.personnelImage} />
            </div>
            <div className='comment-details-div'>
                <div className='comment-description-div'>
                    <p>Name:{request.personnelName} {request.personnelLastName}</p>
                    <p>Yorum Basligi: {request.header}</p>
                    <p>Konu: {request.content}</p>
                </div>
                <div className='comment-difficulty-div'>              
                    <div className='comment-button-div'> 
                        <div className='comment-add-to-fav-div' onClick={() => handleCommentRequest(request.commentId, true)}>
                            <span className='comment-fav-span'>Approve</span>   
                        </div>
                        <div className='comment-remove-from-fav-div' onClick={() => handleCommentRequest(request.commentId, false)}>
                            <span className='comment-fav-span'>Decline</span>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CommentRequestCard