import React from 'react'
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { AiOutlineEye } from "react-icons/ai";

const SameCustomerList = ({ header, handleDetails, similarCustomer }) => {
    return (
        <div className="table-customer-list-responsive">
            <table className="table-customer-list">
                <thead>
                    <tr className='position-sticky'>
                        {header.map((detail, index) => (
                            <th key={index}>{detail}</th>
                        ))}
                        {/* <th><button><BsThreeDotsVertical /></button></th> */}
                    </tr>
                </thead>
                <tbody>
                    {similarCustomer.map((info, index) => (
                        <tr className='position-sticky' id='q1button'  tabIndex="1" key={index} onClick={()=>handleDetails(info.guestID)}>
                            <td>{info.guestID}</td>
                            <td>{info.GuestName}</td>
                            <td>{info.guestEmail}</td>
                            <td>{info.guestAddress}</td>
                            <td>{info.guestPhone}</td>
                            {/* <th><button ><AiOutlineEye /></button></th> */}
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SameCustomerList