import React, { useEffect } from 'react';
import './Desc.scss';

const Desc = ({ summary, storyline, sectionTitle }) => {


    return (
        <section className="section section-desc">
            <h2 className="section-title">{sectionTitle}</h2>
            <div className="description">
                {summary !== undefined &&
                    <div className="description-container">
                        <p className="description-category">Specification:</p>
                        <p className="description-content">{summary}</p>
                    </div>
                }
                {storyline !== undefined &&
                    <div className="description-container">
                        <p className="description-category">Storyline:</p>
                        <p className="description-content">{storyline}
                        </p>
                    </div>
                }
            </div>
        </section>
    );
}

export default Desc;
