import React from 'react'

const ElevenThree = ({elevenThree }) => {
    return (
        <div className='time-stamp'>
            <label className='morning'> 11AM -3PM <span>&#8594;   {elevenThree.pct + "%"}</span></label>
            <p>{elevenThree.total_count} X <span>{elevenThree.total_sales}</span></p>
            <div className='numbers'>
                <p><span>Dine-In : </span> {elevenThree.dinein_sales === 'None' ? "-" : <>{elevenThree.dinein_count} X {elevenThree.dinein_sales}</>}</p>
                <p><span>Order :</span>{elevenThree.tab_sales === 'None' ? "-" : <>{elevenThree.tab_count} X {elevenThree.tab_sales}</>}</p>
            </div>
        </div>
    )
}

export default ElevenThree