// import { info } from 'node-sass';
import React from 'react'
import DateFormat from "../History/DateFormat";

const CreditTable = ({ header, data }) => {
    console.log("inside credit table", data)
    if(!(data?.error)){
        function sumTotalAmount(array) {
            let sumTotal = 0;
            array.forEach((item) => {
                sumTotal +=  parseFloat(item.Total);
            });
            return sumTotal;
          }
          var total = sumTotalAmount(data);
      }

    return (
        <div className="table-credit-responsive">
            <table className="table-credit">
                <thead>
                    <tr className='position-sticky'>
                        {header.map((headers, index) => (
                            <th className='no-wrap' key={index}>{headers}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!(data?.error) && 
                    data.map((info, index) => (
                        <tr key={index}>
                            <td className='no-wrap'>{info.bill_no}</td>
                            <td className='no-wrap'><DateFormat date={info.Date}/></td>
                            <td className='no-wrap'>{info.DiscountAmt}</td>
                            <td className='no-wrap'>{info.Total}</td>
                        </tr>
                    ))}
                        <tr >
                            <td className='no-wrap'>Total:</td>
                            <td className='no-wrap'></td>
                            <td className='no-wrap'></td>
                            <td className='no-wrap-bold'>{!(data?.error) && total.toFixed(3)}</td>
                            {/* <td className='no-wrap-bold'>{total}</td> */}
                        </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CreditTable