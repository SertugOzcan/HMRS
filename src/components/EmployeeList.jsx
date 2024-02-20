import { useContext } from 'react'
import EmployeeCard from './EmployeeCard'
import "./EmployeeList.css"
import { SupervisorPageAPIContext } from '../context/SupervisorPageAPIContext';

const EmployeeList = () => {

  const { companyPersonnel } = useContext(SupervisorPageAPIContext);

  return (
    <div className='employee-list-container'>
      {companyPersonnel.map((personnel)=> (
        <EmployeeCard key={personnel.id} personnel={personnel} />
      ))}
    </div>
  )
}

export default EmployeeList