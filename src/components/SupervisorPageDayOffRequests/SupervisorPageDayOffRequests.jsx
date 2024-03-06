import './SupervisorPageDayOffRequests.css'
import SupervisorPageDayOffRequestList from './SupervisorPageDayOffRequestList'

const SupervisorPageDayOffRequests = () => {
  return (
    <div className="supervisor-day-off-page-container">
        <main className="supervisor-page-day-off-main">
          <h2>Day Off Management Page</h2>
          <br />
          <p>Explore all day off requests from the company's personnel, complete with essential details about each request. When you update the status of a request, personnel can view these changes on their respective request pages. Furthermore, notifications will be sent via email to inform them of the decision.</p>
        </main>
      <div className='supervisor-day-off-page-upper'>
        <strong>Personnel Day Off Requests History:</strong>
      </div>
      <div className="supervisor-day-off-page-bottom">
        <SupervisorPageDayOffRequestList/>
      </div>
    </div>
  )
}

export default SupervisorPageDayOffRequests