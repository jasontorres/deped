import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Stage, StageTotals, PapMeta } from '../lib/data-loader';
import fmt from '../lib/format';
import { SectionHead, Eyebrow } from './Shared';

/* ── Agency Overview ──────────────────────────────────────────────── */

interface AgencyOverviewProps {
  STAGES: Stage[];
  agencyYearStage: Record<string, Record<number, Record<string, StageTotals>>>;
  paps: PapMeta[];
  pivot: Record<string, Record<number, Record<string, StageTotals>>>;
  currency: string;
  year: number;
  allYears: number[];
  selectedAgencyId?: string;
  onPapClick: (pap: PapMeta & Record<string, unknown>) => void;
}

export const AgencyOverview = ({ STAGES, agencyYearStage, paps, pivot, currency, year, allYears, selectedAgencyId, onPapClick }: AgencyOverviewProps) => {
  const [selectedYear, setSelectedYear] = useState(year);

  useEffect(() => {
    setSelectedYear(year);
  }, [year]);

  const agencies = Object.keys(agencyYearStage).sort((a, b) => {
    const ta = agencyYearStage[a][selectedYear]?.GAA?.total || 0;
    const tb = agencyYearStage[b][selectedYear]?.GAA?.total || 0;
    return tb - ta;
  });
  const agencyCodeByName = new Map(paps.map(p => [p.agencyName, p.agency]));
  const selectedAgencyName = selectedAgencyId
    ? paps.find(p => p.agency === selectedAgencyId)?.agencyName
    : null;
  const agency = selectedAgencyName || agencies[0] || "Office of the Secretary";

  const ay = agencyYearStage[agency]?.[selectedYear] || {};
  const agencyPaps = paps.filter(p => p.agencyName === agency);

  const sortedPaps = agencyPaps.map(p => {
    const yd = pivot[p.papKey]?.[selectedYear] || {};
    const gaaTotal = yd.GAA?.total || 0;
    const disbursed = yd.Disbursements?.total;
    const allotted = yd.Allotted?.total;
    return {
      ...p,
      stageTotals: yd,
      gaaTotal,
      dr: (allotted && disbursed) ? disbursed / allotted : null,
    };
  }).sort((a, b) => b.gaaTotal - a.gaaTotal);

  const total = ay.GAA?.total || 0;

  return (
    <div className="view">
      <SectionHead
        eyebrow="Agency overview"
        headline="Programs by agency"
        dek="Drill into a single agency to see every program/activity it runs and how each one performed."
      />

      <Eyebrow>Pick a fiscal year</Eyebrow>
      <div className="year-strip agency-year-strip" style={{ marginTop: 8, marginBottom: 18 }}>
        {allYears.map(y => {
          const t = agencyYearStage[agency]?.[y]?.GAA?.total;
          const maxYear = Math.max(...allYears.map(yy => agencyYearStage[agency]?.[yy]?.GAA?.total || 0));
          const pctVal = maxYear ? ((t || 0) / maxYear) * 100 : 0;
          return (
            <button key={y} type="button" className={`year-cell ${selectedYear === y ? 'active' : ''}`} onClick={() => setSelectedYear(y)}>
              <div className="year-cell-num">FY {y}</div>
              <div className="year-cell-meta">{fmt.shortPhp(t, 'B')} GAA</div>
              <div className="year-cell-bar"><span style={{ width: pctVal + '%' }} /></div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2" style={{ marginBottom: 16, flexWrap: "wrap" }}>
        {agencies.map(a => (
          <Link
            key={a}
            to={`/agency/${encodeURIComponent(agencyCodeByName.get(a) || a)}`}
            className="pill"
            style={{
              cursor: "pointer",
              padding: "6px 12px", fontSize: 11,
              background: agency === a ? "var(--ink)" : "var(--paper-2)",
              color: agency === a ? "var(--paper)" : "var(--ink-2)",
              borderColor: agency === a ? "var(--ink)" : "var(--rule)",
            }}
          >
            {a}
          </Link>
        ))}
      </div>

      <div className="grid grid-4" style={{ marginBottom: 18 }}>
        <div className="card subtle">
          <div className="card-meta">FY {selectedYear} NEP</div>
          <div className="big-num">{fmt.php(ay.NEP?.total, { unit: currency as "auto" | "B" | "M" })}</div>
        </div>
        <div className="card subtle">
          <div className="card-meta">GAA</div>
          <div className="big-num">{fmt.php(ay.GAA?.total, { unit: currency as "auto" | "B" | "M" })}</div>
        </div>
        <div className="card subtle">
          <div className="card-meta">Disbursed</div>
          <div className="big-num">{fmt.php(ay.Disbursements?.total, { unit: currency as "auto" | "B" | "M" })}</div>
        </div>
        <div className="card subtle">
          <div className="card-meta"># PAPs</div>
          <div className="big-num">{agencyPaps.length}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title">{agency} · {agencyPaps.length} programs</h3>
          <span className="card-meta">FY {selectedYear} · click a row to open journey</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="editorial agency-program-table">
            <thead>
              <tr>
                <th>Program / Activity / Project</th>
                <th>Function</th>
                {STAGES.map(s => <th key={s.key} className="right">{s.label}</th>)}
                <th className="right">% of agency GAA</th>
                <th className="right">Disb. rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedPaps.map(p => (
                <tr key={p.papKey} className="clickable" onClick={() => onPapClick(p)}>
                  <td>{p.pap}</td>
                  <td className="text-xs muted">{p.progName}</td>
                  {STAGES.map(s => {
                    const stageTotal = p.stageTotals[s.key]?.total;
                    return (
                      <td key={s.key} className="right">
                        {stageTotal ? fmt.shortPhp(stageTotal, "M") : <span className="muted">—</span>}
                      </td>
                    );
                  })}
                  <td className="right">{p.gaaTotal && total ? fmt.pct(p.gaaTotal / total, 1) : "—"}</td>
                  <td className="right">
                    {p.dr != null ? <span className={p.dr >= 0.9 ? "delta-pos" : p.dr < 0.6 ? "delta-neg" : ""}>{fmt.pct(p.dr, 0)}</span> : <span className="muted">—</span>}
                  </td>
                  <td className="muted">→</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ── Leaderboard ──────────────────────────────────────────────────── */

interface LeaderboardProps {
  paps: PapMeta[];
  pivot: Record<string, Record<number, Record<string, StageTotals>>>;
  currency: string;
  year: number;
  allYears: number[];
  yearStage: Record<number, Record<string, StageTotals>>;
  onPapClick: (pap: PapMeta & Record<string, unknown>) => void;
}

interface RankedPap extends PapMeta {
  [key: string]: unknown;
  allotted: number;
  disbursed: number;
  rate: number;
}

export const Leaderboard = ({ paps, pivot, currency, year, allYears, yearStage, onPapClick }: LeaderboardProps) => {
  const [selectedYear, setSelectedYear] = useState(year);

  useEffect(() => {
    setSelectedYear(year);
  }, [year]);

  const ranked = paps.map(p => {
    const yd = pivot[p.papKey]?.[selectedYear];
    if (!yd) return null;
    const allotted = yd.Allotted?.total;
    const disbursed = yd.Disbursements?.total;
    if (!allotted || !disbursed || allotted < 1e6) return null;
    return {
      ...p,
      allotted, disbursed,
      rate: disbursed / allotted,
    };
  }).filter((x): x is RankedPap => x != null);

  const sorted = [...ranked].sort((a, b) => b.rate - a.rate);
  const top = sorted.slice(0, 8);
  const bottom = [...sorted].slice(-8).reverse();

  const Row = ({ p }: { p: RankedPap }) => {
    const w = Math.min(100, p.rate * 100);
    const cls = p.rate >= 0.95 ? "pos" : p.rate < 0.6 ? "neg" : "accent";
    return (
      <tr className="clickable" onClick={() => onPapClick(p)}>
        <td style={{ maxWidth: 380 }}>
          <div>{p.pap}</div>
          <div className="text-xs muted">{p.agencyName}</div>
        </td>
        <td className="right">{fmt.shortPhp(p.allotted, "M")}</td>
        <td className="right">{fmt.shortPhp(p.disbursed, "M")}</td>
        <td className="right" style={{ width: 200 }}>
          <div className="flex items-center gap-2">
            <div className={`bar-h ${cls}`} style={{ flex: 1 }}><span style={{ width: `${w}%` }} /></div>
            <span className="mono" style={{ minWidth: 48 }}>{fmt.pct(p.rate, 0)}</span>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="view">
      <SectionHead
        eyebrow={`Absorption · FY ${selectedYear}`}
        headline="Where the money actually went"
        dek="Disbursement rate = cash actually paid ÷ amount released. Programs at the bottom either struggled to spend or were stalled."
      />
      <Eyebrow>Pick a fiscal year</Eyebrow>
      <div className="year-strip" style={{ marginTop: 8, marginBottom: 18 }}>
        {allYears.map(y => {
          const t = yearStage[y]?.GAA?.total;
          const maxYear = Math.max(...allYears.map(yy => yearStage[yy]?.GAA?.total || 0));
          const pctVal = maxYear ? ((t || 0) / maxYear) * 100 : 0;
          return (
            <button key={y} type="button" className={`year-cell ${selectedYear === y ? 'active' : ''}`} onClick={() => setSelectedYear(y)}>
              <div className="year-cell-num">FY {y}</div>
              <div className="year-cell-meta">{fmt.shortPhp(t, 'B')} GAA</div>
              <div className="year-cell-bar"><span style={{ width: pctVal + '%' }} /></div>
            </button>
          );
        })}
      </div>
      <div className="grid grid-2 gap-6">
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">Top absorbers</h3>
            <span className="card-meta">FY {selectedYear}</span>
          </div>
          <table className="editorial">
            <thead><tr>
              <th>Program</th><th className="right">Allotted</th><th className="right">Disbursed</th><th className="right">Rate</th>
            </tr></thead>
            <tbody>{top.map(p => <Row key={p.papKey} p={p} />)}</tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">Bottom absorbers</h3>
            <span className="card-meta">FY {selectedYear}</span>
          </div>
          <table className="editorial">
            <thead><tr>
              <th>Program</th><th className="right">Allotted</th><th className="right">Disbursed</th><th className="right">Rate</th>
            </tr></thead>
            <tbody>{bottom.map(p => <Row key={p.papKey} p={p} />)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ── Augmentation Tracker ─────────────────────────────────────────── */

interface AugmentationTrackerProps {
  paps: PapMeta[];
  pivot: Record<string, Record<number, Record<string, StageTotals>>>;
  currency: string;
  year: number;
  allYears: number[];
  yearStage: Record<number, Record<string, StageTotals>>;
  onPapClick: (pap: PapMeta & Record<string, unknown>) => void;
}

interface AugItem extends PapMeta {
  [key: string]: unknown;
  auth: number;
  adj: number;
  delta: number;
  pct: number;
}

export const AugmentationTracker = ({ paps, pivot, currency, year, allYears, yearStage, onPapClick }: AugmentationTrackerProps) => {
  const [selectedYear, setSelectedYear] = useState(year);

  useEffect(() => {
    setSelectedYear(year);
  }, [year]);

  const items = paps.map(p => {
    const yd = pivot[p.papKey]?.[selectedYear];
    if (!yd) return null;
    const auth = yd.Authorized?.total;
    const adj = yd.Adjusted?.total;
    if (auth == null && adj == null) return null;
    const a = auth || 0;
    const b = adj || 0;
    const delta = b - a;
    if (Math.abs(delta) < 1e6) return null;
    return { ...p, auth: a, adj: b, delta, pct: a ? delta / a : (b > 0 ? 1 : 0) };
  }).filter((x): x is AugItem => x != null);

  const augmented = items.filter(i => i.delta > 0).sort((a, b) => b.delta - a.delta).slice(0, 8);
  const cut = items.filter(i => i.delta < 0).sort((a, b) => a.delta - b.delta).slice(0, 8);

  const Row = ({ p, kind }: { p: AugItem; kind: "pos" | "neg" }) => (
    <tr className="clickable" onClick={() => onPapClick(p)}>
      <td>{p.pap}<div className="text-xs muted">{p.agencyName}</div></td>
      <td className="right">{fmt.shortPhp(p.auth, "M")}</td>
      <td className="right">{fmt.shortPhp(p.adj, "M")}</td>
      <td className={`right ${kind === "pos" ? "delta-pos" : "delta-neg"}`}>
        {kind === "pos" ? "+" : ""}{fmt.shortPhp(p.delta, "M")}
      </td>
      <td className={`right ${kind === "pos" ? "delta-pos" : "delta-neg"}`}>{fmt.signedPct(p.pct)}</td>
    </tr>
  );

  return (
    <div className="view">
      <SectionHead
        eyebrow={`Adjustments · FY ${selectedYear}`}
        headline="Augmentations and cuts mid-year"
        dek="The space between the authorized and adjusted budget shows where money was added (augmented) or pulled back (cut) after Congress acted."
      />
      <Eyebrow>Pick a fiscal year</Eyebrow>
      <div className="year-strip" style={{ marginTop: 8, marginBottom: 18 }}>
        {allYears.map(y => {
          const t = yearStage[y]?.GAA?.total;
          const maxYear = Math.max(...allYears.map(yy => yearStage[yy]?.GAA?.total || 0));
          const pctVal = maxYear ? ((t || 0) / maxYear) * 100 : 0;
          return (
            <button key={y} type="button" className={`year-cell ${selectedYear === y ? 'active' : ''}`} onClick={() => setSelectedYear(y)}>
              <div className="year-cell-num">FY {y}</div>
              <div className="year-cell-meta">{fmt.shortPhp(t, 'B')} GAA</div>
              <div className="year-cell-bar"><span style={{ width: pctVal + '%' }} /></div>
            </button>
          );
        })}
      </div>
      <div className="grid grid-2 gap-6">
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">Largest augmentations</h3>
            <span className="card-meta">Adjusted &gt; Authorized</span>
          </div>
          <table className="editorial">
            <thead><tr><th>Program</th><th className="right">Authorized</th><th className="right">Adjusted</th><th className="right">Δ</th><th className="right">%</th></tr></thead>
            <tbody>
              {augmented.length ? augmented.map(p => <Row key={p.papKey} p={p} kind="pos" />) :
                <tr><td colSpan={5} className="muted" style={{ padding: 18 }}>No augmentation data for this year.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">Largest pull-backs</h3>
            <span className="card-meta">Adjusted &lt; Authorized</span>
          </div>
          <table className="editorial">
            <thead><tr><th>Program</th><th className="right">Authorized</th><th className="right">Adjusted</th><th className="right">Δ</th><th className="right">%</th></tr></thead>
            <tbody>
              {cut.length ? cut.map(p => <Row key={p.papKey} p={p} kind="neg" />) :
                <tr><td colSpan={5} className="muted" style={{ padding: 18 }}>No pull-back data for this year.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ── Search Table ─────────────────────────────────────────────────── */

interface SearchTableProps {
  data: unknown;
  STAGES: Stage[];
  currency: string;
  onPapClick: (pap: PapMeta & Record<string, unknown>) => void;
  paps: PapMeta[];
  pivot: Record<string, Record<number, Record<string, StageTotals>>>;
  allYears: number[];
}

interface SearchRow extends PapMeta {
  ps: number | undefined;
  mooe: number | undefined;
  co: number | undefined;
  total: number | undefined;
  [key: string]: unknown;
}

type SortState = { key: string; dir: "asc" | "desc" };

export const SearchTable = ({ data, STAGES, currency, onPapClick, paps, pivot, allYears }: SearchTableProps) => {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState("NEP");
  const [year, setYear] = useState(allYears[allYears.length - 2] || allYears[allYears.length - 1]);
  const [agency, setAgency] = useState("");
  const [sort, setSort] = useState<SortState>({ key: "total", dir: "desc" });

  const agencies = [...new Set(paps.map(p => p.agencyName))].sort();

  const rows: SearchRow[] = paps.map(p => {
    const v = pivot[p.papKey]?.[year]?.[stage];
    return {
      ...p,
      ps: v?.ps, mooe: v?.mooe, co: v?.co, total: v?.total,
    };
  }).filter(r => {
    if (q && !(`${r.pap} ${r.agencyName} ${r.progName}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (agency && r.agencyName !== agency) return false;
    return true;
  });

  rows.sort((a, b) => {
    const k = sort.key;
    const av = a[k] as string | number | null | undefined;
    const bv = b[k] as string | number | null | undefined;
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === "string" && typeof bv === "string") return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    return sort.dir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  const sortBy = (key: string) => setSort(s => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" }));
  const ind = (key: string) => sort.key === key ? <span className="sort-ind">{sort.dir === "asc" ? "▲" : "▼"}</span> : null;

  return (
    <div className="view">
      <SectionHead
        eyebrow="Raw data"
        headline="Search & filter"
        dek="Slice the dataset directly. Filter by agency, stage, year; search by program name."
      />
      <div className="card">
        <div className="flex gap-3 items-center" style={{ marginBottom: 14, flexWrap: "wrap" }}>
          <input className="text-input" placeholder="Search program, agency…"
                 value={q} onChange={e => setQ(e.target.value)}
                 style={{ flex: "1 1 280px", maxWidth: 380 }} />
          <select className="select-input" value={agency} onChange={e => setAgency(e.target.value)}>
            <option value="">All agencies</option>
            {agencies.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select className="select-input" value={stage} onChange={e => setStage(e.target.value)}>
            {STAGES.map(s => <option key={s.key} value={s.key}>{s.full}</option>)}
          </select>
          <select className="select-input" value={year} onChange={e => setYear(+e.target.value)}>
            {allYears.map(y => <option key={y} value={y}>FY {y}</option>)}
          </select>
          <span className="muted text-xs">{rows.length} rows</span>
        </div>
        <div style={{ maxHeight: 560, overflow: "auto" }}>
          <table className="editorial">
            <thead style={{ position: "sticky", top: 0, background: "var(--paper)" }}>
              <tr>
                <th onClick={() => sortBy("pap")}>Program {ind("pap")}</th>
                <th onClick={() => sortBy("agencyName")}>Agency {ind("agencyName")}</th>
                <th onClick={() => sortBy("progName")}>Function {ind("progName")}</th>
                <th className="right" onClick={() => sortBy("ps")}>PS {ind("ps")}</th>
                <th className="right" onClick={() => sortBy("mooe")}>MOOE {ind("mooe")}</th>
                <th className="right" onClick={() => sortBy("co")}>CO {ind("co")}</th>
                <th className="right" onClick={() => sortBy("total")}>Total {ind("total")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 200).map(r => (
                <tr key={r.papKey} className="clickable" onClick={() => onPapClick(r)}>
                  <td>{r.pap}</td>
                  <td className="text-xs">{r.agencyName}</td>
                  <td className="text-xs muted">{r.progName}</td>
                  <td className="right">{r.ps != null ? fmt.shortPhp(r.ps, "M") : <span className="muted">—</span>}</td>
                  <td className="right">{r.mooe != null ? fmt.shortPhp(r.mooe, "M") : <span className="muted">—</span>}</td>
                  <td className="right">{r.co != null ? fmt.shortPhp(r.co, "M") : <span className="muted">—</span>}</td>
                  <td className="right" style={{ fontWeight: 600 }}>{r.total != null ? fmt.shortPhp(r.total, "M") : <span className="muted">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > 200 && <p className="footnote">Showing first 200 of {rows.length} matching rows. Refine filters to narrow down.</p>}
        </div>
      </div>
    </div>
  );
};

/* ── Year Comparison ──────────────────────────────────────────────── */

interface YearComparisonProps {
  STAGES: Stage[];
  yearStage: Record<number, Record<string, StageTotals>>;
  currency: string;
  allYears: number[];
  year: number;
}

export const YearComparison = ({ STAGES, yearStage, currency, allYears, year }: YearComparisonProps) => {
  const selectedYearData = yearStage[year] || {};
  const stageRows = STAGES.map(stage => ({
    ...stage,
    ...(selectedYearData[stage.key] || { ps: 0, mooe: 0, co: 0, total: 0 }),
  }));
  const max = Math.max(...stageRows.map(d => d.total), 1);
  const latestComplete = selectedYearData.GAA || selectedYearData.NEP || { ps: 0, mooe: 0, co: 0, total: 0 };

  return (
    <div className="view">
      <SectionHead
        eyebrow={`Fiscal year · ${year}`}
        headline="Personnel · Operations · Capital, stage by stage"
        dek="Pick a fiscal year to see how the budget's composition changes across the seven stages of the cycle."
      />

      <Eyebrow>Pick a fiscal year</Eyebrow>
      <div className="year-strip" style={{ marginTop: 8, marginBottom: 28 }}>
        {allYears.map(y => {
          const t = yearStage[y]?.GAA?.total;
          const maxYear = Math.max(...allYears.map(yy => yearStage[yy]?.GAA?.total || 0));
          const pctVal = maxYear ? ((t || 0) / maxYear) * 100 : 0;
          return (
            <Link key={y} to={`/year/${y}`} className={`year-cell ${year === y ? 'active' : ''}`}>
              <div className="year-cell-num">FY {y}</div>
              <div className="year-cell-meta">{fmt.shortPhp(t, 'B')} GAA</div>
              <div className="year-cell-bar"><span style={{ width: pctVal + '%' }} /></div>
            </Link>
          );
        })}
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title">FY {year} budget cycle</h3>
          <div className="stage-legend">
            <span><span className="swatch" style={{ background: "var(--stage-3)" }} />PS</span>
            <span><span className="swatch" style={{ background: "var(--stage-5)" }} />MOOE</span>
            <span><span className="swatch" style={{ background: "var(--stage-7)" }} />CO</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${STAGES.length}, 1fr)`, gap: 8, alignItems: "end", height: 280, padding: "12px 0" }}>
          {stageRows.map(d => {
            const h = (d.total / max) * 240;
            const psH = d.total ? (d.ps / d.total) * h : 0;
            const mH = d.total ? (d.mooe / d.total) * h : 0;
            const coH = d.total ? (d.co / d.total) * h : 0;
            return (
              <div key={d.key} className="flex-col items-center gap-2">
                <div className="mono text-xs">{d.total ? fmt.shortPhp(d.total, "B") : "—"}</div>
                <div style={{ width: "70%", minHeight: 2, height: Math.max(h, d.total ? 2 : 0), display: "flex", flexDirection: "column-reverse", border: d.total ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <div style={{ height: psH, background: "var(--stage-3)" }} title={`PS: ${fmt.shortPhp(d.ps, "B")}`} />
                  <div style={{ height: mH, background: "var(--stage-5)" }} title={`MOOE: ${fmt.shortPhp(d.mooe, "B")}`} />
                  <div style={{ height: coH, background: "var(--stage-7)" }} title={`CO: ${fmt.shortPhp(d.co, "B")}`} />
                </div>
                <div className="mono text-xs muted">{d.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-3 gap-4" style={{ marginTop: 16 }}>
        {(["ps", "mooe", "co"] as const).map(k => {
          const colors: Record<string, string> = { ps: "var(--stage-3)", mooe: "var(--stage-5)", co: "var(--stage-7)" };
          const labels: Record<string, string> = { ps: "Personnel", mooe: "Operations", co: "Capital outlay" };
          const totals = stageRows.map(d => d[k]);
          const maxV = Math.max(...totals, 1);
          return (
            <div key={k} className="card subtle">
              <div className="card-meta" style={{ color: colors[k] }}>{labels[k]}</div>
              <div className="big-num">{fmt.shortPhp(latestComplete[k], "B")}</div>
              <div className="muted text-xs" style={{ marginBottom: 8 }}>FY {year} {selectedYearData.GAA ? "GAA" : "NEP"}</div>
              <div style={{ display: "flex", gap: 4, alignItems: "end", height: 50 }}>
                {stageRows.map(d => (
                  <div key={d.key} style={{ flex: 1, height: (d[k] / maxV) * 50, background: colors[k] }} title={`${d.label}: ${fmt.shortPhp(d[k], "B")}`} />
                ))}
              </div>
              <div className="flex between text-xs muted mono" style={{ marginTop: 4 }}>
                <span>{STAGES[0]?.label}</span><span>{STAGES[STAGES.length - 1]?.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
