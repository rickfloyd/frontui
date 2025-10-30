import { EventEmitter } from "events";

export class QuantumChartsCore extends EventEmitter {
  constructor(public apiKey: string) {
    super();
  }

  async getLivePrice(symbol: string) {
    const res = await fetch(
      `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${this.apiKey}`
    );
    const data = await res.json();
    this.emit("price", data);
    return data;
  }

  log(msg: string) {
    console.log(`[Quantum Charts Core] ${msg}`);
  }
}
