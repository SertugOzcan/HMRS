import React from 'react'
import EmployeeCard from './EmployeeCard'
import "./EmployeeList.css"

const EmployeeList = ({personnelData}) => {
  return (
    <div className='employee-list-container'>
      {personnelData.map((personnel)=>{ <EmployeeCard personnel={{...personnel}}/>})}
    </div>
  )
}

export default EmployeeList