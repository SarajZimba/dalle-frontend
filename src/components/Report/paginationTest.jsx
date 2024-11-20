import React from 'react';

const PaginationTest = ({ setCurrentPage, currentPage, nPages }) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }
    return (
        <div>
            <ul className="pagination">
                <li className="page-item"><a class="page-link"  onClick={prevPage}>Previous</a></li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} className={`pg-item ${currentPage === pgNumber ? "active" : ''}`}>
                        <a className="page-link" onClick={() => setCurrentPage(pgNumber)}>
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item"><a class="page-link" href="#" onClick={nextPage}>Next</a></li>
              
            </ul>
        </div>
    )
}

export default PaginationTest