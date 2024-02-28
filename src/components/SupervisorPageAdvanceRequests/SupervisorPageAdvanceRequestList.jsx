import { useContext } from 'react'
import './SupervisorPageAdvanceRequestList.css'
import  SupervisorPageAdvanceRequestCard  from '../SupervisorPageAdvanceRequests/SupervisorPageAdvanceRequestCard'
import { SupervisorPageAdvanceAPIContext } from '../../context/SupervisorPageAdvanceAPIContext'

const SupervisorPageAdvanceRequestList = () => {
    const {advanceRequests} = useContext(SupervisorPageAdvanceAPIContext)

  return (
    <div className='advance-request-list-container'>
      {advanceRequests.map((advanceRequest)=>(
        <SupervisorPageAdvanceRequestCard key={advanceRequest.id} request={advanceRequest}/>
      ))}
    </div>
  )
}

export default SupervisorPageAdvanceRequestList