import React from 'react'

const TotalSale = ({totalSaleSummary}) => {
  let revenuePerGuest= parseFloat(totalSaleSummary.RevenuePerGuest)

  return (
    <div className='total-sale-summary'>
    <p><span>Total PAX : </span>{totalSaleSummary.totalPax} </p>
    <p><span>Total Net Sale : </span>{totalSaleSummary.totalNetSales} </p>
    <p><span>Total Dine-In : </span>{totalSaleSummary.TotalDineIn} </p>
    <p><span>Total Order : </span>{totalSaleSummary.TotalTab} </p>
    <p><span>Revenue Per Guest : </span>{revenuePerGuest.toFixed(2)} </p>
</div>
  )
}

export default TotalSale