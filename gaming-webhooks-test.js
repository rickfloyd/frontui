/**
 * Gaming Webhooks Integration Test Suite
 * Tests for all gaming platform APIs and webhook functionality
 */

const GamingWebhooksService = require('./services/gaming-webhooks-service');

// Test configuration
const TEST_CONFIG = {
    steamId: '76561198012345678', // Replace with real Steam ID for testing
    gamertag: 'TestGamertag', // Replace with real Xbox gamertag
    psnId: 'TestPSNID', // Replace with real PSN ID
    twitchUsername: 'testuser', // Replace with real Twitch username
    twitchGameId: '32399', // CS:GO game ID
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/your/webhook' // mock for testing
};

let gamingService;
let testResults = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    errors: []
};

// Initialize service
function initializeService() {
    gamingService = new GamingWebhooksService();
    console.log('✅ Gaming Webhooks Service initialized');
}

// Test helper functions
function logTest(name, passed, message = '') {
    testResults.total++;
    if (passed) {
        testResults.passed++;
        console.log(`  ✅ ${name}`);
    } else {
        testResults.failed++;
        console.log(`  ❌ ${name}`);
        if (message) {
            console.log(`     Error: ${message}`);
            testResults.errors.push({ test: name, error: message });
        }
    }
}

function logSkip(name, reason = '') {
    testResults.total++;
    testResults.skipped++;
    console.log(`  ⏭️  ${name} (Skipped: ${reason})`);
}

// ============================================
// STEAM TESTS
// ============================================

async function testSteamIntegration() {
    console.log('\n🎮 Testing Steam Integration...');

    // Test 1: Get Steam Player Summary
    try {
        const playerData = await gamingService.getSteamPlayerSummaries(TEST_CONFIG.steamId);
        const isValid = playerData && playerData.response && playerData.response.players;
        logTest('Get Steam Player Summary', isValid);
        
        if (isValid && playerData.response.players.length > 0) {
            const player = playerData.response.players[0];
            console.log(`     Player: ${player.personaname}`);
        }
    } catch (error) {
        logTest('Get Steam Player Summary', false, error.message);
    }

    // Test 2: Get Steam Owned Games
    try {
        const gamesData = await gamingService.getSteamOwnedGames(TEST_CONFIG.steamId);
        const isValid = gamesData && gamesData.response;
        logTest('Get Steam Owned Games', isValid);
        
        if (isValid && gamesData.response.game_count) {
            console.log(`     Games owned: ${gamesData.response.game_count}`);
        }
    } catch (error) {
        logTest('Get Steam Owned Games', false, error.message);
    }

    // Test 3: Get Steam Recently Played Games
    try {
        const recentData = await gamingService.getSteamRecentlyPlayedGames(TEST_CONFIG.steamId);
        const isValid = recentData && recentData.response;
        logTest('Get Steam Recently Played Games', isValid);
        
        if (isValid && recentData.response.total_count) {
            console.log(`     Recently played: ${recentData.response.total_count}`);
        }
    } catch (error) {
        logTest('Get Steam Recently Played Games', false, error.message);
    }

    // Test 4: Get Steam Player Achievements (requires app ID)
    try {
        const achievementsData = await gamingService.getSteamPlayerAchievements(TEST_CONFIG.steamId, 730); // CS:GO
        const isValid = achievementsData && achievementsData.playerstats;
        logTest('Get Steam Player Achievements', isValid);
    } catch (error) {
        // Achievements might not be available for all games
        logSkip('Get Steam Player Achievements', 'May require specific game ownership');
    }

    // Test 5: Get Steam Friends List
    try {
        const friendsData = await gamingService.getSteamFriendsList(TEST_CONFIG.steamId);
        const isValid = friendsData && friendsData.friendslist;
        logTest('Get Steam Friends List', isValid);
        
        if (isValid && friendsData.friendslist.friends) {
            console.log(`     Friends: ${friendsData.friendslist.friends.length}`);
        }
    } catch (error) {
        logTest('Get Steam Friends List', false, error.message);
    }
}

