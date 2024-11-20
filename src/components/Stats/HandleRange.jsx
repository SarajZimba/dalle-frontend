import React from 'react'

const HandleRange = ({handleFreely, handleWeekly, handleMonthly}) => {
    return (
        <div className='select'>
            <p className='select-heading'>Please select range:</p>
            <div className='select-range'>
                <input type="radio" id="Monthly" name="fav_language" value="Monthly" onClick={handleMonthly} />
                <label for="Monthly">Monthly</label>
            </div>
            <div className='select-range'>
                <input type="radio" id="Weekly" name="fav_language" value="Weekly" onClick={handleWeekly} />
                <label for="Weekly">Weekly</label>
            </div>
            <input type="radio" id="Free" name="fav_language" value="Free" onClick={handleFreely} />
            <label for="Free">Free Range</label>
        </div>
    )
}

export default HandleRange