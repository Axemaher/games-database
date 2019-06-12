import React, { useState } from 'react';
import axios from 'axios';
import './Search.scss';
import { url, method, headers, search } from '../../js/api';
import Filter from './Filter';
import * as filtersData from '../../js/filtersData';


const Search = () => {

    const [searchValue, setSearchValue] = useState("");
    const [filters, setFilters] = useState(false)

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
                    <div className="filter-btn" onClick={() => setFilters(!filters)}>
                        <span>Filters {filters && "close"}</span>
                    </div>
                    <div className={filters ? "filter-container--open" : "filter-container"}>
                        <Filter
                            data={filtersData.platformFilterCheckboxes}
                            getQuery={platformFilterQuery}
                            queryStart="platforms"
                            title="Platform"
                        />
                        <Filter
                            data={filtersData.gamemodesFilterCheckboxes}
                            getQuery={platformFilterQuery}
                            queryStart="game_modes"
                            title="Game modes"
                        />
                        <Filter
                            data={filtersData.perspectivesFilterCheckboxes}
                            getQuery={platformFilterQuery}
                            queryStart="perspectives"
                            title="Perspectives"
                        />
                        <Filter
                            data={filtersData.regionsFilterCheckboxes}
                            getQuery={platformFilterQuery}
                            queryStart="regions"
                            title="Regions"
                        />
                        <Filter
                            data={filtersData.esrbFilterCheckboxes}
                            getQuery={platformFilterQuery}
                            queryStart="esrb"
                            title="Esrb"
                        />
                        <Filter
                            data={filtersData.pegiFilterCheckboxes}
                            getQuery={platformFilterQuery}
                            queryStart="pegi"
                            title="Pegi"
                        />
                        <Filter
                            data={filtersData.genresFilterCheckboxes}
                            getQuery={platformFilterQuery}
                            queryStart="genres"
                            title="Genres"
                        />
                        <Filter
                            data={filtersData.themesFilterCheckboxes}
                            getQuery={platformFilterQuery}
                            queryStart="themes"
                            title="Themes"
                        />
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