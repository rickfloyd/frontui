/**
 * API Integration Test Suite
 * Tests all 6 professional financial APIs
 */

const APIIntegrationService = require('./services/api-integration-service');

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('  🧪 API INTEGRATION TEST SUITE');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const apiService = new APIIntegrationService();

async function runTests() {
    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };

    // ========================================
    // TEST 1: Open Exchange Rates
    // ========================================
    console.log('🔍 Testing Open Exchange Rates API...');
    try {
        const forexRates = await apiService.getForexRates('USD');
        if (forexRates.success && forexRates.rates) {
            console.log('✅ Forex Rates: SUCCESS');
            console.log(`   • Base: ${forexRates.base}`);
            console.log(`   • EUR Rate: ${forexRates.rates.EUR}`);
            console.log(`   • GBP Rate: ${forexRates.rates.GBP}`);
            console.log(`   • JPY Rate: ${forexRates.rates.JPY}`);
            results.passed++;
            results.tests.push({ name: 'Forex Rates', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Forex Rates: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'Forex Rates', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 2: Currency Conversion
    // ========================================
    console.log('🔍 Testing Currency Conversion...');
    try {
        const conversion = await apiService.convertCurrency(100, 'USD', 'EUR');
        if (conversion.success && conversion.result) {
            console.log('✅ Currency Conversion: SUCCESS');
            console.log(`   • 100 USD = ${conversion.result.toFixed(2)} EUR`);
            console.log(`   • Rate: ${conversion.rate.toFixed(4)}`);
            results.passed++;
            results.tests.push({ name: 'Currency Conversion', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Currency Conversion: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'Currency Conversion', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 3: TwelveData Stock Quote
    // ========================================
    console.log('🔍 Testing TwelveData Stock Quote...');
    try {
        const stockQuote = await apiService.getStockQuote('AAPL');
        if (stockQuote.success && stockQuote.price) {
            console.log('✅ Stock Quote (TwelveData): SUCCESS');
            console.log(`   • Symbol: ${stockQuote.symbol}`);
            console.log(`   • Name: ${stockQuote.name}`);
            console.log(`   • Price: $${stockQuote.price}`);
            console.log(`   • Change: ${stockQuote.change > 0 ? '+' : ''}${stockQuote.change} (${stockQuote.changePercent}%)`);
            console.log(`   • Volume: ${stockQuote.volume.toLocaleString()}`);
            results.passed++;
            results.tests.push({ name: 'TwelveData Stock Quote', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Stock Quote (TwelveData): FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'TwelveData Stock Quote', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 4: TwelveData Time Series
    // ========================================
    console.log('🔍 Testing TwelveData Time Series...');
    try {
        const timeSeries = await apiService.getTimeSeriesData('MSFT', '1day', 5);
        if (timeSeries.success && timeSeries.values && timeSeries.values.length > 0) {
            console.log('✅ Time Series (TwelveData): SUCCESS');
            console.log(`   • Symbol: ${timeSeries.symbol}`);
            console.log(`   • Data Points: ${timeSeries.values.length}`);
            console.log(`   • Latest Close: $${timeSeries.values[0].close}`);
            results.passed++;
            results.tests.push({ name: 'TwelveData Time Series', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Time Series (TwelveData): FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'TwelveData Time Series', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 5: Market Movers
    // ========================================
    console.log('🔍 Testing Market Movers...');
    try {
        const gainers = await apiService.getMarketMovers('gainers');
        if (gainers.success && gainers.stocks) {
            console.log('✅ Market Movers: SUCCESS');
            console.log(`   • Type: ${gainers.type}`);
            console.log(`   • Stocks Found: ${gainers.stocks.length}`);
            results.passed++;
            results.tests.push({ name: 'Market Movers', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Market Movers: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'Market Movers', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 6: Polygon Quote
    // ========================================
    console.log('🔍 Testing Polygon.io Real-time Quote...');
    try {
        const polygonQuote = await apiService.getPolygonQuote('GOOGL');
        if (polygonQuote.success && polygonQuote.price) {
            console.log('✅ Polygon Quote: SUCCESS');
            console.log(`   • Symbol: ${polygonQuote.symbol}`);
            console.log(`   • Price: $${polygonQuote.price}`);
            console.log(`   • Change: ${polygonQuote.change > 0 ? '+' : ''}${polygonQuote.change} (${polygonQuote.changePercent}%)`);
            console.log(`   • Last Trade: $${polygonQuote.lastTrade.price} at ${polygonQuote.lastTrade.timestamp}`);
            results.passed++;
            results.tests.push({ name: 'Polygon Quote', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Polygon Quote: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'Polygon Quote', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 7: Polygon Previous Close
    // ========================================
    console.log('🔍 Testing Polygon Previous Close...');
    try {
        const prevClose = await apiService.getPolygonPreviousClose('TSLA');
        if (prevClose.success && prevClose.close) {
            console.log('✅ Polygon Previous Close: SUCCESS');
            console.log(`   • Symbol: ${prevClose.symbol}`);
            console.log(`   • Close: $${prevClose.close}`);
            console.log(`   • Volume: ${prevClose.volume.toLocaleString()}`);
            results.passed++;
            results.tests.push({ name: 'Polygon Previous Close', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Polygon Previous Close: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'Polygon Previous Close', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 8: FRED Economic Data
    // ========================================
    console.log('🔍 Testing FRED Economic Data...');
    try {
        const gdp = await apiService.getFREDLatest('GDP');
        if (gdp.success && gdp.latest) {
            console.log('✅ FRED Economic Data: SUCCESS');
            console.log(`   • Series: ${gdp.seriesId}`);
            console.log(`   • Latest Date: ${gdp.latest.date}`);
            console.log(`   • Value: ${gdp.latest.value}`);
            results.passed++;
            results.tests.push({ name: 'FRED Economic Data', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ FRED Economic Data: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'FRED Economic Data', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 9: Economic Indicators
    // ========================================
    console.log('🔍 Testing Economic Indicators Bundle...');
    try {
        const indicators = await apiService.getEconomicIndicators();
        if (indicators.success && indicators.indicators) {
            console.log('✅ Economic Indicators: SUCCESS');
            Object.keys(indicators.indicators).forEach(key => {
                const ind = indicators.indicators[key];
                if (ind.success) {
                    console.log(`   • ${key}: ${ind.latest?.value || 'N/A'} (${ind.latest?.date || 'N/A'})`);
                }
            });
            results.passed++;
            results.tests.push({ name: 'Economic Indicators', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Economic Indicators: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'Economic Indicators', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 10: MarketStack EOD
    // ========================================
    console.log('🔍 Testing MarketStack EOD Data...');
    try {
        const eod = await apiService.getMarketStackEOD('AAPL');
        if (eod.success && eod.eod && eod.eod.length > 0) {
            console.log('✅ MarketStack EOD: SUCCESS');
            console.log(`   • Symbol: ${eod.symbol}`);
            console.log(`   • Data Points: ${eod.eod.length}`);
            console.log(`   • Latest Close: $${eod.eod[0].close}`);
            results.passed++;
            results.tests.push({ name: 'MarketStack EOD', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ MarketStack EOD: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'MarketStack EOD', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 11: CoinGecko Crypto Price
    // ========================================
    console.log('🔍 Testing CoinGecko Crypto Prices...');
    try {
        const cryptoPrice = await apiService.getCryptoPrice('bitcoin,ethereum,cardano');
        if (cryptoPrice.success && cryptoPrice.prices) {
            console.log('✅ CoinGecko Crypto Price: SUCCESS');
            Object.keys(cryptoPrice.prices).forEach(coin => {
                console.log(`   • ${coin}: $${cryptoPrice.prices[coin].usd.toLocaleString()}`);
            });
            results.passed++;
            results.tests.push({ name: 'CoinGecko Crypto Price', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ CoinGecko Crypto Price: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'CoinGecko Crypto Price', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 12: Top Cryptocurrencies
    // ========================================
    console.log('🔍 Testing Top Cryptocurrencies...');
    try {
        const topCryptos = await apiService.getTopCryptos(10);
        if (topCryptos.success && topCryptos.coins && topCryptos.coins.length > 0) {
            console.log('✅ Top Cryptocurrencies: SUCCESS');
            console.log(`   • Total Coins: ${topCryptos.coins.length}`);
            topCryptos.coins.slice(0, 5).forEach((coin, idx) => {
                console.log(`   ${idx + 1}. ${coin.name} (${coin.symbol.toUpperCase()}): $${coin.currentPrice.toLocaleString()}`);
            });
            results.passed++;
            results.tests.push({ name: 'Top Cryptocurrencies', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Top Cryptocurrencies: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'Top Cryptocurrencies', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 13: Crypto Market Data
    // ========================================
    console.log('🔍 Testing Crypto Market Data...');
    try {
        const btcData = await apiService.getCryptoMarketData('bitcoin');
        if (btcData.success && btcData.currentPrice) {
            console.log('✅ Crypto Market Data: SUCCESS');
            console.log(`   • ${btcData.name} (${btcData.symbol.toUpperCase()})`);
            console.log(`   • Price: $${btcData.currentPrice.toLocaleString()}`);
            console.log(`   • Market Cap: $${(btcData.marketCap / 1e9).toFixed(2)}B`);
            console.log(`   • 24h Change: ${btcData.priceChange24h.toFixed(2)}%`);
            results.passed++;
            results.tests.push({ name: 'Crypto Market Data', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Crypto Market Data: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'Crypto Market Data', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // TEST 14: Dashboard Data
    // ========================================
    console.log('🔍 Testing Unified Dashboard Data...');
    try {
        const dashboard = await apiService.getDashboardData(['AAPL', 'GOOGL']);
        if (dashboard.stocks && dashboard.forex && dashboard.crypto) {
            console.log('✅ Dashboard Data: SUCCESS');
            console.log(`   • Stocks Loaded: ${Object.keys(dashboard.stocks).length}`);
            console.log(`   • Forex Rates: ${Object.keys(dashboard.forex.rates || {}).length}`);
            console.log(`   • Top Cryptos: ${dashboard.crypto.coins?.length || 0}`);
            results.passed++;
            results.tests.push({ name: 'Dashboard Data', status: 'passed' });
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.log('❌ Dashboard Data: FAILED -', error.message);
        results.failed++;
        results.tests.push({ name: 'Dashboard Data', status: 'failed', error: error.message });
    }
    console.log('');

    // ========================================
    // FINAL RESULTS
    // ========================================
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  📊 TEST RESULTS SUMMARY');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.log(`  ✅ Passed: ${results.passed}`);
    console.log(`  ❌ Failed: ${results.failed}`);
    console.log(`  📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
    console.log('');
    console.log('  Test Details:');
    results.tests.forEach((test, idx) => {
        const icon = test.status === 'passed' ? '✅' : '❌';
        console.log(`    ${idx + 1}. ${icon} ${test.name}`);
        if (test.error) {
            console.log(`       Error: ${test.error}`);
        }
    });
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');

    // Cache statistics
    const cacheStats = apiService.getCacheStats();
    console.log(`  💾 Cache Statistics:`);
    console.log(`     • Cached Items: ${cacheStats.size}`);
    console.log('');

}

// Run the tests
runTests().catch(error => {
    console.error('');
    console.error('❌ Test suite failed:', error.message);
    console.error('');
});
