import React from 'react'
import DatePicker from "react-datepicker";

const CreditDateRange = ({selectedDate, setDate}) => {
    return (
        <div>
            <label>Start</label>
            <DatePicker selected={selectedDate} onChange={(date) => setDate(date)} />
        </div>
    )
}

export default CreditDateRange