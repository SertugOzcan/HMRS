import React from 'react'
import "./EmployeeCard.css"

const EmployeeCard = ({image,name, surName, email, phone, salary, dayOff}) => {
  return (
    <div className='card'>
        
        <img src={image} alt="personnel-image" />
        
        <div className='card-values'>
            <div>
                <p>Name : {name}</p>
                <p>Surname : {surName} </p>
                <p>E-mail : {email}</p>
                
            </div>
            <div>
                <p>Phone : {phone}</p>
                <p>Salary : {salary}</p>
                <p>Dayoffs : {dayOff}</p>
            </div>
        </div>
    </div>
  )
}

export default EmployeeCard