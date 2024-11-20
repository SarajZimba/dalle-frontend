import React, { useEffect, useRef, useState } from "react";
import "../../scss/reactSidebar.scss";
import { Sidebar, useProSidebar } from "react-pro-sidebar";
import { AiOutlineArrowRight } from "react-icons/ai";
import Piechart from "../Charts/Piechart";
import { DownloadTableExcel } from "react-export-table-to-excel";

const SidebarPro = ({
  dineinTabs,
  paymentStatus,
  splitDetails,
  startBillNum,
  endBillNum,
  FoodBeverageSum,
  toggleArrow,
}) => {
  const [totalSplitCash, setTotalSplitCash] = useState(0);
  const [totalSplitCreditCard, setTotalSplitCreditCard] = useState(0);
  const [totalSplitMobilePayment, setTotalMobilePayment] = useState(0);

  const { collapseSidebar } = useProSidebar();
  if (!dineinTabs?.error) {
    const netTotalSale = dineinTabs.netTOTALSALES;
    const numGuest = dineinTabs.TotalGuests;
    var revenuePerGuest = netTotalSale / numGuest;
  }
  const checkNan = (sales) => {
    if (sales) {
      let value = parseFloat(sales).toLocaleString(undefined, {
        maximumFractionDigits: 3,
      });
      return value;
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (Array.isArray(splitDetails)) {
      splitDetails.forEach((payment) => {
        if (payment.paymentMode === "Cash") {
          setTotalSplitCash(payment.paymentAmount);
        } else if (payment.paymentMode === "Credit Card") {
          setTotalSplitCreditCard(payment.paymentAmount);
        } else if (payment.paymentMode === "Mobile Payment") {
          setTotalMobilePayment(payment.paymentAmount);
        }
      });
    }
  }, [splitDetails]);

  const tableRef = useRef(null);

  return (
    <div className="sidebar">
      <main onClick={toggleArrow}>
        <button onClick={() => collapseSidebar()} className="btn-sidebar">
          {<AiOutlineArrowRight className="icon-arrow" />}
        </button>
      </main>
      <Sidebar>
        <div>
          {!dineinTabs?.error && (
            <div className="dine-tabs-list">
              <div className="bill-no">
                <div className="start-bill-no">
                  <label>
                    <span>Starting Bill No : </span>
                    {startBillNum}
                  </label>
                </div>
                <div className="end-bill-no">
                  <label>
                    <span>Ending Bill No : </span>
                    {endBillNum === "" ? "-" : endBillNum}
                  </label>
                </div>
                <div className="total-guest">
                  <label>
                    <span>Total No. of Guest : </span>
                    {dineinTabs.TotalGuests === ""
                      ? "-"
                      : dineinTabs.TotalGuests}
                  </label>
                </div>
                <div className="revenue">
                  <label>
                    <span>Revenue Per Guest : </span>
                    {revenuePerGuest === "" ? "-" : revenuePerGuest.toFixed(2)}
                  </label>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="total-info">
                <label>
                  {" "}
                  <span>Total Sales : </span> {checkNan(dineinTabs.TOTALSALES)}
                </label>
                <div className="info">
                  <label>
                    <span>Dine-In : </span>
                    {checkNan(dineinTabs.DineInSALES)}
                  </label>
                </div>
                <div className="info">
                  <label>
                    <span>Tabs : </span>
                    {!dineinTabs.TabSALES ? "0" : checkNan(dineinTabs.TabSALES)}
                  </label>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="total-info">
                <label>
                  {" "}
                  <span>Total Net Sales : </span>
                  {checkNan(dineinTabs.netTOTALSALES)}
                </label>
                <div className="info">
                  <label>
                    <span>Dine-In : </span>
                    {checkNan(dineinTabs.netDineInSALES)}
                  </label>
                </div>
                <div className="info">
                  <label>
                    <span>Tabs : </span>
                    {!dineinTabs.netTabSALES ? "0" : dineinTabs.netTabSALES}
                  </label>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="total-info">
                <label>
                  {" "}
                  <span>Total VAT: </span>
                  {checkNan(dineinTabs.TotalVat)}
                </label>
                <div className="info">
                  <label>
                    <span>Dine-In : </span>
                    {checkNan(dineinTabs.DineInVAT)}
                  </label>
                </div>
                <div className="info">
                  <label>
                    <span>Tabs : </span>
                    {(dineinTabs.TabVAT = dineinTabs.TabVAT ?? "0")}
                  </label>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="total-info">
                <label>
                  {" "}
                  <span>Total Service Charge : </span>
                  {checkNan(dineinTabs.TotalServiceCharge)}
                </label>
                <div className="info">
                  <label>
                    <span>Dine-In : </span>
                    {checkNan(dineinTabs.DineInServiceCharge)}
                  </label>
                </div>
                <div className="info">
                  <label>
                    <span>Tabs : </span>
                    {
                      (dineinTabs.TabServiceCharge =
                        dineinTabs.TabServiceCharge ?? "0")
                    }
                  </label>
                </div>
              </div>
              <hr className="hr-line" />
              <Piechart
                FoodBeverageSum={FoodBeverageSum}
                dineinTabs={dineinTabs}
              />

              <div className="total-info">
                <label>
                  {" "}
                  <span>Food Sale : </span>
                  {checkNan(dineinTabs.FoodSale)}
                </label>
                <div>
                  <label>
                    <span>Beverage Sale : </span>
                    {checkNan(dineinTabs.BeverageSale)}
                  </label>
                </div>
                <div>
                  <label>
                    <span>Others : </span>
                    {!dineinTabs.OtherSale ? "0:00" : dineinTabs.OtherSale}
                  </label>
                </div>
              </div>
              <hr className="hr-line" />
            </div>
          )}
          {!paymentStatus?.error && (
            <div className="dine-tabs-paymemnt-status">
              <div>
                <label>
                  <span>Credit Card : </span>
                  {checkNan(
                    parseInt(paymentStatus.CreditCard) + totalSplitCreditCard
                  )}
                </label>
              </div>
              <div>
                <label>
                  <span>Cash : </span>
                  {checkNan(parseInt(paymentStatus.Cash) + totalSplitCash)}
                </label>
              </div>
              <div>
                <label>
                  <span> Mobile Payment : </span>
                  {checkNan(
                    parseInt(paymentStatus.MobilePayment) +
                      totalSplitMobilePayment
                  )}
                </label>
              </div>
              <div>
                <label>
                  {" "}
                  <span>Credit Sale: </span>
                  {checkNan(paymentStatus.Credit)}
                </label>
              </div>
              <div>
                <label>
                  <span>Complimentary : </span>
                  {checkNan(paymentStatus.Complimentary)}
                </label>
              </div>
              {/* <div>
              <label>
                <span> Split : </span>
                {checkNan(paymentStatus.Split)}
              </label>
            </div> */}
              <div>
                <label>
                  <span> Discount Amount : </span>
                  {checkNan(dineinTabs.DiscountAmountSum)}
                </label>
              </div>
            </div>
          )}
        </div>
        <div ref={tableRef}>
          <div style={{ display: "none" }}>
            {!dineinTabs?.error && (
              <table className="dine-tabs-table">
                <tbody>
                  <tr>
                    <td>Starting Bill No:</td>
                    <td>{startBillNum}</td>
                  </tr>
                  <tr>
                    <td>Ending Bill No:</td>
                    <td>{endBillNum === "" ? "-" : endBillNum}</td>
                  </tr>
                  <tr>
                    <td>Total No. of Guest:</td>
                    <td>
                      {dineinTabs.TotalGuests === ""
                        ? "-"
                        : dineinTabs.TotalGuests}
                    </td>
                  </tr>
                  <tr>
                    <td>Revenue Per Guest:</td>
                    <td>
                      {revenuePerGuest === ""
                        ? "-"
                        : revenuePerGuest.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <hr className="hr-line" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Sales:</td>
                    <td>{checkNan(dineinTabs.TOTALSALES)}</td>
                  </tr>
                  <tr>
                    <td>Dine-In:</td>
                    <td>{checkNan(dineinTabs.DineInSALES)}</td>
                  </tr>
                  <tr>
                    <td>Tabs:</td>
                    <td>
                      {!dineinTabs.TabSALES
                        ? "0"
                        : checkNan(dineinTabs.TabSALES)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <hr className="hr-line" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Net Sales:</td>
                    <td>{checkNan(dineinTabs.netTOTALSALES)}</td>
                  </tr>
                  <tr>
                    <td>Dine-In:</td>
                    <td>{checkNan(dineinTabs.netDineInSALES)}</td>
                  </tr>
                  <tr>
                    <td>Tabs:</td>
                    <td>
                      {!dineinTabs.netTabSALES ? "0" : dineinTabs.netTabSALES}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <hr className="hr-line" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total VAT:</td>
                    <td>{checkNan(dineinTabs.TotalVat)}</td>
                  </tr>
                  <tr>
                    <td>Dine-In:</td>
                    <td>{checkNan(dineinTabs.DineInVAT)}</td>
                  </tr>
                  <tr>
                    <td>Tabs:</td>
                    <td>{(dineinTabs.TabVAT = dineinTabs.TabVAT ?? "0")}</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <hr className="hr-line" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Service Charge:</td>
                    <td>{checkNan(dineinTabs.TotalServiceCharge)}</td>
                  </tr>
                  <tr>
                    <td>Dine-In:</td>
                    <td>{checkNan(dineinTabs.DineInServiceCharge)}</td>
                  </tr>
                  <tr>
                    <td>Tabs:</td>
                    <td>
                      {
                        (dineinTabs.TabServiceCharge =
                          dineinTabs.TabServiceCharge ?? "0")
                      }
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <hr className="hr-line" />
                    </td>
                  </tr>
                  <tr>
                    <td>Quantity Beverage:</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td>Quantity Food:</td>
                    <td>36</td>
                  </tr>
                  <tr>
                    <td>Food Sale:</td>
                    <td>{checkNan(dineinTabs.FoodSale)}</td>
                  </tr>
                  <tr>
                    <td>Beverage Sale:</td>
                    <td>{checkNan(dineinTabs.BeverageSale)}</td>
                  </tr>
                  <tr>
                    <td>Others:</td>
                    <td>
                      {!dineinTabs.OtherSale ? "0:00" : dineinTabs.OtherSale}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <hr className="hr-line" />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {!paymentStatus?.error && (
              <table className="dine-tabs-paymemnt-status-table">
                <tbody>
                  <tr>
                    <td>Credit Card:</td>
                    <td>
                      {checkNan(
                        parseInt(paymentStatus.CreditCard) +
                          totalSplitCreditCard
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Cash:</td>
                    <td>
                      {checkNan(parseInt(paymentStatus.Cash) + totalSplitCash)}
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile Payment:</td>
                    <td>
                      {checkNan(
                        parseInt(paymentStatus.MobilePayment) +
                          totalSplitMobilePayment
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Credit Sale:</td>
                    <td>{checkNan(paymentStatus.Credit)}</td>
                  </tr>
                  <tr>
                    <td>Complimentary:</td>
                    <td>{checkNan(paymentStatus.Complimentary)}</td>
                  </tr>
                  <tr>
                    <td>Discount Amount:</td>
                    <td>{checkNan(dineinTabs.DiscountAmountSum)}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
        <hr className="hr-line" />
        <DownloadTableExcel
          filename="sidebar_table"
          sheet="sidebar"
          currentTableRef={tableRef.current}
        >
          <button className="export"> Export </button>
        </DownloadTableExcel>
      </Sidebar>
    </div>
  );
};

export default SidebarPro;
