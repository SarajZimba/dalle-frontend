import React from 'react'
// import "../../scss/sidebar.scss";
import "../../scss/home.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faCutlery } from '@fortawesome/free-solid-svg-icons'

const Cooking = () => {
    return (
            <div className="row">
                <div className="col-md-4 col-lg-3 col-sm-2" >
                    <div className='ticket'>
                        <div className='item-order-type'>
                            <div className='top-icon'>
                                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                            </div>
                            <p className='item-type'>Dine-In</p>
                        </div>
                        <div className='item-course-detail'>
                            <div className='item-detail'>
                                <p>2:53 PM</p>
                                <h1>10</h1>
                                <p>Employee name</p>
                            </div>
                            <div className='course-item'>
                                <p className='course-type'>Entree</p>
                                <div className='item-list'>
                                    <div className='item-name'>
                                        <p><span>Quantity</span> X ItemName</p>
                                        <FontAwesomeIcon icon={faTimes} className="delete-icon" />
                                    </div>
                                    <p className='description'>-Medium rare, potato wedge</p>
                                    <p className='allergies'>-Allergies<span>Peanut</span></p>
                                </div>
                            </div>
                            <div className='course-item'>
                                <p className='course-type'>Appetizer</p>
                                <div className='item-list'>
                                    <div className='item-name'>
                                        <p><span>Quantity</span> X ItemName</p>
                                        <FontAwesomeIcon icon={faTimes} className="delete-icon" />
                                    </div>
                                    <p className='add-ons'>Extra Cheese</p>
                                    <p className='allergies'>-Allergies<span>Peanut</span></p>
                                </div>
                                <div className='item-list'>
                                    <div className='item-name'>
                                        <p><span>Quantity</span> X ItemName</p>
                                        <FontAwesomeIcon icon={faTimes} className="delete-icon" />
                                    </div>
                                    <p className='allergies'>-Allergies<span>Peanut</span></p>
                                </div>
                            </div>
                            <button className='start-cooking' type='submit' >
                                <FontAwesomeIcon icon={faCutlery} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Cooking
