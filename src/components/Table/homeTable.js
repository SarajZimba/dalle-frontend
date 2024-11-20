import React from 'react';

const Hometable = ({data, handleChange }) => {
  return (
    <div className='p-2 h-screen'>
        <div className="w-full h-full md:h-[500px] overflow-y-scroll overflow-x-auto hover:shadow mt-2">
          <table className="table-auto w-full bg-opacity-75 overflow-auto rounded-2xl text-center relative font-poppins text-sm md:text-base">
            <thead className=" md:h-10 lg:sticky lg:top-0 bg-slate-50">
              <tr className="mt-4 p-4 border-b-2 border-slate-400 md:my-5">
                <th>S.N</th>
                <th>Type</th>
                <th>Date</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Vendor</th>
                <th>State</th>
                <th>Purchase Order ID</th>
                <th className="text-green-500">View</th>
              </tr>
            </thead>
            <tbody className="m-1 h-auto">
              {data.map((element, index) => (
                <tr className="h-auto" key={index}>
                  <td>{index + 1}</td>
                  <td className='h-1'>{element.RequisitionType}</td>
                  <td>{element.Date}</td>
                  <td>{element.TaxAmount}</td>
                  <td>{element.TotalAmount}</td>
                  <td>{element.Company_Name}</td>
                  <td className="text-green-800">{element.State}</td>
                  <td>{element.IDIntbl_PurchaseRequisition}</td>
                  <td>
                    <button
                      className="border-2 border-green-600 rounded-lg w-16 h-8 hover:bg-green-600 hover:text-gray-200"
                      onClick={() => { handleChange(element) }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Hometable