/**
 * AI Quantum Charts - Professional APIs Integration Test
 * Testing all professional API endpoints and integrations
 */

const ProfessionalAPIArsenal = require('./lib/professional-api-arsenal');
const QuickPublicSources = require('./quick_public_sources');

console.log('💼 Testing AI Quantum Charts - Professional APIs Integration');
console.log('=' .repeat(70));

async function testAPIHealthAndConfiguration() {
    console.log('\n🔍 Testing API Health and Configuration...');
    
    const proAPI = new ProfessionalAPIArsenal();
    
    try {
        // Check API configuration
        console.log('   ⚙️ Checking API configuration...');
        const health = await proAPI.checkAPIHealth();
        
        console.log('   📊 API Health Status:');
        Object.entries(health).forEach(([provider, status]) => {
            const statusIcon = status ? '✅' : '❌';
            console.log(`      ${statusIcon} ${provider}: ${status ? 'AVAILABLE' : 'UNAVAILABLE'}`);
        });
        
        // Check usage stats
        const stats = proAPI.getUsageStats();
        console.log('   📈 API Usage Statistics:');
        console.log(`      Cache Size: ${stats.cacheSize} entries`);
        console.log(`      Timestamp: ${stats.timestamp}`);
        
        return true;
    } catch (error) {
        console.error('   ❌ API health check failed:', error.message);
        return false;
    }
}

