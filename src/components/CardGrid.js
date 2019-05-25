import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";


const CardGrid = ({ data, sectionTitle }) => {
    const items = data.map(el => (
        <li key={el.id} className="card-grid-item">
            <div className="card-grid-item__image" style={{ backgroundImage: "url('//images.igdb.com/igdb/image/upload/t_screenshot_med/" + el.screenshots[Math.floor((Math.random() * el.screenshots.length) + 0)].image_id + ".jpg')" }}></div>
            <Link to={`/game/${el.id}`} className="card-grid-item__name">{el.name}</Link>
            <span className="card-grid-item__game-info">
                <p className="game-info__category">{el.themes[0].name}</p>
                <p className="game-info__releasing-date">{el.release_dates[0].human}</p>
            </span>
            <p className="card-grid-item__description">{el.summary}</p>
        </li>)
    )
    return (
        <section className="section section-card-grid">
            <h2 className="section-title">{sectionTitle}</h2>
            <div className="card-grid">
                <ul className="card-grid__list">
                    {items}
                </ul>
            </div>
        </section>
    );
}

export default CardGrid;