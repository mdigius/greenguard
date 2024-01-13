import React from 'react'
import { Map, SearchComponent } from '.'

const SearchPage = () => {
  return (
    <main>
      <br /><br /><br /><br />
    <div className="hero mt-20 mb-20">
       
        <div className="flex-1 mt-20 padding-x padding-y">
          <SearchComponent/>
          <Map></Map>
        </div>
      </div>
    </main>
  )
}

export default SearchPage