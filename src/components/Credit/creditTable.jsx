import React from 'react'
import CreditTable from './../Table/creditTable';
import PaymentTable from './../Table/paymentTable';

const CreditTables = ({isClicked, isShown, creditWiseBillList, creditWisePaymentList}) => {
    const headerCredit = ["Bill", "Date", "Discount Amount", "Total"]
    const headerAmount = ["Date", "Time", "Amount", "Payment Mode"]
  return (
    <div className='credit-table'>
          <div className='total-credit-sale-table'>
            {isClicked &&
              <CreditTable header={headerCredit} data={creditWiseBillList}/>
            }
          </div>

          {!(creditWisePaymentList?.error) &&
            <div className='total-amount-paid-table'>
              {isShown &&
                <PaymentTable header={headerAmount} data={creditWisePaymentList} />
              }
            </div>
          }
        </div>
  )
}

export default CreditTables