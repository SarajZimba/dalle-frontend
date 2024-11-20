import React, { useState, useEffect } from 'react'
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import "../assets/css/index.css"
import Chart from "chart.js/auto";

const CombineChart = () => {
  let baseUrl = process.env.REACT_APP_BASE_URL;




  const [count, setCount] = useState('')
  const [arrowCount, setArrowCount] = useState(10);
  const [itemIdentity, setItemIdentity] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemList, setItemList] = useState([])
  const [chartRate, setChartRate] = useState([]);
  const [chartUnits, setChartUnits] = useState([]);
  const [chartReceivedTime, setChartReceivedTime] = useState([]);
  const [slope, setSlope] = useState();
  const [firstItem, setFirstItem] = useState('');
  const [lastItem, setLastItem] = useState('');
  const [outletName, setOutletName] = useState('');

  const [first, setFirst] = useState();
  const [maximum, setMaximum] = useState();
  const [maxUnit, setMaxUnit] = useState();
  const [second, setSecond] = useState();
  const [minimum, setMinimum] = useState();
  const [minUnit, setMinUnit] = useState();
  const [totalUnit, setTotalUnit] = useState();

  useEffect(() => {
    setItemIdentity(localStorage.getItem('item id'))
    setItemName(localStorage.getItem('item name'))
    setOutletName(encodeURIComponent(localStorage.getItem('outlet name'))||"")

  }, [])

  let arrayRate = [];
  useEffect(() => {
    itemList.forEach((item) => {
      {
        arrayRate.push(item.rate)
        setChartRate(arrayRate)
        let len = arrayRate.length;
        setFirst(arrayRate[0])
        setSecond(arrayRate[len - 1])
        setMaximum(Math.max(...arrayRate))
        setMinimum(Math.min(...arrayRate))
      }
    })
  }, [itemList])

  useEffect(() => {
    let difference = first - second
    let slope = (difference / second) * 100
    let slopeRoundoff = parseFloat(slope).toFixed(2)
    setSlope(slopeRoundoff)
  }, [first, second])
  let arrayReceived = [];

  useEffect(() => {
    itemList.forEach((item) => {
      {
        arrayReceived.push(item.ReceivedDate)
        setChartReceivedTime(arrayReceived)
        setFirstItem(arrayReceived[0])
        let len = arrayRate.length;
        setLastItem(arrayReceived[len - 1])
      }
    })
    let length = arrayReceived.length;
    setCount(length)
  }, [itemList])

  let arrayUnitsOrdered = [];

  useEffect(() => {
    itemList.forEach((item) => {
      {
        arrayUnitsOrdered.push(item.UnitsOrdered)
        setMaxUnit(Math.max(...arrayUnitsOrdered))
        setMinUnit(Math.min(...arrayUnitsOrdered))
        setChartUnits(arrayUnitsOrdered)
        let sum = 0;
        arrayUnitsOrdered.forEach((unit) => {
          sum += parseFloat(unit);
        })
        setTotalUnit(sum)
        return sum
      }
    })
  }, [itemList])

  useEffect(() => {
    if(itemIdentity){
      axios.get(`${baseUrl}/reqitemhistory/?item_id=${itemIdentity}&outlet_name=${(outletName)}&limit=${arrowCount}`)
        .then((response) => {
          setItemList(response.data.intbl_purchaserequisition_contract);
          console.log(response,"here")
        })
        .catch((error) => {
          // console.log(error)
        })
    }
  }, [itemIdentity, arrowCount])

  const handleChart = () => {
    setArrowCount(arrowCount + 10)
  }
  const handleLessChart = () => {
    setArrowCount(arrowCount - 10)
    if (arrowCount <= 0) {
      setArrowCount(0)
    }
  }
  let date1 = new Date(lastItem);
  let date2 = new Date(firstItem);

  const result1 = date1.getDate() + "/" + (date1.getMonth() + 1) + "/" + date1.getFullYear();
  const result2 = date2.getDate() + "/" + (date2.getMonth() + 1) + "/" + date2.getFullYear();

  const calculateDays = () => {
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.abs(Difference_In_Days)
  }

  return (
    <div className='flex justify-center'>
      <div className='w-5/6 h-5/6 md:w-1/3 md:h-1/3'>
        <Line data={{
          labels: chartReceivedTime,
          datasets: [
            {
              label: "Price vs Time Chart",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "#94a3b8",
              data: chartRate,
            },
          ],
        }}
          className='my-5'
        />
        <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Highest
                </th>
                <th scope="col" className="py-3 px-6">
                  Lowest:
                </th>
                <th scope="col" className="py-3 px-6">
                  Change:
                </th>
                <th scope="col" className="py-3 px-6">
                  Time:
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {maximum}
                </th>
                <td className="py-4 px-6">
                  {minimum}
                </td>
                <td className="py-4 px-6">
                  <span className='' style={{ color: slope > 0 ? "red" : "green" }}>
                    {(slope > 0) ? "+" : ""}
                    {slope}%</span>
                </td>
                <td className="py-4 px-6">
                  <span>{calculateDays()}</span> <span className=''>Days</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Bar data={{
          labels: chartReceivedTime,
          datasets: [
            {
              label: "Unit vs Time Chart",
              backgroundColor: "#334155",
              borderColor: "#334155",
              data: chartUnits,
            },
          ],
        }}
          className='my-5'
        />
        <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Highest
                </th>
                <th scope="col" className="py-3 px-6">
                  Lowest:
                </th>
                <th scope="col" className="py-3 px-6">
                  Total Unit:
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {maxUnit}
                </th>
                <td className="py-4 px-6">
                  {minUnit}
                </td>
                <td className="py-4 px-6">
                  {totalUnit}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='text-center mt-5'>
          <p>Last <span>{count}</span> purchase of <span>{itemName}</span></p>
        </div>
        <div className='flex justify-center m-3'>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={() => handleLessChart()} className='px-3 text-xl md:text-2xl' />
          <FontAwesomeIcon icon={faArrowAltCircleRight} onClick={() => handleChart()} className='px-3 text-xl md:text-2xl' />
        </div>
      </div>
    </div>
  )
}

export default CombineChart
