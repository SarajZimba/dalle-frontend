import React from 'react'

const ConvertDate = ({date}) => {
  const convertDate = new Date(date).toISOString().substring(0,10)
  return (
    <div key={date}> 
        {convertDate}
    </div>
  )
}

export default ConvertDate