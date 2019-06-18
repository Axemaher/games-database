import React from 'react';
import './CardGrid.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const CardGrid = ({ data, sectionTitle }) => (
    <section className="section section-card-grid">
        <h2 className="section-title">{sectionTitle}</h2>
        <div className="card-grid">
            {data.map(el => (
                <article key={el.id} className="card">
                    <header className="card-header" style={{ backgroundImage: "url('//images.igdb.com/igdb/image/upload/t_screenshot_med/" + el.screenshot + ".jpg')" }}></header>
                    <section className="card-section" >
                        <Link className="card-link" to={`/game/${el.id}`}><h3 className="card-title">{el.name}</h3></Link>
                        <p className="card-description">{el.summary}</p>
                    </section>
                    <footer className="card-footer">
                        <span>{el.theme}</span>
                        <span>{el.release_date}</span>
                    </footer>
                </article>
            ))}
        </div>
    </section>
);

export default CardGrid;
