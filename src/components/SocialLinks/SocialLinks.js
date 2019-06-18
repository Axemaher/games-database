import React from 'react';
import './SocialLinks.scss'
import { websitesIcons } from '../../js/utils';


const SocialLinks = ({ data }) => {
    return (
        <nav>
            <ul className="social-links">
                {data.map((link, index) => (
                    <li key={index} className="social-link">
                        {websitesIcons(link.category, link.url)}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SocialLinks;