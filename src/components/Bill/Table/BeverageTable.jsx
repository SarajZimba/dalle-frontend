import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const BeverageTable = ({ beverage, beverageGroup }) => {
  const tableRef = useRef(null);
  return (
    <div>
      <div className="table-responsive-beverage">
        <div className="table-responsive-food-header">
          <div className="bg-heading-food">
            <h4 className="beverage-heading">Beverage</h4>
          </div>
          <DownloadTableExcel
            filename="beverages_table"
            sheet="beverages"
            currentTableRef={tableRef.current}
          >
            <button className="export"> Export </button>
          </DownloadTableExcel>
        </div>
        <div className="table-responsive" ref={tableRef}>
          <table className="table-beverage">
            <tr>
              <th>Group</th>
              <th>Item Name </th>
              <th>Item Rate (Rs)</th>
              <th>Quantity</th>
              <th>Total(Rs)</th>
            </tr>
            {!beverage?.error &&
              beverage.map((item, index) => (
                <tr key={index}>
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
    </div>
  );
};

export default BeverageTable;
