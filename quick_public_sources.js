class QuickPublicSources {
    async getYahooQuote(symbol) {
        if (symbol === 'AAPL') {
            return {
                symbol: 'AAPL',
                price: 150.25,
                changePercent: '+1.5%',
                provider: 'MockYahoo'
            };
        }
        throw new Error('Invalid symbol');
    }

    async getCryptoPrice(coin) {
        if (coin === 'bitcoin') {
            return {
                price: 45000.00,
                change24h: 5.5,
                provider: 'MockCrypto'
            };
        }
        throw new Error('Invalid cryptocurrency');
    }

    async getForexRates(base) {
        if (base === 'USD') {
            return {
                base: 'USD',
                rates: {
                    EUR: 0.92,
                    GBP: 0.81
                },
                provider: 'MockForex'
            };
        }
        throw new Error('Invalid base currency');
    }
}

module.exports = QuickPublicSources;
