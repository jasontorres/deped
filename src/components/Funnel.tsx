import type { Stage, StageTotals } from '../lib/data-loader';
import fmt from '../lib/format';

interface FunnelProps {
  STAGES: Stage[];
  yearStage: Record<number, Record<string, StageTotals>>;
  year: number;
  currency: string;
  onStageClick?: (key: string) => void;
}

export const Funnel = ({ STAGES, yearStage, year, currency, onStageClick }: FunnelProps) => {
  const stages = STAGES;
  const data = yearStage[year] || {};
  const nepTotal = data.NEP?.total;
  const max = Math.max(...stages.map(s => data[s.key]?.total || 0), 1);

  return (
    <div>
      <div className="funnel">
        {stages.map((s, i) => {
          const v = data[s.key];
          const muted = !v || !v.total;
          const prev = i > 0 ? data[stages[i - 1].key] : null;
          let deltaPct: number | null = null;
          if (v?.total != null && prev?.total) {
            deltaPct = (v.total - prev.total) / prev.total;
          }
          const pctOfNep = nepTotal && v?.total != null ? v.total / nepTotal : null;
          const total = v?.total || 0;
          const ps = v?.ps || 0;
          const mooe = v?.mooe || 0;
          const co = v?.co || 0;
          const segH = (val: number) => max ? (val / max) * 90 : 0;

          return (
            <div key={s.key} className={`funnel-col ${muted ? "muted" : ""}`}
              onClick={() => v?.total != null && onStageClick?.(s.key)}
              style={{ cursor: v?.total != null ? "pointer" : "default" }}>
              <div className="funnel-stage">
                <strong>{String(s.order).padStart(2, "0")}</strong> · {s.label}
              </div>
              <div className={`funnel-amt ${muted ? "muted" : ""}`}>
                {muted ? "—" : fmt.php(v.total, { unit: currency as "auto" | "B" | "M" })}
              </div>
              <div className={`funnel-pct ${deltaPct != null && deltaPct > 0.005 ? "gain" : deltaPct != null && deltaPct < -0.005 ? "loss" : ""}`}>
                {muted ? "no data at this stage" : (deltaPct == null ? "100% baseline" : fmt.signedPct(deltaPct) + " vs prev")}
              </div>
              <div className="funnel-bar-wrap">
                {!muted && (
                  <div className="funnel-bar" style={{ height: segH(total) }}>
                    <div className="seg ps" style={{ height: `${(ps / total) * 100}%` }} />
                    <div className="seg mooe" style={{ height: `${(mooe / total) * 100}%` }} />
                    <div className="seg co" style={{ height: `${(co / total) * 100}%` }} />
                  </div>
                )}
              </div>
              {pctOfNep != null && !muted && (
                <div className="funnel-pct" style={{ marginTop: 4 }}>{fmt.pct(pctOfNep, 0)} of NEP</div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex between items-center" style={{ marginTop: 14 }}>
        <div className="stage-legend">
          <span><span className="swatch" style={{ background: "var(--stage-3)" }} />Personnel (PS)</span>
          <span><span className="swatch" style={{ background: "var(--stage-5)" }} />Operations (MOOE)</span>
          <span><span className="swatch" style={{ background: "var(--stage-7)" }} />Capital (CO)</span>
        </div>
        <div className="muted text-xs">Bars show relative size; segments split by expense type.</div>
      </div>
    </div>
  );
};
