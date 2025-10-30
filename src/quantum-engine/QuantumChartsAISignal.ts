export class QuantumChartsAISignal {
  constructor(private model: any) {}

  async generateSignal(input: number[]) {
    // placeholder inference
    const mean = input.reduce((a, b) => a + b, 0) / input.length;
    const signal = mean > input[input.length - 1] ? "SELL" : "BUY";
    return { signal, confidence: Math.random().toFixed(2) };
  }
}
