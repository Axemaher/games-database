import React from 'react';
import './SocialLinks.scss'
import { websitesIcons } from '../../js/websitesIcons';


const SocialLinks = ({ data }) => {
    return (
        <ul className="social-links">
            {data.map((link, index) => (
                <li key={index} className="social-link">
                    {websitesIcons(link.category, link.url)}
                </li>
            ))}
        </ul>
    );
}

export default SocialLinks;