/**
 * Quick API Verification Test
 * Simple test to verify our APIs are working
 */

const QuickPublicSources = require('./quick_public_sources');

async function quickTest() {
    console.log('🧪 AI Quantum Charts - Quick API Test');
    console.log('=' .repeat(40));
    
    const quickAPI = new QuickPublicSources();
    
    try {
        console.log('📊 Testing Yahoo Finance API...');
        const quote = await quickAPI.getYahooQuote('AAPL');
        console.log('✅ AAPL Quote:', {
            symbol: quote.symbol,
            price: `$${quote.price}`,
            change: quote.changePercent,
            provider: quote.provider
        });
        
        console.log('\n🪙 Testing Cryptocurrency API...');
        const crypto = await quickAPI.getCryptoPrice('bitcoin');
        console.log('✅ Bitcoin Price:', {
            price: `$${crypto.price.toFixed(2)}`,
            change24h: `${crypto.change24h?.toFixed(2)}%`,
            provider: crypto.provider
        });
        
        console.log('\n💱 Testing Forex API...');
        const forex = await quickAPI.getForexRates('USD');
        console.log('✅ Exchange Rates:', {
            base: forex.base,
            EUR: forex.rates.EUR?.toFixed(4),
            GBP: forex.rates.GBP?.toFixed(4),
            provider: forex.provider
        });
        
        console.log('\n🎯 API Test Results: ALL SYSTEMS OPERATIONAL');
        console.log('✅ Market data sources are working correctly');
        console.log('✅ Chart data can be retrieved successfully');
        console.log('✅ Platform is ready for use!');
        
    } catch (error) {
        console.error('❌ API Test failed:', error.message);
        process.exit(1);
    }
}

quickTest();