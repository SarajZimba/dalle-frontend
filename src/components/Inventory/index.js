import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, generatePath, useSearchParams } from "react-router-dom";
import Hometable from "../Table/homeTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CollapsableButton from "./collapsableButton";
import Navbar from "../Navbar";
import SelectSearchInput from "./../SelectSearch/index";
import Footer from "../Footer";

// import { useDispatch, useSelector } from "react-redux";
// import { callApi } from "../actions";
// import SelectSearchInput from './../SelectSearch/index';

export const storeContext = createContext();

const Url = process.env.REACT_APP_BASE_URL;

const Front = () => {
  // const state = useSelector(state => state.Home)
  // let dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [outletSelected, setOutletSelected] = useState("");

  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dateToday, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  // const locationHash = location.hash;
  // var str = locationHash.substring(1);
  // let outlet = decodeURI(str)

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    getHome(dateToday, outletSelected);
  }, [dateToday])

  // const showHome = () => {
  //   dispatch(
  //     callApi()
  //   )
  // }
  let start = startDate.toISOString().slice(0, 10)
  let end = endDate.toISOString().slice(0, 10)

  // useEffect(() => {
  //   localStorage.setItem('outlet-name', locationHash)
  // }, [start, end])

  let navigate = useNavigate();
  let path = '/detail/:start/:end'

  const goDetail = () => {
    const pathName = generatePath(path, { start, end });
    navigate(pathName)
  }

  const handleDate = async () => {
    try {
      if (searchOutletName) {
        const result = await axios.get(`${Url}/reqfilterfirst/?secondtime=${end}&firsttime=${start}&outlet_name=${searchOutletName}`)
        setData(result.data.purchaserequisition)
        setSearchParams({ firsttime: start, secondtime: end, outletName: searchOutletName })
      }
      else {
        const result = await axios.get(`${Url}/reqfilterfirst/?secondtime=${end}&firsttime=${start}&outlet_name=${outletSelected}`)
        setData(result.data.purchaserequisition)
        setSearchParams({ firsttime: start, secondtime: end, outletName: outletSelected })
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleReset = () => {
    setSearchParams({})
  }

  let searchFirstDate = searchParams.get('firsttime')
  let searchSecondDate = searchParams.get('secondtime')
  let searchOutletName = searchParams.get('outletName')

  const getHome = async (dateToday, outletSelected) => {
    try {
      if (location.search !== '') {
        const result = await axios.get(`${Url}/reqfilterfirst/?secondtime=${searchSecondDate}&firsttime=${searchFirstDate}&outlet_name=${searchOutletName}`)
        setData(result.data.purchaserequisition)
      }
      else {
        const result = await axios.get(`${Url}/reqfilterfirst/?secondtime=${dateToday}&firsttime=${dateToday}&outlet_name=${outletSelected}`)
        setData(result.data.purchaserequisition);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const viewReport = async () => {
    try {
      // if(searchOutletName){
      //   const response = await axios.get(`${Url}api/reqfilter/?time=${searchFirstDate}&time2=${searchSecondDate}&company_name=${inputValue}`)
      //   console.log(response.data.purchaserequisition, "searchOutletName")
      //   setData(response.data.purchaserequisition);
      // }
      const response = await axios.get(`${Url}/reqfilter/?time=${start}&time2=${end}&company_name=${inputValue}`)
      setData(response.data.purchaserequisition);
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleChange = (element) => {
    const {
      IDIntbl_PurchaseRequisition,
      Date,
      Company_Name,
      Outlet_Name,
      State,
      purchaseBillNumber,
      DiscountAmount,
      TaxAmount,
      TotalAmount,
    } = element;
    localStorage.setItem("ID", IDIntbl_PurchaseRequisition);
    localStorage.setItem("date", Date);
    localStorage.setItem("company name", Company_Name);
    localStorage.setItem("outlet name", Outlet_Name);
    localStorage.setItem("state", State);
    localStorage.setItem("bill num", purchaseBillNumber);
    localStorage.setItem("discount", DiscountAmount);
    localStorage.setItem("tax", TaxAmount);
    localStorage.setItem("total", TotalAmount);
    navigate('/detail');
  };

  let length = data.length;

  function sumArray(array) {
    let sum = 0;
    array.forEach((item) => {
      sum += parseInt(item.TaxAmount);
    });
    return sum;
  }

  function sumTotalAmount(array) {
    let sumTotal = 0;
    array.forEach((item) => {
      sumTotal += parseInt(item.TotalAmount);
    });
    return sumTotal;
  }
  let totalTax = sumArray(data);
  let total = sumTotalAmount(data);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const changeOutlet = (e)=>{
    setOutletSelected(encodeURIComponent(e));
    getHome(dateToday,encodeURIComponent(e));
  }
  return (
    <div>
      <Navbar />
      <div className="h-screen flex flex-col p-4">
        {(decodeURIComponent(searchOutletName)) ?
          <h1 className="text-lg text-center font-medium font-poppins md:text-xl">
            {(decodeURIComponent(searchOutletName||""))||""}
          </h1>
          :
          <h1 className="text-lg text-center font-medium font-poppins md:text-xl">
            {decodeURIComponent(outletSelected||"")||""}
          </h1>
        }
        <div className="text-center">
          <SelectSearchInput token={token} setToken={setToken} selectedOutlet={outletSelected} setSelectedOutlet={changeOutlet} />
        </div>

        <CollapsableButton DatePicker={DatePicker} dateToday={dateToday} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} handleDate={handleDate} inputValue={inputValue} handleInputChange={handleInputChange} viewReport={viewReport} />
        <div className="hidden md:flex border-2 border-slate-500 w-full justify-between my-4 mx-2 ">
          <div className="flex items-center md:flex-row">
            <div className='w-full flex flex-between flex-col m-2'>
              <label className="font-medium font-poppins md:text-base text-center">Date Selection</label>
              <div className="flex w-full">
                <div>
                  <label className="font-base font-poppins md:text-base">From:</label>
                  <DatePicker selected={startDate} dateFromat='YYYY-MM-DD' onChange={(date) => setStartDate(date)} className='w-16 md:w-24 text-xs md:text-base cursor-pointer' />
                </div>
                <div>
                  <label className="font-base font-poppins md:text-base">To:</label>
                  <DatePicker selected={endDate} dateFromat='yyyy-mm-dd' onChange={(date) => setEndDate(date)} className='w-16 md:w-24 text-xs md:text-base cursor-pointer' />
                </div>
              </div>
            </div>
            <div>
              <div className="my-4">
                <button onClick={handleDate} className="w-12 h-7 text-xs border-2 border-slate-300 hover:bg-slate-100 bg-slate-700 text-zinc-100 hover:text-zinc-700 rounded-lg md:h-7 md:w-14 md:text-xs">Search</button>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <h4 className="font-medium font-poppins md:text-base text-center">Purchase Entry:</h4>
            <div className="flex">
              <p className="p-2">From: <span>{dateToday}</span></p>
              <p className="p-2">To: <span>{dateToday}</span></p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="md:my-2">
              <label className="px-2 font-medium font-poppins md:text-base text-center">Search:</label>
              <input
                type="text"
                className="border-2 border-slate-400 rounded-lg h-5 md:h-8 text-xs md:text-base placeholder:text-center placeholder:italic"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Vendor"
              />
            </div>
            <div className="px-2">
              <button onClick={viewReport} className="w-20 h-7 text-xs border-2 border-slate-300 hover:bg-slate-100 bg-slate-700 text-zinc-100 hover:text-zinc-700 rounded-lg  md:h-9">View Reports</button>
            </div>
          </div>
        </div>
        <Hometable handleChange={handleChange} data={data} props={outletSelected} />
        <div className="w-full h-18 my-2">
          <div className="flex w-48 md:w-1/2 justify-between">
            <p className="font-medium font-poppins text-lg px-3">
              Count: <span className="text-base">{length}</span>
            </p>
            <div className="flex-row flex md:-mr-30">
              <p className="font-medium text-lg px-3">
                Total Tax:
                <span className="px-2 text-base">{totalTax}</span>
              </p>
              <p className="font-medium text-lg px-3">
                Total: <span className="px-2 text-base">{total}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Front;
