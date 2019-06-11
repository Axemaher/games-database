import React, { useState } from 'react';
import axios from 'axios';
import './Search.scss';
import { url, method, headers, search } from '../../js/api';
import PlatformFilter from './PlatformFilter';



const Search = () => {

    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        console.log(searchValue)
        axios({
            url, method, headers, data: search
            // url, method, headers, data: search + `search "${searchValue}";`
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.error(err));
    }

    const handleChange = e => {
        setSearchValue(e.target.value)
    };
    const platformFilterQuery = data => {
        console.log(data)
    }


    return (
        <main className="main">
            <div className="searching">
                <form onSubmit={handleSubmit}>
                    <div className="searching-container">
                        <label htmlFor="searchInput"></label>
                        <input
                            className="search-input"
                            type="text"
                            autoFocus
                            name="searchInput"
                            value={searchValue}
                            onChange={handleChange}
                            placeholder="Search..."
                        />
                    </div>
                    <div className="platform-filter">
                        <PlatformFilter getQuery={platformFilterQuery} />
                    </div>
                </form>
            </div>
            {/* <div className="search-results">
                search results
            </div> */}
        </main>
    );
}

export default Search;