import React from 'react'

const FilterSm = () => {
    return (
        <div className="date-picker-outlet-sm">
            <div>
                <h6>{selectedOutlet}</h6>
                <SelectSearchInput token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
            </div>

            <div className='start-date'>
                <label className="">Start Date:</label>
                <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
            </div>
            <div className='end-date'>
                <label className="">End Date:</label>
                <DatePicker selected={endDate} dateFromat='yyyy-mm-dd' onChange={(date) => setEndDate(date)} className='date-picker' />
            </div>
            <div >
                <label>Bill No:</label>
                <div>
                    <input type="number" placeholder='Search by bill no.' className='bill-number' onChange={handleBillNumber} />
                </div>
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

export default FilterSm