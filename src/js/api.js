const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const mainAdress = "https://api-v3.igdb.com/games";
const pulseGroupsAdress = "https://api-v3.igdb.com/pulse_groups";
const feedsAdress = "https://api-v3.igdb.com/feeds";
const API_KEY = '0b05b1c911ee9a22cbadcbefe2184ab0';

// axemaher: 6e25c84bd2fd1f90934ea9083acd98d6
// axemaher1: 0b05b1c911ee9a22cbadcbefe2184ab0

const dateNow = Math.round((new Date()).getTime() / 1000);


export const url = `${proxyUrl}${mainAdress}`;
export const urlFeed = `${proxyUrl}${feedsAdress}`;
export const urlPulses = `${proxyUrl}${pulseGroupsAdress}`;
export const method = 'POST';
export const headers = {
    'Accept': 'application/json',
    'user-key': API_KEY,
};

export const topReleases = `limit 8;
fields cover.image_id, name, screenshots.image_id, rating, release_dates.human, websites.category, websites.url, involved_companies.company.name, themes.name;
where first_release_date > ${dateNow} & first_release_date < ${dateNow + 2419200} & screenshots > 0 & cover != null & involved_companies.company.name != null;
sort popularity desc;`;

export const popular = `limit 8;
fields id, name, screenshots.image_id, summary, rating, release_dates.human, themes.name;
where aggregated_rating > 80 & pulse_count > 30 & screenshots > 0 & release_dates != null & themes != 42;
sort popularity desc;`;

export const gameById = `fields *, 
alternative_names.*, 
artworks.*, 
bundles, 
collection, 
cover.*, 
game_engines.name, 
game_modes.name,
genres.name, 
involved_companies.company.*, 
platforms.name, 
player_perspectives.name, 
screenshots.image_id, 
themes.name,
similar_games.id,
similar_games.name, 
similar_games.cover.image_id, 
videos.name,
videos.video_id, 
release_dates.human, 
websites.*`

export const search = `fields *; where platform = ();`

export const feed = `limit 6; 
fields *, pulse.*, pulse.website.*; 
where pulse != null 
& pulse.image != null
& pulse.author != null; 
sort created_at desc;`;

export const pulses = `limit 6; 
fields *, pulses.*, pulses.website.*;`;


// age_ratings	Reference ID for Age Rating	The PEGI rating
// aggregated_rating	Double	Rating based on external critic scores
// aggregated_rating_count	Integer	Number of external critic scores
// bundles	Reference ID for Game	If a bundle, these are the games inside it
// category	Category Enum	The category of this game
// collection	Reference ID for Collection	The series the game belongs to
// dlcs	Reference ID for Game	DLCs for this game
// expansions	Reference ID for Game	Expansions of this game
// follows	Integer	Number of people following a game
// franchise	Reference ID for Franchise	The main franchise
// franchises	Array of Franchise IDs	Other franchises the game belongs to
// hypes	Integer	Number of follows a game gets before release
// involved_companies	Array of Involved Company IDs	Companies who developed this game
// keywords	Array of Keyword IDs	Associated keywords
// multiplayer_modes	Array of Multiplayer Mode IDs	Multiplayer modes for this game
// name	String	
// parent_game	Reference ID for Game	If a DLC, expansion or part of a bundle, this is the main game or bundle
// platforms	Array of Platform IDs	Platforms this game was released on
// popularity	Double	The popularity score of the game
// pulse_count	Integer	Number of pulse articles for this game
// rating	Double	Average IGDB user rating
// rating_count	Integer	Total number of IGDB user ratings
// release_dates	Array of Release Date IDs	Release dates of this game
// screenshots	Array of Screenshot IDs	Screenshots of this game
// similar_games	Reference ID for Game	Similar games
// slug	String	A url-safe, unique, lower-case version of the name
// standalone_expansions	Reference ID for Game	Standalone expansions of this game
// status	Status Enum	The status of the games release
// storyline	String	A short description of a games story
// summary	String	A description of the game
// tags	Array of Tag Numbers	Related entities in the IGDB API
// time_to_beat	Reference ID for Time To Beat	How long the game takes to be completed
// total_rating	Double	Average rating based on both IGDB user and external critic scores
// total_rating_count	Integer	Total number of user and external critic scores
