/**
 * Sports API Integration Test Suite
 * Comprehensive testing for all American and World sports APIs
 */

import SportsAPIService from './services/sports-api-service.js';

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('  🏆 SPORTS API INTEGRATION TEST SUITE');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const sportsService = new SportsAPIService();

// Test results tracker
const testResults = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    results: []
};

// Test helper function
function testResult(testName, success, message, data = null) {
    testResults.totalTests++;
    if (success) {
        testResults.passed++;
        console.log(`  ✅ PASS: ${testName}`);
        if (message) console.log(`     ${message}`);
    } else {
        testResults.failed++;
        console.log(`  ❌ FAIL: ${testName}`);
        console.log(`     ${message}`);
    }
    
    testResults.results.push({
        test: testName,
        success,
        message,
        data
    });
    
    console.log('');
}

// ========================================
// AMERICAN PROFESSIONAL SPORTS TESTS
// ========================================

async function testAmericanProfessionalSports() {
    console.log('');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('  🏈 Testing American Professional Sports');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('');
    
    // Test NFL
    try {
        const nfl = await sportsService.getNFLScores();
        testResult(
            'NFL Scores',
            nfl.success,
            nfl.success 
                ? `Retrieved ${nfl.scoreboard?.events?.length || 0} NFL games`
                : nfl.error,
            nfl
        );
    } catch (error) {
        testResult('NFL Scores', false, error.message);
    }
    
    // Test NBA
    try {
        const nba = await sportsService.getNBAScores();
        testResult(
            'NBA Scores (Men)',
            nba.success,
            nba.success 
                ? `Retrieved ${nba.scoreboard?.events?.length || 0} NBA games`
                : nba.error,
            nba
        );
    } catch (error) {
        testResult('NBA Scores (Men)', false, error.message);
    }
    
    // Test WNBA
    try {
        const wnba = await sportsService.getWNBAScores();
        testResult(
            'WNBA Scores (Women)',
            wnba.success,
            wnba.success 
                ? `Retrieved ${wnba.scoreboard?.events?.length || 0} WNBA games`
                : wnba.error,
            wnba
        );
    } catch (error) {
        testResult('WNBA Scores (Women)', false, error.message);
    }
    
    // Test MLB
    try {
        const mlb = await sportsService.getMLBScores();
        testResult(
            'MLB Scores',
            mlb.success,
            mlb.success 
                ? `Retrieved ${mlb.scoreboard?.events?.length || 0} MLB games`
                : mlb.error,
            mlb
        );
    } catch (error) {
        testResult('MLB Scores', false, error.message);
    }
    
    // Test NHL
    try {
        const nhl = await sportsService.getNHLScores();
        testResult(
            'NHL Scores',
            nhl.success,
            nhl.success 
                ? `Retrieved ${nhl.scoreboard?.events?.length || 0} NHL games`
                : nhl.error,
            nhl
        );
    } catch (error) {
        testResult('NHL Scores', false, error.message);
    }
    
    // Test MLS
    try {
        const mls = await sportsService.getMLSScores();
        testResult(
            'MLS Scores',
            mls.success,
            mls.success 
                ? `Retrieved ${mls.scoreboard?.events?.length || 0} MLS games`
                : mls.error,
            mls
        );
    } catch (error) {
        testResult('MLS Scores', false, error.message);
    }
}

// ========================================
// AMERICAN COLLEGE SPORTS TESTS
// ========================================

