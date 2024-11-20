import React from 'react'
import DateFormat from "../History/DateFormat";

const PaymentTable = ({ header, data }) => {
    function sumTotalAmount(array) {
        let sumTotal = 0;
        array.forEach((item) => {
          sumTotal +=  parseFloat(item.Amount);
        });
        return sumTotal;
      }
      let total = sumTotalAmount(data);
    return (
        <div className="table-credit-responsive">
            <table className="table-credit">
                <thead>
                    <tr className='position-sticky'>
                        {header.map((headers, index) => (
                            <th className='no-wrap'  key={index}>{headers}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((info, index) => (
                        <tr key={index}>
                            <td className='no-wrap'><DateFormat date={info.Date}/></td>
                            <td className='no-wrap'>{info.Time}</td>
                            <td className='no-wrap'>{info.Amount}</td>
                            <td className='no-wrap-bold'>{info.PaymentMode}</td>
                        </tr>
                    ))}
                <tr>
                    <td>Total:</td>
                    <td></td>
                    <td>{total}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PaymentTable