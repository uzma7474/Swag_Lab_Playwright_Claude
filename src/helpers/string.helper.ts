/** "Sauce Labs Backpack" -> "sauce-labs-backpack" (matches SauceDemo data-test ids). */
export function toSlug(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}

export function isSortedAscending<T extends string | number>(arr: T[]): boolean {
  return arr.every((v, i) => i === 0 || arr[i - 1] <= v);
}

export function isSortedDescending<T extends string | number>(arr: T[]): boolean {
  return arr.every((v, i) => i === 0 || arr[i - 1] >= v);
}
