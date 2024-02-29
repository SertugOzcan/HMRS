/* eslint-disable react/prop-types */
import HolidayCard from './HolidayCard'

const HolidayList = ({holidays}) => {
  return (
    <>
    {holidays.map((holiday)=> (
        <HolidayCard key={holiday.id} holiday={holiday}/>
    ))}
    </>
  )
}

export default HolidayList