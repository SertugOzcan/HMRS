import React from 'react'
import HolidayCard from './HolidayCard'

const HolidayList = (holidays) => {
  return (
    <>
    {holidays.map((holiday)=>{
        <HolidayCard value={{...holiday}}/>
    })}
    </>
  )
}

export default HolidayList