import { useContext } from 'react'
import './SupervisorPageDayOffRequestList.css'
import { SupervisorPageAPIContext } from '../../context/SupervisorPageAPIContext'
import  SupervisorPageDayOffRequestCard  from '../SupervisorPageDayOffRequests/SupervisorPageDayOffRequestCard'

const SupervisorPageDayOffRequestList = () => {
    const {dayoffRequests} = useContext(SupervisorPageAPIContext)
  return (
    <div className='dayoff-request-list-container'>
      {dayoffRequests.map((dayoffRequest)=>(
        <SupervisorPageDayOffRequestCard key={dayoffRequest.id} dayoffRequest={dayoffRequest}/>
      ))}
    </div>
  )
}

export default SupervisorPageDayOffRequestList