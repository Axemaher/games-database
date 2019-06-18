import React from 'react';
import './Articles.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Articles = ({ sectionTitle, data }) => {


    return (
        <section className="section section-articles">
            <h2 className="section-title">{sectionTitle}</h2>
            <div className="articles">
                {data.map(el => (
                    <article key={el.id} className="article">
                        <header className="article-header" style={{ backgroundImage: `url(${el.image})` }}></header>
                        <section className="article-section" >
                            <a className="article-link" href={el.url}><h3 className="article-title">{el.title}</h3></a>
                            <p className="article-summary">{el.summary}</p>
                        </section>
                        <footer className="article-footer">
                            <span>{el.created}</span>
                            <span>{el.author}</span>
                        </footer>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Articles;