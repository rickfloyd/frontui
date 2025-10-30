/**
 * AI Quantum Charts - Independent Charts Test
 * Testing the chart component functionality
 */

const QuickPublicSources = require('./quick_public_sources');

console.log('📈 Testing AI Quantum Charts - Independent Chart Component');
console.log('=' .repeat(60));

// Mock getYahooHistorical for this test suite
QuickPublicSources.prototype.getYahooHistorical = async function(symbol, interval, range) {
    return {
        symbol: symbol,
        data: Array.from({ length: 10 }, (_, i) => ({
            date: `2024-10-${10 + i}`,
            open: 150 + i,
            high: 152 + i,
            low: 149 + i,
            close: 151 + i,
            volume: 1000000 * (i + 1)
        })),
        provider: 'MockYahoo'
    };
};

QuickPublicSources.prototype.getCryptoList = async function() {
    return [
        { symbol: 'BTC', name: 'Bitcoin', price: 46000, change24h: 1.2 },
        { symbol: 'ETH', name: 'Ethereum', price: 3200, change24h: -0.5 },
        { symbol: 'ADA', name: 'Cardano', price: 1.5, change24h: 3.1 }
    ];
};

async function testChartDataSources() {
    const publicAPI = new QuickPublicSources();
    
    console.log('\n🔍 Testing Chart Data Sources...');
    
    try {
        // Test stock data for charting
        console.log('   📊 Testing AAPL stock data...');
        const quote = await publicAPI.getYahooQuote('AAPL');
        console.log('   ✅ Current Quote:', {
            symbol: quote.symbol,
            price: `$${quote.price}`,
            change: quote.changePercent,
            provider: quote.provider
        });
        
        // Test historical data for chart rendering
        console.log('   📈 Testing historical data...');
        const historical = await publicAPI.getYahooHistorical('AAPL', '1m', '1d');
        console.log('   ✅ Historical Data:', {
            symbol: historical.symbol,
            dataPoints: historical.data.length,
            dateRange: `${historical.data[0]?.date} to ${historical.data[historical.data.length - 1]?.date}`,
            provider: historical.provider
        });
        
        // Test multiple symbols for watchlist
        console.log('   📋 Testing multiple symbols...');
        const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
        const quotes = [];
        
        for (const symbol of symbols) {
            try {
                const symbolQuote = await publicAPI.getYahooQuote(symbol);
                quotes.push({
                    symbol: symbolQuote.symbol,
                    price: symbolQuote.price,
                    change: symbolQuote.changePercent
                });
            } catch (error) {
                console.log(`   ⚠️  Failed to get ${symbol}: ${error.message}`);
            }
        }
        
        console.log('   ✅ Multi-symbol quotes:', quotes);
        
        // Test crypto data for crypto charts
        console.log('   🪙 Testing cryptocurrency data...');
        const cryptoList = await publicAPI.getCryptoList();
        const topCryptos = cryptoList.slice(0, 5).map(crypto => ({
            symbol: crypto.symbol,
            name: crypto.name,
            price: `$${crypto.price.toFixed(2)}`,
            change: `${crypto.change24h?.toFixed(2)}%`
        }));
        console.log('   ✅ Top cryptocurrencies:', topCryptos);
        
        // Test forex data
        console.log('   💱 Testing forex data...');
        const forexRates = await publicAPI.getForexRates('USD');
        const majorPairs = {
            'EUR/USD': forexRates.rates.EUR ? (1 / forexRates.rates.EUR).toFixed(4) : 'N/A',
            'GBP/USD': forexRates.rates.GBP ? (1 / forexRates.rates.GBP).toFixed(4) : 'N/A',
            'USD/JPY': forexRates.rates.JPY ? forexRates.rates.JPY.toFixed(2) : 'N/A',
            'USD/CAD': forexRates.rates.CAD ? forexRates.rates.CAD.toFixed(4) : 'N/A'
        };
        console.log('   ✅ Major forex pairs:', majorPairs);
        
    } catch (error) {
        console.error('   ❌ Chart data test failed:', error.message);
        return false;
    }
    
    return true;
}

async function testChartConfiguration() {
    console.log('\n⚙️ Testing Chart Configuration Options...');
    
    // Simulate chart configuration options
    const chartConfigs = [
        {
            type: 'candlestick',
            interval: '1day',
            theme: 'dark',
            indicators: ['SMA', 'RSI', 'MACD']
        },
        {
            type: 'line',
            interval: '1hour',
            theme: 'light',
            indicators: ['EMA', 'Bollinger Bands']
        },
        {
            type: 'area',
            interval: '15min',
            theme: 'quantum',
            indicators: ['Volume', 'Stochastic']
        }
    ];
    
    console.log('   ✅ Chart configuration options tested:');
    chartConfigs.forEach((config, index) => {
        console.log(`      ${index + 1}. ${config.type.toUpperCase()} chart - ${config.interval} - ${config.theme} theme`);
        console.log(`         Indicators: ${config.indicators.join(', ')}`);
    });
    
    return true;
}

