import './CommentRequests.css'
import CommentRequestList from './CommentRequestList'

const CommentRequests = () => {
  return (
    <div className="comment-requests-container">
        <h2>Comment Requests</h2>
        <CommentRequestList />
      </div>
  )
}

export default CommentRequests