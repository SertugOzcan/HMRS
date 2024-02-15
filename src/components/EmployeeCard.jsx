import React from 'react'
import "./EmployeeCard.css"

const EmployeeCard = ({image,name, surName, identityNumber, email, phones, address, salary, dateOfBirt}) => {
  return (
    <div className='card'>
        
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SR5emlvKa5Trq207GwkpiamFuQFskm8zLniDY04frA&s" alt="" />
        
        <div className='card-values'>
            <div>
                <p>name : {name}</p>
                <p>surName : </p>
                <p>email :</p>
                
            </div>
            <div>
                <p>phone :</p>
                <p>salary :</p>
                <p>izin hakkı :</p>
            </div>
        </div>
    </div>
  )
}

export default EmployeeCard