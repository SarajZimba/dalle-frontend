import React from 'react'

const DateFormat = ({date}) => {
    const convertDate = new Date(date).toISOString().substring(0,10)
  return (
    <p key={date}>{convertDate}</p>
  )
}

export default DateFormat