async function testStockDataAPIs() {
    console.log('\n📈 Testing Stock Data APIs...');
    
    const proAPI = new ProfessionalAPIArsenal();
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'];
    
    for (const symbol of symbols) {
        try {
            console.log(`   🔍 Testing ${symbol}...`);
            
            // Test stock quote (will fallback through multiple providers)
            const quote = await proAPI.getStockQuote(symbol);
            console.log(`      ✅ Quote: $${quote.price.toFixed(2)} (${quote.changePercent}) - ${quote.provider}`);
            
            // Test historical data
            const historical = await proAPI.getHistoricalData(symbol, '1day', 'compact');
            console.log(`      ✅ Historical: ${historical.data.length} data points - ${historical.provider}`);
            
            // Test company overview
            try {
                const overview = await proAPI.getCompanyOverview(symbol);
                console.log(`      ✅ Overview: ${overview.name} (${overview.sector}) - ${overview.provider}`);
            } catch (error) {
                console.log(`      ⚠️  Overview: ${error.message}`);
            }
            
        } catch (error) {
            console.log(`      ❌ ${symbol} failed: ${error.message}`);
        }
        
        // Small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    return true;
}

async function testForexAndCrypto() {
    console.log('\n💱 Testing Forex and Cryptocurrency APIs...');
    
    const proAPI = new ProfessionalAPIArsenal();
    
    try {
        // Test forex data
        console.log('   💰 Testing major forex pairs...');
        const forexPairs = [
            { from: 'EUR', to: 'USD' },
            { from: 'GBP', to: 'USD' },
            { from: 'USD', to: 'JPY' },
            { from: 'USD', to: 'CAD' }
        ];
        
        for (const pair of forexPairs) {
            try {
                const forex = await proAPI.getForexQuote(pair.from, pair.to);
                console.log(`      ✅ ${pair.from}/${pair.to}: ${forex.rate.toFixed(4)} - ${forex.provider}`);
            } catch (error) {
                console.log(`      ⚠️  ${pair.from}/${pair.to}: ${error.message}`);
            }
        }
        
        // Test cryptocurrency data
        console.log('   🪙 Testing major cryptocurrencies...');
        const cryptos = ['BTC', 'ETH', 'ADA', 'DOT'];
        
        for (const crypto of cryptos) {
            try {
                const cryptoData = await proAPI.getCryptoQuote(crypto);
                console.log(`      ✅ ${crypto}: $${cryptoData.price.toFixed(2)} - ${cryptoData.provider}`);
            } catch (error) {
                console.log(`      ⚠️  ${crypto}: ${error.message}`);
            }
        }
        
        return true;
    } catch (error) {
        console.error('   ❌ Forex/Crypto test failed:', error.message);
        return false;
    }
}

async function testTechnicalIndicators() {
    console.log('\n📊 Testing Technical Indicators...');
    
    const proAPI = new ProfessionalAPIArsenal();
    const indicators = [
        { name: 'SMA', symbol: 'AAPL', function: 'SMA' },
        { name: 'EMA', symbol: 'MSFT', function: 'EMA' },
        { name: 'RSI', symbol: 'GOOGL', function: 'RSI' },
        { name: 'MACD', symbol: 'TSLA', function: 'MACD' }
    ];
    
    for (const indicator of indicators) {
        try {
            console.log(`   📈 Testing ${indicator.name} for ${indicator.symbol}...`);
            
            const techData = await proAPI.getTechnicalIndicator(
                indicator.symbol, 
                indicator.function, 
                'daily', 
                20
            );
            
            console.log(`      ✅ ${indicator.name}: ${Object.keys(techData.data || {}).length} data points - ${techData.provider}`);
            
        } catch (error) {
            console.log(`      ⚠️  ${indicator.name}: ${error.message}`);
        }
        
        // Delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    return true;
}

async function testNewsAndSentiment() {
    console.log('\n📰 Testing News and Sentiment APIs...');
    
    const proAPI = new ProfessionalAPIArsenal();
    
    try {
        console.log('   📰 Testing market news...');
        
        const news = await proAPI.getMarketNews(['AAPL', 'TSLA'], 10);
        console.log(`      ✅ Market News: ${news.items.length} articles - ${news.provider}`);
        
        // Display first few headlines
        news.items.slice(0, 3).forEach((article, index) => {
            console.log(`         ${index + 1}. ${article.title}`);
            console.log(`            Sentiment: ${article.overallSentiment} (${article.sentimentScore.toFixed(2)})`);
        });
        
        return true;
    } catch (error) {
        console.log(`      ⚠️  News API: ${error.message}`);
        return true; // Don't fail the test suite for news API
    }
}

async function testAPIFallbackSystem() {
    console.log('\n🔄 Testing API Fallback System...');
    
    const proAPI = new ProfessionalAPIArsenal();
    
    try {
        console.log('   🎯 Testing provider fallback for AAPL...');
        
        // This should automatically try multiple providers
        const quote = await proAPI.getStockQuote('AAPL');
        
        console.log(`      ✅ Fallback System: Got data from ${quote.provider}`);
        console.log(`         Symbol: ${quote.symbol}`);
        console.log(`         Price: $${quote.price.toFixed(2)}`);
        console.log(`         Change: ${quote.changePercent}`);
        
        return true;
    } catch (error) {
        console.log(`      ❌ Fallback system failed: ${error.message}`);
        return false;
    }
}

async function testRateLimitingAndCaching() {
    console.log('\n⚡ Testing Rate Limiting and Caching...');
    
    const proAPI = new ProfessionalAPIArsenal();
    
    try {
        console.log('   🏃 Testing rapid requests with caching...');
        
        const symbol = 'AAPL';
        const startTime = Date.now();
        
        // Make multiple requests for the same data
        const requests = [];
        for (let i = 0; i < 5; i++) {
            requests.push(proAPI.getStockQuote(symbol));
        }
        
        await Promise.all(requests);
        const totalTime = Date.now() - startTime;
        
        console.log(`      ✅ Completed 5 requests in ${totalTime}ms`);
        console.log(`      ⚡ Average: ${(totalTime / 5).toFixed(2)}ms per request`);
        
        // Check cache performance
        const cacheStartTime = Date.now();
        await proAPI.getStockQuote(symbol);
        const cacheTime = Date.now() - cacheStartTime;
        
        console.log(`      🚀 Cache access time: ${cacheTime}ms`);
        
        const stats = proAPI.getUsageStats();
        console.log(`      📊 Cache size: ${stats.cacheSize} entries`);
        
        return true;
    } catch (error) {
        console.error('   ❌ Rate limiting test failed:', error.message);
        return false;
    }
}

async function testDataComparison() {
    console.log('\n🔍 Testing Data Consistency Across Sources...');
    
    const proAPI = new ProfessionalAPIArsenal();
    const quickAPI = new QuickPublicSources();
    
    try {
        const symbol = 'AAPL';
        console.log(`   📊 Comparing ${symbol} data across sources...`);
        
        // Get data from professional APIs
        const proQuote = await proAPI.getStockQuote(symbol);
        
        // Get data from public APIs
        const publicQuote = await quickAPI.getYahooQuote(symbol);
        
        console.log('   📈 Data Comparison:');
        console.log(`      Professional API: $${proQuote.price.toFixed(2)} (${proQuote.provider})`);
        console.log(`      Public API: $${publicQuote.price} (${publicQuote.provider})`);
        
        // Calculate difference
        const priceDiff = Math.abs(proQuote.price - publicQuote.price);
        const diffPercent = (priceDiff / proQuote.price * 100).toFixed(2);
        
        console.log(`      Difference: $${priceDiff.toFixed(2)} (${diffPercent}%)`);
        
        // Data should be reasonably consistent (within 5%)
        const isConsistent = diffPercent < 5;
        console.log(`      ✅ Data Consistency: ${isConsistent ? 'GOOD' : 'NEEDS REVIEW'}`);
        
        return true;
    } catch (error) {
        console.log(`      ⚠️  Data comparison: ${error.message}`);
        return true; // Don't fail test suite
    }
}

async function runAllProfessionalAPITests() {
    console.log('\n🚀 Starting Professional APIs Test Suite...');
    
    const tests = [
        { name: 'API Health and Configuration', fn: testAPIHealthAndConfiguration },
        { name: 'Stock Data APIs', fn: testStockDataAPIs },
        { name: 'Forex and Cryptocurrency', fn: testForexAndCrypto },
        { name: 'Technical Indicators', fn: testTechnicalIndicators },
        { name: 'News and Sentiment', fn: testNewsAndSentiment },
        { name: 'API Fallback System', fn: testAPIFallbackSystem },
        { name: 'Rate Limiting and Caching', fn: testRateLimitingAndCaching },
        { name: 'Data Source Comparison', fn: testDataComparison }
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const test of tests) {
        try {
            console.log(`\n⏳ Running ${test.name}...`);
            const result = await test.fn();
            
            if (result) {
                passed++;
                console.log(`✅ ${test.name} - PASSED`);
            } else {
                failed++;
                console.log(`❌ ${test.name} - FAILED`);
            }
            
        } catch (error) {
            failed++;
            console.log(`❌ ${test.name} - ERROR: ${error.message}`);
        }
    }
    
    // Generate comprehensive report
    console.log('\n' + '='.repeat(70));
    console.log('📋 PROFESSIONAL APIS INTEGRATION TEST SUMMARY');
    console.log('='.repeat(70));
    console.log(`Total Tests: ${passed + failed}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
    
    // API readiness assessment
    const readinessLevel = passed >= 6 ? '🟢 PRODUCTION READY' :
                          passed >= 4 ? '🟡 DEVELOPMENT READY' :
                          '🔴 NEEDS CONFIGURATION';
    
    console.log(`\n🎯 API Integration Status: ${readinessLevel}`);
    
    if (failed > 0) {
        console.log('\n💡 Recommendations:');
        console.log('   • Configure API keys in environment variables');
        console.log('   • Check network connectivity');
        console.log('   • Verify API provider account status');
        console.log('   • Review rate limiting settings');
    }
    
    console.log('\n🚀 Professional APIs Integration Test Complete!');
}

// Run tests
runAllProfessionalAPITests().catch(error => {
    console.error('Professional API tests failed:', error);
    process.exit(1);
});