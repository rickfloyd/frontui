export class QuantumChartsAutoFib {
  constructor(private prices: number[]) {}

  calculateLevels() {
    const high = Math.max(...this.prices);
    const low = Math.min(...this.prices);
    const diff = high - low;
    const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1].map(
      (r) => high - diff * r
    );
    return levels;
  }
}
