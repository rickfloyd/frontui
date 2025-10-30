// src/api/sportsApiConfig.ts
export const SPORTS_APIS = {
  // 🏈 NFL, NBA, MLB, NHL, UFC
  sportsdata: {
    base: "https://api.sportsdata.io/v4",
    key: "0c28b26bd13441dfadf9a5001932be88", // SportsDataIO key
    endpoints: {
      nflStandings: "/nfl/scores/json/Standings/2025",
      nbaGames: "/nba/scores/json/GamesByDate/2025-OCT-18",
      mlbTeams: "/mlb/scores/json/teams",
      nhlTeams: "/nhl/scores/json/teams",
      ufcEvents: "/mma/scores/json/Schedule/UFC",
    },
  },

  // 🏎 Formula 1 / Motorsport
  f1: {
    base: "https://ergast.com/api/f1",
    endpoints: {
      standings: "/current/driverStandings.json",
      schedule: "/current.json",
    },
  },

  // ⚽ Global Football
  soccer: {
    base: "https://www.thesportsdb.com/api/v1/json/3",
    endpoints: {
      leagues: "/all_leagues.php",
      events: "/eventspastleague.php?id=4328",
    },
  },

  // 🥊 Combat Sports
  combat: {
    base: "https://api.sportsdata.io/v4/mma",
    endpoints: {
      fighters: "/scores/json/Fighters",
      events: "/scores/json/Schedule/UFC",
    },
  },

  // 🎟 Vegas Events (non-gambling)
  vegasEvents: {
    eventbrite:
      "https://www.eventbriteapi.com/v3/events/search/?q=las+vegas+sports&token=YOUR_EVENTBRITE_TOKEN",
    googlePlaces:
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=sports+venues+las+vegas&key=YOUR_GOOGLE_KEY",
  },
};
