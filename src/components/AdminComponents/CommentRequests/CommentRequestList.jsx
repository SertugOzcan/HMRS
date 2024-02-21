import React, { useContext } from 'react'
import { AdminPageAPIContext } from '../../../context/AdminPageAPIContext'
import CommentRequestCard from '../CommentRequests/CommentRequestCard'
import './CommentRequestList.css'

const CommentRequestList = () => {
    const {pendingComments} = useContext(AdminPageAPIContext)
  return (
    <>
    <section className="comment-request-list-section">
        {/* {isLoading.read && <h1>LOADING REQUESTS...</h1>} */}
        <article className="comment-request-list-article">
          {pendingComments.map((request)=> (
            <CommentRequestCard key={request.id} request={request}/>
          ))}
        </article>
    </section>
    </>
  )
}

export default CommentRequestList