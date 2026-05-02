import { useEffect } from 'react';
import { initNarrative } from '../lib/narrative-engine';
import '../styles/narrative.css';
import '../styles/narrative-future.css';

const BODY_HTML = `<div class="chrome">
  <div class="chrome-mark"><b>A Budget</b> for the Future</div>
  <a href="/">← Return to portal</a>
</div>

<div class="progress"></div>
<div class="piprail"></div>

<!-- ================= CH 01: COLD OPEN ================= -->
<section class="scene bg-cream center" data-title="Cold open">
  <div class="scene-inner center">
    <div class="editorial-rule" data-anim="fade-up"></div>
    <div class="eyebrow" data-anim="fade-up" style="--delay:100ms;"><span class="num">01</span> Department of Education Fiscal Review</div>

    <div class="year-banner" data-anim="fade-up" style="--delay:300ms;margin-top:40px;">
      <span class="year year-from">2021</span>
      <span class="arrow">→</span>
      <span class="year year-to">2026</span>
    </div>
    <p class="kicker" data-anim="fade-up" style="--delay:600ms;text-align:center;">Six fiscal years of basic-education spending</p>

    <h1 class="giant-num" data-anim="zoom-out" style="--delay:900ms;color:var(--accent);margin-top:56px;">
      <span class="peso">₱</span><span class="tick" data-target="25.61" data-decimals="2" data-dur="2200">0.00</span><span class="unit" style="font-family:var(--font-display);font-style:normal;text-transform:uppercase;font-size:0.18em;letter-spacing:0.04em;">trillion</span>
    </h1>
    <p class="lede" data-anim="fade-up" style="--delay:1400ms;text-align:center;margin-top:48px;max-width:60ch;">
      For 23 million children. For 900,000 teachers. For 47,000 schools.<br/>This is the story of a country choosing its future.
    </p>
    <div class="kicker" data-anim="fade-up" style="--delay:1800ms;margin-top:72px;">↓ Begin</div>
  </div>
</section>

<!-- ================= CH 02: SETTING ================= -->
<section class="scene bg-paper" data-title="Setting">
  <div class="scene-inner split">
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">02</span> The largest commitment</div>
      <h2 class="h-1 reveal-words" data-anim="fade">
        Education is the country's biggest civilian investment.
      </h2>
      <p class="body" data-anim="fade-up" style="--delay:300ms;margin-top:32px;">
        The Department of Education is bigger than Public Works. Bigger than Health. Bigger than Defense. It runs more than <b>47,000 public schools</b>, employs more teachers than any other agency, and spends roughly <b>one peso of every six</b> in the national budget — a steady, unwavering commitment to the children of the Philippines.
      </p>
      <div class="stat-strip" data-anim="fade-up" style="--delay:600ms;">
        <div class="cell"><div class="label">Public schools</div><div class="num">47,000+</div></div>
        <div class="cell"><div class="label">Teachers</div><div class="num">900K+</div></div>
        <div class="cell"><div class="label">Learners</div><div class="num">23M</div></div>
      </div>
    </div>
    <div data-anim="fade-left" style="--delay:300ms;">
      <div class="fig duotone" style="aspect-ratio:3/4;">
        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80" alt="" />
      </div>
      <div class="fig-caption">A public elementary school classroom · Stock</div>
    </div>
  </div>
</section>

<!-- ================= CH 03: 2026 LEAP ================= -->
<section class="scene bg-paper center" data-title="2026 leap">
  <div class="scene-inner center">
    <div class="editorial-rule" data-anim="fade-up"></div>
    <div class="eyebrow" data-anim="fade-up" style="--delay:100ms;"><span class="num">03</span> A milestone year</div>
    <p class="kicker" data-anim="fade-up" style="--delay:300ms;margin-bottom:32px;margin-top:24px;">In 2026, the country crossed a threshold</p>
    <h2 class="h-sans-huge" data-anim="zoom-out" style="--delay:500ms;color:var(--accent);">
      ₱<span class="tick" data-target="961.3" data-decimals="1" data-dur="2200">0.0</span>B
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:1000ms;text-align:center;max-width:54ch;">
      The 2026 General Appropriations Act devotes nearly a trillion pesos to basic education — a record. <b>+9.9% over the executive proposal</b>, the strongest legislative augmentation in six years.
    </p>
    <p class="pull" data-anim="fade-up" style="--delay:1400ms;margin-top:64px;text-align:center;">
      A nation says <span class="em">yes</span> to its kids.
    </p>
  </div>
</section>

<!-- ================= CH 04: ARC OF GROWTH ================= -->
<section class="scene bg-paper-warm" data-title="Growth">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">04</span> A rising line</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:20ch;">
      Six years, one direction.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;max-width:60ch;">
      The DepEd budget has grown every year since 2021 — through a pandemic, through fiscal headwinds, through three administrations of legislative work.
    </p>

    <div style="margin-top:80px;">
      <svg viewBox="0 0 1200 380" style="width:100%;height:auto;" class="growth-svg">
        <g font-family="JetBrains Mono">
          <g stroke="#e8d5b0" stroke-dasharray="2 4">
            <line x1="60" y1="80" x2="1140" y2="80"/>
            <line x1="60" y1="160" x2="1140" y2="160"/>
            <line x1="60" y1="240" x2="1140" y2="240"/>
            <line x1="60" y1="320" x2="1140" y2="320"/>
          </g>
          <g font-size="10" fill="#5a6d8c">
            <text x="50" y="84" text-anchor="end">₱1,000B</text>
            <text x="50" y="164" text-anchor="end">₱800B</text>
            <text x="50" y="244" text-anchor="end">₱600B</text>
            <text x="50" y="324" text-anchor="end">₱400B</text>
          </g>
          <!-- GAA: 2021=557, 2022=593, 2023=678, 2024=718, 2025=737, 2026=961 -->
          <!-- Map: 1000 -> 80, 400 -> 320; range 600 -> 240px -->
          <!-- 557 -> 80 + (1000-557)/600*240 = 80 + 177.2 = 257.2 -->
          <!-- 593 -> 80 + 162.8 = 242.8 -->
          <!-- 678 -> 80 + 128.8 = 208.8 -->
          <!-- 718 -> 80 + 112.8 = 192.8 -->
          <!-- 737 -> 80 + 105.2 = 185.2 -->
          <!-- 961 -> 80 + 15.6 = 95.6 -->
          <g class="draw">
            <polyline class="grow-line" points="180,257.2 360,242.8 540,208.8 720,192.8 900,185.2 1080,95.6" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <g>
            <circle class="grow-dot" cx="180" cy="257.2" r="7" data-anim="zoom-in" style="--delay:1400ms;"/>
            <circle class="grow-dot" cx="360" cy="242.8" r="7" data-anim="zoom-in" style="--delay:1500ms;"/>
            <circle class="grow-dot" cx="540" cy="208.8" r="7" data-anim="zoom-in" style="--delay:1600ms;"/>
            <circle class="grow-dot" cx="720" cy="192.8" r="7" data-anim="zoom-in" style="--delay:1700ms;"/>
            <circle class="grow-dot" cx="900" cy="185.2" r="7" data-anim="zoom-in" style="--delay:1800ms;"/>
            <circle class="grow-dot" cx="1080" cy="95.6" r="10" fill="#1a5a7a" data-anim="zoom-in" style="--delay:1900ms;"/>
          </g>
          <g font-size="11" font-weight="700" fill="#1a2841" text-anchor="middle">
            <text x="180" y="280">₱557B</text>
            <text x="360" y="265">₱593B</text>
            <text x="540" y="232">₱678B</text>
            <text x="720" y="216">₱718B</text>
            <text x="900" y="208">₱737B</text>
            <text x="1080" y="78" fill="#1a5a7a" font-size="13">₱961B</text>
          </g>
          <g font-size="11" fill="#5a6d8c" text-anchor="middle" letter-spacing="2">
            <text x="180" y="355">2021</text>
            <text x="360" y="355">2022</text>
            <text x="540" y="355">2023</text>
            <text x="720" y="355">2024</text>
            <text x="900" y="355">2025</text>
            <text x="1080" y="355" fill="#1a5a7a" font-weight="700">2026</text>
          </g>
        </g>
      </svg>
    </div>

    <p class="pull" data-anim="fade-up" style="--delay:2000ms;margin-top:48px;text-align:center;max-width:none;">
      <span class="em">+72.5%</span> in five years.
    </p>
  </div>
</section>

<!-- ================= CH 05: WHERE IT LIVES ================= -->
<section class="scene bg-sky" data-title="Where it lives">
  <div class="fullbleed duotone-sky">
    <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=2400&q=80" alt="" />
  </div>
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up" style="color:var(--accent-soft) !important;"><span class="num">05</span> Where the peso lives</div>
    <h2 class="h-1" data-anim="fade-up" style="--delay:200ms;max-width:22ch;color:var(--paper) !important;">In every classroom, on every payday, in every textbook.</h2>
    <p class="lede" data-anim="fade-up" style="--delay:500ms;max-width:60ch;color:var(--paper-warm) !important;opacity:0.92;">
      A peso of the DepEd budget is rarely an abstraction. It is a teacher's salary on the 15th. A piece of chalk. A roof over a classroom. A scholarship that lets a Grade 11 student stay in school. We followed where it goes.
    </p>
  </div>
</section>

<!-- ================= CH 06: OPERATION OF SCHOOLS ================= -->
<section class="scene bg-paper" data-title="Operation of Schools">
  <div class="scene-inner split">
    <div data-anim="fade-right">
      <div class="fig duotone" style="aspect-ratio:4/5;">
        <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80" alt="" />
      </div>
      <div class="fig-caption">Public school grounds · Stock</div>
    </div>
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">06</span> Operating the schools</div>
      <h2 class="h-1" data-anim="fade-up" style="--delay:200ms;">Three programs reach every child.</h2>
      <p class="body" data-anim="fade-up" style="--delay:400ms;margin-top:32px;">
        The largest line items are simple: keep the schools running. Across kindergarten, junior high, and senior high, <b>Operation of Schools</b> programs absorbed ₱507 billion in 2024 — roughly 71% of the entire GAA.
      </p>
      <div class="stat-strip" data-anim="fade-up" style="--delay:600ms;">
        <div class="cell"><div class="label">Elem · K–6</div><div class="num">₱290.8B</div></div>
        <div class="cell"><div class="label">JHS · 7–10</div><div class="num">₱165.8B</div></div>
        <div class="cell"><div class="label">SHS · 11–12</div><div class="num">₱50.8B</div></div>
      </div>
    </div>
  </div>
</section>

<!-- ================= CH 07: TEACHERS ================= -->
<section class="scene bg-sky-deep" data-title="Teachers">
  <div class="fullbleed duotone-sky">
    <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=2400&q=80" alt="" />
  </div>
  <div class="scene-inner center">
    <div class="eyebrow" data-anim="fade-up" style="color:var(--accent-soft) !important;"><span class="num">07</span> The heart of it</div>
    <h2 class="h-display" data-anim="fade-up" style="--delay:200ms;text-align:center;color:var(--paper) !important;">
      Three pesos<br/><span class="up">in four,</span><br/>pay a teacher.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:700ms;text-align:center;max-width:54ch;color:var(--paper-warm) !important;opacity:0.92;">
      Personnel Services — salaries, benefits, allowances — has consistently been the biggest share of every annual budget. This is the department doing what departments are supposed to do: putting people in front of children.
    </p>
    <div class="stat-strip" data-anim="fade-up" style="--delay:1000ms;margin-top:64px;">
      <div class="cell"><div class="label">PS share · 2024</div><div class="num">73.0%</div></div>
      <div class="cell"><div class="label">PS share · 2026</div><div class="num">67.9%</div></div>
      <div class="cell"><div class="label">New positions · 2024</div><div class="num">₱26.2B</div></div>
    </div>
  </div>
</section>

<!-- ================= CH 08: BUILDING ================= -->
<section class="scene bg-paper-deep" data-title="Building">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">08</span> Building things</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:18ch;">
      Capital is awakening.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;max-width:62ch;">
      Capital Outlay — buildings, computers, equipment, books — was a footnote five years ago. The 2026 budget makes it a centerpiece.
    </p>

    <div class="chart-legend" data-anim="fade-up" style="--delay:300ms;display:flex;gap:32px;flex-wrap:wrap;margin-top:48px;font-family:var(--font-ui);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:600;color:var(--ink-3);">
      <div style="display:flex;align-items:center;gap:10px;"><span style="width:14px;height:14px;background:var(--slate);display:inline-block;"></span>Personnel Services <span style="color:var(--ink-mute);font-weight:400;">· salaries</span></div>
      <div style="display:flex;align-items:center;gap:10px;"><span style="width:14px;height:14px;background:var(--ochre);display:inline-block;"></span>MOOE <span style="color:var(--ink-mute);font-weight:400;">· operations</span></div>
      <div style="display:flex;align-items:center;gap:10px;"><span style="width:14px;height:14px;background:var(--accent);display:inline-block;"></span>Capital Outlay <span style="color:var(--ink-mute);font-weight:400;">· buildings, equipment</span></div>
    </div>
    <p class="kicker" data-anim="fade-up" style="--delay:400ms;margin-top:14px;">Share of total annual GAA · 2021–2026</p>

    <div class="stack-bars" data-anim="fade-up" style="--delay:500ms;margin-top:32px;">
      <div class="stack-col">
        <div class="seg co" style="height:3.5%;--delay:600ms;">3.5%</div>
        <div class="seg mooe" style="height:17.9%;--delay:400ms;">17.9%</div>
        <div class="seg ps" style="height:78.6%;--delay:200ms;">78.6%</div>
        <div class="col-label">2021</div>
      </div>
      <div class="stack-col">
        <div class="seg co" style="height:3.5%;--delay:700ms;">3.5%</div>
        <div class="seg mooe" style="height:16.7%;--delay:500ms;">16.7%</div>
        <div class="seg ps" style="height:79.8%;--delay:300ms;">79.8%</div>
        <div class="col-label">2022</div>
      </div>
      <div class="stack-col">
        <div class="seg co" style="height:5.3%;--delay:800ms;">5.3%</div>
        <div class="seg mooe" style="height:19.1%;--delay:600ms;">19.1%</div>
        <div class="seg ps" style="height:75.6%;--delay:400ms;">75.6%</div>
        <div class="col-label">2023</div>
      </div>
      <div class="stack-col">
        <div class="seg co" style="height:6.8%;--delay:900ms;">6.8%</div>
        <div class="seg mooe" style="height:20.2%;--delay:700ms;">20.2%</div>
        <div class="seg ps" style="height:73.0%;--delay:500ms;">73.0%</div>
        <div class="col-label">2024</div>
      </div>
      <div class="stack-col">
        <div class="seg co" style="height:4.7%;--delay:1000ms;">4.7%</div>
        <div class="seg mooe" style="height:21.4%;--delay:800ms;">21.4%</div>
        <div class="seg ps" style="height:73.9%;--delay:600ms;">73.9%</div>
        <div class="col-label">2025</div>
      </div>
      <div class="stack-col">
        <div class="seg co" style="height:10.4%;--delay:1100ms;">10.4%</div>
        <div class="seg mooe" style="height:21.8%;--delay:900ms;">21.8%</div>
        <div class="seg ps" style="height:67.9%;--delay:700ms;">67.9%</div>
        <div class="col-label" style="color:var(--accent-deep);font-weight:800;">2026</div>
      </div>
    </div>

    <p class="pull" data-anim="fade-up" style="--delay:1500ms;margin-top:96px;">
      Capital Outlay grew <span class="em">5.1×</span> in five years.
    </p>
  </div>
</section>

<!-- ================= CH 09: NEW FACILITIES ================= -->
<section class="scene bg-leaf" data-title="New facilities">
  <div class="fullbleed duotone-leaf">
    <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=2400&q=80" alt="" />
  </div>
  <div class="scene-inner split">
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">09</span> New roofs, new tools</div>
      <h2 class="h-1" data-anim="fade-up" style="--delay:200ms;">₱34 billion for facilities.</h2>
      <p class="body" data-anim="fade-up" style="--delay:400ms;margin-top:32px;max-width:48ch;">
        Basic Education Facilities funds new classrooms, repairs, water and sanitation, and electrification. The 2024 program alone authorized ₱33.9 billion for school construction and rehabilitation. By 2026, the figure climbs further as part of the capital surge.
      </p>
      <p class="body" data-anim="fade-up" style="--delay:600ms;max-width:48ch;">
        Add Learning Tools and Equipment — laboratory gear, instructional materials — and the picture is unmistakable: the next generation of Filipino classrooms is being built.
      </p>
    </div>
    <div data-anim="fade-left" style="--delay:300ms;">
      <div class="bignum-block">
        <div class="label">2024 · Basic Education Facilities</div>
        <div class="v" style="color:var(--accent-soft);">₱<span class="tick" data-target="33.9" data-decimals="1">0</span>B</div>
      </div>
      <div style="height:32px;"></div>
      <div class="bignum-block">
        <div class="label">2024 · Learning Tools & Equipment</div>
        <div class="v" style="color:#fff8e7;">₱<span class="tick" data-target="5.9" data-decimals="1">0</span>B</div>
      </div>
    </div>
  </div>
</section>

<!-- ================= CH 10: SHS VOUCHER ================= -->
<section class="scene bg-paper" data-title="SHS voucher">
  <div class="scene-inner split">
    <div data-anim="fade-right">
      <div class="fig tinted" style="aspect-ratio:3/4;">
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80" alt="" />
      </div>
      <div class="fig-caption">Senior high school students · Stock</div>
    </div>
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">10</span> A choice of school</div>
      <h2 class="h-1" data-anim="fade-up" style="--delay:200ms;">₱26 billion of choice.</h2>
      <p class="body" data-anim="fade-up" style="--delay:400ms;margin-top:32px;">
        The Senior High School Voucher Program lets families enroll Grade 11 and 12 students at participating private and non-DepEd schools — at public-school cost. In 2024 alone, the program disbursed ₱26.3 billion in subsidies, broadening access at a critical age.
      </p>
      <div class="stat-strip" data-anim="fade-up" style="--delay:600ms;">
        <div class="cell"><div class="label">2024 SHS Voucher</div><div class="num">₱26.3B</div></div>
        <div class="cell"><div class="label">ESC subsidies</div><div class="num">₱12.7B</div></div>
      </div>
    </div>
  </div>
</section>

<!-- ================= CH 11: COMPUTERIZATION ================= -->
<section class="scene bg-ink" data-title="Computerization">
  <div class="scene-inner split">
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">11</span> Modern classrooms</div>
      <h2 class="h-1" data-anim="fade-up" style="--delay:200ms;color:#fff8e7;">A digital school is being wired.</h2>
      <p class="body" data-anim="fade-up" style="--delay:400ms;margin-top:32px;max-width:48ch;">
        The Computerization Program funds laptops, tablets, smart classrooms, and the connectivity infrastructure behind them. ₱18 billion was allotted in 2024 — and the 2026 GAA continues the build-out as part of its record capital surge.
      </p>
      <p class="body" data-anim="fade-up" style="--delay:600ms;max-width:48ch;">
        Across the next four years, this is what the modernization of Philippine basic education actually looks like in line items.
      </p>
    </div>
    <div data-anim="fade-left" style="--delay:300ms;">
      <div class="fig duotone" style="aspect-ratio:1/1;">
        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80" alt="" />
      </div>
      <div class="fig-caption">Computer lab · Stock</div>
    </div>
  </div>
</section>

<!-- ================= CH 12: BIG FOUR ================= -->
<section class="scene bg-paper-warm" data-title="Big four">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">12</span> The big four</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:20ch;">
      Where the largest pesos go.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;max-width:60ch;">
      Four programs absorb the bulk of DepEd spending. Together, ₱541 billion in 2024 — the four pillars under almost every Filipino child's school day.
    </p>

    <div class="flow-list" data-anim="fade-up" style="--delay:400ms;">
      <div class="flow-row">
        <div class="rank">01</div>
        <div class="name">Operation of Schools — Elementary <span style="color:var(--ink-mute);font-style:normal;font-size:0.7em;">(K–6)</span></div>
        <div class="bar"><div class="fill bar-fill" style="width:100%;"></div></div>
        <div class="amt">₱290.8B</div>
      </div>
      <div class="flow-row">
        <div class="rank">02</div>
        <div class="name">Operation of Schools — Junior High <span style="color:var(--ink-mute);font-style:normal;font-size:0.7em;">(7–10)</span></div>
        <div class="bar"><div class="fill bar-fill" style="width:57%;transition-delay:120ms;"></div></div>
        <div class="amt">₱165.8B</div>
      </div>
      <div class="flow-row">
        <div class="rank">03</div>
        <div class="name">Operation of Schools — Senior High <span style="color:var(--ink-mute);font-style:normal;font-size:0.7em;">(11–12)</span></div>
        <div class="bar"><div class="fill bar-fill" style="width:17.5%;transition-delay:240ms;"></div></div>
        <div class="amt">₱50.8B</div>
      </div>
      <div class="flow-row">
        <div class="rank">04</div>
        <div class="name">Basic Education Facilities</div>
        <div class="bar"><div class="fill bar-fill" style="width:11.7%;transition-delay:360ms;background:var(--accent);"></div></div>
        <div class="amt">₱33.9B</div>
      </div>
    </div>
  </div>
</section>

<!-- ================= CH 13: WHAT EACH PESO UNLOCKS ================= -->
<section class="scene bg-sky-deep" data-title="What it unlocks">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">13</span> What ₱961B unlocks</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:24ch;color:#fff8e7;">
      Per child, per teacher, per school.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;max-width:60ch;">
      Divide ₱961.3 billion by the people and places it serves. The numbers are striking — and they are the daily promise of public education.
    </p>

    <div class="unlock-grid" data-anim="fade-up" style="--delay:400ms;">
      <div class="unlock-card">
        <div class="num">₱<span class="tick" data-target="41800" data-dur="2200">0</span></div>
        <div class="label">per learner, per year</div>
        <div class="note">₱961.3B ÷ 23M learners</div>
      </div>
      <div class="unlock-card">
        <div class="num">₱<span class="tick" data-target="1.07" data-decimals="2" data-dur="2200">0</span>M</div>
        <div class="label">per teacher, per year</div>
        <div class="note">₱961.3B ÷ 900K teachers</div>
      </div>
      <div class="unlock-card">
        <div class="num">₱<span class="tick" data-target="20.5" data-decimals="1" data-dur="2200">0</span>M</div>
        <div class="label">per public school, per year</div>
        <div class="note">₱961.3B ÷ 47K schools</div>
      </div>
    </div>

    <p class="kicker" data-anim="fade-up" style="--delay:1400ms;margin-top:48px;">Notional averages. Actual allocations vary by region, level, and program.</p>
  </div>
</section>

<!-- ================= CH 14: STAGES (Friendly framing) ================= -->
<section class="scene bg-paper" data-title="Seven gates">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">14</span> Seven gates</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:18ch;">
      Every peso is accountable.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;max-width:62ch;">
      The Philippine budget process is a careful sequence. From proposal to disbursement, every peso passes through seven recorded stages — a public ledger of intent and execution.
    </p>

    <p class="kicker" data-anim="fade-up" style="--delay:300ms;margin-top:48px;">2026 GAA · ₱ billions at each stage of the appropriation cycle</p>

    <div style="margin-top:24px;">
      <svg viewBox="0 0 1200 220" style="width:100%;height:auto;" class="draw">
        <line x1="60" y1="100" x2="1140" y2="100" stroke="#16140f" stroke-width="2"/>
        <g font-family="Inter Tight" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">
          <g transform="translate(120,100)"><circle r="14" fill="#e2dcc8" stroke="#16140f" stroke-width="2"/><text dy="-32">1</text><text dy="46" fill="#16140f">NEP</text><text dy="62" font-size="9" fill="#5a5446">Proposed</text><text dy="80" font-size="11" font-family="Antonio" font-weight="700" fill="#8a2418">₱875.1B</text></g>
          <g transform="translate(280,100)"><circle r="14" fill="#c8bea0" stroke="#16140f" stroke-width="2"/><text dy="-32">2</text><text dy="46" fill="#16140f">GAA</text><text dy="62" font-size="9" fill="#5a5446">Enacted</text><text dy="80" font-size="11" font-family="Antonio" font-weight="700" fill="#8a2418">₱961.3B</text></g>
          <g transform="translate(440,100)"><circle r="14" fill="#9a7530" stroke="#16140f" stroke-width="2"/><text dy="-32">3</text><text dy="46" fill="#16140f">AUTHORIZED</text><text dy="62" font-size="9" fill="#5a5446">+ continuing</text><text dy="80" font-size="11" font-family="Antonio" font-weight="700" fill="#8a2418">—</text></g>
          <g transform="translate(600,100)"><circle r="14" fill="#6a5530" stroke="#16140f" stroke-width="2"/><text dy="-32">4</text><text dy="46" fill="#16140f">ADJUSTED</text><text dy="62" font-size="9" fill="#5a5446">± modifications</text><text dy="80" font-size="11" font-family="Antonio" font-weight="700" fill="#8a2418">—</text></g>
          <g transform="translate(760,100)"><circle r="14" fill="#b0bcc8" stroke="#16140f" stroke-width="2"/><text dy="-32">5</text><text dy="46" fill="#16140f">ALLOTTED</text><text dy="62" font-size="9" fill="#5a5446">Released</text><text dy="80" font-size="11" font-family="Antonio" font-weight="700" fill="#8a2418">—</text></g>
          <g transform="translate(920,100)"><circle r="14" fill="#2d3e4f" stroke="#16140f" stroke-width="2"/><text dy="-32">6</text><text dy="46" fill="#16140f">OBLIGATED</text><text dy="62" font-size="9" fill="#5a5446">Committed</text><text dy="80" font-size="11" font-family="Antonio" font-weight="700" fill="#8a2418">in progress</text></g>
          <g transform="translate(1080,100)"><circle r="14" fill="#1a2935" stroke="#16140f" stroke-width="2"/><text dy="-32">7</text><text dy="46" fill="#16140f">DISBURSED</text><text dy="62" font-size="9" fill="#5a5446">Paid</text><text dy="80" font-size="11" font-family="Antonio" font-weight="700" fill="#8a2418">in progress</text></g>
        </g>
      </svg>
    </div>
    <p class="body" data-anim="fade-up" style="--delay:600ms;margin-top:48px;text-align:center;max-width:60ch;margin-left:auto;margin-right:auto;">
      Transparency is the country's commitment alongside the budget itself. <em>You can track every line, every release, every payment</em> on the data portal — and we encourage you to.
    </p>
  </div>
</section>

<!-- ================= CH 15: CONTINUING ================= -->
<section class="scene bg-rose" data-title="Continuing programs">
  <div class="fullbleed duotone-warm">
    <img src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=2400&q=80" alt="" />
  </div>
  <div class="scene-inner center">
    <div class="eyebrow" data-anim="fade-up"><span class="num">15</span> Care, not just classrooms</div>
    <h2 class="h-display" data-anim="fade-up" style="--delay:200ms;text-align:center;color:#fff8e7;">
      Beyond the<br/><span class="up">blackboard.</span>
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:600ms;text-align:center;max-width:58ch;">
      The budget also funds school-based feeding, scholarships, special education, learner assessments, indigenous-peoples education, alternative learning systems, and emergency response. Public education is not just classrooms — it is a web of programs designed to keep children learning, no matter the circumstance.
    </p>
  </div>
</section>

<!-- ================= CH 16: WHAT'S AHEAD ================= -->
<section class="scene bg-paper-warm" data-title="What's ahead">
  <div class="scene-inner center">
    <div class="editorial-rule" data-anim="fade-up"></div>
    <div class="eyebrow" data-anim="fade-up" style="--delay:100ms;"><span class="num">16</span> What 2026 will bring</div>

    <div class="year-strip year-strip-spaced" data-anim="fade-up" style="--delay:300ms;max-width:880px;margin:56px auto 32px auto;">
      <span class="y">2021<span class="amt">₱557B</span></span>
      <span class="y">2022<span class="amt">₱593B</span></span>
      <span class="y">2023<span class="amt">₱678B</span></span>
      <span class="y">2024<span class="amt">₱718B</span></span>
      <span class="y">2025<span class="amt">₱737B</span></span>
      <span class="y active">2026<span class="amt">₱961B</span></span>
    </div>

    <h2 class="h-display" data-anim="fade-up" style="--delay:600ms;text-align:center;max-width:18ch;margin:48px auto 0 auto;">
      A record year,<br/>just beginning.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:900ms;text-align:center;max-width:62ch;margin-top:32px;">
      As of this writing, the 2026 fiscal year is still ongoing. The ₱961.3 billion just enacted is the largest education budget in Philippine history — and the first to push capital outlay past 10% of total spend. <b>How it lands</b> in classrooms, schools, and salaries is the story still being written.
    </p>
    <div class="stat-strip" data-anim="fade-up" style="--delay:1200ms;margin-top:64px;">
      <div class="cell"><div class="label">2026 GAA</div><div class="num">₱961.3B</div></div>
      <div class="cell"><div class="label">vs. 2025 GAA</div><div class="num" style="color:var(--accent);">+30.4%</div></div>
      <div class="cell"><div class="label">vs. 2021 GAA</div><div class="num" style="color:var(--accent);">+72.5%</div></div>
    </div>
    <p class="kicker" data-anim="fade-up" style="--delay:1500ms;margin-top:32px;">Disbursement data not yet available · Fiscal year still in progress</p>
  </div>
</section>

<!-- ================= CH 17: CODA ================= -->
<section class="scene bg-cream" data-title="Coda">
  <div class="scene-inner center">
    <div class="eyebrow" data-anim="fade-up"><span class="num">17</span> Coda</div>
    <h2 class="h-display" data-anim="fade-up" style="--delay:200ms;text-align:center;">
      A budget is<br/><span class="up">a promise.</span>
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:600ms;text-align:center;margin-top:32px;max-width:58ch;">
      And in 2026, the Filipino people made the largest one yet — to their teachers, to their schools, and to the 23 million children whose futures depend on what we choose to fund.
    </p>
    <div data-anim="fade-up" style="--delay:1000ms;margin-top:64px;display:flex;gap:18px;flex-wrap:wrap;justify-content:center;">
      <a href="/" style="font-family:var(--font-hero);font-weight:700;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;background:var(--ink);color:var(--accent-soft);padding:18px 28px;text-decoration:none;border-radius:2px;">Explore the data →</a>
      <a href="/investigation" style="font-family:var(--font-hero);font-weight:700;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;background:transparent;color:var(--ink);padding:18px 28px;text-decoration:none;border:2px solid var(--ink);border-radius:2px;">Read the investigation →</a>
    </div>
  </div>
</section>

<div class="marquee" style="background:var(--paper-warm);">
  <div class="marquee-track">
    <span>₱961.3 billion</span><span>·</span>
    <span>23 million children</span><span>·</span>
    <span>900,000 teachers</span><span>·</span>
    <span>47,000 schools</span><span>·</span>
    <span>a record year</span><span>·</span>
    <span>₱961.3 billion</span><span>·</span>
    <span>23 million children</span><span>·</span>
    <span>900,000 teachers</span><span>·</span>
    <span>47,000 schools</span><span>·</span>
    <span>a record year</span><span>·</span>
  </div>
</div>

<footer class="coda" style="background:var(--paper);">
  <p class="body">
    Source: Department of Budget and Management releases (NEP, GAA, BESF, BAR/FAR submissions) compiled into a single dataset of 4,440 program-stage observations spanning fiscal years 2021–2026. Disbursement data unavailable for 2026 as of compilation; the fiscal year is in progress. Per-learner / per-teacher / per-school figures are notional averages computed from the 2026 GAA divided by approximate sector counts (DepEd Basic Education Statistics). Stock photography: Unsplash.
  </p>
  <p class="meta">
    A Budget for the Future · The DepEd Story · <a href="/" style="color:inherit;">Return to portal →</a>
  </p>
</footer>

`;

export default function StoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initNarrative();
    return cleanup;
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
