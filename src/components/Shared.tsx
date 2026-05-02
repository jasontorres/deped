import type { Stage } from '../lib/data-loader';

interface StageDotValues {
  [key: string]: number | null | undefined;
}

export const StageDots = ({ stages, activeStage, values, max, onStageHover, formatVal }: {
  stages: Stage[];
  activeStage?: string | null;
  values: StageDotValues;
  max: number;
  onStageHover?: (key: string | null) => void;
  formatVal?: (v: number | null | undefined) => string;
}) => (
  <div className="flex items-center gap-1" style={{ height: 28 }}>
    {stages.map(s => {
      const v = values[s.key];
      const h = max && v ? Math.max(2, (v / max) * 24) : 2;
      const active = activeStage === s.key;
      return (
        <div key={s.key} title={`${s.full}: ${formatVal ? formatVal(v) : v}`}
          onMouseEnter={() => onStageHover?.(s.key)}
          onMouseLeave={() => onStageHover?.(null)}
          style={{ width: 6, height: h, background: active ? "var(--accent)" : (v == null ? "var(--rule)" : "var(--ink)"), opacity: v == null ? 0.4 : 1 }}
        />
      );
    })}
  </div>
);

interface TooltipData {
  x: number;
  y: number;
  title?: string;
  rows?: { k: string; v: string }[];
}

export const Tooltip = ({ tt }: { tt: TooltipData | null }) => {
  if (!tt) return null;
  const style = { left: Math.min(tt.x + 12, window.innerWidth - 280), top: Math.min(tt.y + 12, window.innerHeight - 120) };
  return (
    <div className="tt" style={style}>
      {tt.title && <div className="tt-title">{tt.title}</div>}
      {tt.rows?.map((r, i) => (<div key={i} className="tt-row"><span className="tt-key">{r.k}</span><span>{r.v}</span></div>))}
    </div>
  );
};

export const Pill = ({ children, kind }: { children: React.ReactNode; kind?: string }) => (
  <span className={`pill ${kind || ""}`}>{children}</span>
);

export const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className="eyebrow">{children}</p>;

export const Headline = ({ children, size }: { children: React.ReactNode; size?: string }) => (
  <h2 className={`headline ${size || ""}`}>{children}</h2>
);

export const Dek = ({ children }: { children: React.ReactNode }) => <p className="dek">{children}</p>;

export const SectionHead = ({ eyebrow, headline, dek, right, size }: {
  eyebrow?: string;
  headline: string;
  dek?: string;
  right?: React.ReactNode;
  size?: string;
}) => (
  <div className="flex between items-end" style={{ marginBottom: 18 }}>
    <div style={{ maxWidth: 760 }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Headline size={size}>{headline}</Headline>
      {dek && <Dek>{dek}</Dek>}
    </div>
    {right && <div>{right}</div>}
  </div>
);

export const Spark = ({ values, w = 72, h = 22, color = "var(--ink)" }: {
  values: (number | null)[];
  w?: number;
  h?: number;
  color?: string;
}) => {
  const clean = values.map(v => (Number.isFinite(v) ? (v as number) : 0));
  const max = Math.max(...clean, 1);
  const min = Math.min(...clean, 0);
  const range = max - min || 1;
  const step = w / Math.max(values.length - 1, 1);
  const pts = clean.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      {clean.map((v, i) => {
        const x = i * step;
        const y = h - ((v - min) / range) * h;
        return <circle key={i} cx={x} cy={y} r="1.5" fill={color} />;
      })}
    </svg>
  );
};
