import React from 'react'
import "../../scss/TimelineTable.scss"
import ConvertTime from './ConvertTime'

const TimelineTable = ({ tableSumamry }) => {
    return (
        <div className="table-timeline-responsive">
            <ConvertTime/>
            <table className="table-timeline">
                <thead>
                    <tr className='position-sticky'>
                        <th className='no-wrap'>Date</th>
                        <th className='no-wrap'>Table No</th>
                        <th className='no-wrap'>PAX</th>
                        <th>Start Time</th>
                        <th>Bill Print Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                        <th>Type</th>
                        <th>Server</th>
                        <th>Bill No</th>
                        <th>Total</th>
                        <th>Payment Mode</th>
                        <th>Rev. Per Guest</th>
                        <th className='timeline-item'>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {tableSumamry.map((info, index) => (
                        <tr key={index}>
                            <td className='no-wrap'>{info.Date}</td>
                            <td className='no-wrap'>{info.Table_No}</td>
                            <td className='no-wrap'>{info.NoOfGuests}</td>
                            <td className='no-wrap'><ConvertTime time={info.Start_Time}/></td>
                            <td className='no-wrap'>{info.billPrintTime}</td>
                            <td className='no-wrap'><ConvertTime time={info.End_Time}/></td>
                            <td className='no-wrap'>{info.duration}</td>
                            <td className='no-wrap'>{info.Type}</td>
                            <td className='no-wrap'>{info.server}</td>
                            <td className='no-wrap'>{info.bill_no}</td>
                            <td className='no-wrap'>{info.Total}</td>
                            <td className='no-wrap'>{info.PaymentMode}</td>
                            <td className='no-wrap'>{info.revperguest}</td>
                            <td >
                                <div className='timeline-item-td'>
                                {info.items}
                                </div>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TimelineTable