import React from 'react';
import './GameNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GameNav = ({ tabsData, page, setPage }) => {
    return (
        <section className="sticky">
            <nav className="game-navigation">
                <ul className="navigation-group">
                    {tabsData.map(page => (
                        <li key={page.id} className="navigation-element " onClick={() => setPage(page.id)}>
                            <FontAwesomeIcon className="navigation-element__icon" icon={page.icon} />
                            <span className="navigation-element__label">{page.name}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </section >
    );
}

export default GameNav;


// navigation-element-active