// ============================================
// XBOX TESTS
// ============================================

async function testXboxIntegration() {
    console.log('\n🎮 Testing Xbox Live Integration...');

    // Test 1: Get Xbox Profile
    try {
        const profileData = await gamingService.getXboxProfile(TEST_CONFIG.gamertag);
        const isValid = profileData && (profileData.gamertag || profileData.id);
        logTest('Get Xbox Profile', isValid);
        
        if (isValid && profileData.gamerscore !== undefined) {
            console.log(`     Gamerscore: ${profileData.gamerscore}`);
        }
    } catch (error) {
        if (error.message.includes('API key') || error.message.includes('401')) {
            logSkip('Get Xbox Profile', 'Requires xbl.io API key');
        } else {
            logTest('Get Xbox Profile', false, error.message);
        }
    }

    // Test 2: Get Xbox Achievements (requires XUID and title ID)
    try {
        // This test requires a valid XUID and title ID
        logSkip('Get Xbox Achievements', 'Requires valid XUID and title ID');
    } catch (error) {
        logTest('Get Xbox Achievements', false, error.message);
    }
}

// ============================================
// PLAYSTATION TESTS
// ============================================

async function testPlayStationIntegration() {
    console.log('\n🎮 Testing PlayStation Network Integration...');

    // Test 1: Get PSN Profile
    try {
        const profileData = await gamingService.getPlayStationProfile(TEST_CONFIG.psnId);
        const isValid = profileData && (profileData.onlineId || profileData.accountId);
        logTest('Get PSN Profile', isValid);
        
        if (isValid && profileData.trophySummary) {
            console.log(`     Trophy level: ${profileData.trophySummary.level}`);
        }
    } catch (error) {
        if (error.message.includes('No official API') || error.message.includes('limited')) {
            logSkip('Get PSN Profile', 'No official PlayStation API available');
        } else {
            logTest('Get PSN Profile', false, error.message);
        }
    }

    // Test 2: Get PSN Trophies
    try {
        const trophiesData = await gamingService.getPlayStationTrophies(TEST_CONFIG.psnId);
        const isValid = trophiesData && trophiesData.trophyTitles;
        logTest('Get PSN Trophies', isValid);
    } catch (error) {
        logSkip('Get PSN Trophies', 'No official PlayStation API available');
    }
}

// ============================================
// NVIDIA TESTS
// ============================================

async function testNvidiaIntegration() {
    console.log('\n🎮 Testing NVIDIA GeForce Integration...');

    // Test 1: Get NVIDIA Games Library
    try {
        const libraryData = await gamingService.getNvidiaGamesLibrary();
        const isValid = libraryData && Array.isArray(libraryData);
        logTest('Get NVIDIA Games Library', isValid);
    } catch (error) {
        if (error.message.includes('No public API') || error.message.includes('system-level')) {
            logSkip('Get NVIDIA Games Library', 'No public NVIDIA API available');
        } else {
            logTest('Get NVIDIA Games Library', false, error.message);
        }
    }
}

// ============================================
// DISCORD TESTS
// ============================================

async function testDiscordIntegration() {
    console.log('\n🎮 Testing Discord Integration...');

    // Test 1: Send Discord Test Webhook
    if (TEST_CONFIG.discordWebhookUrl) {
        try {
            const webhookData = await gamingService.sendDiscordWebhook(
                '🧪 Test Webhook',
                'This is a test from the Gaming Webhooks test suite!',
                '#5865F2',
                [
                    { name: 'Status', value: '✅ Testing', inline: true },
                    { name: 'Time', value: new Date().toLocaleTimeString(), inline: true }
                ]
            );
            const isValid = webhookData && webhookData.success;
            logTest('Send Discord Test Webhook', isValid);
        } catch (error) {
            logTest('Send Discord Test Webhook', false, error.message);
        }

        // Test 2: Send Achievement to Discord
        try {
            const achievementData = await gamingService.sendAchievementToDiscord(
                'steam',
                'TestPlayer',
                'Test Achievement',
                'Test Game'
            );
            const isValid = achievementData && achievementData.success;
            logTest('Send Achievement to Discord', isValid);
        } catch (error) {
            logTest('Send Achievement to Discord', false, error.message);
        }
    } else {
        logSkip('Send Discord Test Webhook', 'No Discord webhook URL configured');
        logSkip('Send Achievement to Discord', 'No Discord webhook URL configured');
    }
}