async function testAmericanCollegeSports() {
    console.log('');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('  🎓 Testing American College/University Sports');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('');
    
    // Test College Football
    try {
        const cfb = await sportsService.getCollegeFootballScores();
        testResult(
            'NCAA Football',
            cfb.success,
            cfb.success 
                ? `Retrieved ${cfb.scoreboard?.events?.length || 0} college football games`
                : cfb.error,
            cfb
        );
    } catch (error) {
        testResult('NCAA Football', false, error.message);
    }
    
    // Test Men's College Basketball
    try {
        const mcbb = await sportsService.getMensCollegeBasketballScores();
        testResult(
            'NCAA Men\'s Basketball',
            mcbb.success,
            mcbb.success 
                ? `Retrieved ${mcbb.scoreboard?.events?.length || 0} men\'s college basketball games`
                : mcbb.error,
            mcbb
        );
    } catch (error) {
        testResult('NCAA Men\'s Basketball', false, error.message);
    }
    
    // Test Women's College Basketball
    try {
        const wcbb = await sportsService.getWomensCollegeBasketballScores();
        testResult(
            'NCAA Women\'s Basketball',
            wcbb.success,
            wcbb.success 
                ? `Retrieved ${wcbb.scoreboard?.events?.length || 0} women\'s college basketball games`
                : wcbb.error,
            wcbb
        );
    } catch (error) {
        testResult('NCAA Women\'s Basketball', false, error.message);
    }
}

// ========================================
// FLAG FOOTBALL TESTS
// ========================================

async function testFlagFootball() {
    console.log('');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('  🏃 Testing Flag Football Leagues');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('');
    
    try {
        const flagFootball = await sportsService.getFlagFootballData();
        testResult(
            'Flag Football (All Leagues)',
            flagFootball.success,
            flagFootball.success 
                ? 'Retrieved flag football data for AFFL, WFFL, NCAA Women\'s, and Youth leagues'
                : flagFootball.error,
            flagFootball
        );
    } catch (error) {
        testResult('Flag Football (All Leagues)', false, error.message);
    }
}

// ========================================
// WORLD SPORTS TESTS
// ========================================

async function testWorldSports() {
    console.log('');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('  🌍 Testing World Sports');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('');
    
    // Test World Soccer/Football
    try {
        const soccer = await sportsService.getWorldSoccerScores();
        testResult(
            'World Soccer/Football',
            soccer.success,
            soccer.success 
                ? 'Retrieved soccer data from multiple leagues'
                : soccer.error,
            soccer
        );
    } catch (error) {
        testResult('World Soccer/Football', false, error.message);
    }
    
    // Test Cricket
    try {
        const cricket = await sportsService.getCricketScores();
        testResult(
            'Cricket',
            cricket.success,
            cricket.success 
                ? `Retrieved ${cricket.matches?.length || 0} cricket matches`
                : cricket.error,
            cricket
        );
    } catch (error) {
        testResult('Cricket', false, error.message);
    }
    
    // Test Formula 1
    try {
        const f1 = await sportsService.getFormula1Data();
        testResult(
            'Formula 1',
            f1.success,
            f1.success 
                ? `Retrieved F1 data for ${f1.season || 'current'} season`
                : f1.error,
            f1
        );
    } catch (error) {
        testResult('Formula 1', false, error.message);
    }
    
    // Test Tennis
    try {
        const tennis = await sportsService.getTennisScores();
        testResult(
            'Tennis (Men\'s & Women\'s)',
            tennis.success,
            tennis.success 
                ? 'Retrieved tennis data for ATP and WTA'
                : tennis.error,
            tennis
        );
    } catch (error) {
        testResult('Tennis (Men\'s & Women\'s)', false, error.message);
    }
    
    // Test Boxing/MMA
    try {
        const boxing = await sportsService.getBoxingMMAResults();
        testResult(
            'Boxing/MMA',
            boxing.success,
            boxing.success 
                ? `Retrieved ${boxing.events?.length || 0} boxing/MMA events`
                : boxing.error,
            boxing
        );
    } catch (error) {
        testResult('Boxing/MMA', false, error.message);
    }
}

// ========================================
// DASHBOARD AGGREGATION TESTS
// ========================================

