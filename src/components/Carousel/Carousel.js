import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './Carousel.scss'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Carousel = ({ data, sectionTitle }) => {
    const slidesData = data.map((item, index) => (
        <article key={index} className="carousel-item">
            <Link to={`/game/${item.id}`} className="carousel-item-link">
                <div className="carousel-item-link__image" style={{ backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${item.cover}.jpg)` }}></div>
                <h3 className="carousel-item-link__name">{item.name}</h3>
            </Link>
        </article>
    ));


    const responsive = {
        0: { items: 3 },
        500: { items: 4 },
        700: { items: 5 },
        900: { items: 6 },
        1024: { items: 8 },
    };


    return (
        <section className="section section-carousel">
            <h2 className="section-title">{sectionTitle}</h2>
            <AliceCarousel
                items={slidesData}
                responsive={responsive}
                autoPlayInterval={3000}
                autoPlayDirection="rtl"
                autoPlay={false}
                buttonsDisabled={true}
                fadeOutAnimation={true}
                mouseDragEnabled={true}
                playButtonEnabled={false}
                disableAutoPlayOnAction={true}
                dotsDisabled={true}
            />
        </section>
    );
}

export default Carousel;