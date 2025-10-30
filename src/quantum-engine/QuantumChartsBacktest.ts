export class QuantumChartsBacktest {
  results: any[] = [];

  run(strategy: (price: number) => boolean, prices: number[]) {
    let balance = 10000;
    for (let i = 1; i < prices.length; i++) {
      const buy = strategy(prices[i - 1]);
      if (buy) balance += (prices[i] - prices[i - 1]) * 10;
    }
    this.results.push({ balance });
    return balance;
  }
}
