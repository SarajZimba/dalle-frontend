import React from 'react'

const LeftCreditTable = ({header,creditLeft }) => {
    return (
        <div className="table-credit-left-responsive">
            <table className="table-credit-left">
                <thead>
                    <tr className='position-sticky'>
                        {header.map((headers) => (
                            <th>{headers}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {creditLeft.map((info, index) => (
                        <tr key={index}>
                            <td>{info.TotalCredit}</td>
                            <td>{info.AmountPaid}</td>
                            <td>{info.amountleft}</td>
                            <td>{info.guest}</td>
                            <td>{info.guestAddress}</td>
                            <td>{info.guestEmail}</td>
                            <td>{info.guestID}</td>
                            <td>{info.guestPhone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LeftCreditTable