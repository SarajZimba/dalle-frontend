import React, { useState } from 'react'
import DateFormat from './DateFormat'

const ComplimentaryTable = ({ complimentary, complimentaryTotal }) => {
    return (
        <div className="table-customer-history">
            <div className=''>
                <h6 className=''>Complimentary</h6>
            </div>
            <div className="table-history-responsive">
                <table className="table-complementary">
                    <thead>
                        <tr className='position-sticky'>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Cost</th>
                            <th>Mode</th>
                        </tr>
                    </thead>
                    {complimentary.map((item) => (
                        <tr>
                            <td><DateFormat date={item.Date} /></td>
                            <td>{item.Customer}</td>
                            <td>{item.Total}</td>
                            <td>{ }</td>
                            <td>{item.Mode}</td>
                        </tr>
                    ))
                    }
                    <tr>
                        <td>Total Complimentary:</td>
                        <td></td>
                        <td>{complimentaryTotal}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ComplimentaryTable