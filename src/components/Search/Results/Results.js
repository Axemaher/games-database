import React from 'react';
import './Results.scss';
import RatingStars from '../../RatingStars/RatingStars';

const Results = ({ data, searchValue }) => {
    console.log(data)
    return (
        <div className="search-results">
            <h1>Search results for <b>{searchValue}</b></h1>
            <ul className="search-results-list">
                {data.map(el =>
                    <li className="search-result">
                        <img className="search-result__cover" src={`//images.igdb.com/igdb/image/upload/t_cover_big/${el.cover.image_id}.jpg`} alt="" />
                        <a href="#" className="search-result__game-name">{el.name}</a>
                        <ul className="platform-list">
                            {el.platforms.map(el => (
                                <li className="platform-label">{el.abbreviation}</li>
                            ))}
                        </ul>
                        <div class="rating">
                            <RatingStars data={el.aggregated_rating} />
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Results;