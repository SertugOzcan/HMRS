import SupervisorPageAdvanceRequestList from './SupervisorPageAdvanceRequestList'
import './SupervisorPageAdvanceRequests.css'
const SupervisorPageAdvanceRequests = () => {
  return (
    <div className="supervisor-advance-page-container">
      <main className="supervisor-page-advance-main">
        <h2>Advance Management Page</h2>
        <br />
        <p>Explore all advance requests from the company's personnel, complete with essential details about each request. When you update the status of a request, personnel can view these changes on their respective request pages. Furthermore, notifications will be sent via email to inform them of the decision.</p>
        <h4><em>The amounts for accepted advance requests will also be presented on the company's data page under "ADVANCE" expenses.</em></h4>
      </main>
      <div className='supervisor-advance-page-upper'>
        <strong>Personnel Advance Requests History:</strong>
      </div>
      <div className='supervisor-advance-page-bottom'>
        <SupervisorPageAdvanceRequestList/>
      </div>
    </div>
  )
}

export default SupervisorPageAdvanceRequests