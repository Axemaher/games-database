import React from 'react';
import './Results.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Results = ({ data, searchValue }) => {
    console.log(data)
    return (
        <section className="search-results">
            <p className="search-result-label">Search results ({data.length}) for <b>{searchValue}</b></p>
            <ul className="search-results-list">
                {data.map(el =>
                    <li key={el.id} className="search-result">
                        <img className="search-result__cover" src={`//images.igdb.com/igdb/image/upload/t_cover_big/${el.cover.image_id}.jpg`} alt="" />
                        <Link
                            className="search-result__game-name"
                            to={`/game/${el.id}`}>{el.name}</Link>
                        <ul className="platform-list">
                            {el.platforms && <>{
                                el.platforms.map(el => (
                                    <li key={el.id} className="platform-label">{el.abbreviation}</li>
                                ))}
                            </>}
                        </ul>
                        <div className="rating">
                            {el.aggregated_rating &&
                                <>
                                    <FontAwesomeIcon className="rating__icon" icon={['fa', 'star']} /> <p>{el.aggregated_rating.toFixed()}/100</p>
                                </>
                            }

                        </div>
                    </li>
                )}
            </ul>
        </section>
    );
}

export default Results;