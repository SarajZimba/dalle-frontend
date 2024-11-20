import React, { useState, useEffect } from 'react'
import "../../scss/table.scss";
import "react-datepicker/dist/react-datepicker.css";
import { IoFastFoodOutline, IoFastFood, IoPeopleOutline } from "react-icons/io5";
import { TbNumbers } from "react-icons/tb";
import { FcClock } from "react-icons/fc";
import axios from 'axios';
import ControlDate from './ControlDate';
import moment from 'moment';
import PaginationTest from './paginationTest';

const Report = () => {
    const [outletName, setOutletName] = useState("")
    const [information, setInformation] = useState({});
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(true);
    const [totalCount, setTotalCount] = useState("");
    const [firstDate, setFirstDate] = useState("")
    const [secondDate, setSecondDate] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(2);

    let url = process.env.REACT_APP_BASE_URL;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const Orders = orders.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(orders.length / recordsPerPage)

    useEffect(() => {
        let initialDate = startDate
        let date = moment(initialDate).format();
        let firstDate = date.toString().substring(0, 10)
        setFirstDate(firstDate)

        let lastDate = endDate
        let dates = moment(lastDate).format();
        let secondDate = dates.toString().substring(0, 10)
        setSecondDate(secondDate);

    }, [startDate, endDate])

    useEffect(() => {
        let totalCount = 0;
        orders.map((element) => (
            element.items.map((item) => {
                totalCount = totalCount + 1;
            })
        ))
        setTotalCount(totalCount)
    }, [orders])

    const handleGenerateReport = () => {
        axios.post(`${url}/report`, {
            "start_date": firstDate,
            "end_date": secondDate,
            "outlet_name": outletName
        })
            .then((response) => {
                setInformation(response.data)
                setMaxPageLength(response.data.maxPage_Length)
                setOrders(response.data.orders)
                setError(false)
            })
            .catch((error) => {
                setError(true)
            })
    }
    const handleChange = (event) => {
        setOutletName(event.target.value)
    }


    return (
        <div className='container'>
            <ControlDate setStartDate={setStartDate} startDate={startDate} endDate={endDate} setEndDate={setEndDate} handleChange={handleChange} handleGenerateReport={handleGenerateReport} />
            {error ? " Error" :
                <div className='report'>
                    <div className='show-outlet-name'>
                        <h4>{outletName}</h4>
                    </div>
                    <div className='dashboard'>
                        <div className="row">
                            <div className="col dashboard-items">
                                <TbNumbers className='icon' />
                                <div className='padding-dashboard-items'>
                                    <label>Total no.of items:</label>
                                    <p>{totalCount}</p>
                                </div>
                            </div>
                            <div className="col dashboard-items">
                                <IoFastFoodOutline className='icon' />
                                <div className='padding-dashboard-items'>
                                    <label>First Order At:</label>
                                    <p>{information.first_orderAt}</p>
                                </div>
                            </div>
                            <div className="col dashboard-items">
                                <IoFastFood className='icon' />
                                <div className='padding-dashboard-items'>
                                    <label>Last Order At:</label>
                                    <p>{information.last_orderAt}</p>
                                </div>
                            </div>
                            <div className="col dashboard-items">
                                <IoPeopleOutline className='icon' />
                                <div className='padding-dashboard-items'>
                                    <label>Total guest:</label>
                                    <p>{information.Guest_count}</p>
                                </div>
                            </div>
                            <div className="col dashboard-items">
                                <FcClock className='icon' />
                                <div className='padding-dashboard-items'>
                                    <label>Operating Hours:</label>
                                    <p>{information.Operating_hours}</p>
                                </div>
                            </div>
                        </div>

                        {Orders.map((element, index) => (
                            <div key={index} className="information">
                                <div className='show-table-num'>
                                    <p>Table <span>{element.TableNum}</span></p>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Quantity</th>
                                            <th>Item Name</th>
                                            <th>Ordered At</th>
                                            <th>Completed At</th>
                                            <th>Total Time</th>
                                            <th>Average Prepared Time</th>
                                            <th>Prepared Time Difference</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {element.items.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.Quantity}</td>
                                                <td>{item.ItemName}</td>
                                                <td>{item.orderedAt}</td>
                                                <td>{item.completedAt}</td>
                                                <td>{item.TotalTime}</td>
                                                <td>{item.AvgPrepTime}</td>
                                                <td>{item.prepTimeDifference}</td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                    <div className='information-report'>
                        <div className='report-flex'>
                            <div className='report-info-two'>
                                <div className='report-info'>
                                    <label>Dine In:</label>
                                    <span>{information.DineIn_totalSales}</span>
                                </div>
                                <div className='report-info'>
                                    <label>Takeaway:</label>
                                    <span>{information.TakeAway_totalSales}</span>
                                </div>
                                <div className='report-info'>
                                    <label>Voids:</label>
                                    <span>{information.Voids}</span>
                                </div>
                                <div className='report-info'>
                                    <label>Cooked:</label>
                                    <span>{information.Cooked}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
            <PaginationTest
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default Report