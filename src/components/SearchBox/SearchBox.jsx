import React from 'react'
import { IoSearch } from 'react-icons/io5'

function SearchBox() {
  return  (
    <div className='searchBox position-relative d-flex align-items-center'>
      <span><IoSearch/></span>
      <input type='text' placeholder='Search here...'/>
    </div>
  )
}

export default SearchBox
