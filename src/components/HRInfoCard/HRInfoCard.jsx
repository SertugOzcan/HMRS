import React from 'react'
import './HRInfoCard.css'
const HRInfoCard = ({hrInfo}) => {
  return (
    <div className='hr-info-card-container'>
        <img src={hrInfo.image}></img>
        <div className="hr-info-card-details">
            <div className='hr-info-name'><strong>Name:</strong>{hrInfo.firstName}</div>
            <div className='hr-info-surname'><strong>Surname:</strong>{hrInfo.lastName}</div>
            <div className='hr-info-mail'><strong>E-mail:</strong>{hrInfo.email}</div>
            <div className='hr-info-phone'><strong>Phone:</strong>{hrInfo.phone}</div>
        </div>
    </div>
  )
}

export default HRInfoCard