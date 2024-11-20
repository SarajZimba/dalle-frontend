import React, { useState, useEffect } from 'react'
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from 'axios';

const BarChart = ({ id, outletName }) => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const [itemList, setItemList] = useState([])
  const [itemIdentity, setItemIdentity] = useState('');
  const [itemName, setItemName] = useState('');
  const [chartUnits, setChartUnits] = useState([]);
  const [chartReceivedTime, setChartReceivedTime] = useState([]);

  useEffect(() => {
    setItemIdentity(localStorage.getItem('item id'))
    setItemName(localStorage.getItem('item name'))
  }, [])

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}/reqitemhistory/?item_id=${id}&outlet_name=${encodeURIComponent(outletName)}&limit=10`)
        .then((response) => {
          setItemList(response.data.intbl_purchaserequisition_contract)
        })
        .catch((error) => {
          // console.log(error)
        })
    }
  }, [id])

  let arrayUnitsOrdered = [];
  useEffect(() => {
    itemList.forEach((item) => {
      {
        arrayUnitsOrdered.push(item.UnitsOrdered)
        setChartUnits(arrayUnitsOrdered)
      }
    })
  }, [itemList])

  let arrayReceived = [];
  useEffect(() => {
    itemList.forEach((item) => {
      {
        arrayReceived.push(item.ReceivedDate)
        setChartReceivedTime(arrayReceived)
      }
    })
  }, [itemList])

  return (
    <div className='flex flex-col justify-center items-center h-3/4 w-3/4 md:w-44 md:h-36'>
      <div className='md:w-52 md:h-52'>
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
        />
      </div>
    </div>
  )
}

export default BarChart
