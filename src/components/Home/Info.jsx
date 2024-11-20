import React from 'react'
import { IoFastFoodOutline, IoFastFood, IoPeopleOutline } from "react-icons/io5";
import { FcClock } from "react-icons/fc";
import { RiNumbersLine } from "react-icons/ri";
import "../../scss/info.scss";

const Info = ({ info }) => {
    const { completedToday, cooking, itemsCompetedToday, started, totalOrdersToday, voidTotalToday } = info
    return (
        <div className='dashboard'>
            <div className="row">
                <div className="col dashboard-items">
                    <FcClock className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Orders not seen:<span>{started}</span></label>
                    </div>
                </div>
                <div className="col dashboard-items">
                    <IoFastFoodOutline className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Cooking:<span>{cooking}</span></label>
                        
                    </div>
                </div>
                <div className="col dashboard-items">
                    <IoFastFood className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Cooked:<span>{completedToday}</span></label>
                        
                    </div>
                </div>
                <div className="col dashboard-items">
                    <IoPeopleOutline className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Total Orders today:<span>{totalOrdersToday}</span></label>
                        
                    </div>
                </div>
                <div className="col dashboard-items">
                    <RiNumbersLine className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Total items prepared:<span>{(itemsCompetedToday === null)? "0":itemsCompetedToday}</span></label>
                    </div>
                </div>
                <div className="col dashboard-items-void">
                    <RiNumbersLine className='icon' />
                    <div className='padding-dashboard-items'>
                        <label>Total void today:<span>{(voidTotalToday === null)? "0":voidTotalToday}</span></label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info