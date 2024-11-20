import React from 'react'
import { DatePicker } from 'react-datepicker';
import SelectSearchInput from './../SelectSearch/index';

const FilterLg = ({startDate, endDate, setStartDate, setEndDate, token, setToken, selectedOutlet, setSelectedOutlet, handleBillNumber, viewBill}) => {
    return (
        <div className="date-picker-outlet">
            <div>
                <label className="">Start Date:</label>
                <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
            </div>
            <div className='enter-bil-no'>
                <div>
                    <h6>{selectedOutlet}</h6>
                    <SelectSearchInput token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
                </div>
                <div >
                    <input type="number" placeholder='Search by bill no.' className='bill-number' onChange={handleBillNumber} />
                </div>
            </div>
            <div>
                <label className="">End Date:</label>
                <DatePicker selected={endDate} dateFromat='yyyy-mm-dd' onChange={(date) => setEndDate(date)} className='date-picker' />
            </div>
            <div className='btn-search-view'>
                <button
                    onClick={viewBill}
                    className="btn-search">
                    View
                </button>
            </div>
        </div>
    )
}

export default FilterLg