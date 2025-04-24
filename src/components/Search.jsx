import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='search'>
            <div>
            <img src="./Search.svg" alt="Search-Svg" />
            <input
                type="text"
                placeholder="Search through 1000+ movies"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                />
                </div>
        </div> 
    )
}

export default Search
