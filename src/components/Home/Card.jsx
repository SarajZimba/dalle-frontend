import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faMinus, faCutlery, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Calculation from './Calculation';
import ConvertTime from './convertTime';

const Card = ({ handleFinished, handleCookProcess, handleCompleted, handleMinus, handleCancel, index, element }) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
            <div className='ticket'>
                <div className='item-order-type' >
                    <div className='kot-id'>
                       <p>Kot ID: <span>{element.KOTID}</span></p> 
                    </div>
                    <p className='item-type'>{element.orderType}</p>
                    <div className='top-icon'>
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="check-icon"
                            onClick={() => handleCompleted(element.table_id)} />
                    </div>
                </div>
                <div className='item-course-detail'>
                    <div className='item-detail'>
                        <div className='time-guests'>
                            <ConvertTime timeOrder={element.orderTime} />
                            <p>Guests :<span>{element.Guest_count}</span>
                            </p>
                        </div>
                        <h1>{element.tableNum==="Take-Away"?"":element.tableNum}</h1>
                        <p>{element.employee}</p>
                        <Calculation Ordertime={element.orderTime} />
                    </div>
                    {element
                        .OrderItemDetailsList
                        .map((item, index) => (
                            <div className='course-item' key={index}>
                                <p className='course-type'></p>
                                <div className='item-list'>
                                    <div className='item-name'>
                                        <p className='quantity-box'>
                                            <span>{item.Quantity}</span></p>
                                        <p className='food'>{item.ItemName}</p>
                                        <div className='item-check-process'>
                                            <div>
                                                <FontAwesomeIcon icon={faCheck} className="completed-icon" onClick={() => handleFinished(item.item_id)} />
                                            </div>
                                            {(item.Quantity > 1) ?
                                                <FontAwesomeIcon icon={faMinus} className="minus-icon" onClick={() => handleMinus(item.item_id)} />
                                                :
                                                <FontAwesomeIcon icon={faTimes} className="delete-icon" onClick={() => handleCancel(item.item_id)} />
                                            }
                                        </div>
                                    </div>
                                    {(item.Modifications === '')
                                        ? ""
                                        : <p className='modifications'>-{item.Modifications}</p>
                                    }
                                </div>
                            </div>
                        ))}
                    {(element.currentState === "Started") ?
                        <button className='seen-btn' type='submit' onClick={() => handleCookProcess(element.table_id)}>
                            SEEN
                        </button>
                        :
                        <button className='start-cooking' type='submit' onClick={() => handleCookProcess(element.table_id)}>
                            <FontAwesomeIcon icon={faCutlery} />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Card