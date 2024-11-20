import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const GroupTable = ({ Group, title }) => {
  const tableRef = useRef(null);
  return (
    <div className="food-column-group">
      <div className="table-responsive-food-header">
        <div className="bg-heading-food">
          <h4 className="food-heading">{title}</h4>
        </div>
        <DownloadTableExcel
          filename={`${title}_table`}
          sheet={`${title}`}
          currentTableRef={tableRef.current}
        >
          <button className="export"> Export </button>
        </DownloadTableExcel>
      </div>
      <div className="row food-table-group-row" ref={tableRef}>
        <table className="table-group">
          <tr>
            <th>Group:</th>
            <th>Total:</th>
          </tr>

          {!Group?.error &&
            Group.map((food, index) => (
              <tr key={index}>
                <td>{food.groupName}</td>
                <td>{food.groupTotal}</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default GroupTable;
