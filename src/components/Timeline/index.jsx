import React, { useState, useEffect } from 'react'
import Navbar from './../Navbar/index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Filter from '../Filter';
import TotalSale from './TotalSale';
import TimeStats from './TimeStats';
import TimeSales from './TimeSales';
import TimelineTable from './TimelineTableSummary';
import Footer from "../Footer";
import "../../scss/timeline.scss";

const Timeline = () => {
    let url = process.env.REACT_APP_BASE_URL;
    const [token, setToken] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [totalSaleSummary, setTotalSaleSummary] = useState({});
    const [timeStats, setTimeStats] = useState({});
    const [elevenThree, setelevenThree] = useState({});
    const [sixTen, setsixTen] = useState({});
    const [threeSix, setThreeSix] = useState({});
    const [tableSumamry, setTableSumamry] = useState([]);
    const [showTimeline, setShowTimeline] = useState(false);


    let start = startDate.toISOString().slice(0, 10)
    let end = endDate.toISOString().slice(0, 10)

    let navigate = useNavigate();

    useEffect(() => {
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    const viewTimeline = () => {
        axios.post(`${url}/orderhistory`, {
            outlet: `${selectedOutlet}`,
            dateStart: start,
            dateEnd: end,
            token: `${token}`
        })
            .then((response) => {
                console.log(response.data.Time_sales.six_ten)
                console.log(response.data)
                setShowTimeline(true)
                console.log(response.data.Timestats)
                setTimeStats(response.data.Timestats)
                setTotalSaleSummary(response.data.TotalSalesSummary)
                setelevenThree(response.data.Time_sales.eleven_three)
                setsixTen(response.data.Time_sales.six_ten)
                setThreeSix(response.data.Time_sales.three_six)
                setTableSumamry(response.data.table_summary)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
            <Navbar />
            <div className='filter-timeline'>
                <Filter startDate={startDate} setStartDate={setStartDate} selectedOutlet={selectedOutlet} setSelectedOutlet={setSelectedOutlet} endDate={endDate} setEndDate={setEndDate} view={viewTimeline} btn={"Timeline"} />
            </div>
            <div className='bg-timeline'>
            {showTimeline &&
                <div className='timeline'>
                    <div className='left-timeline'>
                        <h4>{selectedOutlet}</h4 >
                        <div className='hl-line'></div>
                        <div className='md-flex'>
                            <TotalSale totalSaleSummary={totalSaleSummary} />
                            <div className='hl-line'></div>
                            <TimeStats timeStats={timeStats} />
                        </div>
                        <div className='hl-line'></div>
                        <TimeSales elevenThree={elevenThree} sixTen={sixTen} threeSix={threeSix} />
                    </div>
                    <div className='right-timeline-table'>
                        <TimelineTable tableSumamry={tableSumamry} />
                    </div>
                </div>
            }
            </div>
            <Footer/>
        </div>
    )
}

export default Timeline