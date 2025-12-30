export function formatPct(x: number): string {
  return `${(x * 100).toFixed(2)}%`;
}

export function formatUsd(x: number): string {
  return `$${x.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
