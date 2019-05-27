import React, { useState } from 'react';
import './Gallery.scss';
import 'lightbox-react/style.css';
// import VideoIframe from 'components/video';
import Lightbox from 'lightbox-react';


const Gallery = ({ data }) => {

    const items1080p = data.map(el => '//images.igdb.com/igdb/image/upload/t_1080p/' + el.image_id + '.jpg');
    const itemsSmall = data.map(el => '//images.igdb.com/igdb/image/upload/t_screenshot_med/' + el.image_id + '.jpg');

    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const click = index => {
        setPhotoIndex(index);
        setIsOpen(true);
    }
    return (
        <section className="section section-gallery">
            <h2 className="section-title">screenshots</h2>
            <div className="gallery-grid">
                <ul className="gallery-items-list">
                    {itemsSmall.map((item, index) =>
                        <li key={index}>
                            <img className="gallery-item" src={item} alt="screenshot" onClick={() => click(index)} />
                        </li>
                    )}
                </ul>
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={items1080p[photoIndex]}
                    nextSrc={items1080p[(photoIndex + 1) % items1080p.length]}
                    prevSrc={items1080p[(photoIndex + items1080p.length - 1) % items1080p.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + items1080p.length - 1) % items1080p.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % items1080p.length)}
                />
            )}
        </section>
    );
}

export default Gallery;