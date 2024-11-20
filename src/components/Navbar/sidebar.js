import React, {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "../../scss/sidebar.scss";
import Category from '../Report/category';

const Sidebar = ({ handleSidebar, categories, categoryVoid}) => {


  return (
    <div>
      <button className="btn-bar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" onClick={() => handleSidebar()}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Cooked Item Summary</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <Category categories={categories} categoryVoid={categoryVoid}/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
