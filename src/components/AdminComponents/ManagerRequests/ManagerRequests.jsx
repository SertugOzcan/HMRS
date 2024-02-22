import SupervisorRequestList from '../../../components/SupervisorRequestList/SupervisorRequestList';
import './ManagerRequests.css'

const ManagerRequests = () => {
  return (
    <div className="manager-requests-container">
        <h2>Manager Requests</h2>
        <SupervisorRequestList />
      </div>
  )
}

export default ManagerRequests