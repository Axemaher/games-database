import React, { useEffect } from 'react';
import './Desc.scss';

const Desc = ({ summary, storyline, sectionTitle }) => {


    return (
        <section className="section section-desc">
            <h2 className="section-title">{sectionTitle}</h2>
            <section className="description">
                {summary !== undefined &&
                    <article className="description-container">
                        <h3 className="description-category">Specification:</h3>
                        <p className="description-content">{summary}</p>
                    </article>
                }
                {storyline !== undefined &&
                    <article className="description-container">
                        <h3 className="description-category">Storyline:</h3>
                        <p className="description-content">{storyline}
                        </p>
                    </article>
                }
            </section>
        </section>
    );
}

export default Desc;
