import React, { useState } from 'react';
import './Gallery.scss';
import 'lightbox-react/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Lightbox from 'lightbox-react';


const Gallery = ({ data, sectionTitle, videoGallery }) => {
    const maxThumbnails = 10;
    let items = [];
    let thumbnails = [];
    if (videoGallery) {
        items = data.map(el => <iframe className="video-iframe" src={'//www.youtube.com/embed/' + el.video_id} frameBorder="0" allowFullScreen></iframe>);
        data.forEach(function (el) {
            thumbnails.push({
                url: 'http://img.youtube.com/vi/' + el.video_id + '/0.jpg',
                name: el.name
            })
        });
    } else {
        items = data.map(el => '//images.igdb.com/igdb/image/upload/t_1080p/' + el.image_id + '.jpg');
        data.forEach(function (el) {
            thumbnails.push({
                url: '//images.igdb.com/igdb/image/upload/t_screenshot_med/' + el.image_id + '.jpg'
            })
        });
    }

    thumbnails.length > maxThumbnails ? thumbnails.length = maxThumbnails : thumbnails.length = thumbnails.length;

    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const click = index => {
        setPhotoIndex(index);
        setIsOpen(true);
    }
    return (
        <section className="section section-gallery">
            <h2 className="section-title">{sectionTitle}</h2>
            <div className="gallery-grid">
                <ul className="gallery-items-list">
                    {thumbnails.map((item, index) =>
                        <li className={videoGallery ? 'video-container' : "image-container"} key={index}>
                            <img className={videoGallery ? 'video-item' : "image-item"} src={item.url} alt="screenshot" onClick={() => click(index)} />
                            {videoGallery && <span className="video-name">{item.name}</span>}
                        </li>
                    )}
                </ul>
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={items[photoIndex]}
                    nextSrc={items[(photoIndex + 1) % items.length]}
                    prevSrc={items[(photoIndex + items.length - 1) % items.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + items.length - 1) % items.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % items.length)}
                />
            )}
        </section>
    );
}

export default Gallery;