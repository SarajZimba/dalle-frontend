import React, { useState } from 'react'
import BillDetail from '../Modal/BillDetail';
import DateFormat from './DateFormat';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerHistory = ({ customerHistory, discountTotal, totalSum, selectedOutlet }) => {
    let url = process.env.REACT_APP_BASE_URL;
    let navigate = useNavigate();
    const [token, setToken] = useState("");
    const [billInfo, setBillInfo] = useState({});
    const [billInfoList, setBillInfoList] = useState([])

    useEffect(() => {
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    const handleBillInfo = (bill, date) => {
        const convertDate = new Date(date).toISOString().substring(0, 10);
        axios.post(`${url}/billinfo`, {
            bill_no: `${bill}`,
            Date: `${convertDate}`,
            Outlet_Name: `${selectedOutlet}`,
            token: `${token}`
        })
            .then((response) => {
                if (response?.data) {
                    // console.log(response?.data)
                    setBillInfoList(response.data.details)
                    setBillInfo(response.data)
                }
            })
            .catch((error) => {
                // console.log(error)
            })
    }
    return (
        <div className="table-customer-history">
                <h6 className=''>Customer History</h6>
            <div className="table-history-responsive">
                <table className="table-customer">
                    <thead>
                        <tr className='position-sticky'>
                            <th>Bill</th>
                            <th>Customer</th>
                            <th className='handle-date'>Date</th>
                            <th>Discount Amount</th>
                            <th>Discount Type</th>
                            <th>Mode</th>
                            <th>Outlet</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    {customerHistory.map((item) => (
                        <tr>
                            <td ><button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleBillInfo(item.Bill, item.Date)}>{item.Bill}</button></td>
                            <td>{item.Customer}</td>
                            <td className='handle-date'>
                                <DateFormat date={item.Date} /></td>
                            <td>{item.DiscountAmt}</td>
                            <td>{item.DiscountType}</td>
                            <td>{item.Mode}</td>
                            <td>{item.Outlet}</td>
                            <td>{item.Total}</td>
                        </tr>
                    ))
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Discount: <span>{discountTotal}</span> </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total: {totalSum}</td>
                    </tr>
                </table>
            </div>
            <BillDetail billInfo={billInfo} billInfoList={billInfoList} selectedOutlet={selectedOutlet} />
        </div>
    )
}

export default CustomerHistory