async function testDashboardAggregation() {
    console.log('');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('  📊 Testing Dashboard Aggregation');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('');
    
    // Test All American Sports
    try {
        const americanSports = await sportsService.getAllAmericanSports();
        testResult(
            'All American Sports (Aggregated)',
            americanSports.success,
            americanSports.success 
                ? `Aggregated data from ${americanSports.sports?.professional?.mens?.length || 0} professional men\'s, ${americanSports.sports?.professional?.womens?.length || 0} professional women\'s, ${americanSports.sports?.college?.mens?.length || 0} college men\'s, ${americanSports.sports?.college?.womens?.length || 0} college women\'s sports, and flag football`
                : americanSports.error,
            americanSports
        );
    } catch (error) {
        testResult('All American Sports (Aggregated)', false, error.message);
    }
    
    // Test All World Sports
    try {
        const worldSports = await sportsService.getAllWorldSports();
        testResult(
            'All World Sports (Aggregated)',
            worldSports.success,
            worldSports.success 
                ? `Aggregated data from ${Object.keys(worldSports.sports || {}).length} world sports`
                : worldSports.error,
            worldSports
        );
    } catch (error) {
        testResult('All World Sports (Aggregated)', false, error.message);
    }
    
    // Test Complete Dashboard
    try {
        const dashboard = await sportsService.getCompleteSportsDashboard();
        testResult(
            'Complete Sports Dashboard',
            dashboard.success,
            dashboard.success 
                ? `Complete dashboard with American and World sports tabs ready`
                : dashboard.error,
            dashboard
        );
    } catch (error) {
        testResult('Complete Sports Dashboard', false, error.message);
    }
}

// ========================================
// DATA VALIDATION TESTS
// ========================================

async function testDataValidation() {
    console.log('');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('  🔍 Testing Data Validation');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('');
    
    // Test men's and women's division separation
    try {
        const americanSports = await sportsService.getAllAmericanSports();
        const hasMensDivision = americanSports.sports?.professional?.mens?.length > 0;
        const hasWomensDivision = americanSports.sports?.professional?.womens?.length > 0;
        
        testResult(
            'Men\'s/Women\'s Division Separation',
            hasMensDivision && hasWomensDivision,
            hasMensDivision && hasWomensDivision
                ? 'Professional sports properly separated into men\'s and women\'s divisions'
                : 'Division separation incomplete'
        );
    } catch (error) {
        testResult('Men\'s/Women\'s Division Separation', false, error.message);
    }
    
    // Test college sports inclusion
    try {
        const americanSports = await sportsService.getAllAmericanSports();
        const hasCollegeSports = 
            (americanSports.sports?.college?.mens?.length || 0) > 0 ||
            (americanSports.sports?.college?.womens?.length || 0) > 0;
        
        testResult(
            'College/University Sports Inclusion',
            hasCollegeSports,
            hasCollegeSports
                ? 'College sports (NCAA Football, Men\'s Basketball, Women\'s Basketball) included'
                : 'College sports not found'
        );
    } catch (error) {
        testResult('College/University Sports Inclusion', false, error.message);
    }
    
    // Test flag football inclusion
    try {
        const americanSports = await sportsService.getAllAmericanSports();
        const hasFlagFootball = americanSports.sports?.flagFootball?.success;
        
        testResult(
            'Flag Football Inclusion',
            hasFlagFootball,
            hasFlagFootball
                ? 'Flag football (AFFL, WFFL, NCAA Women\'s, Youth) included'
                : 'Flag football not found'
        );
    } catch (error) {
        testResult('Flag Football Inclusion', false, error.message);
    }
}

// ========================================
// RUN ALL TESTS
// ========================================

async function runAllTests() {
    console.log('Starting comprehensive sports API tests...');
    console.log('');
    
    await testAmericanProfessionalSports();
    await testAmericanCollegeSports();
    await testFlagFootball();
    await testWorldSports();
    await testDashboardAggregation();
    await testDataValidation();
    
    // Print summary
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  📊 TEST SUMMARY');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log(`  Total Tests: ${testResults.totalTests}`);
    console.log(`  ✅ Passed: ${testResults.passed}`);
    console.log(`  ❌ Failed: ${testResults.failed}`);
    console.log(`  Success Rate: ${((testResults.passed / testResults.totalTests) * 100).toFixed(1)}%`);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
}

// Run tests
runAllTests().catch(error => {
    console.error('');
    console.error('❌ Fatal error running tests:', error);
    console.error('');
});
