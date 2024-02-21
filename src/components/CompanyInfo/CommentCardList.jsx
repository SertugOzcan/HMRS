import React, { useContext, useEffect, useState } from 'react'
import { GuestPageAPIContext } from '../../context/GuestPageAPIContext';
import axios from 'axios';
import CommentCard from './CommentCard';

const CommentCardList = () => {

    const {selectedCompanyId} = useContext(GuestPageAPIContext)
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if(selectedCompanyId){
                try {
                    const response = await axios.get(`http://localhost:9097/api/v1/comment/get-all-by-company/${selectedCompanyId}` );
                    setComments(response.data);
                } catch (error) {
                    console.error('Error fetching HR infos:', error);
                }
            } 
        };

        fetchData();
    }, []);

    return (
        <div className="comment-card-list">
            {comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
            ))}
        </div>
    );
}

export default CommentCardList