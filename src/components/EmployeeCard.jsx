import "./EmployeeCard.css"

const EmployeeCard = ({personnel}) => {

  return (

    <div className='card'>
        
        <img src={personnel.image} alt="personnel-image" />
        
        <div className='card-values'>
            <div>
                <p>Name : {personnel.name}</p>
                <p>Surname : {personnel.lastName} </p>
                <p>E-mail : {personnel.email}</p>
                
            </div>
            <div>
                <p>Phone : {personnel.phones.phoneNumber}</p>
                <p>Salary : {personnel.salary}</p>
                <p>Dayoffs : {personnel.dayOff}</p>
            </div>
        </div>
    </div>
  )
}

export default EmployeeCard