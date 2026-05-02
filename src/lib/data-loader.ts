export interface Stage {
  key: string;
  label: string;
  order: number;
  full: string;
}

export interface BudgetRow {
  dept: string;
  deptName: string;
  agency: string;
  agencyName: string;
  progCode: string;
  progName: string;
  subprog: string;
  pap: string;
  docLabel: string;
  stage: string | null;
  year: number | null;
  ps: number | null;
  mooe: number | null;
  co: number | null;
  total: number | null;
  sourceSheet: string;
  papKey: string;
}

export interface PapMeta {
  papKey: string;
  pap: string;
  agencyName: string;
  agency: string;
  progCode: string;
  progName: string;
  subprog: string;
}

export interface StageTotals {
  ps: number;
  mooe: number;
  co: number;
  total: number;
}

export interface BudgetData {
  STAGES: Stage[];
  data: BudgetRow[];
  years: number[];
  agencies: string[];
  programs: string[];
  paps: PapMeta[];
  pivot: Record<string, Record<number, Record<string, StageTotals>>>;
  yearStage: Record<number, Record<string, StageTotals>>;
  agencyYearStage: Record<string, Record<number, Record<string, StageTotals>>>;
}

export const STAGES: Stage[] = [
  { key: "NEP",            label: "NEP",            order: 1, full: "National Expenditure Program" },
  { key: "GAA",            label: "GAA",            order: 2, full: "General Appropriations Act" },
  { key: "Authorized",     label: "Authorized",     order: 3, full: "Authorized Appropriations" },
  { key: "Adjusted",       label: "Adjusted",       order: 4, full: "Adjusted Appropriations" },
  { key: "Allotted",       label: "Allotted",       order: 5, full: "Adjusted Total Allotments" },
  { key: "Obligations",    label: "Obligated",      order: 6, full: "Obligations" },
  { key: "Disbursements",  label: "Disbursed",      order: 7, full: "Disbursements" },
];

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ""; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === '\r') { /* skip */ }
      else field += c;
    }
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function parseDocLabel(label: string, sourceSheet: string): { stage: string; year: number } | null {
  if (!label) return null;
  const yearMatch = label.match(/(20\d{2})/);
  if (!yearMatch) return null;
  const year = +yearMatch[1];
  if (sourceSheet && /Adjusted Appro/i.test(sourceSheet) && /Authorized/i.test(label)) {
    return { stage: "Adjusted", year };
  }
  if (/^NEP/i.test(label)) return { stage: "NEP", year };
  if (/^GAA/i.test(label)) return { stage: "GAA", year };
  if (/^Authorized/i.test(label)) return { stage: "Authorized", year };
  if (/^Adjusted Appropriations/i.test(label)) return { stage: "Adjusted", year };
  if (/^Adjusted Total Allotments/i.test(label)) return { stage: "Allotted", year };
  if (/^Obligations/i.test(label)) return { stage: "Obligations", year };
  if (/^Disbursements/i.test(label)) return { stage: "Disbursements", year };
  return null;
}

export function programName(code: string): string {
  const m: Record<string, string> = {
    "1000": "General Administration & Support",
    "2000": "Support to Operations",
    "3101": "Education Policy & Standards",
    "3102": "School Infrastructure & HR",
    "3103": "Inclusive Education",
    "3104": "Basic Education Delivery",
    "3105": "Teacher Development",
  };
  return m[code] || code;
}

export async function loadBudget(): Promise<BudgetData> {
  const res = await fetch(import.meta.env.BASE_URL + "data/deped_budget_compiled.csv");
  const text = await res.text();
  const all = parseCSV(text);
  const header = all[0].map(h => h.trim());
  const idx = Object.fromEntries(header.map((h, i) => [h, i])) as Record<string, number>;
  const data: BudgetRow[] = all.slice(1)
    .filter(r => r.length === header.length && r[idx.DEPARTMENT])
    .map(r => {
      const num = (s: string): number | null => {
        if (s === "" || s == null) return null;
        const n = parseFloat(s);
        return Number.isFinite(n) ? n : null;
      };
      const docLabel = r[idx["Budget Document"]];
      const sourceSheet = r[idx.source_sheet];
      const parsed = parseDocLabel(docLabel, sourceSheet) || { stage: null, year: null };
      const ps = num(r[idx.PS]);
      const mooe = num(r[idx.MOOE]);
      const co = num(r[idx.CO]);
      const totalRaw = num(r[idx.TOTAL]);
      const total = totalRaw != null ? totalRaw : (((ps || 0) + (mooe || 0) + (co || 0)) || null);
      return {
        dept: r[idx.DEPARTMENT],
        deptName: r[idx.UACS_DPT_DSC],
        agency: r[idx.AGENCY],
        agencyName: r[idx.UACS_AGY_DSC],
        progCode: r[idx.PREXC_PROG],
        progName: programName(r[idx.PREXC_PROG]),
        subprog: r[idx.PREXC_SUBPROG],
        pap: r[idx.PAP],
        docLabel,
        stage: parsed.stage,
        year: parsed.year,
        ps, mooe, co, total,
        sourceSheet,
        papKey: r[idx.AGENCY] + "|" + r[idx.PREXC_SUBPROG],
      };
    });

  const years = [...new Set(data.map(r => r.year).filter((y): y is number => y != null))].sort();
  const agencies = [...new Set(data.map(r => r.agencyName))].sort();
  const programs = [...new Set(data.map(r => r.progCode))].sort();
  const paps: PapMeta[] = [...new Map(data.map(r => [r.papKey, {
    papKey: r.papKey, pap: r.pap, agencyName: r.agencyName,
    agency: r.agency, progCode: r.progCode, progName: r.progName, subprog: r.subprog,
  }])).values()];

  const pivot: Record<string, Record<number, Record<string, StageTotals>>> = {};
  for (const r of data) {
    if (!r.year || !r.stage) continue;
    (pivot[r.papKey] ||= {});
    (pivot[r.papKey][r.year] ||= {});
    pivot[r.papKey][r.year][r.stage] = { ps: r.ps || 0, mooe: r.mooe || 0, co: r.co || 0, total: r.total || 0 };
  }

  const yearStage: Record<number, Record<string, StageTotals>> = {};
  for (const r of data) {
    if (!r.year || !r.stage) continue;
    (yearStage[r.year] ||= {});
    const s = (yearStage[r.year][r.stage] ||= { ps: 0, mooe: 0, co: 0, total: 0 });
    s.ps += r.ps || 0; s.mooe += r.mooe || 0; s.co += r.co || 0; s.total += r.total || 0;
  }

  const agencyYearStage: Record<string, Record<number, Record<string, StageTotals>>> = {};
  for (const r of data) {
    if (!r.year || !r.stage) continue;
    (agencyYearStage[r.agencyName] ||= {});
    (agencyYearStage[r.agencyName][r.year] ||= {});
    const s = (agencyYearStage[r.agencyName][r.year][r.stage] ||= { ps: 0, mooe: 0, co: 0, total: 0 });
    s.ps += r.ps || 0; s.mooe += r.mooe || 0; s.co += r.co || 0; s.total += r.total || 0;
  }

  return { STAGES, data, years, agencies, programs, paps, pivot, yearStage, agencyYearStage };
}
