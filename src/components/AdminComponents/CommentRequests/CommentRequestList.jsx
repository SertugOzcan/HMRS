import { useContext } from 'react'
import CommentRequestCard from '../CommentRequests/CommentRequestCard'
import './CommentRequestList.css'
import { AdminPagePendingCommentsAPIContext } from '../../../context/AdminPagePendingCommentsAPIContext'

const CommentRequestList = () => {
    const {pendingComments} = useContext(AdminPagePendingCommentsAPIContext)
  return (
    <>
    <section className="comment-request-list-section">
        {/* {isLoading.read && <h1>LOADING REQUESTS...</h1>} */}
        <article className="comment-request-list-article">
          {pendingComments.map((request)=> (
            <CommentRequestCard key={request.commentId} request={request}/>
          ))}
        </article>
    </section>
    </>
  )
}

export default CommentRequestList