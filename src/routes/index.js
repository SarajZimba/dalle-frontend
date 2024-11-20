import { useState, useMemo, useEffect } from "react";
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';
import Report from '../components/Report';
import Bill from '../components/Bill';
import History from '../components/History';
import { UserContext } from '../components/Context';
import Stats from "../components/Stats";
import Timeline from './../components/Timeline/index';
import Performance from './../components/Performance/index';
import Front from "../components/Inventory";
import CombineChart from './../components/Charts/combineChart';
import Detail from "../components/Inventory/Detail";
import Credit from './../components/Credit/index';

const MainRoutes = () => {
    const [userName, setUserName] = useState("");
    const value = useMemo(() => ({ userName, setUserName }), [userName]);

    useEffect(() => {
        if (userName.length > 0) {
        }
    }, [userName]);
    return (
        <UserContext.Provider value={value}>

            <Routes>
                {/* <Route path='/' element={<App />} /> */}
                <Route path='/home' element={<Home />} />
                <Route path='/report' element={<Report />} />
                <Route path='/bill' element={<Bill />} />
                <Route path='/history' element={<History />} />
                <Route path='/stats' element={<Stats />} />
                <Route path='/timeline' element={<Timeline />} />
                <Route path='/performance' element={<Performance />} />
                <Route path='/credit' element={<Credit/>} />
                <Route path='/inventory' element={<Front/>} />
                <Route path="/detail" element={<Detail/>} />
                <Route path="/show-all-chart" element={<CombineChart/>} />
            </Routes>

        </UserContext.Provider>
    )
}

export default MainRoutes
