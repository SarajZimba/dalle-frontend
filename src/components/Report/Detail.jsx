import React from 'react';

 const Detail = ({information}) => {
    const { DineIn, DineIn_totalSales, TakeAway_totalSales, TakeAway, Voids,  Cooked, cooking } = information;

    return (
        <div className='report-flex'>
            <div className='report-info-two'>
                <div className='report-info'>
                    <label>Dine In:</label>
                    <span>{DineIn}</span>
                </div>
                <div className='report-info'>
                    <label>Takeaway:</label>
                    <span>{TakeAway}</span>
                </div>
                <div className='report-info'>
                    <label>Takeaway-TotalSales:</label>
                    <span>{TakeAway_totalSales}</span>
                </div>
                <div className='report-info'>
                    <label>Voids:</label>
                    <span>{Voids}</span>
                </div>
                <div className='report-info'>
                    <label>Cooked:</label>
                    <span>{Cooked}</span>
                </div>
                <div className='report-info'>
                    <label>Cooking:</label>
                    <span>{cooking}</span>
                </div>
            </div>
        </div>
    )
}
export default Detail