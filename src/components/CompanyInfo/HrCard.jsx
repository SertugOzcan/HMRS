import React from 'react'
import "./HrCard.css"
const HrCard = ({hrInfo}) => {


  return (
    <div className='hr-card'>
        <img src={hrInfo.image} alt="" />
        <div className='hr-card-texts'>
            <p>{hrInfo.name}</p>
            <p>{hrInfo.lastName}</p>
            <p>{hrInfo.email}</p>
            <p>
            {hrInfo.phones[0].phoneType} - {hrInfo.phones[0].phoneNumber}
            </p>
        </div>
    </div>
  )
}

export default HrCard