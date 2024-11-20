import React from 'react'
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Piechart = ({ dineinTabs, FoodBeverageSum }) => {
  return (
    <div className='show-pie-chart'>
      <Pie className='pie-chart'
        data={{
          datasets: [
            {
              label: 'Number of Sales',
              data: [dineinTabs.FoodSale, dineinTabs.BeverageSale, dineinTabs.OtherSale],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
          labels: ['Food Sale', 'BeverageSale', 'OtherSale'],
        }} />
      <div className='food-beverage-qty'>
        {FoodBeverageSum.map((item) => (
          <div>
            <h5>Quantity</h5>
            <p><span>Beverage : </span>{item.beveragequantity}</p>
            <p><span>Food : </span>{item.foodquantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Piechart