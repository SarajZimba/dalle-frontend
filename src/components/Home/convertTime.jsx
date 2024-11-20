import React from 'react'

const ConvertTime = ({timeOrder}) => {
    if(!timeOrder){
        // console.log("a")
        return 
    }
        function tConvert(time) {
            time = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
            if (time.length > 1) { // If time format correct
                time = time.slice(1);  // Remove full string match value
                time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
                time[0] = +time[0] % 12 || 12; // Adjust hours
            }
            return time.join(''); 
        }
        let convertTime=tConvert(timeOrder)

    return (
        <p>
            {convertTime}
        </p>
    )
}

export default ConvertTime
