import React from 'react';
import './GameNav.scss';
import { tabsInformations } from '../../../js/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

const GameNav = ({ dataVisibles, pageId }) => {
    console.log(dataVisibles)

    const { tabInfo, tabDesc, tabVideo, tabScreen, tabArt, tabPulses } = tabsInformations;
    const { informations, description, videos, screenshots, artworks, pulses } = dataVisibles;

    let navElements = [
        informations && tabInfo,
        description ? tabDesc : null,
        videos ? tabVideo : null,
        screenshots ? tabScreen : null,
        artworks ? tabArt : null,
    ];

    navElements = navElements.filter(el => el !== null)
        .map(page => (
            <Link
                to={page.name}
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                key={page.id}
                className={pageId === page.id ? "navigation-element navigation-element-active" : "navigation-element"}>
                <FontAwesomeIcon className="navigation-element__icon" icon={page.icon} />
                <span className="navigation-element__label">{page.name}</span>
            </Link>
        ))

    return (
        <section className="sticky">
            <nav className="game-navigation">
                <ul className="navigation-group">
                    {navElements}
                </ul>
            </nav>
        </section >
    );
}

export default GameNav;

