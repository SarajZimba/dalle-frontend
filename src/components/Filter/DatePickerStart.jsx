import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerStart = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
            <label className="">Start Date:</label>
            <DatePicker selected={startDate}
                dateFromat='YYYY-MM-DD'
                onChange={(date) => setStartDate(date)}
                className='date-picker' />
        </div>
    )
}

export default DatePickerStart