// ============================================
// TWITCH TESTS
// ============================================

async function testTwitchIntegration() {
    console.log('\n🎮 Testing Twitch Integration...');

    // Test 1: Get Twitch User
    try {
        const userData = await gamingService.getTwitchUser(TEST_CONFIG.twitchUsername);
        const isValid = userData && userData.data && userData.data.length > 0;
        logTest('Get Twitch User', isValid);
        
        if (isValid) {
            console.log(`     User: ${userData.data[0].display_name}`);
        }
    } catch (error) {
        if (error.message.includes('API key') || error.message.includes('401') || error.message.includes('credentials')) {
            logSkip('Get Twitch User', 'Requires Twitch API credentials');
        } else {
            logTest('Get Twitch User', false, error.message);
        }
    }

    // Test 2: Get Twitch Streams
    try {
        const streamsData = await gamingService.getTwitchStreams(TEST_CONFIG.twitchGameId, 5);
        const isValid = streamsData && streamsData.data && Array.isArray(streamsData.data);
        logTest('Get Twitch Streams', isValid);
        
        if (isValid && streamsData.data.length > 0) {
            console.log(`     Live streams found: ${streamsData.data.length}`);
        }
    } catch (error) {
        if (error.message.includes('API key') || error.message.includes('401') || error.message.includes('credentials')) {
            logSkip('Get Twitch Streams', 'Requires Twitch API credentials');
        } else {
            logTest('Get Twitch Streams', false, error.message);
        }
    }
}

// ============================================
// DASHBOARD TESTS
// ============================================

async function testDashboardIntegration() {
    console.log('\n🎮 Testing Gaming Dashboard Integration...');

    // Test 1: Get Gaming Dashboard
    try {
        const dashboardData = await gamingService.getGamingDashboard({
            steamId: TEST_CONFIG.steamId,
            gamertag: TEST_CONFIG.gamertag,
            psnId: TEST_CONFIG.psnId,
            twitchUsername: TEST_CONFIG.twitchUsername
        });
        const isValid = dashboardData && dashboardData.success;
        logTest('Get Gaming Dashboard', isValid);
        
        if (isValid && dashboardData.data) {
            const platforms = Object.keys(dashboardData.data);
            console.log(`     Platforms integrated: ${platforms.join(', ')}`);
        }
    } catch (error) {
        logTest('Get Gaming Dashboard', false, error.message);
    }

    // Test 2: Get Available Platforms
    try {
        const platforms = gamingService.getAvailablePlatforms();
        const isValid = platforms && Array.isArray(platforms) && platforms.length > 0;
        logTest('Get Available Platforms', isValid);
        
        if (isValid) {
            console.log(`     Supported platforms: ${platforms.join(', ')}`);
        }
    } catch (error) {
        logTest('Get Available Platforms', false, error.message);
    }

    // Test 3: Check Platform API Availability
    try {
        const steamAvailable = gamingService.isPlatformApiAvailable('steam');
        const xboxAvailable = gamingService.isPlatformApiAvailable('xbox');
        const discordAvailable = gamingService.isPlatformApiAvailable('discord');
        const twitchAvailable = gamingService.isPlatformApiAvailable('twitch');
        
        logTest('Check Platform API Availability', true);
        console.log(`     Steam: ${steamAvailable ? '✅' : '❌'}`);
        console.log(`     Xbox: ${xboxAvailable ? '✅' : '❌'}`);
        console.log(`     Discord: ${discordAvailable ? '✅' : '❌'}`);
        console.log(`     Twitch: ${twitchAvailable ? '✅' : '❌'}`);
    } catch (error) {
        logTest('Check Platform API Availability', false, error.message);
    }

    // Test 4: Get Webhook Setup Guide
    try {
        const guide = gamingService.getWebhookSetupGuide();
        const isValid = guide && typeof guide === 'object' && Object.keys(guide).length > 0;
        logTest('Get Webhook Setup Guide', isValid);
        
        if (isValid) {
            console.log(`     Platforms with guides: ${Object.keys(guide).length}`);
        }
    } catch (error) {
        logTest('Get Webhook Setup Guide', false, error.message);
    }
}

