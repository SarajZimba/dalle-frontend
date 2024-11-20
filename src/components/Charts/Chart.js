import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from 'axios';

const Charts = ({ id, outletName }) => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const [itemIdentity, setItemIdentity] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemList, setItemList] = useState([])
  const [chartRate, setChartRate] = useState([]);
  const [chartReceivedTime, setChartReceivedTime] = useState([]);
  const [minimum, setMinimum] = useState();
  const [maximum, setMaximum] = useState();

  useEffect(() => {
    setItemIdentity(localStorage.getItem('item id'))
    setItemName(localStorage.getItem('item name'))
  }, [])

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}/reqitemhistory/?item_id=${id}?&outlet_name=${encodeURIComponent(outletName)}&limit=10`)
        .then((response) => {
          setItemList(response.data.intbl_purchaserequisition_contract)
        })
        .catch((error) => {
          // console.log(error)
        })
    }
  }, [id])

  let arrayRate = [];
  useEffect(() => {
    itemList.forEach((item) => {
      {
        arrayRate.push(item.rate)
        setChartRate(arrayRate)
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
        />
      </div>
    </div>
  )
}

export default Charts
