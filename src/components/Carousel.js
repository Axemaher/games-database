import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"
import { BrowserRouter as Link } from "react-router-dom";

const Carousel = props => {

    const slidesData = props.data.map((item, i) => (
        <div key={i} className="releasing-item">
            <Link to={`/game/${item.id}`} className="releasing-item-href">
                <div className="releasing-item__image" style={{ backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg)` }}></div>
                <p className="releasing-item__name">{item.name}</p>
            </Link>
        </div>
    ));


    const responsive = {
        0: { items: 2 },
        500: { items: 3 },
        700: { items: 4 },
        900: { items: 5 },
        1024: { items: 7 },
    };


    return (
        <section className="section section-carousel">
            <h2 className="section-title">Coming Soon</h2>
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