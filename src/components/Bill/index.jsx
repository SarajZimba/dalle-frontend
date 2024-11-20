import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../Navbar/NavbarHome";
import "react-datepicker/dist/react-datepicker.css";
import "../../scss/bill.scss";
import "../../scss/FoodBeverage.scss";
import "../../scss/filter.scss";
import axios from "axios";
import BillShowTable from "./Table/BillShowTable";
import ReactSidebar from "../ReactSidebar";
import Error from "../Error";
import DatePicker from "react-datepicker";
import SelectSearchInput from "../SelectSearch";
import Footer from "../Footer";

const Bill = () => {
  let url = process.env.REACT_APP_BASE_URL;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [token, setToken] = useState("");

  const [order, setOrder] = useState([]);
  const [isOrder, setIsOrder] = useState(true);
  const [food, setFood] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [beverageGroup, setBeverageGroup] = useState([]);
  const [foodGroup, setFoodGroup] = useState([]);
  const [FoodBeverageSum, setFoodBeverageSum] = useState([]);
  const [totalInfo, setTotalInfo] = useState({});
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({});
  const [dineinTabs, setDineinTabs] = useState({});
  const [splitDetails, setSplitDetails] = useState({});
  const [arrow, setArrow] = useState(false);
  const [billno, setBillno] = useState("");

  const toggleArrow = () => {
    setArrow(!arrow);
  };

  let start = startDate.toISOString().slice(0, 10);
  let end = endDate.toISOString().slice(0, 10);
  let navigate = useNavigate();

  useEffect(() => {
    let tokenCheck = localStorage.getItem("token");

    if (tokenCheck === null) {
      navigate("/");
    } else {
      setToken(localStorage.getItem("token"));
    }
    setSelectedOutlet(localStorage.getItem("outlet"));
  }, []);

  useEffect(() => {
    if (selectedOutlet) {
      axios
        .post(`${url}/saleshistory`, {
          outlet: `${selectedOutlet}`,
          dateStart: start,
          dateEnd: end,
          token: token,
        })
        .then((response) => {
          console.log(response);
          setShow(true);
          setError(false);
          setTotalInfo(response.data);
          setOrder(response.data.orderDetails);
          setFood(response.data.itemDetails.food);
          setBeverage(response.data.itemDetails.beverage);
          setFoodBeverageSum(response.data.itemDetails.itemSum);
          setBeverageGroup(response.data.itemDetails.beverageGroup);
          setFoodGroup(response.data.itemDetails.foodGroup);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });

      axios
        .post(`${url}/summaryreport`, {
          outlet: `${selectedOutlet}`,
          dateStart: start,
          dateEnd: end,
          token: token,
        })
        .then((response) => {
          // console.log(response);
          setSplitDetails(response.data.splitDetails);
          setDineinTabs(response.data);
          setPaymentStatus(response.data.paymentStats);
        })
        .catch((error) => {
          // console.log(error)
        });
    }
  }, [selectedOutlet]);

  const viewBill = () => {
    if (selectedOutlet) {
      axios
        .post(`${url}/saleshistory`, {
          outlet: `${selectedOutlet}`,
          dateStart: start,
          dateEnd: end,
          token: token,
        })
        .then((response) => {
          setIsOrder(true);
          setError(false);
          setTotalInfo(response.data);
          setOrder(response.data.orderDetails);
          setFood(response.data.itemDetails.food);
          setBeverage(response.data.itemDetails.beverage);
          setFoodBeverageSum(response.data.itemDetails.itemSum);
          setBeverageGroup(response.data.itemDetails.beverageGroup);
          setFoodGroup(response.data.itemDetails.foodGroup);
          setShow(true);
        })
        .catch((error) => {
          // console.log(error)
          setError(true);
        });

      axios
        .post(`${url}/summaryreport`, {
          outlet: `${selectedOutlet}`,
          dateStart: start,
          dateEnd: end,
          token: token,
        })
        .then((response) => {
          setSplitDetails(response.data.splitDetails);
          setDineinTabs(response.data);
          setPaymentStatus(response.data.paymentStats);
        })
        .catch((error) => {
          // console.log(error)
        });
    }
  };

  const [billNumber, setBillNumber] = useState([]);
  const [startBillNum, setStartBillNumber] = useState("");
  const [endBillNum, setEndBillNumber] = useState("");
  const billNum = [];

  useEffect(() => {
    order.forEach((item) => {
      {
        billNum.push(item.bill_no);
        setBillNumber(billNum);
        let len = billNum.length;
        setStartBillNumber(billNum[0]);
        setEndBillNumber(billNum[len - 1]);
      }
    });
  }, [order]);

  const handleBillNumber = (e) => {
    setBillno(e.target.value);
    setIsOrder(false);
  };

  useEffect(() => {
    if (billno === "") {
      axios
        .post(`${url}/saleshistory`, {
          outlet: `${selectedOutlet}`,
          dateStart: start,
          dateEnd: end,
          token: token,
        })
        .then((response) => {
          setIsOrder(true);
          setShow(true);
          setError(false);
          setTotalInfo(response.data);
          setOrder(response.data.orderDetails);
          setFood(response.data.itemDetails.food);
          setBeverage(response.data.itemDetails.beverage);
          setFoodBeverageSum(response.data.itemDetails.itemSum);
          setBeverageGroup(response.data.itemDetails.beverageGroup);
          setFoodGroup(response.data.itemDetails.foodGroup);
        })
        .catch((error) => {
          setError(true);
        });
    }
    if (billno) {
      axios
        .post(`${url}/billsearch`, {
          outlet: `${selectedOutlet}`,
          billno: `${billno}`,
          token: token,
        })
        .then((response) => {
          setIsOrder(false);
          setOrder(response.data);
        })
        .catch((error) => {
          // console.log(error)
        });
    }
  }, [billno]);

  return (
    <div>
      <NavbarHome arrow={arrow} />
      <div className="sidebar-container">
        <ReactSidebar
          dineinTabs={dineinTabs}
          paymentStatus={paymentStatus}
          splitDetails={splitDetails}
          toggleArrow={toggleArrow}
          arrow={arrow}
          startBillNum={startBillNum}
          endBillNum={endBillNum}
          FoodBeverageSum={FoodBeverageSum}
        />
        <div className={"container main-content"}>
          <div className="select-options ">
            <div className="date-picker-outlet">
              <div>
                <label className="">Start Date:</label>
                <DatePicker
                  selected={startDate}
                  dateFromat="YYYY-MM-DD"
                  onChange={(date) => setStartDate(date)}
                  className="date-picker"
                />
              </div>
              <div className="enter-bil-no">
                <div>
                  <h6>{selectedOutlet}</h6>
                  <SelectSearchInput
                    token={token}
                    setToken={setToken}
                    setSelectedOutlet={setSelectedOutlet}
                    selectedOutlet={selectedOutlet}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Search by bill no."
                    className="bill-number"
                    onChange={handleBillNumber}
                  />
                </div>
              </div>
              <div>
                <label className="">End Date:</label>
                <DatePicker
                  selected={endDate}
                  dateFromat="yyyy-mm-dd"
                  onChange={(date) => setEndDate(date)}
                  className="date-picker"
                />
              </div>
              <div className="btn-search-view">
                <button onClick={viewBill} className="btn-search">
                  View
                </button>
              </div>
            </div>
            {/* <FilterLg startDate={startDate} token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} setStartDate={setStartDate} setEndDate={setEndDate} viewBill={viewBill} handleBillNumber={handleBillNumber}/> */}
            <div className="date-picker-outlet-sm">
              <div>
                <h6>{selectedOutlet}</h6>
                <SelectSearchInput
                  token={token}
                  setToken={setToken}
                  setSelectedOutlet={setSelectedOutlet}
                  selectedOutlet={selectedOutlet}
                />
              </div>

              <div className="start-date">
                <label className="">Start Date:</label>
                <DatePicker
                  selected={startDate}
                  dateFromat="YYYY-MM-DD"
                  onChange={(date) => setStartDate(date)}
                  className="date-picker"
                />
              </div>
              <div className="end-date">
                <label className="">End Date:</label>
                <DatePicker
                  selected={endDate}
                  dateFromat="yyyy-mm-dd"
                  onChange={(date) => setEndDate(date)}
                  className="date-picker"
                />
              </div>
              <div>
                <label>Bill No:</label>
                <div>
                  <input
                    type="number"
                    placeholder="Search by bill no."
                    className="bill-number"
                    onChange={handleBillNumber}
                  />
                </div>
              </div>
              <div className="btn-search-view">
                <button onClick={viewBill} className="btn-search">
                  View
                </button>
              </div>
            </div>
          </div>

          {show && (
            <BillShowTable
              order={order}
              isOrder={isOrder}
              totalInfo={totalInfo}
              selected={selectedOutlet}
              token={token}
              food={food}
              foodGroup={foodGroup}
              beverage={beverage}
              beverageGroup={beverageGroup}
            />
          )}
          {error && <Error />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bill;
