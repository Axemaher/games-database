import React, { useEffect } from 'react';
import './Desc.scss';

const Desc = ({ summary, storyline, sectionTitle }) => {

    const myRef = React.createRef();
    useEffect(() => {
        window.scrollTo({
            top: myRef.current.offsetTop,
            behavior: 'smooth',
        })
    }, [myRef])
    console.log(storyline)
    return (
        <section ref={myRef} className="section section-desc">
            <h2 className="section-title">{sectionTitle}</h2>
            <div className="description">
                {summary !== undefined &&
                    <div className="description-container">
                        <p className="description-category">Description:</p>
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
