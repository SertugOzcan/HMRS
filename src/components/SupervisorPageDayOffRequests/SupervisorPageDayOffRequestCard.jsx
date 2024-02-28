import React, { useContext } from 'react'
import "./SupervisorPageDayOffRequestCard.css"
import { SupervisorPageDayOffAPIContext } from '../../context/SupervisorPageDayOffAPIContext';
const SupervisorPageDayOffRequestCard = ({dayoffRequest}) => {
    const { handleDayOffDecision } = useContext(SupervisorPageDayOffAPIContext);

    const dayOffInteger = parseInt(dayoffRequest.dayOff);

    const beginDate = new Date(dayoffRequest.startDate);
    const endDate = new Date(dayoffRequest.endDate);
    const differenceInMs = endDate.getTime() - beginDate.getTime();
    const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));
  return (
    <div className='dayoff-request-card-container'>
        <div className='dayoff-request-card-img'>
            <img src={dayoffRequest.image} alt="Personnel Image" />
        </div>
        <div className="dayoff-request-card-body">
            <div className='dayoff-request-card-data-div'>
                <h3>NAME</h3>
                <p>{dayoffRequest.name}</p>
            </div>
            <div className='dayoff-request-card-data-div'>
                <h3>REASON</h3>
                <p>{dayoffRequest.reason}</p>
            </div>
            <div className='dayoff-request-card-data-div'>
                <h3>DESCRIPTION</h3>
                <p>{dayoffRequest.description}</p>
            </div>
            <div className='dayoff-request-card-data-div'>
                <h3>BEGIN - END</h3>
                <p>{dayoffRequest.startDate}~{dayoffRequest.endDate}</p>
            </div>
            <div className='dayoff-request-card-data-div'>
                <h3>DAYOFF</h3>
                <p>{dayOffInteger} DAY</p>
            </div>
            <div className='dayoff-request-card-data-div'>
                <h3>DURATION</h3>
                <p>{differenceInDays} DAY</p>
            </div>
            <div className='dayoff-request-card-buttons'>
                <button className='dayoff-accept-button' onClick={() => handleDayOffDecision(dayoffRequest.id, "ACCEPTED")}>Accept</button>
                <button className='dayoff-decline-button' onClick={() => handleDayOffDecision(dayoffRequest.id, "DECLINED")}>Decline</button>
        </div>
        </div>
        
    </div>
  )
}

export default SupervisorPageDayOffRequestCard