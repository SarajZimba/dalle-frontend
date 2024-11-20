import React, { useState, useEffect } from 'react'
import "../../scss/table.scss";
import axios from 'axios';
import moment from 'moment';
import ControlDate from './ControlDate';
import Information from './Information';
import Pagination from './Pagination';
import Detail from './Detail';
import Error from './Error';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

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
    const [maxPageLength, setMaxPageLength] = useState();
    const [pageLength, setPageLength] = useState([]);
    const [categories, setCategories] = useState({})
    const [categoryVoid, setCategorieVoid] = useState({})
    const [token, setToken] = useState("")
    // const [Outlet, setOutlet] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");

    let url = process.env.REACT_APP_BASE_URL;
    let navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])

    useEffect(() => {
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
    }, [])


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

    useEffect(() => {
        let arrayLength = [];

        for (let i = 1; i < maxPageLength + 1; i++) {
            arrayLength.push(i)
        }
        setPageLength(arrayLength)
    }, [maxPageLength])

    const handleGenerateReport = () => {
        axios.post(`${url}/report`, {
            "start_date": firstDate,
            "end_date": secondDate,
            "outlet_name": selectedOutlet,
            "page_no": 1,
            "token": token
        })
            .then((response) => {
                console.log(response)
                setInformation(response.data)
                setMaxPageLength(response.data.maxPage_Length)
                setOrders(response.data.orders)
                setError(false)
            })
            .catch((error) => {
                setError(true)
            })
    }
    const handleNumber = (page) => {
        axios.post(`${url}/report`, {
            "start_date": firstDate,
            "end_date": secondDate,
            "outlet_name": selectedOutlet,
            "page_no": page,
            "token": token
        })
            .then((response) => {
                setOrders(response.data.orders)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const handleSidebar = () => {
        axios.post(`${url}/itemstats`, {
            "start_date": firstDate,
            "end_date": secondDate,
            "outlet_name": selectedOutlet,
            "token": token
        })
            .then((response) => {
                console.log(response.data)
                setCategories(response.data.Completed)
                setCategorieVoid(response.data.Void)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    // const handleChange = (e) => {
    //     setOutletName(e)
    // }

    return (
        <div>
            <Navbar />
            <div className='info-side-bar'>
                <div className='info-bar-report'>
                    <div className='information-report'>
                        <Detail information={information} />
                    </div>
                </div>
                <div className='info-report-container'>
                    <ControlDate
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        selectedOutlet={selectedOutlet}
                        setSelectedOutlet={setSelectedOutlet}
                        handleGenerateReport={handleGenerateReport}
                        handleSidebar={handleSidebar}
                        categories={categories}
                        categoryVoid={categoryVoid}
                    />
                    <div className='information-report-responsive'>
                        <Detail information={information} />
                    </div>
                    {error ? <Error /> :
                        <div className='report'>
                            <div className='show-outlet-name'>
                                <h4>{outletName}</h4>
                            </div>
                            <Information orders={orders} information={information} />
                        </div>
                    }
                    <Pagination pageLength={pageLength} handleNumber={handleNumber} />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Report