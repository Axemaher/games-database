import React from 'react';
import developer from '../images/developer-ico.png';
import wikipedia from '../images/wikipedia-ico.png';
import facebook from '../images/facebook-ico.png';
import twitter from '../images/twitter-ico.png';
import twitch from '../images/twitch-ico.png';
import instagram from '../images/instagram-ico.png';
import youtube from '../images/youtube-ico.png';
import android from '../images/android-ico.png';
import steam from '../images/steam-ico.png';
import reddit from '../images/reddit-ico.png';
import googleplus from '../images/googleplus-ico.png';
import pintirest from '../images/pintirest-ico.png';
import soundcloud from '../images/soundcloud-ico.png';



export const websitesIcons = (value, url) => {
    switch (value) {
        case 1: return <a href={url}><img className="social-icon" src={developer} alt="" /></a>;
        case 2:
        case 3: return <a href={url}><img className="social-icon" src={wikipedia} alt="" /></a>;
        case 4: return <a href={url}><img className="social-icon" src={facebook} alt="" /></a>;
        case 5: return <a href={url}><img className="social-icon" src={twitter} alt="" /></a>;
        case 6: return <a href={url}><img className="social-icon" src={twitch} alt="" /></a>;
        case 8: return <a href={url}><img className="social-icon" src={instagram} alt="" /></a>;
        case 9: return <a href={url}><img className="social-icon" src={youtube} alt="" /></a>;
        case 12: return <a href={url}><img className="social-icon" src={android} alt="" /></a>;
        case 13: return <a href={url}><img className="social-icon" src={steam} alt="" /></a>;
        case 14: return <a href={url}><img className="social-icon" src={reddit} alt="" /></a>;
        case 16: return <a href={url}><img className="social-icon" src={googleplus} alt="" /></a>;
        case 19: return <a href={url}><img className="social-icon" src={pintirest} alt="" /></a>;
        case 20: return <a href={url}><img className="social-icon" src={soundcloud} alt="" /></a>;
        default: return null;
    }
}

export const gameCategory = value => {
    switch (value) {
        case 0: return [{ name: "Main game" }];
        case 1: return [{ name: "DLC" }];
        case 2: return [{ name: "Expansion" }];
        case 3: return [{ name: "Bundle" }];
        case 4: return [{ name: "Standalone expansion" }];
        default: return undefined;
    }
}

export const gameStatus = value => {
    switch (value) {
        case 0: return [{ name: "Released" }];
        case 2: return [{ name: "Alpha" }];
        case 3: return [{ name: "Beta" }];
        case 4: return [{ name: "Early access" }];
        case 5: return [{ name: "Offline" }];
        case 6: return [{ name: "Cancelled" }];
        default: return undefined
    }
}

export const tabsInformations = {
    tabInfo: { name: "Informations", icon: "info", id: 1 },
    tabDesc: { name: "Description", icon: "list", id: 2 },
    tabVideo: { name: "Videos", icon: "video", id: 3 },
    tabScreen: { name: "Screenshots", icon: "desktop", id: 4 },
    tabArt: { name: "Artworks", icon: "pencil-ruler", id: 5 },
    tabPulses: { name: "Pulses", icon: "newspaper", id: 6 },
}

export default websitesIcons;