import React from 'react'

const ConvertTime = ({ time }) => {
    const timeString12hr = new Date('1970-01-01T' + time + 'Z')
        .toLocaleTimeString('en-US',
            { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        )
        // console.log(timeString12hr)
    // function tConvert(time) {
    //     time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    //     if (time.length > 1) { // If time format correct
    //         time = time.slice(1);  // Remove full string match value
    //         time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    //         time[0] = +time[0] % 12 || 12;
    //     }
    //     return time.join('');
    // }



    return (

        (time ?
            <p>{timeString12hr}</p>
            :
            ""
        )

    )
}

export default ConvertTime