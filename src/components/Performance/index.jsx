import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import axios from 'axios';
import Navbar from '../Navbar';
import LineChart from './../Charts/Stats/LineChart';
import "../../scss/performance.scss";
import "../../scss/button.scss";
import SelectSearchInput from '../SelectSearch';
import Footer from "../Footer";

const Performance = () => {
    let url = process.env.REACT_APP_BASE_URL;
    let navigate = useNavigate();

    const [token, setToken] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [listYear, setListYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [dailyTotal, setDailyTotal] = useState([])
    const [dailyLabel, setDailyLabel] = useState([])
    const [monthlyLabel, setMonthlyLabel] = useState([])
    const [monthlyTotal, setMonthlyTotal] = useState([])
    const [chartShow, setshowChart] = useState(false)

    // let monthTotal= useRef(monthlyLabel)
    // console.log("Month Total",monthTotal)
    // console.log("Month Total Current",monthTotal.current)

    useEffect(() => {
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    useEffect(() => {
        if (selectedOutlet) {
            axios.post(`${url}/years`, {
                outlet: `${selectedOutlet}`,
                token: token
            })
                .then((response) => {
                    setListYear(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [selectedOutlet])

    const showChart = () => {
        setshowChart(true)
        if (selectedOutlet) {
            axios.post(`${url}/chartsummary`, {
                outlet: `${selectedOutlet}`,
                date: `${selectedYear}`,
                type: "yearly",
                token: `${token}`
            })
                .then((res) => {
                    if (res?.data) {
                        setDailyLabel(res.data?.dailylabel)
                        setDailyTotal(res.data?.dailytotal)
                        setMonthlyLabel(res.data?.monthlylabel)
                        setMonthlyTotal(res.data?.monthlytotal)
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
            <div className='search-select-year-outlet'>
                <div className='select-outlet-year'>
                    <SelectSearchInput token={token} setToken={setToken} selectedOutlet={selectedOutlet} setSelectedOutlet={setSelectedOutlet} />
                </div>
                <div className='select-outlet-year'>
                    <SelectSearch
                        defaultValue={selectedYear}
                        search
                        placeholder="Select Year"
                        onChange={(event) => setSelectedYear(event)}
                        options={listYear}
                    />
                </div>
                <div className='btn-search-view '>
                    <button onClick={showChart} className="btn-search">Show Chart</button>
                </div>
            </div>
            <div className='performance-chart'>
                {chartShow && monthlyLabel && monthlyTotal && monthlyLabel.length > 0 && monthlyTotal.length > 0 &&
                    <div className='performance-chart-stats'>
                        <LineChart labels={monthlyLabel} Total={monthlyTotal} labelTitle={"Month"} Title={"Monthly Performance"} />
                    </div>
                }
                {chartShow && dailyTotal && dailyLabel && dailyTotal.length > 0 && dailyLabel.length > 0 &&
                    <div className='performance-chart-stats'>
                        <LineChart Total={dailyTotal} labels={dailyLabel} labelTitle={"WeekDay"} Title={"Yearly Weekday Performance"} />
                    </div>
                }

            </div>
            <Footer/>
        </div>
    )
}

export default Performance