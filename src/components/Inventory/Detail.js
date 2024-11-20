import React, { useState, useEffect } from "react";
import axios from "axios";
import Detailtable from "../Table/detailTable"

const Detail = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [list, setList] = useState([]);
  const [id, setID] = useState('');
  const [date, setDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [outletName, setOutletName] = useState("");
  const [state, setState] = useState("");
  const [billNum, setBillNum] = useState("");
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [total, setTotal] = useState("");

  let length = list.length;

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setDate(localStorage.getItem("date"));
    setCompanyName(localStorage.getItem("company name"));
    setOutletName(localStorage.getItem("outlet name"));
    setState(localStorage.getItem("state"));
    setBillNum(localStorage.getItem("bill num"));
    setDiscount(localStorage.getItem("discount"));
    setTax(localStorage.getItem("tax"));
    setTotal(localStorage.getItem("total"));
  }, []);


  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}/reqdetails/${id}`)
  //     .then((response) => {
  //       setList(response.data.intbl_purchaserequisition_contract)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [id]);

   useEffect(()=>{
    if(id){
      getItemDetail(id)
    }
   },[id])

   const getItemDetail=async(id)=>{
    try {
      const result=await axios.get(`${baseUrl}/reqdetails/${id}`)
      setList(result.data.intbl_purchaserequisition_contract)
    } 
    catch (error) {
      console.log(error)
    }
   }
  return (
    <div className="border-solid p-4 h-screen flex flex-col  items-center">
      <h1 className="font-medium text-lg md:text-xl font-poppins m-3">
        {outletName}
      </h1>
      <div className="w-full h-16">
        <div className=" flex flex-col md:flex-row md:justify-between border-2 border-black-500">
          <div className="m-1 md:m-3">
            <p className="font-small md:font-medium lg:text-lg text-xs">
              Company Name:
              <span className="font-small md:font-medium px-2">{companyName}</span>
            </p>
            <p className="font-small md:font-medium lg:text-lg text-xs">
              Date:<span className="font-small md:font-medium px-2">{date}</span>
            </p>
          </div>
          <div className="m-1 md:m-3">
            <p className="font-small md:font-medium lg:text-lg text-xs">
              Purchase Bill No:
              <span className="font-small md:font-medium px-2">{billNum}</span>
            </p>
            <p className="font-small md:font-medium lg:text-lg text-xs">
              State:
              <span className="text-green-500 md:font-medium font-small px-2">{state}</span>
            </p>
          </div>
        </div>
      </div>

      <Detailtable list={list} outletName={outletName}/>

      <div className="flex justify-between items-center w-full">
        <div className="text-lg font-bold">
          <p>Count:<span className="px-2">{length}</span></p>
        </div>
        <div className="flex flex-col justify-end items-end text-right">
          <div className="mr-1 md:mr-80 md:pr-8">
            <p className="font-small md:font-medium lg:text-lg md:text-base text-xs">
              Discount: <span className="text-green-500 md:font-medium font-small px-2">{discount}</span>
            </p>
            <p className="font-small md:font-medium lg:text-lg md:text-base text-xs">
              Tax Amount: <span className="text-green-500 md:font-medium font-small px-2">{tax}</span>
            </p>
            <p className="font-small md:font-medium lg:text-lg md:text-base text-xs">
              Total: <span className="text-green-500 md:font-medium font-small px-2">{total}</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Detail;
