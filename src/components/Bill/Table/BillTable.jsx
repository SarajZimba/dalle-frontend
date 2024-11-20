import React, { useState, useEffect, useRef } from "react";
import ConvertDate from "../convertDate";
import { DownloadTableExcel } from "react-export-table-to-excel";
import axios from "axios";
import BillDetail from "../../Modal/BillDetail";

const BillTable = ({ order, isOrder, totalInfo, selected, token }) => {
  let url = process.env.REACT_APP_BASE_URL;
  const [isChecked, setIsChecked] = useState(true);
  const [totalSubUnit, setTotalSubUnit] = useState("");
  const [ServiceSum, setServiceSum] = useState("");
  const [showSubTotal, setShowSubTotal] = useState([]);
  const [showServiceCharge, setServiceCharge] = useState([]);
  const tableRef = useRef(null);
  const [billInfo, setBillInfo] = useState({});
  const [billInfoList, setBillInfoList] = useState([]);
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  let SubTotal = [];
  let ServiceCharge = [];

  useEffect(() => {
    order.forEach((item) => {
      {
        let newSubTotal = (item.Total / 1.243).toFixed(2);
        let newServiceCharge = (newSubTotal / 10).toFixed(2);
        SubTotal.push(newSubTotal);
        setShowSubTotal(SubTotal);

        ServiceCharge.push(newServiceCharge);
        setServiceCharge(ServiceCharge);

        let sum = 0;
        let serviceSum = 0;
        SubTotal.forEach((unit) => {
          sum += parseFloat(unit);
        });
        setTotalSubUnit(sum.toFixed(2));
        ServiceCharge.forEach((unit) => {
          serviceSum += parseFloat(unit);
        });
        setServiceSum(serviceSum.toFixed(2));
      }
    });
  }, [order]);

  const handleBillInfo = (bill, date) => {
    const convertDate = new Date(date).toISOString().substring(0, 10);
    axios
      .post(`${url}/billinfo`, {
        bill_no: `${bill}`,
        Date: `${convertDate}`,
        Outlet_Name: `${selected}`,
        token: `${token}`,
      })
      .then((response) => {
        if (response?.data) {
          // console.log(response?.data)
          setBillInfoList(response.data.details);
          setBillInfo(response.data);
        }
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  const hasLedgerUrl =
    process.env.REACT_APP_LEDGER_URL && process.env.REACT_APP_LEDGER_TOKEN;

  const getLedgerData = () => {
    axios
      .get(`${process.env.REACT_APP_LEDGER_URL}/get-ledgers`)
      .then((response) => {
        setLedgerData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (hasLedgerUrl) {
      getLedgerData();
    }
  }, []);

  const filteredOrderWithoutCredit = order?.filter(
    (transaction) =>
      transaction.PaymentMode !== "Credit" &&
      transaction.PaymentMode !== "Non Chargeable" &&
      transaction.PaymentMode !== "Split"
  );

  const filteredOrderWithCredit = order?.filter(
    (transaction) => transaction.PaymentMode === "Credit"
  );

  const filteredOrderWithNonChargeable = order?.filter(
    (transaction) =>
      transaction.PaymentMode === "Non Chargeable" ||
      transaction.PaymentMode === "Complimentary"
  );

  const filteredOrderSplit = order?.filter(
    (transaction) => transaction.PaymentMode === "Split"
  );

  const paymentModeLedgerMapping = {
    Cash: "Cash-In-Hand",
    "Credit Card": "Card Transactions",
    "Mobile Payment": "Mobile Payments",
  };

  const updatedOrderWithoutCredit = hasLedgerUrl
    ? filteredOrderWithoutCredit?.map((transaction) => {
        const ledgerName = paymentModeLedgerMapping[transaction?.PaymentMode];

        if (ledgerName) {
          const paymentLedger = ledgerData?.find(
            (ledger) => ledger?.ledger_name === ledgerName
          );

          const salesLedger = ledgerData?.find(
            (ledger) => ledger?.ledger_name === "Sales"
          );
          const vatLedger = ledgerData?.find(
            (ledger) => ledger?.ledger_name === "VAT Payable"
          );

          const DiscountSales = ledgerData?.find(
            (ledger) => ledger?.ledger_name === "Discount Sales"
          );
          const DiscountExpenses = ledgerData?.find(
            (ledger) => ledger?.ledger_name === "Discount Expenses"
          );

          const debit_ledgers = [];
          const debit_particulars = [];
          const debit_amounts = [];
          const debit_subledgers = [];

          const credit_ledgers = [];
          const credit_particulars = [];
          const credit_amounts = [];
          const credit_subledgers = [];

          if (paymentLedger?.id) {
            debit_ledgers.push(paymentLedger?.id.toString());
            debit_particulars.push(
              `Sale from bill no: ${transaction?.bill_no}`
            );
            debit_amounts.push(transaction?.Total);
            debit_subledgers.push("Subledger 1");
          }

          if (transaction?.DiscountAmt !== "0.00") {
            debit_ledgers.push(DiscountExpenses?.id.toString());
            debit_particulars.push(DiscountExpenses?.ledger_name);
            debit_amounts.push(transaction?.DiscountAmt);
            debit_subledgers.push("Subledger 4");
          }

          if (transaction?.VAT !== "0.00") {
            credit_ledgers.push(vatLedger?.id.toString());
            credit_particulars.push(vatLedger?.ledger_name);
            credit_amounts.push(transaction?.VAT);
            credit_subledgers.push("Subledger 5");
          }

          if (transaction?.Subtotal !== "0.00") {
            credit_ledgers.push(salesLedger?.id.toString());
            credit_particulars.push(salesLedger?.ledger_name);
            credit_amounts.push(transaction?.Subtotal);
            credit_subledgers.push("Subledger 6");
          }

          if (transaction?.DiscountAmt !== "0.00") {
            credit_ledgers.push(DiscountSales?.id.toString());
            credit_particulars.push(DiscountSales?.ledger_name);
            credit_amounts.push(transaction?.DiscountAmt);
            credit_subledgers.push("Subledger 7");
          }

          return {
            datetime: transaction?.Date,
            bill_id: transaction?.id.toString(),
            debit_ledgers,
            debit_particulars,
            debit_amounts,
            debit_subledgers,
            credit_ledgers,
            credit_particulars,
            credit_amounts,
            credit_subledgers,
          };
        }

        return transaction;
      })
    : null;

  const updatedOrderWithCredit = hasLedgerUrl
    ? filteredOrderWithCredit?.map((transaction) => {
        const salesLedger = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Sales"
        );
        const vatLedger = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "VAT Payable"
        );

        const DiscountSales = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Discount Sales"
        );
        const DiscountExpenses = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Discount Expenses"
        );

        const debit_ledgers = [];
        const debit_particulars = [];
        const debit_amounts = [];
        const debit_subledgers = [];

        const credit_ledgers = [];
        const credit_particulars = [];
        const credit_amounts = [];
        const credit_subledgers = [];

        if (transaction?.guestID) {
          debit_ledgers.push(transaction?.guestID);
          debit_particulars.push(`Sale from bill no: ${transaction?.bill_no}`);
          debit_amounts.push(transaction?.Total);
          debit_subledgers.push("Subledger 1");
        }

        if (transaction?.DiscountAmt !== "0.00") {
          debit_ledgers.push(DiscountExpenses?.id.toString());
          debit_particulars.push(DiscountExpenses?.ledger_name);
          debit_amounts.push(transaction?.DiscountAmt);
          debit_subledgers.push("Subledger 4");
        }

        if (transaction?.VAT !== "0.00") {
          credit_ledgers.push(vatLedger?.id.toString());
          credit_particulars.push(vatLedger?.ledger_name);
          credit_amounts.push(transaction?.VAT);
          credit_subledgers.push("Subledger 5");
        }

        if (transaction?.Subtotal !== "0.00") {
          credit_ledgers.push(salesLedger?.id.toString());
          credit_particulars.push(salesLedger?.ledger_name);
          credit_amounts.push(transaction?.Subtotal);
          credit_subledgers.push("Subledger 6");
        }

        if (transaction?.DiscountAmt !== "0.00") {
          credit_ledgers.push(DiscountSales?.id.toString());
          credit_particulars.push(DiscountSales?.ledger_name);
          credit_amounts.push(transaction?.DiscountAmt);
          credit_subledgers.push("Subledger 7");
        }

        return {
          datetime: transaction?.Date,
          bill_id: transaction?.id.toString(),
          debit_ledgers,
          debit_particulars,
          debit_ledger_names: [transaction?.GuestName],
          debit_amounts,
          debit_subledgers,
          credit_ledgers,
          credit_particulars,
          credit_amounts,
          credit_subledgers,
        };
      })
    : null;

  const updatedOrderWithNonChargeable = hasLedgerUrl
    ? filteredOrderWithNonChargeable?.map((transaction) => {
        const NonChargeableSales = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Complimentary Sales"
        );
        const NonChargeableExpenses = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Complimentary Expenses"
        );

        return {
          datetime: transaction?.Date,
          bill_id: transaction?.id.toString(),
          debit_ledgers: [NonChargeableExpenses?.id.toString()],
          debit_particulars: [NonChargeableExpenses?.ledger_name],
          debit_amounts: [transaction?.Total],
          debit_subledgers: ["Subledger 1"],
          credit_ledgers: [NonChargeableSales?.id.toString()],
          credit_particulars: [NonChargeableSales?.ledger_name],
          credit_amounts: [transaction?.Subtotal],
          credit_subledgers: ["Subledger 4"],
        };
      })
    : null;

  const updatedOrderWithSplit = hasLedgerUrl
    ? filteredOrderSplit?.map((transaction) => {
        const salesLedger = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Sales"
        );
        const vatLedger = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "VAT Payable"
        );

        const creditCardLedger = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Card Transactions"
        );

        const cashLedger = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Cash-In-Hand"
        );

        const mobilePaymentLedger = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Mobile Payments"
        );

        const DiscountSales = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Discount Sales"
        );
        const DiscountExpenses = ledgerData?.find(
          (ledger) => ledger?.ledger_name === "Discount Expenses"
        );

        const splitCashAmount = transaction?.SplitPayments?.find(
          (split) => split?.PaymentMode === "Cash"
        );

        const splitCreditCardAmount = transaction?.SplitPayments?.find(
          (split) => split?.PaymentMode === "Credit Card"
        );

        const splitMobilePaymentAmount = transaction?.SplitPayments?.find(
          (split) => split?.PaymentMode === "Mobile Payment"
        );

        const debit_ledgers = [];
        const debit_particulars = [];
        const debit_ledger_names = [];
        const debit_amounts = [];
        const debit_subledgers = [];

        const credit_ledgers = [];
        const credit_particulars = [];
        const credit_amounts = [];
        const credit_subledgers = [];

        if (splitCashAmount !== undefined) {
          debit_ledgers.push(cashLedger?.id.toString());
          debit_particulars.push(`Sale from bill no: ${transaction?.bill_no}`);
          debit_ledger_names.push(cashLedger?.ledger_name);
          debit_amounts.push((splitCashAmount?.PaymentAmount ?? 0).toString());
          debit_subledgers.push("Subledger 1");
        }

        if (splitCreditCardAmount !== undefined) {
          debit_ledgers.push(creditCardLedger?.id.toString());
          debit_particulars.push(`Sale from bill no: ${transaction?.bill_no}`);
          debit_ledger_names.push(creditCardLedger?.ledger_name);
          debit_amounts.push(
            (splitCreditCardAmount?.PaymentAmount ?? 0).toString()
          );
          debit_subledgers.push("Subledger 2");
        }

        if (splitMobilePaymentAmount !== undefined) {
          debit_ledgers.push(mobilePaymentLedger?.id.toString());
          debit_particulars.push(`Sale from bill no: ${transaction?.bill_no}`);
          debit_ledger_names.push(mobilePaymentLedger?.ledger_name);
          debit_amounts.push(
            (splitMobilePaymentAmount?.PaymentAmount ?? 0).toString()
          );
          debit_subledgers.push("Subledger 3");
        }

        if (transaction?.DiscountAmt !== "0.00") {
          debit_ledgers.push(DiscountExpenses?.id.toString());
          debit_particulars.push(DiscountExpenses?.ledger_name);
          debit_ledger_names.push(DiscountExpenses?.ledger_name);
          debit_amounts.push(transaction?.DiscountAmt);
          debit_subledgers.push("Subledger 4");
        }

        if (transaction?.VAT !== "0.00") {
          credit_ledgers.push(vatLedger?.id.toString());
          credit_particulars.push(vatLedger?.ledger_name);
          credit_amounts.push(transaction?.VAT);
          credit_subledgers.push("Subledger 5");
        }

        if (transaction?.Subtotal !== "0.00") {
          credit_ledgers.push(salesLedger?.id.toString());
          credit_particulars.push(salesLedger?.ledger_name);
          credit_amounts.push(transaction?.Subtotal);
          credit_subledgers.push("Subledger 6");
        }

        if (transaction?.DiscountAmt !== "0.00") {
          credit_ledgers.push(DiscountSales?.id.toString());
          credit_particulars.push(DiscountSales?.ledger_name);
          credit_amounts.push(transaction?.DiscountAmt);
          credit_subledgers.push("Subledger 7");
        }

        return {
          datetime: transaction?.Date,
          bill_id: transaction?.id.toString(),
          debit_ledgers,
          debit_particulars,
          debit_ledger_names,
          debit_amounts,
          debit_subledgers,
          credit_ledgers,
          credit_particulars,
          credit_amounts,
          credit_subledgers,
        };
      })
    : null;

  const dailyPostingHandler = async () => {
    try {
      setLoading(true);

      const sendPostRequest = async (url, data) => {
        try {
          const response = await axios.post(url, data, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_LEDGER_TOKEN}`,
            },
          });
          console.log(response);
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      };

      if (filteredOrderWithoutCredit.length !== 0) {
        await sendPostRequest(
          `${process.env.REACT_APP_LEDGER_URL}/create_journal_entry/`,
          updatedOrderWithoutCredit
        );
      }

      if (updatedOrderWithNonChargeable.length !== 0) {
        await sendPostRequest(
          `${process.env.REACT_APP_LEDGER_URL}/create_journal_entry/`,
          updatedOrderWithNonChargeable
        );
      }

      if (filteredOrderSplit.length !== 0) {
        await sendPostRequest(
          `${process.env.REACT_APP_LEDGER_URL}/create_journal_entry/`,
          updatedOrderWithSplit
        );
      }

      if (filteredOrderWithCredit.length !== 0) {
        await sendPostRequest(
          `${process.env.REACT_APP_LEDGER_URL}/create_credit_journal_entry/`,
          updatedOrderWithCredit
        );
      }

      setLoading(false);
      alert("Posted Successfully");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <DownloadTableExcel
        filename="users_table"
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <button className="export"> Export </button>
      </DownloadTableExcel>
      { /*process.env.REACT_APP_LEDGER_URL &&
        process.env.REACT_APP_LEDGER_TOKEN && (
          <>
            {loading ? (
              <button className="export">Loading....</button>
            ) : (
              <button onClick={dailyPostingHandler} className="export">
                Make Daily Postings
              </button>
            )}
          </>
        )*/}
      <div class="table-responsive-bill" ref={tableRef}>
        <table class="table-bill">
          <tr>
            <th>Date</th>
            <th>Bill no:</th>
            <th>Discount: (Rs)</th>
            <th>Sub Total: (Rs)</th>
            <th>
              Service Charge
              <input
                type="checkbox"
                className="checkbox"
                onChange={handleCheckbox}
              />
            </th>
            <th>VAT(Rs)</th>
            <th>Total(Rs)</th>
            <th>Payment</th>
            <th>Guest Name</th>
          </tr>

          {!order?.error &&
            order?.map((item, index) => (
              <tr key={index}>
                <td className="no-wrap">
                  <ConvertDate date={item.Date} />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn "
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleBillInfo(item.bill_no, item.Date)}
                  >
                    {item.bill_no}
                  </button>
                </td>
                <td>{item.DiscountAmt}</td>
                <td> {isChecked ? item.Subtotal : showSubTotal[index]}</td>
                <td>
                  {" "}
                  {isChecked ? item.serviceCharge : showServiceCharge[index]}
                </td>
                <td>{item.VAT}</td>
                <td>
                  {item.PaymentMode === "Split" ? (
                    <div className="split-total-dropdown">
                      <span>{item.Total}</span>
                      <div className="split-dropdown-content">
                        {item?.SplitPayments?.map((payment, i) => (
                          <p key={i}>
                            {payment?.PaymentMode}: {payment?.PaymentAmount}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    item.Total
                  )}
                </td>
                <td className="no-wrap">{item.PaymentMode}</td>
                <td>{item.GuestName}</td>
              </tr>
            ))}
          {isOrder && (
            <tr>
              <td>
                <span className="detail-info">Total:</span>
              </td>
              <td>
                {" "}
                <span className="detail-info">{totalInfo.TotalOrders}</span>
              </td>
              <td>
                <span className="detail-info">
                  {totalInfo.DiscountAmountSum}
                </span>
              </td>
              <td>
                {" "}
                <span className="detail-info">
                  {isChecked ? totalInfo.SubtotalAmountSum : totalSubUnit}
                </span>
              </td>
              <td>
                {" "}
                <span className="detail-info">
                  {isChecked ? totalInfo.ServiceChargeSum : ServiceSum}
                </span>
              </td>
              <td>
                {" "}
                <span className="detail-info">{totalInfo.VatSum}</span>
              </td>
              <td>
                <span className="detail-info">{totalInfo.TotalSum}</span>
              </td>
            </tr>
          )}
        </table>
      </div>
      <BillDetail
        billInfo={billInfo}
        billInfoList={billInfoList}
        selected={selected}
      />
    </div>
  );
};

export default BillTable;
