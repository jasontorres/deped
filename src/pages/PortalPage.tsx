import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { BudgetData, PapMeta, StageTotals } from '../lib/data-loader';
import { loadBudget } from '../lib/data-loader';
import fmt from '../lib/format';
import { SectionHead, Eyebrow, Headline } from '../components/Shared';
import { Funnel } from '../components/Funnel';
import { AgencyOverview, Leaderboard, AugmentationTracker, SearchTable, YearComparison } from '../components/Views';
import { PapDetail } from '../components/PapDetail';
import { useTweaks, TweaksPanel, TweakSection, TweakSelect, TweakSlider, TweakColor, TweakRadio, TweakButton } from '../components/TweaksPanel';

type ViewId = 'overview' | 'agency' | 'leaderboard' | 'augmentation' | 'comparison' | 'search' | 'pap';

const TWEAK_DEFAULTS = {
  currency: 'auto',
  density: 'comfortable',
  accent: '#b8341f',
  paper: '#ffffff',
  ink: '#16140f',
  fontHero: 'Outfit',
  fontHead: 'JetBrains Mono',
  fontBody: 'Inter Tight',
  fontMono: 'JetBrains Mono',
  fontScale: 1,
};

export function PortalPage() {
  const [budget, setBudget] = useState<BudgetData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewId>('overview');
  const [year, setYear] = useState(2024);
  const [activePap, setActivePap] = useState<(PapMeta & Record<string, unknown>) | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--accent', tweaks.accent);
    r.setProperty('--paper', tweaks.paper);
    r.setProperty('--ink', tweaks.ink);
    r.setProperty('font-size', `${14 * tweaks.fontScale}px`);
    const stack = (f: string, fb: string) => `"${f}", ${fb}`;
    r.setProperty('--font-hero', stack(tweaks.fontHero, '"Inter Tight", -apple-system, sans-serif'));
    r.setProperty('--font-head', stack(tweaks.fontHead, 'ui-monospace, "SF Mono", Menlo, monospace'));
    r.setProperty('--font-body', stack(tweaks.fontBody, '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'));
    r.setProperty('--font-mono', stack(tweaks.fontMono, 'ui-monospace, "SF Mono", Menlo, monospace'));
  }, [tweaks.accent, tweaks.paper, tweaks.ink, tweaks.fontScale, tweaks.fontHero, tweaks.fontHead, tweaks.fontBody, tweaks.fontMono]);

  useEffect(() => {
    loadBudget()
      .then(b => {
        setBudget(b);
        setYear(2024);
      })
      .catch(e => setError(e.message));
  }, []);

  if (error) return <div className="loading-screen"><Headline>Couldn't load data</Headline><p className="muted">{error}</p></div>;
  if (!budget) return (
    <div className="loading-screen">
      <Eyebrow>DepEd Budget Portal</Eyebrow>
      <Headline>Loading 4,440 budget rows…</Headline>
      <div className="loading-bar" />
      <p className="muted text-xs">Parsing CSV in browser · 6 fiscal years · 7 stages · 109 programs</p>
    </div>
  );

  const { STAGES, yearStage, agencyYearStage, paps, pivot, years, data } = budget;

  const onPapClick = (papMeta: PapMeta & Record<string, unknown>) => {
    setActivePap(papMeta);
    setView('pap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDetail = () => {
    setActivePap(null);
    setView('overview');
  };

  const selectView = (id: ViewId) => {
    setActivePap(null);
    setView(id);
    setMobileNavOpen(false);
  };

  const navItems: { id: ViewId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'agency', label: 'By agency' },
    { id: 'leaderboard', label: 'Absorption' },
    { id: 'augmentation', label: 'Augmentations' },
    { id: 'comparison', label: 'By year' },
    { id: 'search', label: 'Search' },
  ];

  return (
    <div>
      <header className="masthead">
        <div className="masthead-inner">
          <div className="masthead-row">
            <h1 className="masthead-title">
              <span className="kicker">Department of Education · Fiscal Years 2021—2026</span>
              The <span className="deped-mark">DepEd</span> Budget Portal
            </h1>
            <div className="masthead-date">Compiled · DBM PBC · {budget.data.length.toLocaleString('en-US')} rows</div>
            <button
              type="button"
              className={`mobile-menu-toggle ${mobileNavOpen ? 'open' : ''}`}
              aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileNavOpen(open => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
          <nav className="masthead-nav">
            {navItems.map(n => (
              <button key={n.id}
                      className={view === n.id ? 'active' : ''}
                      onClick={() => selectView(n.id)}>
                {n.label}
              </button>
            ))}
            <Link to="/story" className="masthead-nav-link">
              The Story →
            </Link>
            <Link to="/investigation" className="masthead-nav-link" style={{ marginLeft: 0, color: 'var(--ink-3)' }}>
              Investigation →
            </Link>
          </nav>
          <nav id="mobile-nav" className={`mobile-nav-panel ${mobileNavOpen ? 'open' : ''}`} aria-hidden={!mobileNavOpen}>
            {navItems.map(n => (
              <button key={n.id}
                      className={view === n.id ? 'active' : ''}
                      onClick={() => selectView(n.id)}>
                {n.label}
              </button>
            ))}
            <Link to="/story" onClick={() => setMobileNavOpen(false)}>
              The Story →
            </Link>
            <Link to="/investigation" onClick={() => setMobileNavOpen(false)}>
              Investigation →
            </Link>
          </nav>
        </div>
      </header>

      <main className="shell">
        {view === 'overview' && (
          <OverviewView
            STAGES={STAGES} years={years} year={year} setYear={setYear}
            yearStage={yearStage} agencyYearStage={agencyYearStage}
            paps={paps} pivot={pivot} currency={tweaks.currency}
            onPapClick={onPapClick}
          />
        )}
        {view === 'agency' && (
          <AgencyOverview
            STAGES={STAGES} agencyYearStage={agencyYearStage}
            paps={paps} pivot={pivot} currency={tweaks.currency} year={year}
            onPapClick={onPapClick}
          />
        )}
        {view === 'leaderboard' && (
          <Leaderboard paps={paps} pivot={pivot} currency={tweaks.currency} year={year} onPapClick={onPapClick} />
        )}
        {view === 'augmentation' && (
          <AugmentationTracker paps={paps} pivot={pivot} currency={tweaks.currency} year={year} onPapClick={onPapClick} />
        )}
        {view === 'comparison' && (
          <YearComparison STAGES={STAGES} yearStage={yearStage} agencyYearStage={agencyYearStage}
                          currency={tweaks.currency} allYears={years} />
        )}
        {view === 'search' && (
          <SearchTable data={data} STAGES={STAGES} currency={tweaks.currency}
                       paps={paps} pivot={pivot} allYears={years} onPapClick={onPapClick} />
        )}
        {view === 'pap' && activePap && (
          <PapDetail
            STAGES={STAGES} pivot={pivot} papMeta={activePap}
            currency={tweaks.currency} allYears={years} onClose={closeDetail}
          />
        )}
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Typography">
          <TweakSelect label="Hero / logo"
            value={tweaks.fontHero}
            options={['Manrope', 'Plus Jakarta Sans', 'Mulish', 'Nunito', 'Outfit', 'Urbanist', 'DM Sans', 'Space Grotesk', 'Inter Tight']}
            onChange={v => setTweak('fontHero', v)} />
          <TweakSelect label="Section headers"
            value={tweaks.fontHead}
            options={['JetBrains Mono', 'Geist Mono', 'IBM Plex Mono', 'Fira Code', 'Space Grotesk', 'DM Sans', 'Manrope', 'Inter Tight']}
            onChange={v => setTweak('fontHead', v)} />
          <TweakSelect label="Body"
            value={tweaks.fontBody}
            options={['Inter Tight', 'Manrope', 'Plus Jakarta Sans', 'Mulish', 'Nunito', 'Outfit', 'Urbanist', 'DM Sans', 'IBM Plex Sans']}
            onChange={v => setTweak('fontBody', v)} />
          <TweakSelect label="Mono / numbers"
            value={tweaks.fontMono}
            options={['JetBrains Mono', 'Geist Mono', 'IBM Plex Mono', 'Fira Code']}
            onChange={v => setTweak('fontMono', v)} />
          <TweakSlider label="Font scale" min={0.85} max={1.15} step={0.05}
                       value={tweaks.fontScale} onChange={v => setTweak('fontScale', v)} />
        </TweakSection>
        <TweakSection label="Visual style">
          <TweakColor label="Paper" value={tweaks.paper} onChange={v => setTweak('paper', v)} />
          <TweakColor label="Ink" value={tweaks.ink} onChange={v => setTweak('ink', v)} />
          <TweakColor label="Accent" value={tweaks.accent} onChange={v => setTweak('accent', v)} />
        </TweakSection>
        <TweakSection label="Currency unit">
          <TweakRadio label="Display"
                      options={[
                        { label: 'Auto', value: 'auto' },
                        { label: 'M', value: 'M' },
                        { label: 'B', value: 'B' },
                      ]}
                      value={tweaks.currency} onChange={v => setTweak('currency', v)} />
        </TweakSection>
        <TweakSection label="Style presets">
          <TweakButton label="White (default)"
            onClick={() => setTweak({ paper: '#ffffff', ink: '#16140f', accent: '#b8341f' })} />
          <TweakButton label="Editorial cream"
            onClick={() => setTweak({ paper: '#faf6ec', ink: '#16140f', accent: '#b8341f' })} />
          <TweakButton label="FT pink (light)"
            onClick={() => setTweak({ paper: '#fff8f1', ink: '#33302e', accent: '#990f3d' })} />
          <TweakButton label="Civic blue"
            onClick={() => setTweak({ paper: '#ffffff', ink: '#0d0d0d', accent: '#1f4d8a' })} />
        </TweakSection>
        <TweakSection label="Type presets">
          <TweakButton label="Manrope hero · Mono headers"
            onClick={() => setTweak({ fontHero: 'Manrope', fontHead: 'JetBrains Mono', fontBody: 'Inter Tight' })} />
          <TweakButton label="Jakarta hero · Mono headers"
            onClick={() => setTweak({ fontHero: 'Plus Jakarta Sans', fontHead: 'JetBrains Mono', fontBody: 'Inter Tight' })} />
          <TweakButton label="Mulish hero · DM Sans body"
            onClick={() => setTweak({ fontHero: 'Mulish', fontHead: 'JetBrains Mono', fontBody: 'DM Sans' })} />
          <TweakButton label="All Manrope (soft)"
            onClick={() => setTweak({ fontHero: 'Manrope', fontHead: 'Manrope', fontBody: 'Manrope' })} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

/* ── Overview View (inline, same as original app.jsx) ─────────── */

interface OverviewViewProps {
  STAGES: BudgetData['STAGES'];
  years: number[];
  year: number;
  setYear: (y: number) => void;
  yearStage: BudgetData['yearStage'];
  agencyYearStage: BudgetData['agencyYearStage'];
  paps: PapMeta[];
  pivot: BudgetData['pivot'];
  currency: string;
  onPapClick: (pap: PapMeta & Record<string, unknown>) => void;
}

function OverviewView({ STAGES, years, year, setYear, yearStage, agencyYearStage, paps, pivot, currency, onPapClick }: OverviewViewProps) {
  const data = yearStage[year] || {};
  const nep = data.NEP?.total;
  const disbursed = data.Disbursements?.total;
  const absorbRate = (data.Allotted?.total && disbursed) ? disbursed / data.Allotted.total : null;

  const topPaps = paps.map(p => ({
    ...p,
    nep: pivot[p.papKey]?.[year]?.NEP?.total || 0,
  })).sort((a, b) => b.nep - a.nep).slice(0, 6);

  return (
    <div className="view">
      <SectionHead
        eyebrow="Department of Education · Compiled budget data"
        headline="From proposal to peso: tracing every program through seven stages of the budget cycle."
        size="xl"
        dek="Each year, the Philippine Department of Education's budget moves through seven distinct stages — from the executive's proposal (NEP) to cash actually paid (Disbursements). Pick a year to see where money was added, where it stalled, and where it landed."
      />

      <hr className="section-rule" />

      <Eyebrow>Pick a fiscal year</Eyebrow>
      <div className="year-strip" style={{ marginTop: 8 }}>
        {years.map(y => {
          const t = yearStage[y]?.NEP?.total;
          const max = Math.max(...years.map(yy => yearStage[yy]?.NEP?.total || 0));
          const pctVal = max ? ((t || 0) / max) * 100 : 0;
          return (
            <button key={y} className={`year-cell ${year === y ? 'active' : ''}`} onClick={() => setYear(y)}>
              <div className="year-cell-num">FY {y}</div>
              <div className="year-cell-meta">{fmt.shortPhp(t, 'B')} NEP</div>
              <div className="year-cell-bar"><span style={{ width: pctVal + '%' }} /></div>
            </button>
          );
        })}
      </div>

      <hr className="section-rule" />

      <SectionHead
        eyebrow={`The journey · FY ${year}`}
        headline="The seven stages, side by side"
        dek={year === 2026 ?
          'FY 2026 has only NEP and GAA on record so far — the remaining stages will populate as the fiscal year unfolds.' :
          'Each column is a stage. The bars show total budget at each stage; segments split it across Personnel (PS), Operations (MOOE), and Capital (CO).'}
      />
      <Funnel STAGES={STAGES} yearStage={yearStage} year={year} currency={currency} />

      <hr className="section-rule thin" />

      <div className="grid grid-4 gap-4">
        <div className="card subtle">
          <div className="card-meta">Proposed (NEP)</div>
          <div className="big-num">{fmt.php(nep, { unit: currency as "auto" | "B" | "M" | "K" | "full" })}</div>
          <p className="muted text-xs" style={{ marginTop: 6 }}>Executive's proposal</p>
        </div>
        <div className="card subtle">
          <div className="card-meta">Enacted (GAA)</div>
          <div className="big-num">{fmt.php(data.GAA?.total, { unit: currency as "auto" | "B" | "M" | "K" | "full" })}</div>
          <p className="muted text-xs" style={{ marginTop: 6 }}>
            {nep && data.GAA?.total ? `${fmt.signedPct((data.GAA.total - nep) / nep)} from NEP` : '—'}
          </p>
        </div>
        <div className="card subtle">
          <div className="card-meta">Disbursed</div>
          <div className="big-num">{disbursed != null ? fmt.php(disbursed, { unit: currency as "auto" | "B" | "M" | "K" | "full" }) : '—'}</div>
          <p className="muted text-xs" style={{ marginTop: 6 }}>Cash actually paid out</p>
        </div>
        <div className="card subtle">
          <div className="card-meta">Absorption rate</div>
          <div className="big-num">{absorbRate != null ? fmt.pct(absorbRate, 1) : '—'}</div>
          <p className="muted text-xs" style={{ marginTop: 6 }}>Disbursed ÷ Allotted</p>
        </div>
      </div>

      <hr className="section-rule" />

      <SectionHead
        eyebrow="Largest programs"
        headline={`Where FY ${year}'s money concentrates`}
        dek="The DepEd budget is dominated by a handful of large programs. Click any row to open its full journey across years."
      />
      <div className="card">
        <table className="editorial">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Program</th>
              <th>Agency · Function</th>
              <th className="right">FY {year} NEP</th>
              <th className="right">% of total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {topPaps.map((p, i) => (
              <tr key={p.papKey} className="clickable" onClick={() => onPapClick(p)}>
                <td className="mono muted">{String(i + 1).padStart(2, '0')}</td>
                <td>{p.pap}</td>
                <td className="text-xs muted">{p.agencyName} · {p.progName}</td>
                <td className="right">{fmt.shortPhp(p.nep, currency === 'auto' ? 'B' : currency)}</td>
                <td className="right">{nep ? fmt.pct(p.nep / nep, 1) : '—'}</td>
                <td className="muted">→</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="footnote">
        Source: Department of Budget and Management (DBM) Pre-Budget Consultation compilation. Compiled across 37 sheets covering FY 2021–2026.
      </p>
    </div>
  );
}
