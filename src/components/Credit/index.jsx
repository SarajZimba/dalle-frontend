import React, { useState, useEffect } from 'react'
import Navbar from './../Navbar/index';
import SelectSearchInput from "../SelectSearch";
import axios from 'axios';
import SelectSearch from 'react-select-search';
import CreditTables from './creditTable';
import CreditInfo from './creditInfo';
import PaymentModal from './../Modal/paymentModal';
import Footer from "../Footer";
import SameCustomerList from './SameCustomerList';
import LeftCredit from './LeftCredit';
import "./../../scss/Credit/credit.scss";

const Credit = () => {
  let url = process.env.REACT_APP_BASE_URL;

  const [token, setToken] = useState("")
  const [selectedOutlet, setSelectedOutlet] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [creditDetails, setCreditDetails] = useState({})
  const [listCustomer, setListCustomer] = useState([]);
  const [creditWiseBillList, setCreditWiseBillList] = useState([]);
  const [creditWisePaymentList, setCreditWisePaymentList] = useState([]);
  const [isClicked, setIsClicked] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isEyeClicked, setisEyeClicked] = useState(false)
  const [isCreditLeft, setisCreditLeft] = useState(false)
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [uniqueID, setUniqueGuestID] = useState("")
  // const [orderID, setOrderID] = useState("")
  const [rangeType, setRangeType] = useState("")
  const [similarCustomer, setSimilarCustomer] = useState([]);
  const [creditLeft, setCreditLeft] = useState([]);

  // console.log("similarCustomer", similarCustomer)
  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (selectedOutlet) {
      axios.post(`${url}/customerCredit`, {
        outlet: `${selectedOutlet}`,
        token: token
      })
        .then((response) => {
          setListCustomer(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      setIsDisabled(false)
    }

  }, [token, selectedOutlet])

  useEffect(() => {
    if (selectedOutlet && selectedCustomer) {
      axios.post(`${url}/customerCreditData`, {
        token: token,
        outlet: `${selectedOutlet}`,
        customerName: `${selectedCustomer}`
      })
        .then((response) => {
          // console.log("here 123", response.data)
          setSimilarCustomer(response.data)
        })
        .catch((error) => {
          console.log("error", error.response.data.error)
        })
    }

    if (uniqueID) {
      axios.post(`${url}/customerCreditDetails`, {
        token: token,
        outlet: `${selectedOutlet}`,
        CustomerName: `${selectedCustomer}`,
        guestID: `${uniqueID}`
      })
        .then((response) => {
          // console.log("ok", response.data)
          setCreditDetails(response.data.CreditDetails)
          setCreditWiseBillList(response.data.CreditWiseBillList)
          setCreditWisePaymentList(response.data.CreditWisePaymentList)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [selectedOutlet, selectedCustomer, uniqueID])

  //Case: When there is only one customer with that particular name
  useEffect(() => {
    if (similarCustomer.length === 1) {
      setisEyeClicked(true)
      var oneID = similarCustomer[0].guestID
      // console.log(oneID, "one id")
      setUniqueGuestID(oneID);

      axios.post(`${url}/customerCreditDetails`, {
        token: token,
        outlet: `${selectedOutlet}`,
        CustomerName: `${selectedCustomer}`,
        guestID: `${oneID}`
      })
        .then((response) => {
          // console.log("ok", response.data)
          setCreditDetails(response.data.CreditDetails)
          setCreditWiseBillList(response.data.CreditWiseBillList)
          setCreditWisePaymentList(response.data.CreditWisePaymentList)

        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [similarCustomer])

  const handleView = () => {
    setIsClicked(!isClicked)
  }
  const handleShow = () => {
    setIsShown(!isShown)
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const customerDetail = ["ID", "Name", "Email", "Address", "Phone"]

  const handleDetails = (id) => {
    // console.log("clicked eye icon", id)
    setisEyeClicked(true)
    setUniqueGuestID(id)
    // setOrderID(orderId)
  }

  const handleShowLeftCredit = () => {
    setisCreditLeft(!isCreditLeft);

  }

  const handleRangeType = (event) => {
    setRangeType(event.target.value)
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  let starting = startDate.toISOString().slice(0, 10);
  let ending = endDate.toISOString().slice(0, 10);

  useEffect(() => {
    if (rangeType === "All") {
      axios.post(`${url}/customerCreditleft`, {
        token: `${token}`,
        outlet: `${selectedOutlet}`,
        type: `${rangeType}`,
      })
        .then((response) => {
          // console.log("customerCreditleft", response.data)
          setCreditLeft(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    if (rangeType === "Ranged") {
      setShowDatepicker(true)
    }
    if (rangeType && starting && ending) {
      axios.post(`${url}/customerCreditleft`, {
        token: `${token}`,
        outlet: `${selectedOutlet}`,
        type: `${rangeType}`,
        dateStart: `${starting}`,
        dateEnd: `${ending}`
      })
        .then((response) => {
          // console.log("customerCreditleft", response.data)
          setCreditLeft(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [rangeType, starting, ending])

  // console.log("rangeType", rangeType)
  return (
    <section>
      <Navbar />
      <div className='bg-credit'>
        <div className='handle-select-search-input'>
          <div className='handle-width'>
            <SelectSearchInput token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
            <SelectSearch
              defaultValue={selectedCustomer}
              search
              placeholder={"Select Customer Name"}
              onChange={(event) => setSelectedCustomer(event)}
              options={listCustomer}
              disabled={isDisabled}
            />
          </div>
        </div>
        <div className='same-customer-list'>
          <SameCustomerList header={customerDetail} handleDetails={handleDetails} similarCustomer={similarCustomer} />
        </div>

        {isEyeClicked &&
          <div>
            <CreditInfo creditDetails={creditDetails} handleView={handleView} isShown={isShown} handleShow={handleShow} isClicked={isClicked} />
            <div className='btn-make-payment' >
              <button className='make-payment' onClick={handleShowModal}>Make Payment</button>
            </div>
            <CreditTables isShown={isShown} isClicked={isClicked} creditWiseBillList={creditWiseBillList} creditWisePaymentList={creditWisePaymentList} />
          </div>
        }
        <div className='btn-left-credit'>
          <button className='left-credit' onClick={handleShowLeftCredit}>View Credit Remaining</button>
        </div>
        {isCreditLeft &&
          <LeftCredit handleRangeType={handleRangeType} creditLeft={creditLeft} showDatepicker={showDatepicker} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
        }
        <PaymentModal show={show}
          handleClose={handleClose}
          token={token}
          selectedOutlet={selectedOutlet}
          selectedCustomer={selectedCustomer}
          uniqueID={uniqueID}
          //  orderID={orderID} 
          setCreditLeft={setCreditLeft}
          setCreditDetails={setCreditDetails}
          setCreditWiseBillList={setCreditWiseBillList}
          setCreditWisePaymentList={setCreditWisePaymentList}
        />
      </div>
      <Footer />
    </section>
  )
}

export default Credit