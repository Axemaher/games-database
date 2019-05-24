const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://api-v3.igdb.com/games';
const API_KEY = '5fccca9c9526e977331af051c184e3cd';

const dateNow = Math.round((new Date()).getTime() / 1000);


export const url = `${proxyUrl}${targetUrl}`;
export const method = 'POST';
export const headers = {
    'Accept': 'application/json',
    'user-key': API_KEY,
};

export const topReleases = `limit 16;
fields cover.*, name, screenshots.*, release_dates.human, websites.*, involved_companies.company.name, themes.name;
where first_release_date > ${dateNow} & first_release_date < ${dateNow + 604800} & screenshots > 0;
sort popularity desc;`;

export const popular = `limit 8;
fields id, name, screenshots.*, summary, release_dates.human, involved_companies.company.*, themes.*;
where popularity > 100 & screenshots > 0 & release_dates != null & themes != 42;
sort popularity desc;`;