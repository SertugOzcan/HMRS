

const HolidayCard = ({holiday}) => {
  return (
    <div>
        <p>Holiday Name: {holiday.name}</p>
        <span>Duration: {holiday.duration}</span>
    </div>
  )
}

export default HolidayCard