import { useContext } from 'react'
import './SupervisorPageDayOffRequestList.css'
import  SupervisorPageDayOffRequestCard  from '../SupervisorPageDayOffRequests/SupervisorPageDayOffRequestCard'
import { SupervisorPageDayOffAPIContext } from '../../context/SupervisorPageDayOffAPIContext'

const SupervisorPageDayOffRequestList = () => {
    const {dayOffRequests} = useContext(SupervisorPageDayOffAPIContext)

  return (
    <div className='dayoff-request-list-container'>
      {dayOffRequests.map((dayoffRequest)=>(
        <SupervisorPageDayOffRequestCard key={dayoffRequest.id} request={dayoffRequest}/>
      ))}
    </div>
  )
}

export default SupervisorPageDayOffRequestList