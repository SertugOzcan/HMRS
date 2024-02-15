import React from 'react'

const HolidayCard = ({name,duration}) => {
  return (
    <div>
        <p>Holiday Name: {name}</p>
        <span>Duration: {duration}</span>
    </div>
  )
}

export default HolidayCard