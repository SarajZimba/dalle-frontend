import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ResponseModal from './responseModal';

const PaymentModal = ({ setCreditLeft, setCreditWisePaymentList, setCreditWiseBillList,setCreditDetails, show, handleClose, token, selectedOutlet, selectedCustomer, uniqueID}) => {
    let baseUrl = process.env.REACT_APP_BASE_URL

    const [respond, setRespond] = useState("");
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const handleCancel = () => setOpenModal(false);
    const handleShowed = () => setOpenModal(true);
    const [paymentAmount, setPaymentAmount] = useState("")
    const [paymentMode, setPaymentMode] = useState("")

    const handleChange = (event) => {
        setPaymentAmount(event.target.value)
    }

    const handleSelectChange = (event) => {
        setPaymentMode(event.target.value)
    }

    const handleSave = async () => {
        console.log("guest id to insert credit",uniqueID)
        try {
            let response = await axios.post(`${baseUrl}/customerCreditInsert`, {
                token: token,
                outlet: `${selectedOutlet}`,
                Amount: paymentAmount,
                PaymentMode: paymentMode,
                CustomerName: `${selectedCustomer}`,
                guestID:`${uniqueID}`,
                // Outlet_OrderID:`${orderID}`
            })
            setRespond(response.data.success)
            //to show the updated data without refreshing after making payment
            axios.post(`${baseUrl}/customerCreditDetails`, {
                token: token,
                outlet: `${selectedOutlet}`,
                CustomerName: `${selectedCustomer}`,
                guestID: `${uniqueID}`
              })
                .then((response) => {
                  setCreditDetails(response.data.CreditDetails)
                  setCreditWiseBillList(response.data.CreditWiseBillList)
                  setCreditWisePaymentList(response.data.CreditWisePaymentList)
                })
                .catch((error) => {
                  console.log(error)
                })

                axios.post(`${baseUrl}/customerCreditleft`, {
                    token: `${token}`,
                    outlet: `${selectedOutlet}`,
                    type: `All`,
                  })
                    .then((response) => {
                      setCreditLeft(response.data)
                    })
                    .catch((error) => {
                      console.log(error)
                    })
            if (response.data.success) {
                handleClose()
                handleShowed()
            }

        }
        catch (error) {
            setError(error.response.data.error)
            // if (error.response.data.error) {
            //     handleClose()
            //     handleShowed()
            // }
        }
    }

    const options = [
        {
            label: "Cash",
            value: "Cash",
        },
        {
            label: "Credit Card",
            value: "Credit Card",
        },

        {
            label: "Mobile Payment",
            value: "Mobile Payment",
        },
        {
            label: "Bank Cheque",
            value: "Bank Cheque",
        }]

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='amount-detail'>
                        <label>Amount</label>
                        <div>
                            <input type="text" value={paymentAmount} className="form-control" id="Amount" placeholder="1000" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="amount-detail">
                        <label>Payment Mode</label>
                        <div>
                            <select className="select-style" onChange={handleSelectChange}>
                                <option value={""}>{"Select payment mode"}</option>
                                {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <p className='error-color'>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleSave} className="btn-save">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ResponseModal openModal={openModal} respond={respond} handleCancel={handleCancel} />
        </div>
    )
}

export default PaymentModal