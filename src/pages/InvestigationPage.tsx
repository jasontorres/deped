import { useEffect } from 'react';
import { initNarrative } from '../lib/narrative-engine';
import '../styles/narrative.css';

const BODY_HTML = `<!-- Top chrome -->
<div class="chrome">
  <div class="chrome-mark"><b>Inside</b> the DepEd Budget</div>
  <a href="/">← Return to portal</a>
</div>

<!-- Progress -->
<div class="progress"></div>

<!-- Pip rail -->
<div class="piprail"></div>

<!-- ================= CH 01: COLD OPEN ================= -->
<section class="scene bg-paper center" data-title="Cold open">
  <div class="fullbleed">
    <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=2400&q=80" alt="" />
  </div>
  <div class="fullbleed" style="background:linear-gradient(180deg, rgba(247,245,240,0.92) 0%, rgba(247,245,240,0.97) 50%, rgba(247,245,240,1) 100%);"></div>
  <div class="scene-inner center">
    <div class="eyebrow" data-anim="fade-up"><span class="num">01</span> Cold open</div>
    <div data-anim="fade-up" style="--delay:200ms;">
      <div class="kicker" style="margin-bottom:24px;">Across six fiscal years, Filipinos sent the Department of Education</div>
    </div>
    <h1 class="giant-num" data-anim="zoom-out" style="--delay:400ms;">
      <span class="peso">₱</span><span class="tick" data-target="25.61" data-decimals="2" data-dur="2200">0.00</span><span class="unit">trillion</span>
    </h1>
    <p class="lede" style="text-align:center;margin-top:48px;" data-anim="fade-up">
      A river of money flowing through seven gates — proposed, debated, allotted, obligated, paid out. <br/>This is what happened to it.
    </p>
    <div class="kicker" style="margin-top:80px;" data-anim="fade-up" style="--delay:1200ms;">↓ Scroll to begin</div>
  </div>
</section>

<!-- ================= CH 02: SETTING ================= -->
<section class="scene bg-paper" data-title="Setting">
  <div class="scene-inner split">
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">02</span> The setting</div>
      <h2 class="h-1 reveal-words" data-anim="fade">
        It is the largest civilian budget in the Philippines.
      </h2>
      <p class="body" data-anim="fade-up" style="margin-top:32px;--delay:300ms;">
        Bigger than Public Works. Bigger than Health. Bigger than Defense. The Department of Education runs more than <b>47,000 public schools</b>, employs more teachers than any other government agency, and spends roughly <b>one peso of every six</b> in the national budget.
      </p>
      <p class="body" data-anim="fade-up" style="--delay:500ms;">
        Yet most Filipinos have no idea where the money goes. The numbers are buried in DBM PDFs, line items, sub-programs, allotment classes. We pulled six years of those numbers — every NEP, GAA, allotment, obligation, disbursement — and stitched them together.
      </p>
    </div>
    <div data-anim="fade-left" style="--delay:200ms;">
      <div class="fig duotone" style="aspect-ratio:3/4;">
        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80" alt="" />
      </div>
      <div class="fig-caption">A public elementary school classroom · Stock</div>
    </div>
  </div>
</section>

<!-- ================= CH 03: 2026 SURGE ================= -->
<section class="scene bg-ink center" data-title="2026 surge">
  <div class="scene-inner center">
    <div class="eyebrow" data-anim="fade-up"><span class="num">03</span> The shock</div>
    <p class="kicker" data-anim="fade-up" style="--delay:200ms;color:#c8b890;margin-bottom:32px;">In 2026, something unusual happened.</p>
    <div class="split" style="width:100%;align-items:end;">
      <div data-anim="fade-right">
        <div class="kicker" style="color:#a8a08a;">President's proposal · NEP 2026</div>
        <div class="h-mono-huge" style="color:#a8a08a;font-size:clamp(60px,10vw,160px);">
          ₱<span class="tick" data-target="874.5" data-decimals="1">0.0</span><span style="font-size:0.4em;">B</span>
        </div>
      </div>
      <div data-anim="fade-left" style="--delay:400ms;">
        <div class="kicker" style="color:#f0a872;">After Congress · GAA 2026</div>
        <div class="h-mono-huge" style="color:#f0a872;font-size:clamp(60px,10vw,160px);">
          ₱<span class="tick" data-target="961.3" data-decimals="1">0.0</span><span style="font-size:0.4em;">B</span>
        </div>
      </div>
    </div>
    <p class="pull" data-anim="fade-up" style="--delay:900ms;margin-top:80px;text-align:center;color:#f1ebd9;">
      Congress added <span class="em">₱86.8 billion</span><br/>— a <span class="em">+9.9%</span> augmentation —<br/>the biggest in six years.
    </p>
  </div>
</section>

<!-- ================= CH 04: THE 7 STAGES ================= -->
<section class="scene bg-paper-warm" data-title="Seven stages">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">04</span> Seven stages</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:18ch;">
      Every peso passes through seven gates.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;max-width:60ch;">
      A budget is not a single number. It is a sequence — a slow translation from political intention into actual payment. Each stage thins the river a little.
    </p>

    <div style="margin-top:80px;">
      <svg viewBox="0 0 1200 200" style="width:100%;height:auto;" class="draw">
        <line x1="60" y1="100" x2="1140" y2="100" stroke="#16140f" stroke-width="2"/>
        <g font-family="JetBrains Mono" font-size="11" font-weight="700" letter-spacing="2" text-anchor="middle">
          <g transform="translate(120,100)"><circle r="14" fill="var(--stage-1)" stroke="#16140f" stroke-width="2"/><text dy="-30">1</text><text dy="46">NEP</text><text dy="62" font-size="9" fill="#6b6452">Proposed</text></g>
          <g transform="translate(280,100)"><circle r="14" fill="var(--stage-2)" stroke="#16140f" stroke-width="2"/><text dy="-30">2</text><text dy="46">GAA</text><text dy="62" font-size="9" fill="#6b6452">Enacted</text></g>
          <g transform="translate(440,100)"><circle r="14" fill="var(--stage-3)" stroke="#16140f" stroke-width="2"/><text dy="-30">3</text><text dy="46">AUTHORIZED</text><text dy="62" font-size="9" fill="#6b6452">+continuing</text></g>
          <g transform="translate(600,100)"><circle r="14" fill="var(--stage-4)" stroke="#16140f" stroke-width="2"/><text dy="-30">4</text><text dy="46">ADJUSTED</text><text dy="62" font-size="9" fill="#6b6452">+modifications</text></g>
          <g transform="translate(760,100)"><circle r="14" fill="var(--stage-5)" stroke="#16140f" stroke-width="2"/><text dy="-30">5</text><text dy="46">ALLOTTED</text><text dy="62" font-size="9" fill="#6b6452">Released</text></g>
          <g transform="translate(920,100)"><circle r="14" fill="var(--stage-6)" stroke="#16140f" stroke-width="2"/><text dy="-30">6</text><text dy="46">OBLIGATED</text><text dy="62" font-size="9" fill="#6b6452">Committed</text></g>
          <g transform="translate(1080,100)"><circle r="14" fill="var(--stage-7)" stroke="#16140f" stroke-width="2"/><text dy="-30">7</text><text dy="46">DISBURSED</text><text dy="62" font-size="9" fill="#fff" stroke="#fff" stroke-width="0">Actually paid</text></g>
        </g>
      </svg>
    </div>
    <p class="kicker" data-anim="fade-up" style="--delay:600ms;margin-top:64px;text-align:center;">↓ One stage at a time</p>
  </div>
</section>

<!-- ================= CH 05: NEP ================= -->
<section class="scene bg-paper" data-title="Stage 1 · NEP">
  <div class="scene-inner split">
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">05</span> Stage 1 — NEP</div>
      <p class="kicker" data-anim="fade-up" style="margin-bottom:16px;--delay:200ms;">National Expenditure Program</p>
      <h2 class="h-1" data-anim="fade-up" style="--delay:300ms;">The number the President wants.</h2>
      <p class="body" data-anim="fade-up" style="margin-top:32px;--delay:500ms;">
        Each July, the executive submits the NEP to Congress. It is a wishlist, calibrated against a fiscal program. For DepEd in 2021, that wishlist totaled <b>₱568.7 billion</b>. By 2026 it had grown to <b>₱874.5 billion</b> — a 54% rise in five years.
      </p>
      <div class="stat-strip" data-anim="fade-up" style="--delay:700ms;">
        <div class="cell"><div class="label">2021</div><div class="num">₱568.7B</div></div>
        <div class="cell"><div class="label">2024</div><div class="num">₱714.2B</div></div>
        <div class="cell"><div class="label">2026</div><div class="num">₱874.5B</div></div>
      </div>
    </div>
    <div data-anim="fade-left" style="--delay:300ms;">
      <!-- Vertical bars 2021-2026 NEP -->
      <svg viewBox="0 0 480 480" style="width:100%;height:auto;">
        <g font-family="JetBrains Mono" font-size="10" fill="#6b6452">
          <text x="20" y="20" font-weight="700" font-size="11" fill="#16140f" letter-spacing="2">NEP TOTALS · ₱B</text>
          <!-- Bars: max ~875 -->
          <g transform="translate(40,440)">
            <rect class="bar-fill" data-vert x="0" y="-310" width="50" height="310" fill="var(--stage-2)"/>
            <text x="25" y="20" text-anchor="middle">2021</text>
            <text x="25" y="-320" text-anchor="middle" fill="#16140f" font-weight="600">569</text>
          </g>
          <g transform="translate(110,440)">
            <rect class="bar-fill" data-vert x="0" y="-322" width="50" height="322" fill="var(--stage-2)" style="transition-delay:120ms;"/>
            <text x="25" y="20" text-anchor="middle">2022</text>
            <text x="25" y="-332" text-anchor="middle" fill="#16140f" font-weight="600">590</text>
          </g>
          <g transform="translate(180,440)">
            <rect class="bar-fill" data-vert x="0" y="-364" width="50" height="364" fill="var(--stage-3)" style="transition-delay:240ms;"/>
            <text x="25" y="20" text-anchor="middle">2023</text>
            <text x="25" y="-374" text-anchor="middle" fill="#16140f" font-weight="600">667</text>
          </g>
          <g transform="translate(250,440)">
            <rect class="bar-fill" data-vert x="0" y="-389" width="50" height="389" fill="var(--stage-3)" style="transition-delay:360ms;"/>
            <text x="25" y="20" text-anchor="middle">2024</text>
            <text x="25" y="-399" text-anchor="middle" fill="#16140f" font-weight="600">714</text>
          </g>
          <g transform="translate(320,440)">
            <rect class="bar-fill" data-vert x="0" y="-408" width="50" height="408" fill="var(--stage-4)" style="transition-delay:480ms;"/>
            <text x="25" y="20" text-anchor="middle">2025</text>
            <text x="25" y="-418" text-anchor="middle" fill="#16140f" font-weight="600">748</text>
          </g>
          <g transform="translate(390,440)">
            <rect class="bar-fill" data-vert x="0" y="-417" width="50" height="417" fill="var(--accent)" style="transition-delay:600ms;"/>
            <text x="25" y="20" text-anchor="middle" fill="#b8341f" font-weight="700">2026</text>
            <text x="25" y="-427" text-anchor="middle" fill="#b8341f" font-weight="700">874</text>
          </g>
        </g>
      </svg>
    </div>
  </div>
</section>

<!-- ================= CH 06: GAA ================= -->
<section class="scene bg-paper-deep" data-title="Stage 2 · GAA">
  <div class="scene-inner split">
    <div data-anim="fade-right">
      <div class="fig tinted" style="aspect-ratio:4/5;">
        <img src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1600&q=80" alt="" />
      </div>
      <div class="fig-caption">Philippine Senate session hall · Stock</div>
    </div>
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">06</span> Stage 2 — GAA</div>
      <p class="kicker" data-anim="fade-up" style="margin-bottom:16px;--delay:200ms;">General Appropriations Act</p>
      <h2 class="h-1" data-anim="fade-up" style="--delay:300ms;">Then Congress gets its hands on it.</h2>
      <p class="body" data-anim="fade-up" style="margin-top:32px;--delay:500ms;">
        The bicameral legislature inserts. It cuts. It augments. The version signed into law as the GAA almost never matches the NEP. Some years it goes up. Some years it shrinks.
      </p>
      <p class="body" data-anim="fade-up" style="--delay:700ms;">
        Across our six years, the average swing was a quiet 1-2%. But 2026 broke the pattern.
      </p>
    </div>
  </div>
</section>

<!-- ================= CH 07: AUGMENTATION CHART ================= -->
<section class="scene bg-cream" data-title="Augmentations">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">07</span> What Congress did</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:18ch;">
      Six years of edits.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;">
      The difference between what the President proposed (NEP) and what Congress enacted (GAA), each year.
    </p>

    <div style="margin-top:64px;">
      <!-- 2021: -11.4 (-2.0%) -->
      <div class="aug-row" data-anim="fade-up" style="--delay:0ms;">
        <div class="yr">2021</div>
        <div class="track">
          <div class="neg" style="width:8%;"></div>
        </div>
        <div class="delta neg">−₱11.4B</div>
      </div>
      <!-- 2022: +2.6 -->
      <div class="aug-row" data-anim="fade-up" style="--delay:100ms;">
        <div class="yr">2022</div>
        <div class="track">
          <div class="pos" style="width:2%;"></div>
        </div>
        <div class="delta pos">+₱2.6B</div>
      </div>
      <!-- 2023: +11.1 -->
      <div class="aug-row" data-anim="fade-up" style="--delay:200ms;">
        <div class="yr">2023</div>
        <div class="track">
          <div class="pos" style="width:8%;"></div>
        </div>
        <div class="delta pos">+₱11.1B</div>
      </div>
      <!-- 2024: +3.5 -->
      <div class="aug-row" data-anim="fade-up" style="--delay:300ms;">
        <div class="yr">2024</div>
        <div class="track">
          <div class="pos" style="width:3%;"></div>
        </div>
        <div class="delta pos">+₱3.5B</div>
      </div>
      <!-- 2025: -11.0 -->
      <div class="aug-row" data-anim="fade-up" style="--delay:400ms;">
        <div class="yr">2025</div>
        <div class="track">
          <div class="neg" style="width:8%;"></div>
        </div>
        <div class="delta neg">−₱11.0B</div>
      </div>
      <!-- 2026: +86.8 -->
      <div class="aug-row" data-anim="fade-up" style="--delay:500ms;">
        <div class="yr" style="color:var(--accent);">2026</div>
        <div class="track">
          <div class="pos" style="width:50%;background:var(--accent);"></div>
        </div>
        <div class="delta" style="color:var(--accent);font-size:20px;">+₱86.8B</div>
      </div>
    </div>

    <p class="pull" data-anim="fade-up" style="--delay:900ms;margin-top:64px;">
      One year is <span class="em">not like the others.</span>
    </p>
  </div>
</section>

<!-- ================= CH 08: AUTHORIZED + ADJUSTED ================= -->
<section class="scene bg-paper" data-title="Stages 3 & 4">
  <div class="scene-inner split">
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">08</span> Stages 3 & 4</div>
      <h2 class="h-1" data-anim="fade-up" style="--delay:200ms;">The quiet creep upward.</h2>
      <p class="body" data-anim="fade-up" style="margin-top:32px;--delay:400ms;">
        The GAA is not the final number. <b>Authorized</b> appropriations roll in continuing balances and automatic items. <b>Adjusted</b> appropriations layer on modifications, transfers, and special releases. Each year, the budget grows by tens of billions <em>after</em> Congress finished its work.
      </p>
      <div class="bignum-block" data-anim="fade-up" style="margin-top:48px;--delay:600ms;">
        <div class="label">2024 · GAA → Adjusted</div>
        <div class="v" style="color:var(--accent);">+₱<span class="tick" data-target="51.8" data-decimals="1">0</span>B</div>
        <div class="kicker">added between Congress and execution · 7.2% higher</div>
      </div>
    </div>
    <div data-anim="fade-left" style="--delay:300ms;">
      <!-- Step chart: GAA -> Auth -> Adjusted, 2024 -->
      <svg viewBox="0 0 480 400" style="width:100%;">
        <g font-family="JetBrains Mono" font-size="10">
          <text x="20" y="20" font-weight="700" font-size="11" fill="#16140f" letter-spacing="2">2024 · ₱B</text>
          <!-- Three steps -->
          <g transform="translate(0,360)">
            <rect class="bar-fill" data-vert x="40" y="-220" width="100" height="220" fill="var(--stage-2)"/>
            <text x="90" y="20" text-anchor="middle" fill="#6b6452">GAA</text>
            <text x="90" y="-230" text-anchor="middle" fill="#16140f" font-weight="700" font-size="13">717.7</text>
            
            <rect class="bar-fill" data-vert x="180" y="-233" width="100" height="233" fill="var(--stage-3)" style="transition-delay:200ms;"/>
            <text x="230" y="20" text-anchor="middle" fill="#6b6452">AUTHORIZED</text>
            <text x="230" y="-243" text-anchor="middle" fill="#16140f" font-weight="700" font-size="13">760.0</text>
            
            <rect class="bar-fill" data-vert x="320" y="-236" width="100" height="236" fill="var(--accent)" style="transition-delay:400ms;"/>
            <text x="370" y="20" text-anchor="middle" fill="#b8341f" font-weight="700">ADJUSTED</text>
            <text x="370" y="-246" text-anchor="middle" fill="#b8341f" font-weight="700" font-size="13">769.5</text>
          </g>
        </g>
      </svg>
    </div>
  </div>
</section>

<!-- ================= CH 09: ALLOTTED ================= -->
<section class="scene bg-gold center" data-title="Stage 5 · Allotted">
  <div class="fullbleed duotone-gold">
    <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=2400&q=80" alt="" />
  </div>
  <div class="scene-inner center">
    <div class="eyebrow" data-anim="fade-up"><span class="num">09</span> Stage 5 — Allotted</div>
    <p class="kicker" data-anim="fade-up" style="--delay:200ms;color:#f3d9b6;">DBM releases the spending authority</p>
    <h2 class="h-display" data-anim="fade-up" style="--delay:400ms;color:#fbe8d0;">
      The green<br/><span class="up">light.</span>
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:700ms;text-align:center;color:#f3d9b6;max-width:48ch;">
      An allotment is a permission slip from the Department of Budget and Management. Until DBM releases it, the money — even though Congress voted on it — cannot legally be spent. In 2024, DepEd received ₱768.6 billion in allotments.
    </p>
  </div>
</section>

<!-- ================= CH 10: THE CLIFF ================= -->
<section class="scene bg-ink" data-title="The cliff">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">10</span> Stages 6 & 7</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:20ch;color:#f1ebd9;">
      Then comes the cliff.
    </h2>
    <p class="body" data-anim="fade-up" style="--delay:200ms;margin-top:32px;max-width:64ch;">
      Allotments are spending authority. <b>Obligations</b> are commitments. <b>Disbursements</b> are actual cash going out the door. In every year we examined <em>(2021–2025)</em>, more money was authorized than was ever obligated, and more was obligated than was ever paid. <span style="display:block;margin-top:12px;font-family:var(--font-mono);font-size:0.78em;color:#a8a08a;letter-spacing:0.06em;text-transform:uppercase;">2026 disbursement data not yet available · fiscal year ongoing</span>
    </p>

    <!-- Funnel for 2024 -->
    <div class="funnel-vert" data-anim="fade-up" style="--delay:400ms;margin-top:64px;">
      <div class="funnel-row">
        <div class="stage-label">NEP</div>
        <div class="bar-track"><div class="bar bar-fill" style="width:74%;background:var(--stage-2);"></div></div>
        <div class="num">₱714.2B</div>
      </div>
      <div class="funnel-row">
        <div class="stage-label">GAA</div>
        <div class="bar-track"><div class="bar bar-fill" style="width:75%;background:var(--stage-3);transition-delay:120ms;"></div></div>
        <div class="num">₱717.7B</div>
      </div>
      <div class="funnel-row">
        <div class="stage-label">Authorized</div>
        <div class="bar-track"><div class="bar bar-fill" style="width:79%;background:var(--stage-4);transition-delay:240ms;"></div></div>
        <div class="num">₱760.0B</div>
      </div>
      <div class="funnel-row">
        <div class="stage-label">Adjusted</div>
        <div class="bar-track"><div class="bar bar-fill" style="width:80%;background:var(--stage-5);transition-delay:360ms;"></div></div>
        <div class="num">₱769.5B</div>
      </div>
      <div class="funnel-row">
        <div class="stage-label">Allotted</div>
        <div class="bar-track"><div class="bar bar-fill" style="width:80%;background:var(--stage-6);transition-delay:480ms;"></div></div>
        <div class="num">₱768.6B</div>
      </div>
      <div class="funnel-row">
        <div class="stage-label">Obligated</div>
        <div class="bar-track"><div class="bar bar-fill" style="width:74%;background:var(--accent);transition-delay:600ms;"></div></div>
        <div class="num">₱714.1B</div>
      </div>
      <div class="funnel-row">
        <div class="stage-label" style="color:var(--accent);font-weight:800;">Disbursed</div>
        <div class="bar-track"><div class="bar bar-fill" style="width:69%;background:var(--accent-deep);transition-delay:720ms;"></div></div>
        <div class="num" style="color:#f0a872;">₱660.1B</div>
      </div>
    </div>

    <p class="pull" data-anim="fade-up" style="--delay:1500ms;margin-top:80px;color:#f1ebd9;">
      <span class="em">₱109 billion</span><br/>was allotted in 2024<br/>but never paid out.
    </p>
  </div>
</section>

<!-- ================= CH 11: PS DOMINANCE ================= -->
<section class="scene bg-paper" data-title="PS dominance">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">11</span> The shape of spending</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:22ch;">
      Three out of four pesos pay for people.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;max-width:60ch;">
      DepEd is, fundamentally, a salary engine. Personnel Services (PS) — teachers, principals, support staff — has consumed between <b>67.9% and 79.8%</b> of every annual budget since 2021.
    </p>

    <div class="stack-bars" data-anim="fade-up" style="--delay:400ms;">
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
        <div class="col-label">2026</div>
      </div>
    </div>

    <div class="stat-strip" data-anim="fade-up" style="--delay:1400ms;margin-top:96px;">
      <div class="cell"><div class="label">PS · 2026</div><div class="num">67.9%</div></div>
      <div class="cell"><div class="label">MOOE · 2026</div><div class="num">21.8%</div></div>
      <div class="cell"><div class="label">CO · 2026</div><div class="num" style="color:var(--accent);">10.4%</div></div>
    </div>
  </div>
</section>

<!-- ================= CH 12: CO AWAKENING ================= -->
<section class="scene bg-accent" data-title="CO awakening">
  <div class="fullbleed duotone-red">
    <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2400&q=80" alt="" />
  </div>
  <div class="scene-inner split">
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">12</span> Capital outlay awakens</div>
      <h2 class="h-1" data-anim="fade-up" style="--delay:200ms;color:#fbe8d0;">From 3.5% → 10.4%.</h2>
      <p class="body" data-anim="fade-up" style="--delay:400ms;margin-top:32px;color:#f3d9b6;max-width:48ch;">
        Capital Outlay — buildings, computers, equipment — was a footnote in 2021. By 2026 it has nearly tripled in share. The 2026 surge is overwhelmingly a CO surge: roughly <b>₱100 billion</b> for facilities, learning tools, and school computerization.
      </p>
      <p class="body" data-anim="fade-up" style="--delay:600ms;color:#f3d9b6;max-width:48ch;">
        Whether DepEd can <em>actually spend</em> that capital — given its track record on infrastructure absorption — is the open question of the next chapter.
      </p>
    </div>
    <div data-anim="fade-left" style="--delay:300ms;">
      <div class="bignum-block">
        <div class="label" style="color:#f3d9b6;">Capital Outlay · 2021</div>
        <div class="v" style="color:#fbe8d0;font-size:clamp(48px,7vw,96px);">₱<span class="tick" data-target="19.5" data-decimals="1">0</span>B</div>
      </div>
      <div style="height:32px;"></div>
      <div class="bignum-block">
        <div class="label" style="color:#fbe8d0;">Capital Outlay · 2026 GAA</div>
        <div class="v" style="color:#fff;">₱<span class="tick" data-target="100.0" data-decimals="1" data-dur="2200">0</span>B</div>
      </div>
      <div class="stamp" data-anim="zoom-in" style="--delay:1400ms;margin-top:32px;color:#fbe8d0;border-color:#fbe8d0;">5.1× in 5 yrs</div>
    </div>
  </div>
</section>

<!-- ================= CH 13: HERO PROGRAMS ================= -->
<section class="scene bg-paper-warm" data-title="Hero programs">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">13</span> The big four</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:18ch;">
      Where the money actually goes.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;max-width:60ch;">
      Four programs absorb the vast majority of DepEd spending. Together, they accounted for <b>₱541 billion</b> — roughly three-quarters of the 2024 GAA.
    </p>

    <div class="programs-grid" data-anim="fade-up" style="--delay:400ms;">
      <div class="program-card">
        <div class="kicker">#1 · Largest program</div>
        <div class="name">Operation of Schools — Elementary <span style="color:var(--ink-mute);">(K–6)</span></div>
        <div class="amt">₱290.8B</div>
        <div class="pct">40.5% of 2024 GAA</div>
      </div>
      <div class="program-card">
        <div class="kicker">#2</div>
        <div class="name">Operation of Schools — Junior High <span style="color:var(--ink-mute);">(7–10)</span></div>
        <div class="amt">₱165.8B</div>
        <div class="pct">23.1% of 2024 GAA</div>
      </div>
      <div class="program-card">
        <div class="kicker">#3</div>
        <div class="name">Operation of Schools — Senior High <span style="color:var(--ink-mute);">(11–12)</span></div>
        <div class="amt">₱50.8B</div>
        <div class="pct">7.1% of 2024 GAA</div>
      </div>
      <div class="program-card">
        <div class="kicker">#4 · Capital outlay</div>
        <div class="name">Basic Education Facilities</div>
        <div class="amt">₱33.9B</div>
        <div class="pct">4.7% of 2024 GAA</div>
      </div>
    </div>

    <p class="kicker" data-anim="fade-up" style="--delay:1000ms;margin-top:48px;text-align:center;">Operating the schools — paying teachers and keeping the lights on — is 70.7% of everything.</p>
  </div>
</section>

<!-- ================= CH 14: STALLED ================= -->
<section class="scene bg-ink" data-title="Stalled programs">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">14</span> What never reaches the school</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:22ch;color:#f1ebd9;">
      Some programs barely move at all.
    </h2>
    <p class="body" data-anim="fade-up" style="--delay:200ms;max-width:60ch;margin-top:24px;">
      Absorption — the share of allotted money actually disbursed in the same year — is uneven. Salaries flow at 90%+. Capital programs stall in single digits. These five 2024 programs each had over ₱1 billion in allotments but disbursed almost none of it.
    </p>

    <div class="stalled-list" data-anim="fade-up" style="--delay:400ms;margin-top:48px;">
      <div class="stalled-row">
        <div class="rate"><span class="tick" data-target="9" data-suffix="%">0</span></div>
        <div class="name">Quick Response Fund</div>
        <div class="bar-mini"><div class="fill bar-fill" style="width:9%;"></div></div>
        <div class="amt">₱3.5B allotted</div>
      </div>
      <div class="stalled-row">
        <div class="rate"><span class="tick" data-target="11" data-suffix="%">0</span></div>
        <div class="name">Textbooks & Other Instructional Materials</div>
        <div class="bar-mini"><div class="fill bar-fill" style="width:11%;transition-delay:120ms;"></div></div>
        <div class="amt">₱12.7B allotted</div>
      </div>
      <div class="stalled-row">
        <div class="rate"><span class="tick" data-target="19" data-suffix="%">0</span></div>
        <div class="name">National Assessment Systems for Basic Education</div>
        <div class="bar-mini"><div class="fill bar-fill" style="width:19%;transition-delay:240ms;"></div></div>
        <div class="amt">₱1.8B allotted</div>
      </div>
      <div class="stalled-row">
        <div class="rate"><span class="tick" data-target="23" data-suffix="%">0</span></div>
        <div class="name">Learning Tools and Equipment</div>
        <div class="bar-mini"><div class="fill bar-fill" style="width:23%;transition-delay:360ms;"></div></div>
        <div class="amt">₱5.9B allotted</div>
      </div>
      <div class="stalled-row">
        <div class="rate"><span class="tick" data-target="27" data-suffix="%">0</span></div>
        <div class="name">Basic Education Facilities</div>
        <div class="bar-mini"><div class="fill bar-fill" style="width:27%;transition-delay:480ms;"></div></div>
        <div class="amt">₱8.6B allotted</div>
      </div>
    </div>

    <p class="pull" data-anim="fade-up" style="--delay:1200ms;margin-top:80px;color:#f1ebd9;">
      The Textbooks fund <span class="em">disbursed</span><br/><span class="em">11 centavos</span> on the peso.
    </p>
  </div>
</section>

<!-- ================= CH 15: TEXTBOOK CLOSE-UP ================= -->
<section class="scene bg-paper" data-title="Textbooks close-up">
  <div class="scene-inner split-3">
    <div>
      <div class="eyebrow" data-anim="fade-up"><span class="num">15</span> A closer look</div>
      <h2 class="h-display" data-anim="fade-up" style="--delay:200ms;font-size:clamp(48px,7vw,108px);">
        ₱<span class="tick" data-target="11.4" data-decimals="1" data-dur="2000">0</span>B
      </h2>
      <p class="kicker" data-anim="fade-up" style="--delay:400ms;color:var(--accent);margin-top:8px;">2024 textbooks · allotted but never disbursed</p>
      <p class="body" data-anim="fade-up" style="--delay:600ms;margin-top:32px;">
        Of the ₱12.7 billion allotted in 2024 for textbooks and instructional materials, only <b>₱1.4 billion</b> reached actual disbursement. The remainder sat — neither obligated, nor returned, nor spent.
      </p>
      <p class="body" data-anim="fade-up" style="--delay:800ms;">
        At a notional ₱500 per textbook, ₱11.4 billion is roughly <b>22.8 million unbought books</b>. There are 23 million children in DepEd schools.
      </p>
    </div>
    <div data-anim="fade-left" style="--delay:400ms;">
      <div class="fig duotone" style="aspect-ratio:3/4;">
        <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80" alt="" />
      </div>
      <div class="fig-caption">Stacked schoolbooks · Stock</div>
    </div>
  </div>
</section>

<!-- ================= CH 16: ABSORPTION TIMELINE ================= -->
<section class="scene bg-paper-deep" data-title="Absorption rate">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">16</span> The absorption arc</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:20ch;">
      It is getting harder, not easier.
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:200ms;max-width:62ch;">
      Disbursements as a share of allotments — the system-wide absorption rate — peaked at 92.4% in 2022 and has fallen every year since. <span style="color:var(--ink-mute);font-style:normal;font-size:0.7em;display:block;margin-top:12px;font-family:var(--font-mono);letter-spacing:0.06em;text-transform:uppercase;">2026 excluded · disbursement data not yet available</span>
    </p>

    <!-- Line chart-ish: years vs absorption -->
    <div style="margin-top:80px;">
      <svg viewBox="0 0 1200 360" style="width:100%;height:auto;">
        <g font-family="JetBrains Mono">
          <!-- y axis grid -->
          <g stroke="#d6cab0" stroke-dasharray="2 4">
            <line x1="60" y1="60" x2="1140" y2="60"/>
            <line x1="60" y1="140" x2="1140" y2="140"/>
            <line x1="60" y1="220" x2="1140" y2="220"/>
            <line x1="60" y1="300" x2="1140" y2="300"/>
          </g>
          <g font-size="10" fill="#6b6452">
            <text x="50" y="64" text-anchor="end">100%</text>
            <text x="50" y="144" text-anchor="end">90%</text>
            <text x="50" y="224" text-anchor="end">80%</text>
            <text x="50" y="304" text-anchor="end">70%</text>
          </g>
          <!-- Data: 2021=90.9, 2022=92.4, 2023=89.9, 2024=85.9, 2025=86.5 -->
          <!-- Map: 100% -> y=60, 70% -> y=300; range 30% -> 240px -->
          <!-- 90.9 -> 60 + (100-90.9)/30*240 = 60 + 72.8 = 132.8 -->
          <!-- 92.4 -> 60 + (100-92.4)/30*240 = 60 + 60.8 = 120.8 -->
          <!-- 89.9 -> 60 + (100-89.9)/30*240 = 60 + 80.8 = 140.8 -->
          <!-- 85.9 -> 60 + (100-85.9)/30*240 = 60 + 112.8 = 172.8 -->
          <!-- 86.5 -> 60 + (100-86.5)/30*240 = 60 + 108 = 168 -->
          <g class="draw">
            <polyline points="220,132.8 420,120.8 620,140.8 820,172.8 1020,168" fill="none" stroke="#b8341f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <g>
            <circle cx="220" cy="132.8" r="6" fill="#b8341f" data-anim="zoom-in" style="--delay:1400ms;"/>
            <circle cx="420" cy="120.8" r="6" fill="#b8341f" data-anim="zoom-in" style="--delay:1500ms;"/>
            <circle cx="620" cy="140.8" r="6" fill="#b8341f" data-anim="zoom-in" style="--delay:1600ms;"/>
            <circle cx="820" cy="172.8" r="6" fill="#b8341f" data-anim="zoom-in" style="--delay:1700ms;"/>
            <circle cx="1020" cy="168" r="6" fill="#b8341f" data-anim="zoom-in" style="--delay:1800ms;"/>
          </g>
          <g font-size="11" font-weight="700" fill="#16140f" text-anchor="middle">
            <text x="220" y="108">90.9%</text>
            <text x="420" y="96">92.4%</text>
            <text x="620" y="116">89.9%</text>
            <text x="820" y="148">85.9%</text>
            <text x="1020" y="144">86.5%</text>
          </g>
          <g font-size="11" fill="#6b6452" text-anchor="middle" letter-spacing="2">
            <text x="220" y="335">2021</text>
            <text x="420" y="335">2022</text>
            <text x="620" y="335">2023</text>
            <text x="820" y="335">2024</text>
            <text x="1020" y="335">2025</text>
          </g>
        </g>
      </svg>
    </div>

    <p class="pull" data-anim="fade-up" style="--delay:2000ms;margin-top:64px;text-align:center;max-width:none;">
      A <span class="em">six-point drop</span> in three years.
    </p>
  </div>
</section>

<!-- ================= CH 17: SIX-YEAR SANKEY ================= -->
<section class="scene bg-ink" data-title="The whole flow">
  <div class="scene-inner">
    <div class="eyebrow" data-anim="fade-up"><span class="num">17</span> The whole flow</div>
    <h2 class="h-1 reveal-words" data-anim="fade" style="max-width:20ch;color:#f1ebd9;">
      Six years, one river.
    </h2>
    <p class="body" data-anim="fade-up" style="--delay:200ms;margin-top:24px;max-width:64ch;">
      Across 2021–2025 (the years with completed disbursement data), the cumulative flow looks like this. Every band represents tens or hundreds of billions of pesos. Every gap is money that did not arrive. <span style="display:block;margin-top:10px;font-family:var(--font-mono);font-size:0.78em;color:#a8a08a;letter-spacing:0.06em;text-transform:uppercase;">2026 excluded · fiscal year still in progress</span>
    </p>

    <!-- Sankey-style: 5 stages (NEP, GAA, Allotted, Obligated, Disbursed) summed across 2021-2025 -->
    <!-- Sums: NEP=3288, GAA=3283, Allotted=3565, Obligated=3378, Disbursed=3170 (in B) -->
    <div style="margin-top:60px;">
      <svg viewBox="0 0 1200 380" style="width:100%;height:auto;">
        <defs>
          <linearGradient id="flow1" x1="100" y1="190" x2="350" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ddc188" stop-opacity="0.7"/>
            <stop offset="1" stop-color="#c89b54" stop-opacity="0.7"/>
          </linearGradient>
          <linearGradient id="flow2" x1="370" y1="190" x2="620" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#c89b54" stop-opacity="0.7"/>
            <stop offset="1" stop-color="#b07d3a" stop-opacity="0.7"/>
          </linearGradient>
          <linearGradient id="flow3" x1="640" y1="190" x2="890" y2="202" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#b07d3a" stop-opacity="0.7"/>
            <stop offset="1" stop-color="#8c5e2a" stop-opacity="0.7"/>
          </linearGradient>
          <linearGradient id="flow4" x1="910" y1="202" x2="1140" y2="215" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#8c5e2a" stop-opacity="0.7"/>
            <stop offset="1" stop-color="#b8341f" stop-opacity="0.7"/>
          </linearGradient>
        </defs>

        <!-- Stage bars -->
        <g>
          <!-- NEP at x=80 -->
          <rect class="sankey-flow" x="80" y="50" width="20" height="280" fill="#ddc188" style="--delay:0ms;"/>
          <!-- GAA at x=350 -->
          <rect class="sankey-flow" x="350" y="50" width="20" height="280" fill="#c89b54" style="--delay:200ms;"/>
          <!-- Allotted at x=620 -->
          <rect class="sankey-flow" x="620" y="38" width="20" height="304" fill="#b07d3a" style="--delay:400ms;"/>
          <!-- Obligated at x=890 -->
          <rect class="sankey-flow" x="890" y="58" width="20" height="288" fill="#8c5e2a" style="--delay:600ms;"/>
          <!-- Disbursed at x=1140 -->
          <rect class="sankey-flow" x="1140" y="80" width="20" height="270" fill="#b8341f" style="--delay:800ms;"/>
        </g>

        <!-- Flows -->
        <g fill="none" stroke-width="280">
          <path class="sankey-flow" d="M100,190 C220,190 220,190 350,190" stroke="url(#flow1)" style="--delay:100ms;"/>
        </g>
        <g fill="none" stroke-width="280">
          <path class="sankey-flow" d="M370,190 C490,190 490,190 620,190" stroke="url(#flow2)" style="--delay:300ms;"/>
        </g>
        <g fill="none" stroke-width="304">
          <path class="sankey-flow" d="M640,190 C760,190 760,202 890,202" stroke="url(#flow3)" style="--delay:500ms;"/>
        </g>
        <g fill="none" stroke-width="270">
          <path class="sankey-flow" d="M910,202 C1020,202 1020,215 1140,215" stroke="url(#flow4)" style="--delay:700ms;"/>
        </g>

        <!-- Labels -->
        <g font-family="JetBrains Mono" font-size="11" font-weight="700" letter-spacing="2" fill="#f1ebd9">
          <text x="90" y="40" text-anchor="middle">NEP</text>
          <text x="360" y="40" text-anchor="middle">GAA</text>
          <text x="630" y="28" text-anchor="middle">ALLOTTED</text>
          <text x="900" y="48" text-anchor="middle">OBLIGATED</text>
          <text x="1150" y="70" text-anchor="middle" fill="#f0a872">DISBURSED</text>
        </g>
        <g font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#a8a08a" text-anchor="middle">
          <text x="90" y="350">₱3,288B</text>
          <text x="360" y="350">₱3,283B</text>
          <text x="630" y="362">₱3,565B</text>
          <text x="900" y="362">₱3,378B</text>
          <text x="1150" y="362" fill="#f0a872">₱3,170B</text>
        </g>
      </svg>
    </div>

    <div class="stat-strip" data-anim="fade-up" style="--delay:1400ms;margin-top:48px;">
      <div class="cell"><div class="label">Proposed (5 yrs)</div><div class="num">₱3.29T</div></div>
      <div class="cell"><div class="label">Authority granted</div><div class="num">₱3.57T</div></div>
      <div class="cell"><div class="label">Actually paid</div><div class="num" style="color:#f0a872;">₱3.17T</div></div>
      <div class="cell"><div class="label">Gap (allotted ↛ paid)</div><div class="num" style="color:#f0a872;">₱395B</div></div>
    </div>
  </div>
</section>

<!-- ================= CH 18: MARQUEE / CALL ================= -->
<section class="scene bg-paper-warm" data-title="Coda">
  <div class="scene-inner center">
    <div class="eyebrow" data-anim="fade-up"><span class="num">18</span> Coda</div>
    <h2 class="h-display" data-anim="fade-up" style="--delay:200ms;text-align:center;">
      Read between<br/><span class="up">the lines.</span>
    </h2>
    <p class="lede" data-anim="fade-up" style="--delay:500ms;text-align:center;margin:32px auto 0;">
      A budget is a moral document. It tells you what a government promised, and how much of that promise survived contact with reality. The numbers above are not slogans. They are receipts.
    </p>
  </div>
</section>

<div class="marquee" style="background:var(--paper-warm);">
  <div class="marquee-track">
    <span>₱25.61 trillion</span><span>·</span>
    <span>seven gates</span><span>·</span>
    <span>six years</span><span>·</span>
    <span>120 programs</span><span>·</span>
    <span>4,440 line items</span><span>·</span>
    <span>one department</span><span>·</span>
    <span>23 million children</span><span>·</span>
    <span>₱25.61 trillion</span><span>·</span>
    <span>seven gates</span><span>·</span>
    <span>six years</span><span>·</span>
    <span>120 programs</span><span>·</span>
    <span>4,440 line items</span><span>·</span>
    <span>one department</span><span>·</span>
    <span>23 million children</span><span>·</span>
  </div>
</div>

<!-- ================= FOOTER / ATTRIBUTION ================= -->
<footer class="coda">
  <p class="body">
    Source: Department of Budget and Management releases (NEP, GAA, BESF, BAR/FAR submissions) compiled into a single dataset of 4,440 program-stage observations spanning fiscal years 2021–2026. Disbursement data unavailable for 2026 as of compilation. Augmentation calculations compare cumulative agency totals at NEP versus enacted GAA. Absorption rates calculated as Disbursements ÷ Adjusted Total Allotments within each fiscal year. Capital Outlay 2026 figure is the GAA-stage total reported by DBM. Stock photography: Unsplash.
  </p>
  <p class="meta">
    Inside the DepEd Budget · A scrollytelling investigation · <a href="/" style="color:inherit;">Return to portal →</a>
  </p>
</footer>

`;

export default function InvestigationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initNarrative();
    return cleanup;
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
