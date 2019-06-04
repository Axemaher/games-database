import React from 'react';
import './GameNav.scss';
import { tabsInformations } from '../../../js/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GameNav = ({ dataVisibles, pageId, setPage }) => {
    console.log(dataVisibles)

    const { tabInfo, tabDesc, tabVideo, tabScreen, tabArt } = tabsInformations;
    const { informations, description, videos, screenshots, artworks } = dataVisibles;

    let navElements = [
        informations && tabInfo,
        description ? tabDesc : null,
        videos ? tabVideo : null,
        screenshots ? tabScreen : null,
        artworks ? tabArt : null
    ];

    navElements = navElements.filter(el => el !== null)
        .map(page => (
            <li key={page.id} className={pageId === page.id ? "navigation-element navigation-element-active" : "navigation-element"} onClick={() => setPage(page.id)}>
                <FontAwesomeIcon className="navigation-element__icon" icon={page.icon} />
                <span className="navigation-element__label">{page.name}</span>
            </li>
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

