import React from 'react'
import { Map, SearchComponent } from '.'

const SearchPage = () => {
  return (
    <main>
    <div className="hero mt-20 mb-20">
       
        <div className="flex-1 mt-20 padding-x padding-y">

          <h1 className="hero__title">Search for a disaster</h1>
          <SearchComponent/>
          <Map></Map>
          </div>
          </div>
  
    </main>
  )
}

export default SearchPage