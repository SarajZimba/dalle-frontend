import React from 'react'

const Category = ({ categories, categoryVoid }) => {
  let categoryList = categories
  return (
    <div>
      <h5 className='completed'>Completed</h5>
      {!(categoryList?.error)&& Object.entries(categoryList).map(([key, value]) => (
        <div className='course-type' key={key}>
          <h5 >{key}</h5>
          <ul>
            {console.log(value, "value of completed")}
            {value.map((food, index) => (
              <li key={index}>{food.ItemName}
                <span className='food-quantity'>{food.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h5 className='void'>Void</h5>
      {/* {console.log(categoryVoid?.error)} */}
      {!(categoryVoid?.error) && Object.entries(categoryVoid).map(([key, value]) => (
        <div className='course-type' key={key}>
          <h5>{key}</h5>
          <ul>
            {value.map((food, index) => (
              <li key={index}>{food.ItemName}
                <span className='food-quantity'>{food.quantity}</span>
              </li>
            ))
           
          }
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Category