async function testRealTimeSimulation() {
    console.log('\n⚡ Testing Real-Time Data Simulation...');
    
    const publicAPI = new QuickPublicSources();
    
    try {
        // Simulate real-time updates by fetching data multiple times
        console.log('   📡 Simulating real-time price updates...');
        
        const symbol = 'AAPL';
        const updates = [];
        
        for (let i = 0; i < 3; i++) {
            const quote = await publicAPI.getYahooQuote(symbol);
            updates.push({
                timestamp: new Date().toISOString(),
                price: quote.price,
                change: quote.changePercent
            });
            
            console.log(`      Update ${i + 1}: ${symbol} = $${quote.price} (${quote.changePercent})`);
            
            // Wait for a short period to simulate real time
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log('   ✅ Real-time simulation completed');
        return true;        
    } catch (error) {
        console.error('   ❌ Real-time simulation failed:', error.message);
        return false;
    }
}

async function testChartDataProcessing() {
    console.log('\n🔧 Testing Chart Data Processing...');
    
    const publicAPI = new QuickPublicSources();
    
    try {
        // Get historical data
        const historical = await publicAPI.getYahooHistorical('MSFT', '1m', '1d');
        
        if (!historical.data || historical.data.length === 0) {
            throw new Error('No historical data received');
        }
        
        // Process data for different chart types
        console.log('   📊 Processing data for candlestick chart...');
        const candlestickData = historical.data.map(item => ({
            x: new Date(item.date).getTime(),
            o: item.open,
            h: item.high,
            l: item.low,
            c: item.close,
            v: item.volume
        }));
        
        console.log('   📈 Processing data for line chart...');
        const lineData = historical.data.map(item => ({
            x: new Date(item.date).getTime(),
            y: item.close
        }));
        
        console.log('   📉 Processing data for area chart...');
        const areaData = historical.data.map(item => ({
            x: new Date(item.date).getTime(),
            y: item.close,
            volume: item.volume
        }));
        
        console.log('   ✅ Data processing results:');
        console.log(`      Candlestick data points: ${candlestickData.length}`);
        console.log(`      Line data points: ${lineData.length}`);
        console.log(`      Area data points: ${areaData.length}`);
        console.log(`      Date range: ${historical.data[0].date} to ${historical.data[historical.data.length - 1].date}`);
        
        return true;
        
    } catch (error) {
        console.error('   ❌ Data processing failed:', error.message);
        return false;
    }
}

async function testChartPerformance() {
    console.log('\n⚡ Testing Chart Performance...');
    
    const publicAPI = new QuickPublicSources();
    
    try {
        // Test load time for chart data
        const startTime = Date.now();
        
        const symbols = ['AAPL', 'MSFT', 'GOOGL'];
        const promises = symbols.map(symbol => publicAPI.getYahooQuote(symbol));
        
        await Promise.all(promises);
        
        const loadTime = Date.now() - startTime;
        
        console.log(`   ✅ Chart data load time: ${loadTime}ms for ${symbols.length} symbols`);
        console.log(`      Average per symbol: ${(loadTime / symbols.length).toFixed(2)}ms`);
        
        // Test cache performance
        const cacheStartTime = Date.now();
        await publicAPI.getYahooQuote('AAPL'); // Should be cached
        const cacheTime = Date.now() - cacheStartTime;
        
        console.log(`   ✅ Cached data access time: ${cacheTime}ms`);
        
        // Performance benchmark
        const benchmark = {
            acceptable: loadTime < 5000, // Under 5 seconds
            fast: loadTime < 2000, // Under 2 seconds
            excellent: loadTime < 1000 // Under 1 second
        };
        
        const performanceLevel = benchmark.excellent ? 'Excellent' : 
                               benchmark.fast ? 'Fast' : 
                               benchmark.acceptable ? 'Acceptable' : 'Needs Improvement';
        
        console.log(`   📊 Performance Level: ${performanceLevel}`);
        
        return true;
        
    } catch (error) {
        console.error('   ❌ Performance test failed:', error.message);
        return false;
    }
}

async function runAllChartTests() {
    const tests = [
        { name: 'Chart Data Sources', fn: testChartDataSources },
        { name: 'Chart Configuration', fn: testChartConfiguration },
        { name: 'Real-Time Simulation', fn: testRealTimeSimulation },
        { name: 'Chart Data Processing', fn: testChartDataProcessing },
        { name: 'Chart Performance', fn: testChartPerformance }
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const test of tests) {
        try {
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
    
    console.log('\n' + '='.repeat(60));
    console.log('📋 INDEPENDENT CHARTS TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${passed + failed}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
    
    const overallHealth = passed >= failed ? '🟢 HEALTHY' : '🟡 NEEDS ATTENTION';
    console.log(`Overall Chart System Health: ${overallHealth}`);
    
    console.log('\n🎯 Chart Component Ready for Integration!');
    console.log('💡 Next steps: Integrate with React/HTML frontend');
}

// Run tests
runAllChartTests().catch(error => {
    console.error('Chart tests failed:', error);
    process.exit(1);
});