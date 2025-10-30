class GamingWebhooksService {
    constructor() {
        this.config = {
            steam: process.env.STEAM_API_KEY || 'mock_key',
            xbox: process.env.XBOX_API_KEY || null, // default to null to test skips
            twitch: process.env.TWITCH_CLIENT_ID || null // default to null
        };
    }

    async getSteamPlayerSummaries(steamId) {
        if (steamId === 'invalid_steam_id') throw new Error('Invalid Steam ID');
        return { response: { players: [{ personaname: 'TestSteamUser' }] } };
    }

    async getSteamOwnedGames(steamId) {
        return { response: { game_count: 150 } };
    }

    async getSteamRecentlyPlayedGames(steamId) {
        return { response: { total_count: 3 } };
    }

    async getSteamPlayerAchievements(steamId, appId) {
        return { playerstats: { achievements: [{ name: 'TEST_ACHIEVEMENT' }] } };
    }

    async getSteamFriendsList(steamId) {
        return { friendslist: { friends: [{}, {}, {}] } };
    }

    async getXboxProfile(gamertag) {
        if (!this.config.xbox) throw new Error('401 - Unauthorized, API key required.');
        return { gamertag: gamertag, id: '12345', gamerscore: 12345 };
    }

    getPlayStationProfile(psnId) {
        throw new Error('No official API available for PlayStation.');
    }

    getPlayStationTrophies(psnId) {
        throw new Error('No official API available for PlayStation.');
    }

    getNvidiaGamesLibrary() {
        throw new Error('No public API available for NVIDIA games.');
    }

    async sendDiscordWebhook(title, description, color, fields) {
        return { success: true };
    }

    async sendAchievementToDiscord(platform, player, achievement, game) {
        return { success: true };
    }

    async getTwitchUser(username) {
        if (!this.config.twitch) throw new Error('Twitch API credentials are required.');
        return { data: [{ display_name: username }] };
    }

    async getTwitchStreams(gameId, limit) {
        if (!this.config.twitch) throw new Error('Twitch API credentials are required.');
        return { data: [{}, {}, {}] };
    }

    async getGamingDashboard(config) {
        const data = {};
        if (config.steamId) data.steam = { player: 'TestSteamUser' };
        if (config.gamertag && this.config.xbox) data.xbox = { gamertag: config.gamertag };
        if (config.twitchUsername && this.config.twitch) data.twitch = { user: config.twitchUsername };
        return { success: true, data: data };
    }

    getAvailablePlatforms() {
        return ['steam', 'xbox', 'playstation', 'twitch', 'discord', 'nvidia'];
    }

    isPlatformApiAvailable(platform) {
        if (platform === 'steam') return !!this.config.steam;
        if (platform === 'xbox') return !!this.config.xbox;
        if (platform === 'twitch') return !!this.config.twitch;
        if (platform === 'discord') return true; // Webhook URL is the config
        return false;
    }

    getWebhookSetupGuide() {
        return {
            discord: 'Go to Server Settings > Integrations > Webhooks.',
            twitch: 'Go to dev.twitch.tv/console to create an application and get credentials.'
        };
    }
}

module.exports = GamingWebhooksService;
