import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'

const Search = ({ handleChange, outlet, handleEnter }) => {
    return (
        <div className='input-outlet'>
                <SelectSearch
                    options={outlet}
                    defaultValue=""
                    search
                    placeholder="Select Outlet Name"
                    onChange={(event) => handleEnter(event)}
                />
            {/* <button type="sumbit" className="btn-enter-icon">
                <span><FontAwesomeIcon icon={faSearch} onClick={handleEnter}/></span>
            </button> */}
        </div>
    )
}

export default Search