import React from 'react'
import ConvertTime from './ConvertTime'

const TimeStats = ({ timeStats }) => {
    return (
        <div className='time-stats'>
            <div><span>First Order At : </span> <ConvertTime time={timeStats.firstorderAt} /></div>
            <p><span>First Order Date : </span>{timeStats.firstorderDate} </p>
            <div><span>Last Order At : </span> <ConvertTime time={timeStats.lastoderAt} /></div>
            <p><span>Last Order Date : </span>{timeStats.lastoderDate} </p>
            <p><span>Last Bill Closed : </span>{timeStats.lastbillclosedAt} </p>
            <p><span>Operation Time : </span>{timeStats.operationTime} </p>
        </div>
    )
}

export default TimeStats