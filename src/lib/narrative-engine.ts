/* =============================================================
   Inside the DepEd Budget — narrative engine (TypeScript ES module)
   - Triggers `.in` on scenes when they enter view
   - Counts up `.tick[data-target]`
   - Splits text into words for `.reveal-words`
   - Updates progress rail + pip-rail
   ============================================================= */

export function initNarrative(): () => void {
  const scenes = Array.from(document.querySelectorAll<HTMLElement>(".scene"));
  const progress = document.querySelector<HTMLElement>(".progress");
  const piprail = document.querySelector<HTMLElement>(".piprail");

  // Build pip rail
  if (piprail) {
    piprail.innerHTML = "";
    scenes.forEach((s, i) => {
      const pip = document.createElement("div");
      pip.className = "pip";
      pip.title = s.dataset.title || `Chapter ${i + 1}`;
      pip.addEventListener("click", () => {
        s.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      piprail.appendChild(pip);
    });
  }

  // Word splitting
  document.querySelectorAll<HTMLElement>(".reveal-words").forEach((el) => {
    if (el.dataset.split) return;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    nodes.forEach((node) => {
      const parts = node.nodeValue!.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach((p) => {
        if (/^\s+$/.test(p)) {
          frag.appendChild(document.createTextNode(p));
        } else if (p.length) {
          const span = document.createElement("span");
          span.className = "word";
          span.textContent = p;
          frag.appendChild(span);
        }
      });
      node.parentNode!.replaceChild(frag, node);
    });
    // Stagger
    el.querySelectorAll<HTMLElement>(".word").forEach((w, i) => {
      w.style.transitionDelay = i * 60 + "ms";
    });
    el.dataset.split = "1";
  });

  // Count-up
  function runTickers(scope: HTMLElement): void {
    scope.querySelectorAll<HTMLElement>(".tick[data-target]").forEach((el) => {
      if (el.dataset.ticked) return;
      el.dataset.ticked = "1";
      const target = parseFloat(el.dataset.target!);
      const decimals = +(el.dataset.decimals || 0);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const dur = +(el.dataset.dur || 1600);
      const t0 = performance.now();
      const fmt = (v: number): string =>
        prefix +
        v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;
      const tick = (now: number): void => {
        const t = Math.min(1, (now - t0) / dur);
        const k = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = fmt(target * k);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(tick);
    });
  }

  // Intersection observer — when a scene is mostly in view, mark `.in`
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          runTickers(e.target as HTMLElement);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0 }
  );
  scenes.forEach((s) => io.observe(s));

  // Fallback: reveal whichever scene is currently in view
  function revealVisible(): void {
    scenes.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > window.innerHeight * 0.1) {
        s.classList.add("in");
        runTickers(s);
      }
    });
  }

  // Always reveal the first scene immediately
  if (scenes[0]) {
    scenes[0].classList.add("in");
    runTickers(scenes[0]);
  }

  window.addEventListener("load", revealVisible);
  setTimeout(revealVisible, 100);
  setTimeout(revealVisible, 600);

  // Belt-and-suspenders: scroll-driven reveal as well
  let revealRaf = 0;
  const onScrollReveal = (): void => {
    if (revealRaf) return;
    revealRaf = requestAnimationFrame(() => {
      revealRaf = 0;
      revealVisible();
    });
  };
  window.addEventListener("scroll", onScrollReveal, { passive: true });

  // Active scene observer (for piprail + chrome blend)
  const activeIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.5) {
          const idx = scenes.indexOf(e.target as HTMLElement);
          if (idx < 0 || !piprail) return;
          Array.from(piprail.children).forEach((p, i) => {
            p.classList.toggle("active", i === idx);
            // Detect dark scene
            const dark =
              (e.target as HTMLElement).classList.contains("bg-ink") ||
              (e.target as HTMLElement).classList.contains("bg-accent") ||
              (e.target as HTMLElement).classList.contains("bg-gold") ||
              (e.target as HTMLElement).dataset.darkRail === "1";
            p.classList.toggle("dark", dark);
          });
        }
      });
    },
    { threshold: [0.5] }
  );
  scenes.forEach((s) => activeIO.observe(s));

  // Progress rail
  let raf = 0;
  function updateProgress(): void {
    raf = 0;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    if (progress) progress.style.width = p * 100 + "%";
  }
  const onScrollProgress = (): void => {
    if (!raf) raf = requestAnimationFrame(updateProgress);
  };
  document.addEventListener("scroll", onScrollProgress, { passive: true });
  updateProgress();

  // Keyboard nav
  const onKeydown = (e: KeyboardEvent): void => {
    const cur = scenes.findIndex((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
    });
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      const next = scenes[Math.min(scenes.length - 1, cur + 1)];
      if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      const prev = scenes[Math.max(0, cur - 1)];
      if (prev) prev.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  document.addEventListener("keydown", onKeydown);

  // Cleanup function
  return () => {
    io.disconnect();
    activeIO.disconnect();
    window.removeEventListener("scroll", onScrollReveal);
    document.removeEventListener("scroll", onScrollProgress);
    document.removeEventListener("keydown", onKeydown);
    window.removeEventListener("load", revealVisible);
  };
}
