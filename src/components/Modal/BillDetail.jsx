import React from 'react'
import "../../scss/bill.scss";
import "../../scss/History/modal.scss";

const BillDetail = ({ billInfoList, billInfo, selected }) => {
    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <h5 className="modal-title" id="exampleModalLabel">{selected}</h5>
                    </div>
                    <div className="modal-body">
                        <table className='modal-bill-info-table'>
                            <thead>
                                <div className="modal-detail">
                                    <h6>invoice</h6>
                                    <div className='report-info'>
                                        <label>Bill No</label>
                                        <span>{billInfo.bill_no}</span>
                                    </div>
                                    <div className='report-info'>
                                        <label>Start Time</label>
                                        <span>{billInfo.Start_Time}</span>
                                    </div>
                                    <div className='report-info'>
                                        <label>End Time</label>
                                        <span>{billInfo.End_Time}</span>
                                    </div>

                                    <div className='report-info'>
                                        <label>Type:</label>
                                        <span>{billInfo.Type}</span>
                                    </div>
                                    <div className='report-info'>
                                        <label>Table No:</label>
                                        <span>{billInfo.Table_No}</span>
                                    </div>
                                    <div className='report-info'>
                                        <label>Employee:</label>
                                        <span>{billInfo.employee}</span>
                                    </div>
                                    <div className='report-info'>
                                        <label>Payment Mode:</label>
                                        <span>{billInfo.PaymentMode}</span>
                                    </div>
                                </div>
                            </thead>
                            <tbody>
                                <div className='bill-info-details'>
                                        <tr className='position-sticky'>
                                            <th>Item Name</th>
                                            <th>Item Rate</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                        {!billInfoList?.error && 
                                        billInfoList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.itemName}</td>
                                                <td>{item.itemrate}</td>
                                                <td>{item?.Quantity}</td>
                                                <td>{item.total}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td>Total: </td>
                                            <td></td>
                                            <td>{billInfo.TotalCount}</td>
                                            <td></td>
                                        </tr>
                                </div>
                            </tbody>
                            <tfoot>
                                <div className="modal-amount">
                                    <p><span>Service Charge: </span>{billInfo.serviceCharge}</p>
                                    <p><span>VAT</span>{billInfo.vat}</p>
                                    <p><span>Total</span>{billInfo.total}</p>
                                    <small>(After discount)</small>
                                </div>
                            </tfoot>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillDetail