import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const Foodtable = ({ food }) => {
  const tableRef = useRef(null);

  return (
    <div className="table-responsive-food">
      <div className="table-responsive-food-header">
        <div className="bg-heading-food">
          <h4 className="food-heading">Food</h4>
        </div>
        <DownloadTableExcel
          filename="foods_table"
          sheet="foods"
          currentTableRef={tableRef.current}
        >
          <button className="export"> Export </button>
        </DownloadTableExcel>
      </div>
      <div className="table-responsive" ref={tableRef}>
        <table className="table-food">
          <thead>
            <tr>
              <th>Group</th>
              <th>Item Name </th>
              <th>Item Rate (Rs)</th>
              <th>Quantity</th>
              <th>Total(Rs)</th>
            </tr>
          </thead>
          {!food.error &&
            food.map((item) => (
              <tr>
                <td>{item.Description}</td>
                <td>{item.itemName}</td>
                <td>{item.itemrate}</td>
                <td>{item.quantity}</td>
                <td>{item.total}</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default Foodtable;
