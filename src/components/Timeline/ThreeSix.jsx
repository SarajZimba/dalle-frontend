import React from 'react'

const ThreeSix = ({ threeSix }) => {
    return (
        <div className='time-stamp'>
            <label className='evening'>3PM- 6PM <span>&#8594;  {threeSix.pct + "%"}</span></label>
            <p>{threeSix.total_count} X <span>{threeSix.total_sales}</span></p>
            <div className='numbers'>
                <p><span>Dine-In :</span>{threeSix.dinein_sales === 'None' ? "-" : <>{threeSix.dinein_count} X {threeSix.dinein_sales}</>}</p>
                <p><span>Order :</span>{threeSix.tab_sales === 'None' ? "-" : <>{threeSix.tab_count} X {threeSix.tab_sales}</>}</p>
            </div>
        </div>
    )
}

export default ThreeSix