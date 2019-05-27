import React from 'react';
import './RatingStars.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const RatingStars = ({ data }) => {
    const ratingCount = `${data.toFixed(0)}/100`;
    const ratingCountToStars = (data.toFixed(0) / 2) / 10;
    const starsRating = []
    for (let i = 0; i < 5; i++) {
        if (ratingCountToStars >= i) {
            starsRating.push(<FontAwesomeIcon className="rating__icon" icon={['fa', 'star']} />)
        } else {
            starsRating.push(<FontAwesomeIcon className="rating__icon" icon={['far', 'star']} />)
        }
    }
    return (
        <div className="rating">
            <ul className="rating">
                {starsRating.map((el, index) => (
                    <li key={index} className="rating-star">
                        {el}
                    </li>
                ))}
            </ul>
            <span className="rating-count">{ratingCount}</span>
        </div>
    );
}

export default RatingStars;