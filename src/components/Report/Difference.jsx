import React from 'react'

const Difference = ({total, average, difference}) => {
    // Function to find the time difference
    // function getTimeInSeconds(str) {
    //     let curr_time = [];
    //     curr_time = str.split(':')
    //     for (let i = 0; i < curr_time.length; i++) {
    //         curr_time[i] = parseInt(curr_time[i]);
    //     }

    //     let t = curr_time[0] * 60 * 60
    //         + curr_time[1] * 60
    //         + curr_time[2];

    //     return t;
    // }

    // Function to convert seconds back to hh::mm:ss
    // format
    // function convertSecToTime(t) {
    //     let hours = Math.floor(t / 3600);
    //     let hh = hours < 10 ? "0" + (hours).toString()
    //         : (hours).toString();
    //     let min = Math.floor((t % 3600) / 60);
    //     let mm = min < 10 ? "0" + (min).toString()
    //         : (min).toString();
    //     let sec = ((t % 3600) % 60);
    //     let ss = sec < 10 ? "0" + (sec).toString()
    //         : (sec).toString();
    //     let ans = hh + ":" + mm + ":" + ss;
    //     console.log('difference', ans)
    //     return ans;
    // }

    // Function to find the time gap
    // function timeGap(st, et) {
    //     let t1 = getTimeInSeconds(st);
    //     let t2 = getTimeInSeconds(et);
    //     let time_diff
    //         = (t1 - t2 < 0) ? t2 - t1 : t1 - t2;

    //     return convertSecToTime(time_diff);
    // }

    // Driver Code
    // let st = total, et = average;

    // document.write(timeGap(st, et) + '<br>');

    return (
        <div>
            <p>{total>average?<div className='prep-time-red'>{difference}</div>:<div className='prep-time-green'>{difference}</div>}</p>
        </div>
    )
}

export default Difference
