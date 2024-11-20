import React from 'react';
import "../../scss/pagination.scss";

const Pagination = ({ pageLength, handleNumber}) => {
    // const prevPage = () => {
    //     if (currentPage !== 1)
    //         setCurrentPage(currentPage - 1)
    // }
    return (
        <div className='pagination-width'>
            <ul className="pagination justify-content-center">
                {/* <li className="page-item disabled">
                    <a className="page-link">Previous</a>
                </li> */}
                {
                    pageLength.map((i, index) => (
                        <li className="page-item" key={index} >
                            <a className="page-link" href="#" onClick={() => handleNumber(i)}>{i}</a>
                        </li>

                    ))
                }
            </ul>
        </div >
    )
}

export default Pagination