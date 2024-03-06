import SupervisorPageSpendingRequestList from '../SupervisorPageSpendingRequests/SupervisorPageSpendingRequestList'
import './SupervisorPageSpendingRequests.css'
const SupervisorPageSpendingRequests = () => {
  return (
    <div className="supervisor-spending-page-container">
      <main className='supervisor-spending-main'>
        <h2>Spending Management Page</h2>
        <br />
        <p>Explore all spending requests from the company's personnel, complete with essential details about each request. When you update the status of a request, personnel can view these changes on their respective request pages. Furthermore, notifications will be sent via email to inform them of the decision.</p>
        <h4><em>The amounts for accepted spending requests will also be presented on the company's data page under "SPENDING" expenses.</em></h4>
      </main>
      <div className='supervisor-spending-page-upper'>
        <strong>Personnel Spending Requests History:</strong>
      </div>
      <div className='supervisor-spending-page-bottom'>
        <SupervisorPageSpendingRequestList />
      </div>
    </div>
  )
}

export default SupervisorPageSpendingRequests