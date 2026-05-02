import { useState } from 'react';
import type { Stage, StageTotals, PapMeta } from '../lib/data-loader';
import fmt from '../lib/format';
import { SectionHead } from './Shared';
import { Sankey } from './Sankey';

interface PapDetailProps {
  STAGES: Stage[];
  pivot: Record<string, Record<number, Record<string, StageTotals>>>;
  papMeta: PapMeta;
  currency: string;
  allYears: number[];
  onClose: () => void;
}

export const PapDetail = ({ STAGES, pivot, papMeta, currency, allYears, onClose }: PapDetailProps) => {
  const [year, setYear] = useState(() => {
    const years = Object.keys(pivot[papMeta.papKey] || {}).map(Number).sort();
    return years[years.length - 1] || allYears[allYears.length - 1];
  });

  const yearData = pivot[papMeta.papKey] || {};
  const years = Object.keys(yearData).map(Number).sort();

  const totals = yearData[year] || {};

  const dispRates = allYears.map(y => {
    const d = yearData[y];
    if (!d) return null;
    const allotted = d.Allotted?.total;
    const disbursed = d.Disbursements?.total;
    if (!allotted || !disbursed) return null;
    return disbursed / allotted;
  });

  return (
    <div className="view">
      <div className="breadcrumb">
        <button className="crumb" onClick={onClose}>← Back</button>
        <span className="sep">/</span>
        <span>{papMeta.agencyName}</span>
        <span className="sep">/</span>
        <span className="here">{papMeta.pap}</span>
      </div>

      <SectionHead
        eyebrow={`${papMeta.progName} · PROGRAM ${papMeta.progCode}`}
        headline={papMeta.pap}
        size="xl"
        dek={`Tracking how this program's budget moves from proposal to actual disbursement, year by year.`}
      />

      <div className="flex gap-2" style={{ marginBottom: 18, flexWrap: "wrap" }}>
        {allYears.map(y => {
          const has = !!yearData[y];
          const active = y === year;
          return (
            <button
              key={y}
              disabled={!has}
              onClick={() => has && setYear(y)}
              className="pill"
              style={{
                cursor: has ? "pointer" : "not-allowed",
                opacity: has ? 1 : 0.35,
                background: active ? "var(--ink)" : "var(--paper-2)",
                color: active ? "var(--paper)" : "var(--ink-2)",
                borderColor: active ? "var(--ink)" : "var(--rule)",
                padding: "6px 12px",
                fontSize: 11,
              }}
            >
              FY {y}
            </button>
          );
        })}
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title">The journey · FY {year}</h3>
          <span className="card-meta">7 stages · proposal to disbursed</span>
        </div>
        <Sankey stages={STAGES} totals={totals} currency={currency} height={300} />
      </div>

      <div className="grid grid-3" style={{ marginTop: 16 }}>
        <div className="card subtle">
          <div className="card-meta">PROPOSED (NEP)</div>
          <div className="big-num">{fmt.php(totals.NEP?.total, { unit: currency as "auto" | "B" | "M" })}</div>
          <div className="muted text-xs" style={{ marginTop: 6 }}>
            Executive's proposal to Congress
          </div>
        </div>
        <div className="card subtle">
          <div className="card-meta">ENACTED (GAA)</div>
          <div className="big-num">{fmt.php(totals.GAA?.total, { unit: currency as "auto" | "B" | "M" })}</div>
          <div className="muted text-xs" style={{ marginTop: 6 }}>
            {totals.NEP?.total && totals.GAA?.total ? (
              <span>{fmt.signedPct((totals.GAA.total - totals.NEP.total) / totals.NEP.total)} from NEP</span>
            ) : "Awaiting enactment"}
          </div>
        </div>
        <div className="card subtle">
          <div className="card-meta">DISBURSED</div>
          <div className="big-num">{fmt.php(totals.Disbursements?.total, { unit: currency as "auto" | "B" | "M" })}</div>
          <div className="muted text-xs" style={{ marginTop: 6 }}>
            {totals.Allotted?.total && totals.Disbursements?.total ? (
              <span>{fmt.pct(totals.Disbursements.total / totals.Allotted.total, 1)} absorption rate</span>
            ) : "Not yet disbursed"}
          </div>
        </div>
      </div>

      <hr className="section-rule thin" />

      <SectionHead
        eyebrow="Multi-year"
        headline="Year over year"
        size="sm"
        dek="How this program's allocation has shifted across fiscal years."
      />

      <table className="editorial">
        <thead>
          <tr>
            <th>Year</th>
            {STAGES.map(s => <th key={s.key} className="right">{s.label}</th>)}
            <th className="right">Disb. rate</th>
          </tr>
        </thead>
        <tbody>
          {allYears.map(y => {
            const d = yearData[y] || {};
            const dr = d.Allotted?.total && d.Disbursements?.total
              ? d.Disbursements.total / d.Allotted.total : null;
            return (
              <tr key={y}>
                <td className="mono">FY {y}</td>
                {STAGES.map(s => (
                  <td key={s.key} className="right">
                    {d[s.key]?.total != null ? fmt.shortPhp(d[s.key].total, "M") : <span className="muted">—</span>}
                  </td>
                ))}
                <td className="right">
                  {dr != null ? <span className={dr >= 0.9 ? "delta-pos" : dr < 0.6 ? "delta-neg" : ""}>{fmt.pct(dr, 0)}</span> : <span className="muted">—</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="footnote">Amounts in PHP millions. Disbursement rate = Disbursements ÷ Adjusted Total Allotments.</p>
    </div>
  );
};
