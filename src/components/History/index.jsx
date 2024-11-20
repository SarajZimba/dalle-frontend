import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './../Navbar/index';
import ComplimentaryTable from './ComplimentaryTable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import CustomerHistory from './CustomerHistory';
import "../../scss/History/history.scss";
import "../../scss/History/datepicker.scss";
import SelectSearch from 'react-select-search';
import SelectSearchInput from './../SelectSearch/index';
import Footer from "../Footer";

const History = () => {
  let url = process.env.REACT_APP_BASE_URL;
  const [discountTotal, setDiscountTotal] = useState("")
  const [totalSum, setTotalSum] = useState("")
  const [customerHistory, setCustomerHistory] = useState([])
  const [complimentary, setComplimentary] = useState([])
  const [complimentaryTotal, setTotal] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [token, setToken] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [inputChange, setInputChange] = useState("");

  let start = startDate.toISOString().slice(0, 10)
  let end = endDate.toISOString().slice(0, 10)
  let navigate = useNavigate();

  const [erorComplimentary, setErorComplimentary] = useState("");
  const [show, setShow] = useState(false);
  const [showCustomerHistory, setShowCustomerHistory] = useState(false);

  useEffect(() => {
    let tokenCheck = localStorage.getItem("token");
    if (!tokenCheck) {
      navigate('/')
    } else {
      setToken(localStorage.getItem("token"))
    }
  }, [])

  const showComplimentary = () => {
    axios.post(`${url}/customersaleshistory`, {
      start_date: start,
      end_date: end,
      uname: `${inputChange}`,
      token: token,
      Outlet_Name: `${selectedOutlet}`
    })
      .then((response) => {
        setShowCustomerHistory(true)
        setErorComplimentary()
        setCustomerHistory(response.data.details)
        setDiscountTotal(response.data.DiscountTotal)
        setTotalSum(response.data.Total)
      })
      .catch((error) => {
        // console.log("error", error.response.data)
        setShowCustomerHistory(false)
      })
    axios.post(`${url}/complimentary`, {
      start_date: start,
      end_date: end,
      uname: `${inputChange}`,
      token: token,
      Outlet_Name: `${selectedOutlet}`
    })
      .then((response) => {
        setShow(true)
        // console.log("complimentary", response.data)
        setComplimentary(response.data.details)
        setTotal(response.data.Total)
      })
      .catch((error) => {
        setShow(false)
        // console.log("error", error.response.data.error)
      })
  }
  const handleInputChange = (event) => {
    setInputChange(event.target.value)
  }
  return (
    <div>
      <Navbar />
      <div className='handle-date-input-btn'>
        <div className='date-picker-style'>
          <div className='date-picker-start'>
            <label className="date-picker-label">Start Date:</label>
            <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
          </div>
          <div className='date-picker-end'>
            <label className="date-picker-label">End Date:</label>
            <DatePicker selected={endDate} dateFromat='YYYY-MM-DD' onChange={(date) => setEndDate(date)} className='date-picker' />
          </div>
        </div>
        <div className="btn-search-style">
          <SelectSearchInput token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
          <button onClick={showComplimentary} className="btn-show">Show</button>
        </div>
        <div className='input-customer-name'>
          <label>Select Customer:</label>
          <div>
            <input type="text" placeholder="Customer Name" onChange={handleInputChange} value={inputChange} className="input-customer" />
          </div>
        </div>
      </div>

      <div className='handle-date-input-btn-sm'>
        <div className="btn-search-style">
          <SelectSearchInput token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
          <div className='date-picker-style'>
            <div className='date-picker-start'>
              <label className="date-picker-label">Start Date:</label>
              <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='date-picker' />
            </div>
            <div className='date-picker-end'>
              <label className="date-picker-label">End Date:</label>
              <DatePicker selected={endDate} dateFromat='YYYY-MM-DD' onChange={(date) => setEndDate(date)} className='date-picker' />
            </div>
          </div>
          <div className='input-customer-name'>
            <label>Select Customer:</label>
            <div>
              <input type="text" placeholder="Customer Name" onChange={handleInputChange} value={inputChange} className="input-customer" />
            </div>
          </div>
          <button onClick={showComplimentary} className="btn-show">Show</button>
        </div>
      </div>

      <div className='bg-history'>
        <h5>{selectedOutlet}</h5>
        <div className={show ? 'customer-complimentary-history' : 'customer-history'}>
          {showCustomerHistory &&
            <CustomerHistory customerHistory={customerHistory} discountTotal={discountTotal} totalSum={totalSum} selectedOutlet={selectedOutlet} />
          }
          {show &&
            <ComplimentaryTable complimentary={complimentary} complimentaryTotal={complimentaryTotal} />
          }
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default History