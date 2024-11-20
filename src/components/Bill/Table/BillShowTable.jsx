import React from "react";
import BillTable from "./BillTable";
import Foodtable from "./Foodtable";
import BeverageTable from "./BeverageTable";
import GroupTable from "./GroupTable";

const BillShowTable = ({
  isOrder,
  food,
  beverage,
  foodGroup,
  beverageGroup,
  order,
  totalInfo,
  selected,
  token,
}) => {
  return (
    <div className="bill-tables">
      <BillTable
        isOrder={isOrder}
        order={order}
        totalInfo={totalInfo}
        selected={selected}
        token={token}
      />
      <div className="food-beverage-table-width">
        <div className="food-beverage-table">
          <Foodtable food={food} foodGroup={foodGroup} />
          <BeverageTable beverage={beverage} beverageGroup={beverageGroup} />
        </div>
      </div>
      <div className="group-table-width">
        <GroupTable Group={foodGroup} title={"Food"} />
        <GroupTable Group={beverageGroup} title={"Beverage"} />
      </div>
    </div>
  );
};

export default BillShowTable;
