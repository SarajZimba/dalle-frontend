import React
, { useState, useEffect }
    from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import SelectSearchInput from '../SelectSearch/index';
import "../../scss/bill.scss";
import "../../scss/filter.scss";

const FIlter = ({ view, btn, startDate, setStartDate, endDate, setEndDate, selectedOutlet, setSelectedOutlet }) => {
    const [token, setToken] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    return (
        <div className='select-options'>
            <div className="date-picker-outlet">
                <div>
                    <label className="">Start Date:</label>
                    <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
                </div>
                <SelectSearchInput token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
                <div className='end-date'>
                    <label className="">End Date:</label>
                    <DatePicker selected={endDate} dateFromat='yyyy-mm-dd' onChange={(date) => setEndDate(date)} className='date-picker' />
                </div>
                <div className='btn-search-view'>
                    <button
                        onClick={view}
                        className="btn-search">
                        {btn}
                    </button>
                </div>
            </div>

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
                <div className='btn-search-view'>
                    <button
                        onClick={view}
                        className="btn-search">
                        {btn}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FIlter