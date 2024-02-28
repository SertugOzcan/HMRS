import React from 'react'

const SupervisorPageDayOffRequestCard = ({dayoffRequest}) => {
  return (
    <div className='dayoff-request-card-container'>
        <div className="dayoff-request-card-body">
            <img src={dayoffRequest.personnelImage} alt="Personnel Image" />
            <div className='dayoff-request-card-middle'>
                <label className='dayoff-request-card-personnel-data'>Name:{dayoffRequest.personnelName}</label>
                <label className='dayoff-request-card-personnel-data'>Surname:{dayoffRequest.personnelSurName}</label>
                <label className='dayoff-request-card-personnel-data'>Request Reason:{dayoffRequest.reason}</label>
                <label className='dayoff-request-card-personnel-data'>RequestDate:{dayoffRequest.createdAt}</label>
            </div>
            <div className='dayoff-request-card-right'>
                <label className='dayoff-request-card-personnel-data'>BeginDate:{dayoffRequest.requestStartDate}</label>
                <label className='dayoff-request-card-personnel-data'>EndDate:{dayoffRequest.requestEndDate}</label>
                <label className='dayoff-request-card-personnel-data'>Duration:{dayoffRequest.requestEndDate-dayoffRequest.requestStartDate}</label>
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