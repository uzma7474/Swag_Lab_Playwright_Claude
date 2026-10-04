/** Converts "$29.99" or "Item total: $39.98" into a number. */
export function parsePrice(text: string): number {
  const match = text.replace(/,/g, '').match(/\$?\s*(\d+(\.\d+)?)/);
  if (!match) throw new Error(`Unable to parse price from "${text}"`);
  return Number(match[1]);
}

/** Rounds to 2 decimals to avoid floating point drift when summing prices. */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function sum(values: number[]): number {
  return round2(values.reduce((a, b) => a + b, 0));
}
