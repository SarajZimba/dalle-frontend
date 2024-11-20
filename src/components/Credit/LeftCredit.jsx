import React, {useState} from 'react'
import LeftCreditTable from "./LeftCreditTable";
import DatePicker from "react-datepicker";
import CreditDateRange from './CreditDateRange';

const LeftCredit = ({ handleRangeType, creditLeft, showDatepicker, startDate ,endDate,  setStartDate, setEndDate}) => {
  const creditTableHeader = ["Total Credit","Amount Paid", "Amount Left", "Guest", "Address", "Email", "ID", "Phone"];
    
    return (
        <div className='left-credit'>
            <div>
                <div className="select-container">
                    <select onChange={handleRangeType}>
                        <option value={""}>Please select an option</option>
                        <option value={"All"}>All</option>
                        <option value={"Ranged"}>Range</option>
                    </select>
                </div>
                <div>
                    {showDatepicker &&
                        <div style={{display: "flex"}}> 
                        <CreditDateRange selectedDate={startDate} setDate={setStartDate}/>
                        <CreditDateRange selectedDate={endDate} setDate={setEndDate}/>
                        </div>}
                </div>
            </div>

         <LeftCreditTable header={creditTableHeader} creditLeft={creditLeft}/>
        </div>
    )
}

export default LeftCredit