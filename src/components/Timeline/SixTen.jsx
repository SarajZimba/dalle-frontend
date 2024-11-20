import React from 'react'

const SixTen = ({ sixTen }) => {
    return (
        <div className='time-stamp'>
            <label className='late'>6PM- 10PM &#8594; <span>{sixTen.pct + "%"}</span></label>
            <p>{sixTen.total_count} X <span>{sixTen.total_sales}</span></p>
            <div className='numbers'>
                <p><span>Dine-In : </span> {sixTen.dinein_sales === 'None' ? "-" : <>{sixTen.dinein_count} X {sixTen.dinein_sales}</>}</p>
                <p><span>Order : </span>{sixTen.tab_sales === 'None' ? "-" : <>{sixTen.tab_count} X {sixTen.tab_sales}</>}</p>
            </div>
        </div>
    )
}

export default SixTen