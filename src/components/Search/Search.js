import React, { useState } from 'react';
import axios from 'axios';
import './Search.scss';
import { url, method, headers, search } from '../../js/api';


const Search = () => {

    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        console.log(searchValue)
        axios({
            url, method, headers, data: search + `search "${searchValue}";`
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.error(err));
    }

    const handleChange = e => {
        setSearchValue(e.target.value)
    };

    return (
        <main className="main">
            <div className="searching">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="searchInput">search</label>
                    <input type="text" name="searchInput" value={searchValue} onChange={handleChange} />
                </form>
            </div>
            <div className="search-results">
                search results
            </div>
        </main>
    );
}

export default Search;