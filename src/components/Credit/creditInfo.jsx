import React from 'react'

const CreditInfo = ({creditDetails, handleView,handleShow, isClicked, isShown }) => {
  const checkNan = (sales) => {
    if (sales) {
        let value = parseFloat(sales).toLocaleString(undefined, { maximumFractionDigits: 3 });
        return value
    }
    else {
        return ""
    }
}
    const {TotalCreditSale, TotalPaid, RemainingAmount}= creditDetails
  return (
    <div className='credit-info'>
          <div className='total-credit-sale'>
            <div className='specify-width'>
              <p >Total Credit Sale: </p>
              <span>{checkNan(TotalCreditSale)}</span>
            </div>
            <button className='view' onClick={handleView}>{isClicked ? "Hide" : "View"}</button>
          </div>
          <div className='total-amount-paid'>
            <div className='specify-width'>
              <p >Total Amount Paid: </p>
              <span>{checkNan(TotalPaid)}</span>
            </div>
            <button className='view' onClick={handleShow}>{isShown ? "Hide" : "View"}</button>
          </div>
          <hr className='credit-hr-line'></hr>
          <div className='remaining-balance'>
            <div className='specify-width'>
              <p >Remaining Balance: </p>
              <span>{checkNan(RemainingAmount)}</span>
            </div>
          </div>
        </div>
  )
}

export default CreditInfo