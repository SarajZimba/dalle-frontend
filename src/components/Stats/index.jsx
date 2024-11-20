import React, { useState } from 'react'
import Navbar from '../Navbar'
import axios from "axios";
import subDays from 'date-fns/subDays';
import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';
import "../../scss/stats.scss";
import LineChart from '../Charts/Stats/LineChart';
import SelectSearchInput from './../SelectSearch/index';
import HandleRange from './HandleRange';
import Footer from "../Footer";

const Stats = () => {
    let url = process.env.REACT_APP_BASE_URL;
    const ranges = [
        {
            label: 'today',
            value: [new Date(), new Date()]
        },
        {
            label: 'yesterday',
            value: [subDays(new Date(), 1), subDays(new Date(), 1)]
        }
    ];
    const [handleRange, setHandleRange] = useState(false)
    const [selectDate, setSelectDate] = useState(false)
    const [choseOutlet, setOutlet] = useState(false)
    const [token, setToken] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [Total, setTotal] = useState([]);
    const [labels, setLabels] = useState([]);
    const [rangeType, setRangeType] = useState("")
    const [startDate, setstartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const handleMonthly = () => {
        setRangeType("monthly")
        setHandleRange(true)
        setOutlet(true)
    }
    const handleWeekly = () => {
        setHandleRange(true)
        setRangeType("weekly")
        setOutlet(true)
    }
    const handleFreely = () => {
        setHandleRange(true)
        setRangeType("Free range")
        setOutlet(true)
    }

    const handleDate = (e) => {
        setSelectDate(true)
        let newStartdate = new Date(e[0])
        let newEnddate = new Date(e[1])
        let start = newStartdate.toISOString().slice(0, 10)
        setstartDate(start)
        let end = newEnddate.toISOString().slice(0, 10)
        setEndDate(end)
        if (rangeType === "Free range") {
            axios.post(`${url}/datestats`, {
                Outlet_Name: `${selectedOutlet}`,
                start_date: `${start}`,
                end_date: `${end}`,
                token: `${token}`
            })
                .then((response) => {
                    console.log(response.data)
                    setTotal(response.data.total)
                    setLabels(response.data.labels)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        if (rangeType && rangeType === "weekly") {
            axios.post(`${url}/chartsummary`, {
                outlet: `${selectedOutlet}`,
                start_date: `${start}`,
                end_date: `${end}`,
                type: `${rangeType}`,
                token: `${token}`
            })
                .then((response) => {
                    if (response?.data) {
                        setTotal(response.data.weeklyTotal)
                        setLabels(response.data.weeklabel)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        // console.log(rangeType)
        if (rangeType && rangeType === "monthly") {
            // console.log("here monthly")
            axios.post(`${url}/chartsummary`, {
                outlet: `${selectedOutlet}`,
                start_date: `${start}`,
                end_date: `${end}`,
                type: `${rangeType}`,
                token: `${token}`
            })
                .then((response) => {
                    if (response?.data) {
                        setTotal(response.data.monthlyTotal)
                        setLabels(response.data.monthlabel)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <div>
            <Navbar />
            <div className='stats-chart-width'>
                <div className='filter-margin'>
                    <div className="select-search-radio">
                        <HandleRange handleMonthly={handleMonthly} handleWeekly={handleWeekly} handleFreely={handleFreely} />
                        <SelectSearchInput setOutlet={setOutlet} token={token} setToken={setToken} setSelectedOutlet={setSelectedOutlet} selectedOutlet={selectedOutlet} />
                        <DateRangePicker onOk={(e) => handleDate(e)} className="date-range-picker-margin" />
                    </div>
                    <div className='selected-options'>
                        <p className='filtered'>Filtered</p>
                        {handleRange &&
                            <div className='range-type'>
                                <p>{rangeType}</p>
                            </div>
                        }
                        {choseOutlet &&
                            <div className='selected-outlet-type'>
                                <p>{selectedOutlet}</p>
                            </div>
                        }
                        {selectDate &&
                            <div className='start-end-date'>
                                <div className='range-type'>
                                    <p>{startDate}</p>
                                </div>
                                <div className='range-type'>
                                    <p>{endDate}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='bg-stats'>
                    {Total && Total.length > 0 && labels && labels.length > 0 &&
                        <div className='stats-chart'>
                            <div className='line-chart-stats'>
                                <LineChart labels={labels} Total={Total} labelTitle={rangeType} Title={"Stats"} />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Stats