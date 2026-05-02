import type { Stage, StageTotals } from '../lib/data-loader';
import fmt from '../lib/format';

interface SankeyProps {
  stages: Stage[];
  totals: Record<string, StageTotals>;
  currency: string;
  height?: number;
}

export const Sankey = ({ stages, totals, currency, height = 280 }: SankeyProps) => {
  const W = 980;
  const H = height;
  const margin = { top: 30, right: 100, bottom: 30, left: 100 };
  const cw = W - margin.left - margin.right;
  const ch = H - margin.top - margin.bottom;

  const present = stages.filter(s => totals[s.key]?.total != null && totals[s.key].total > 0);
  if (present.length < 2) {
    return <div className="muted" style={{ padding: 32, textAlign: "center" }}>Not enough stage data to draw flow.</div>;
  }
  const max = Math.max(...present.map(s => totals[s.key].total));
  const colW = cw / Math.max(present.length - 1, 1);

  const stageX = (i: number) => margin.left + i * colW;
  const nodeH = (val: number) => Math.max(4, (val / max) * (ch * 0.85));

  const stageColor = (i: number) => {
    const palette = ["#e8d5a8", "#d9b97a", "#c89b54", "#b07d3a", "#8c5e2a", "#5e3f1c", "#2e1f0e"];
    const idx = stages.findIndex(s => s.key === present[i].key);
    return palette[Math.min(idx, palette.length - 1)];
  };

  const flows: { path: string; fromIdx: number; toIdx: number; fromVal: number; toVal: number }[] = [];
  for (let i = 0; i < present.length - 1; i++) {
    const a = totals[present[i].key].total;
    const b = totals[present[i + 1].key].total;
    const ay = margin.top + ch / 2 - nodeH(a) / 2;
    const by = margin.top + ch / 2 - nodeH(b) / 2;
    const ah = nodeH(a);
    const bh = nodeH(b);
    const x1 = stageX(i) + 14;
    const x2 = stageX(i + 1) - 14;
    const cx = x1 + (x2 - x1) * 0.5;
    const path = `M ${x1} ${ay} C ${cx} ${ay}, ${cx} ${by}, ${x2} ${by} L ${x2} ${by + bh} C ${cx} ${by + bh}, ${cx} ${ay + ah}, ${x1} ${ay + ah} Z`;
    flows.push({ path, fromIdx: i, toIdx: i + 1, fromVal: a, toVal: b });
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sankey-svg">
      <line x1={margin.left} x2={W - margin.right} y1={margin.top + ch / 2} y2={margin.top + ch / 2}
        stroke="var(--rule)" strokeDasharray="2 3" />
      {flows.map((f, i) => (
        <path key={i} d={f.path} fill={stageColor(f.fromIdx)} fillOpacity="0.35"
          stroke={stageColor(f.fromIdx)} strokeOpacity="0.5" strokeWidth="0.5" />
      ))}
      {present.map((s, i) => {
        const v = totals[s.key].total;
        const h = nodeH(v);
        const x = stageX(i);
        const y = margin.top + ch / 2 - h / 2;
        return (
          <g key={s.key}>
            <rect x={x - 6} y={y} width="12" height={h} fill={stageColor(i)} stroke="var(--ink)" strokeWidth="0.75" />
            <text x={x} y={margin.top - 14} className="sankey-stage-label active" textAnchor="middle">{s.label}</text>
            <text x={x} y={y - 6} textAnchor="middle"
              style={{ fontFamily: "var(--mono)", fontSize: 11, fill: "var(--ink)" }}>
              {fmt.shortPhp(v, currency === "auto" ? "B" : currency)}
            </text>
          </g>
        );
      })}
      {flows.map((f, i) => {
        const delta = f.toVal - f.fromVal;
        const pctVal = delta / f.fromVal;
        if (Math.abs(pctVal) < 0.005) return null;
        const x = stageX(f.fromIdx) + colW / 2;
        const y = margin.top + ch + 18;
        const color = pctVal > 0 ? "var(--positive)" : "var(--negative)";
        return (
          <text key={i} x={x} y={y} textAnchor="middle"
            style={{ fontFamily: "var(--mono)", fontSize: 10, fill: color, letterSpacing: "0.05em" }}>
            {fmt.signedPct(pctVal, 1)}
          </text>
        );
      })}
    </svg>
  );
};
