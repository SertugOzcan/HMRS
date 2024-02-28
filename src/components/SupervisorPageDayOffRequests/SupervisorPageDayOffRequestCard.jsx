/* eslint-disable react/prop-types */
import { useContext } from 'react'
import "./SupervisorPageDayOffRequestCard.css"
import { SupervisorPageDayOffAPIContext } from '../../context/SupervisorPageDayOffAPIContext';

const SupervisorPageDayOffRequestCard = ({request}) => {
    const { handleDayOffDecision } = useContext(SupervisorPageDayOffAPIContext);

    const dayOffInteger = parseInt(request.dayOff);

    const beginDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    const differenceInMs = endDate.getTime() - beginDate.getTime();
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24) + 1);

    const handleDayOffDecisionConfirmation = (e, id, decision) => {
        e.preventDefault();
        let confirmation;
        if(decision === "ACCEPTED"){
            confirmation = window.confirm("Are you sure to accept day off request of this personnel?")
        } else {
            confirmation = window.confirm("Are you sure to decline day off request of this personnel?")
        }
        if(confirmation) {
            handleDayOffDecision(id, decision);
        }
      }

    return (
        <div className={`dayoff-request-card-container supervisor-${request.requestStatus}`}>
            <div className='dayoff-request-card-img'>
                <img src={request.image} alt="Personnel Image" />
            </div>
            <div className="dayoff-request-card-body">
                <div className='dayoff-request-card-data-div'>
                    <h3>NAME</h3>
                    <p>{request.name}</p>
                </div>
                <div className='dayoff-request-card-data-div'>
                    <h3>REQUEST DATE</h3>
                    <p>{request.createdAt}</p>
                </div>
                <div className='dayoff-request-card-data-div'>
                    <h3>REASON</h3>
                    <p>{request.reason}</p>
                </div>
                <div className='dayoff-request-card-data-div'>
                    <h3>DESCRIPTION</h3>
                    <p>{request.description}</p>
                </div>
                <div className='dayoff-request-card-data-div'>
                    <h3>FROM</h3>
                    <p>{request.startDate}</p>
                </div>
                <div className='dayoff-request-card-data-div'>
                    <h3>TO</h3>
                    <p>{request.endDate}</p>
                </div>
                <div className='dayoff-request-card-data-div'>
                    <h3>DURATION</h3>
                    <p>{differenceInDays} DAY</p>
                </div>
                <div className='dayoff-request-card-data-div'>
                    <h3>DAYOFF QUOTA</h3>
                    <p>{dayOffInteger} DAY</p>
                </div>
                {request.requestStatus === "PENDING" ? 
                <div className='dayoff-request-card-buttons'>
                    <button className='dayoff-accept-button' onClick={(e) => handleDayOffDecisionConfirmation(e, request.id, "ACCEPTED")}>Accept</button>
                    <button className='dayoff-decline-button' onClick={(e) => handleDayOffDecisionConfirmation(e, request.id, "DECLINED")}>Decline</button>
                </div>
                :
                <div className='dayoff-request-card-data-div'>
                    <h3>UPDATED AT</h3>
                    <p>{request.updatedAt}</p>
                </div>
                }
            </div>        
        </div>
    )
    }

export default SupervisorPageDayOffRequestCard