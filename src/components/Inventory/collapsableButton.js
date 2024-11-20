import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const CollapsableButton = ({ DatePicker,dateToday, startDate, setStartDate, endDate, setEndDate, handleDate, inputValue, handleInputChange, viewReport }) => {
  return (
    <div className='visible md:hidden'>
      <div className="flex visible md:hidden">
        <button className="inline-block place-items-end px-3 py-2 h-10 w-10 bg-slate-600 text-white font-medium
       text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-400 
       hover:shadow-lg focus:bg-slate-600 focus:shadow-lg 
       focus:outline-none focus:ring-0 active:bg-slate-500 active:shadow-lg 
       transition duration-150 ease-in-out" type="button"
          data-bs-toggle="collapse" data-bs-target="#collapseExample"
          aria-expanded="false" aria-controls="collapseExample">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="w-full text-center mx-2 py-2">
          <h4 className='text-xs'>Purchase Entry:</h4>
          <div className="flex justify-center">
            <p className="p-2 text-xs">From: <span>{dateToday}</span></p>
            <p className="p-2 text-xs">To: <span>{dateToday}</span></p>
          </div>
        </div>
      </div>

      <div className="collapse visible md:hidden" id="collapseExample" >
        <div className="block p-6 rounded-lg shadow-xl bg-white">
          <div className="w-full h-auto mt-2 mt-0 flex justify-between flex-col md:flex-row md:h-1/5">
            <div className="flex items-center md:flex-row">
              <div className=' w-full flex flex-between flex-col'>
                <label className="font-medium text-base md:text-xl text-center">Date Selection</label>
                <div className="flex w-full">
                  <div className='px-2'>
                    <label className="font-base text-xs md:text-base">From:</label>
                    <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='w-16 md:w-24 text-xs md:text-base' />
                  </div>
                  <div className='px-2'>
                    <label className="font-base text-xs md:text-base">To:</label>
                    <DatePicker selected={endDate} dateFromat='yyyy-mm-dd' onChange={(date) => setEndDate(date)} className='w-16 md:w-24 text-xs md:text-base' />
                  </div>
                </div>
              </div>
              <div className="my-4">
                <button onClick={handleDate} className="w-12 h-7 text-xs border-2 border-slate-300 hover:bg-slate-100 bg-slate-700 text-zinc-100 hover:text-zinc-700 rounded-lg md:h-9 md:w-20 text-xs md:text-base">Search</button>
              </div>
            </div>

            <div className="flex items-center justify-between md:flex-row mt-0">
              <div>
                <label className="px-2 text-xs md:text-base">Search:</label>
                <input
                  type="text"
                  className="border-2 border-slate-400 rounded-lg h-5 md:h-8 text-xs md:text-base placeholder:pl-2"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Vendor"
                />
              </div>
              <div>
                <button onClick={viewReport} className="w-20 h-7 text-xs border-2 border-slate-300 hover:bg-slate-100 bg-slate-700 text-zinc-100 hover:text-zinc-700 rounded-lg">View Reports</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollapsableButton
