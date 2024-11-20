import React from 'react'
import { Line } from 'react-chartjs-2';

const LineChart = ({ labels, Total, Title, labelTitle }) => {
  return (
      <div>
        <h4>{Title}</h4>
        <Line
          className='line-chart'
          datasetIdKey='id'
          data={{
            labels: labels,
            datasets: [
              {
                id: 1,
                label: `${labelTitle}`,
                data: Total
              }
            ],
          }}
        />
      </div>
  )
}

export default LineChart

