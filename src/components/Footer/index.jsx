import React from 'react'
import "../../scss/footer.scss";

const Footer = () => {
    const d = new Date();
    let year = d.getFullYear();
    return (
        <div className='footer'>{year}© SilverLine System Integrators Pvt. Ltd.</div>
    )
}

export default Footer