import React from 'react'
import EmployeeCard from './EmployeeCard'
import "./EmployeeList.css"

const EmployeeList = ({employeeData}) => {
  return (
    <div className='employee-list-container'>
        {/*employeeData.map(item => (
            <EmployeeCard key={item.id}{...item} />
        ))
        Aşağıdaki card componentleri denemek için çağırdım onlar sonradan silinecek !
        */}
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
    </div>
  )
}

export default EmployeeList