import { useContext } from 'react'
import './SupervisorPageDayOffRequestList.css'
import  SupervisorPageDayOffRequestCard  from '../SupervisorPageDayOffRequests/SupervisorPageDayOffRequestCard'
import { SupervisorPageDayOffAPIContext } from '../../context/SupervisorPageDayOffAPIContext'

const SupervisorPageDayOffRequestList = () => {
    const {pendingDayOffRequests, notPendingDayOffRequests} = useContext(SupervisorPageDayOffAPIContext)

  return (
    <div className='dayoff-request-list-container'>
      {pendingDayOffRequests.map((dayoffRequest)=>(
        <SupervisorPageDayOffRequestCard key={dayoffRequest.id} dayoffRequest={dayoffRequest}/>
      ))}
    </div>
  )
}

export default SupervisorPageDayOffRequestList