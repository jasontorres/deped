interface PhpOpts {
  unit?: "auto" | "B" | "M" | "K" | "full";
}

export function php(n: number | null | undefined, opts: PhpOpts = {}): string {
  if (n == null || !Number.isFinite(n)) return "—";
  const unit = opts.unit || "auto";
  if (unit === "full") return "₱" + Math.round(n).toLocaleString("en-US");
  let u: "auto" | "B" | "M" | "K" | "full" = unit;
  if (u === "auto") {
    if (Math.abs(n) >= 1e9) u = "B";
    else if (Math.abs(n) >= 1e6) u = "M";
    else if (Math.abs(n) >= 1e3) u = "K";
    else u = "full";
  }
  let val: number, suffix: string;
  if (u === "B") { val = n / 1e9; suffix = "B"; }
  else if (u === "M") { val = n / 1e6; suffix = "M"; }
  else if (u === "K") { val = n / 1e3; suffix = "K"; }
  else return "₱" + Math.round(n).toLocaleString("en-US");
  const digits = Math.abs(val) >= 100 ? 1 : 2;
  return "₱" + val.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits >= 1 ? 1 : 0 }) + suffix;
}

export function shortPhp(n: number | null | undefined, unit?: string): string {
  if (n == null || !Number.isFinite(n)) return "—";
  let u = unit || "auto";
  if (u === "auto") {
    if (Math.abs(n) >= 1e9) u = "B";
    else if (Math.abs(n) >= 1e6) u = "M";
    else u = "K";
  }
  const fmtNum = (v: number, d: number) => v.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
  if (u === "B") { const v = n / 1e9; return fmtNum(v, Math.abs(v) >= 10 ? 1 : 2) + "B"; }
  if (u === "M") { const v = n / 1e6; return fmtNum(v, Math.abs(v) >= 10 ? 1 : 2) + "M"; }
  const v = n / 1e3;
  return fmtNum(v, 0) + "K";
}

export function pct(n: number | null | undefined, digits = 1): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return (n * 100).toFixed(digits) + "%";
}

export function signedPct(n: number | null | undefined, digits = 1): string {
  if (n == null || !Number.isFinite(n)) return "—";
  const v = n * 100;
  const sign = v > 0 ? "+" : "";
  return sign + v.toFixed(digits) + "%";
}

const fmt = { php, shortPhp, pct, signedPct };
export default fmt;