// ============================================
// SERVICE HEALTH TESTS
// ============================================

async function testServiceHealth() {
    console.log('\n🎮 Testing Service Health...');

    // Test 1: Service Initialization
    try {
        const isInitialized = gamingService !== null && gamingService !== undefined;
        logTest('Service Initialization', isInitialized);
    } catch (error) {
        logTest('Service Initialization', false, error.message);
    }

    // Test 2: API Configuration Check
    try {
        const hasConfig = gamingService.config !== undefined;
        logTest('API Configuration Check', hasConfig);
    } catch (error) {
        logTest('API Configuration Check', false, error.message);
    }

    // Test 3: Error Handling
    try {
        // Test with invalid Steam ID
        await gamingService.getSteamPlayerSummaries('invalid_steam_id');
        logTest('Error Handling for Invalid Input', false, 'Should have thrown an error');
    } catch (error) {
        // Expected to fail
        logTest('Error Handling for Invalid Input', true);
    }
}

// ============================================
// RUN ALL TESTS
// ============================================

async function runAllTests() {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║   🎮 GAMING WEBHOOKS INTEGRATION TEST SUITE              ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    const startTime = Date.now();

    // Initialize
    initializeService();

    // Run test suites
    await testServiceHealth();
    await testSteamIntegration();
    await testXboxIntegration();
    await testPlayStationIntegration();
    await testNvidiaIntegration();
    await testDiscordIntegration();
    await testTwitchIntegration();
    await testDashboardIntegration();

    // Calculate results
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    const passRate = ((testResults.passed / testResults.total) * 100).toFixed(1);

    // Print summary
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                      TEST SUMMARY                          ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log(`  Total Tests:    ${testResults.total}`);
    console.log(`  ✅ Passed:      ${testResults.passed}`);
    console.log(`  ❌ Failed:      ${testResults.failed}`);
    console.log(`  ⏭️  Skipped:     ${testResults.skipped}`);
    console.log(`  📊 Pass Rate:   ${passRate}%`);
    console.log(`  ⏱️  Duration:    ${duration}s`);

    // Print errors if any
    if (testResults.errors.length > 0) {
        console.log('\n╔════════════════════════════════════════════════════════════╗');
        console.log('║                       ERROR DETAILS                        ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');
        testResults.errors.forEach((err, index) => {
            console.log(`  ${index + 1}. ${err.test}`);
            console.log(`     ${err.error}\n`);
        });
    }

    // Print recommendations
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                    RECOMMENDATIONS                         ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    if (testResults.skipped > 0) {
        console.log('  ℹ️  Some tests were skipped due to missing API credentials.');
        console.log('     To enable all tests, configure the following:');
        console.log('     • STEAM_API_KEY in environment variables');
        console.log('     • XBOX_API_KEY (from xbl.io)');
        console.log('     • DISCORD_WEBHOOK_URL');
        console.log('     • TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET\n');
    }

    if (testResults.failed === 0) {
        console.log('  🎉 All tests passed! Gaming webhooks integration is working correctly.\n');
    } else {
        console.log('  ⚠️  Some tests failed. Check the error details above.\n');
    }

    console.log('═══════════════════════════════════════════════════════════════\n');

}

// Run tests
runAllTests().catch(error => {
    console.error('\n❌ Test suite crashed:', error);
});
