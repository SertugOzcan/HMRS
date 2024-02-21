import React from 'react'
import "./PersonnelCard.css"
const PersonnelCard = ({personnelInfo}) => {
 
  return (
    <div className='personnel-card'>
        <img src={personnelInfo.image} alt="" />
        <div className='personnel-card-texts'>
            <p>{personnelInfo.name}</p>
            <p>{personnelInfo.lastName}</p>
            <p>{personnelInfo.email}</p>
            <p>
            {personnelInfo.phones[0].phoneType} - {personnelInfo.phones[0].phoneNumber}
            </p>
        </div>
    </div>
  )
}

export default PersonnelCard