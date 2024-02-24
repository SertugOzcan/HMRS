import React from 'react'

const SupervisorPageDayOffRequestCard = ({dayoffRequest}) => {
  return (
    <div className='dayoff-request-card-container'>
        <div className="dayoff-request-card-body">
            <img src={dayoffRequest.personnelImage} alt="Personnel Image" />
            <div className='dayoff-request-card-middle'>
                <label className='dayoff-request-card-personnel-data'>Name:{dayoffRequest.personnelName}</label>
                <label className='dayoff-request-card-personnel-data'>Surname:{dayoffRequest.personnelSurName}</label>
                <label className='dayoff-request-card-personnel-data'>RequestType:{dayoffRequest.requestType}</label>
                <label className='dayoff-request-card-personnel-data'>RequestDate:{dayoffRequest.requestDate}</label>
            </div>
            <div className='dayoff-request-card-right'>
                <label className='dayoff-request-card-personnel-data'>BeginDate:{dayoffRequest.requestBeginDate}</label>
                <label className='dayoff-request-card-personnel-data'>EndDate:{dayoffRequest.requestEndDate}</label>
                <label className='dayoff-request-card-personnel-data'>Duration:{dayoffRequest.requestEndDate-dayoffRequest.requestBeginDate}</label>
            </div>
        </div>
        <div className='dayoff-request-card-buttons'>
            <button>Accept</button>
            <button>Decline</button>
        </div>
    </div>
  )
}

export default SupervisorPageDayOffRequestCard