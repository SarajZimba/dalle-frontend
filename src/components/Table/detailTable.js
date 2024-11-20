import React from 'react'
import { useNavigate } from "react-router-dom";
import Charts from '../Charts/Chart';
import BarChart from '../Charts/Barchart';
// import { useDispatch, useSelector } from 'react-redux';
// import { showChartAction } from '../../actions';
// import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";

const Detailtable = ({ list, outletName }) => {
  let navigate = useNavigate();
  // let dispatch = useDispatch();
  // let state = useSelector(state => state.Chart);
  // console.log(state.data
  //   ,'state')

  const showChart = (element) => {
    const { ItemID, Name } = element
    localStorage.setItem('item id', ItemID)
    localStorage.setItem('item name', Name)
    localStorage.setItem('outlet name',outletName)
    navigate('/show-all-chart')
  }
  const showBar = (element) => {
    const { ItemID, Name } = element
    localStorage.setItem('item id', ItemID)
    localStorage.setItem('item name', Name)
    localStorage.setItem('outlet name',outletName)
    navigate('/show-all-chart')
  }

  function generateTotal(array) {
    let total;
    array.forEach((item) => {
      total = item.Rate * item.UnitsOrdered;
    });
    return total;
  }
  let totalEach = generateTotal(list);

  // const fetchData = ({id, outletName}) => {
  //   dispatch(showChartAction({
  //     itemIdentity: id
  //   }))
  //   navigate('/show-chart')
  // }
  // const loading = true;

  return (
    <div className="h-full w-full sm:w-full overflow-y-scroll my-7 hover:shadow">
      <table className="table-auto text-center  h-auto w-full bg-gray-200 bg-opacity-75 overflow-auto font-poppins text-sm md:text-base">
        <thead className='lg:sticky lg:top-0 bg-slate-50 lg:h-10 w-full'>
          <tr className="border-b-2 border-slate-400 md:h-16 p-4 w-full text-center font-light text-sm md:font-medium md:text-lg">
            <th>S.N</th>
            <th>Name</th>
            <th>Brand Name</th>
            <th>Unit</th>
            <th>UOM</th>
            <th>Rate</th>
            <th>Total</th>
            <th>Tax</th>
            <th>Last Purchase price</th>
            <th>History</th>
            <th>View Bar Chart</th>
            {/* <th className=''>View Chart</th> */}
          </tr>
        </thead>
        <tbody className="md:h-16">
          {list.map((element, index) => (
            <tr  key={index}>
              <td className="">{index + 1}</td>
              <td>{element.Name}</td>
              <td>{element.BrandName}</td>
              <td>{element.UnitsOrdered}</td>
              <td>{element.UOM}</td>
              <td>{Math.round(element.Rate)}</td>
              <td> {Math.round(totalEach)}</td>
              <td>{element.Taxable}</td>
              <td>{element.last_purchase}</td>
              <td onClick={() => showChart(element)} className='px-4'>
                <Charts id={element.ItemID} outletName={outletName} />
              </td>
              <td onClick={() => showBar(element)}>
                <BarChart id={element.ItemID} outletName={outletName}/>
              </td>
              <td>
                {/* <button onClick={() => fetchData(element.ItemID,outletName )}>
                  <Line data={state.data} />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Detailtable