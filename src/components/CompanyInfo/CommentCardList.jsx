import React, { useContext } from 'react'
import { GuestPageAPIContext } from '../../context/GuestPageAPIContext';
import CommentCard from './CommentCard';

const CommentCardList = () => {

    const {comments} = useContext(GuestPageAPIContext)
    


    return (
        <div className="comment-card-list">
            {comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
            ))}
        </div>
    );
}

export default CommentCardList