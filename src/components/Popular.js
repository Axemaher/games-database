import React from 'react';

const Popular = props => {
    const items = props.data.map(el => (
        <li key={el.id} className="popular-item">
            <div className="popular-item__image" style={{ backgroundImage: "url('//images.igdb.com/igdb/image/upload/t_screenshot_med/" + el.screenshots[Math.floor((Math.random() * el.screenshots.length) + 0)].image_id + ".jpg')" }}></div>
            <a href="#" className="popular-item__name">{el.name}</a>
            <span className="popular-item__game-info">
                <p className="game-info__category">{el.themes[0].name}</p>
                <p className="game-info__releasing-date">{el.release_dates[0].human}</p>
            </span>
            <p className="popular-item__description">{el.summary}</p>
        </li>)
    )
    return (
        <section className="section section-popular">
            <h2 className="seciton-title">Popular</h2>
            <div className="popular">
                <ul className="popular__list">
                    {items}
                </ul>
            </div>
        </section>
    );
}

export default Popular;