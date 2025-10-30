// ------------------------------------------------------------
// Quantum Charts Sanitizer Shield
// Blocks prompt injection, LLM poisoning, and malicious text ops
// ------------------------------------------------------------
export class QuantumSanitizerShield {
  private readonly blacklist = [
    /ignore\s+previous/i,
    /system\s+prompt/i,
    /instruct\s+the\s+model/i,
    /base64/i,
    /sudo|root|cmd|powershell/i,
    /fetch\(|<script>|onerror=/i,
    /data:application\/json/i,
  ];

  sanitize(input: string): string {
    let safe = input;
    for (const pattern of this.blacklist) {
      safe = safe.replace(pattern, "[BLOCKED]");
    }
    return safe;
  }

  isSafe(input: string): boolean {
    return !this.blacklist.some((pattern) => pattern.test(input));
  }

  guard<T extends object>(obj: T): T {
    // recursively sanitize all string values
    const clone = structuredClone(obj);
    for (const key in clone) {
      if (typeof clone[key] === "string") {
        clone[key] = this.sanitize(clone[key] as string);
      }
    }
    return clone;
  }
}
