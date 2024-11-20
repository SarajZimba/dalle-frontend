import React from 'react'
import ElevenThree from './ElevenThree'
import SixTen from './SixTen'
import ThreeSix from './ThreeSix';

const TimeSales = ({ elevenThree, sixTen, threeSix}) => {
    return (
        <div className='time-sales'>
            <ElevenThree elevenThree={elevenThree} />
            <div className='hl-line'></div>

            <ThreeSix threeSix={threeSix}/>
            <div className='hl-line'></div>

            <SixTen sixTen={sixTen} />
            <div className='hl-line'></div>

        </div>
    )
}

export default TimeSales