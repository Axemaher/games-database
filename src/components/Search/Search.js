import React, { useState } from 'react';
import axios from 'axios';
import './Search.scss';
import { url, method, headers, search } from '../../js/api';
import Filter from './Filter';
import Results from './Results/Results';
import Loader from '../Loader/Loader';

import * as filtersData from '../../js/filtersData';


const Search = () => {

    const [searchValue, setSearchValue] = useState("");

    const handleChange = e => {
        setSearchValue(e.target.value)
    };

    const [data, setData] = useState(null);
    const handleSubmit = e => {
        e.preventDefault();
        const query = `
        fields *, cover.*, platforms.*;
        search "${searchValue}";
        where aggregated_rating != null;
        `

        // const query = `
        // fields *;
        // search "${searchValue}";
        // where 
        // ${xplatformFilterQuery};
        // `

        // console.log(query)
        axios({
            // url, method, headers, data: search
            url, method, headers, data: query
        })
            .then(response => {
                // console.log(response.data)
                setData(response.data)
            })
            .catch(err => console.error(err));
    }

    const [xplatformFilterQuery, setPlatformFilterQuery] = useState("");

    const platformFilterQuery = data => {
        console.log(data)
        return data
    }


    const [filters, setFilters] = useState(false)
    const filterComponentsData = [
        {
            data: filtersData.platformFilterCheckboxes,
            getQuery: setPlatformFilterQuery,
            queryStart: "platforms",
            title: "Platform"
        },
        {
            data: filtersData.gamemodesFilterCheckboxes,
            getQuery: platformFilterQuery,
            queryStart: "game_modes",
            title: "Game modes"
        },
        {
            data: filtersData.perspectivesFilterCheckboxes,
            getQuery: platformFilterQuery,
            queryStart: "perspectives",
            title: "Perspectives"
        },
        {
            data: filtersData.regionsFilterCheckboxes,
            getQuery: platformFilterQuery,
            queryStart: "regions",
            title: "Regions"
        },
        {
            data: filtersData.esrbFilterCheckboxes,
            getQuery: platformFilterQuery,
            queryStart: "esrb",
            title: "Esrb"
        },
        {
            data: filtersData.pegiFilterCheckboxes,
            getQuery: platformFilterQuery,
            queryStart: "pegi",
            title: "Pegi"
        },
        {
            data: filtersData.genresFilterCheckboxes,
            getQuery: platformFilterQuery,
            queryStart: "genres",
            title: "Genres"
        },
        {
            data: filtersData.themesFilterCheckboxes,
            getQuery: platformFilterQuery,
            queryStart: "themes",
            title: "Themes"
        },
    ]
    // console.log(xplatformFilterQuery)
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
                        {filterComponentsData.map(el => (
                            <Filter
                                key={el.title}
                                data={el.data}
                                getQuery={el.getQuery}
                                queryStart={el.queryStart}
                                title={el.title}
                            />
                        ))}

                    </div>
                </form>
            </div>
            {data === null ? <Loader /> : <Results data={data} searchValue={searchValue} />}
        </main>
    );
}

export default Search;