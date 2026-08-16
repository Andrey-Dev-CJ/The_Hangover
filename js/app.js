/* =========================================================
   APP — отрисовка и интерактив. Редактировать не нужно:
   весь контент берётся из config.js и data.js.
   ========================================================= */
"use strict";

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = t => String(t ?? "").replace(/[&<>"']/g, c =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Telegram-ссылки из CONFIG ---------- */
(function setupTelegram(){
  const ok = CONFIG.tgLink && !CONFIG.tgLink.includes("XXXX");
  $$(".js-tg").forEach(a => {
    if (ok) { a.href = CONFIG.tgLink; a.target = "_blank"; a.rel = "noopener"; }
    else a.title = "Вставьте ссылку в CONFIG.tgLink (js/config.js)";
  });
  $("#tg-handle").textContent = ok ? CONFIG.tgName : "укажите ссылку в js/config.js";
})();

/* ---------- 2. Герой: заголовки и портрет ---------- */
(function setupHero(){
  const t = $("#title");
  t.textContent = CONFIG.partyTitle;
  t.dataset.text = CONFIG.partyTitle;
  $("#hero-sub").textContent = CONFIG.partySub;
  $("#don-img").src = CONFIG.donImage;
  $("#don-cap").innerHTML = `${esc(CONFIG.donCaption)}<small>${esc(CONFIG.donCaption2)}</small>`;
})();

/* ---------- 3. Кодекс семьи ---------- */
$("#codex").innerHTML = DATA.codex.map(c =>
  `<div><b>${esc(c.title)}</b><p>${esc(c.text)}</p></div>`).join("");

/* ---------- 4. Бегущая строка ---------- */
(function setupTicker(){
  const half = DATA.ticker.map(t => `<span>${esc(t)} <i>✦</i></span>`).join("");
  $("#ticker").innerHTML = half + half;
})();

/* ---------- 5. Барная карта ---------- */
/* ---------- 5. Барная карта (с автобалансом колонок) ---------- */
(function setupBar(){
  const row = i => `
    <div class="m-item">
      <div><span class="name">${esc(i.name)}</span>${i.note ? `<span class="note">${esc(i.note)}</span>` : ""}</div>
      <span class="dots"></span><span class="price">${esc(i.price)}</span>
    </div>`;

  const groupHTML = g => `
    <div class="m-group">
      <h4>${esc(g.title)} <span>${esc(g.sub || "")}</span></h4>
      ${g.items.map(row).join("")}
    </div>`;

  // Считаем «вес» каждой группы (количество items) и делим на две колонки
  const groups = DATA.bar.groups.slice();
  const totalWeight = groups.reduce((s, g) => s + g.items.length, 0);
  const targetHalf = totalWeight / 2;

  let acc = 0, splitAt = 0;
  for (let i = 0; i < groups.length; i++) {
    acc += groups[i].items.length;
    if (acc >= targetHalf) { splitAt = i + 1; break; }
  }
  if (splitAt === 0) splitAt = Math.ceil(groups.length / 2);

  const leftGroups = groups.slice(0, splitAt);
  const rightGroups = groups.slice(splitAt);

  $("#bar-groups").innerHTML = leftGroups.map(groupHTML).join("");

  // Правая колонка: оставшиеся группы + шоты + барабан + note
  $("#bar-right").innerHTML =
    rightGroups.map(groupHTML).join("") +
    `<div class="m-group">
       <h4>${esc(DATA.bar.shots.title)} <span>${esc(DATA.bar.shots.sub || "")}</span></h4>
       ${DATA.bar.shots.items.map(row).join("")}
     </div>` +
    `<div class="drum rv" style="--d:.15s">
       <span class="drum-stamp" id="drum-stamp">Штраф</span>
       <h4>Штрафной барабан</h4>
       <p class="dh">рулетка для провинившихся и смелых</p>
       <div class="slot-window" aria-live="polite">
         <div class="slot-reel" id="slot-reel"></div>
         <span class="payline" aria-hidden="true"></span>
       </div>
       <button class="btn" id="spin" type="button">Крутить ✦</button>
     </div>` +
    `<p class="bar-note" id="bar-note"></p>`;

  $("#bar-note").innerHTML = DATA.bar.note;
})();

/* ---------- 6. Кухня ---------- */
/* ---------- 6. Кухня ---------- */
/* ---------- 6. Кухня (поддерживает массив featured) ---------- */
(function setupFood(){
  const arr = Array.isArray(DATA.food.featured) ? DATA.food.featured : [DATA.food.featured];

  const featuredHTML = arr.map((f, i) => `
    <article class="food-main paper rv" style="--d:${(.05 + i * .06).toFixed(2)}s">
      <span class="pin" style="top:-7px;left:50%;margin-left:-7px"></span>
      <div class="ph kb"><img src="${esc(f.img)}" alt="${esc(f.alt)}"></div>
      <div class="fc">
        <h3>${esc(f.title)}</h3>
        <p class="tag">${esc(f.tag)}</p>
        <p>${esc(f.text)}</p>
        <div class="specs">${f.specs.map(s => `<span>${esc(s)}</span>`).join("")}</div>
      </div>
    </article>`).join("");

  const cardsHTML = DATA.food.cards.map((c, i) => `
    <article class="food-card paper rv" style="--d:${(.1 + (arr.length + i) * .06).toFixed(2)}s">
      <div class="ph kb"><img src="${esc(c.img)}" alt="${esc(c.alt)}"></div>
      <div class="fc">
        <h3>${esc(c.title)}</h3>
        ${c.items.map(x => `
          <div class="m-item">
            <span class="name">${esc(x.name)}</span>
            <span class="dots"></span><span class="price">${esc(x.price)}</span>
          </div>`).join("")}
      </div>
    </article>`).join("");

  $("#food-grid").innerHTML = featuredHTML + cardsHTML;

  $("#food-sides").innerHTML =
    "К столу также подают: " + DATA.food.sides.map(s => esc(s)).join(' <i>✦</i> ');
})();

/* ---------- 7. План операции ---------- */
(function setupPlan(){
  $("#plan-rules").innerHTML = DATA.planRules.map(r => `<li>${esc(r)}</li>`).join("");
  $("#steps").insertAdjacentHTML("beforeend",
    DATA.program.map((p, i) => `
      <li class="step rv" style="--d:${(i * .05).toFixed(2)}s">
        <span class="s-time">${esc(p.time)}</span>
        <h4>${esc(p.title)}</h4>
        <p>${esc(p.text)}</p>
        <span class="s-suit">${esc(p.suit)}</span>
      </li>`).join(""));
})();

/* ---------- 8. Игры ---------- */
$("#games-grid").innerHTML = DATA.games.map((g, i) => `
  <article class="gcard g${i % 4 + 1} rv" style="--d:${(.05 + i * .07).toFixed(2)}s">
    <div class="ph kb"><img src="${esc(g.img)}" alt="${esc(g.alt)}"></div>
    <div class="gbody">
      <div class="gtop">
        <span class="suit ${esc(g.suitColor)}">${esc(g.suit)}</span>
        <span class="gnum">Игра ${String(i + 1).padStart(2, "0")}</span>
      </div>
      <h3>${esc(g.title)}</h3>
      <p class="gtag">${esc(g.tag)}</p>
      <p class="gdesc">${esc(g.desc)}</p>
      <ul class="gmeta">${g.meta.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
    </div>
  </article>`).join("");

/* ---------- 9. Отсчёт до часа Х ---------- */
(function setupCountdown(){
  const plural = (n, one, few, many) => {
    n = Math.abs(n) % 100; const d = n % 10;
    if (n > 10 && n < 20) return many;
    if (d > 1 && d < 5) return few;
    if (d === 1) return one;
    return many;
  };
  const target = new Date(CONFIG.date);
  if (isNaN(target)) { $("#event-meta").textContent = "Дата уточняется ✦ свяжитесь с Доном-Организатором"; return; }

  const day = target.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" }).toUpperCase();
  const hh = String(target.getHours()).padStart(2, "0");
  const mm = String(target.getMinutes()).padStart(2, "0");
  $("#event-meta").innerHTML = `${esc(day)} <b>✦</b> ${hh}:${mm} <b>✦</b> ${esc(CONFIG.place)}`;

  const pad = n => String(n).padStart(2, "0");
  const D = $("#cd-d"), H = $("#cd-h"), M = $("#cd-m"), S = $("#cd-s");
  (function tick(){
    const diff = target - new Date();
    if (diff <= 0) { $("#cd").innerHTML = '<span class="cd-done">Час Х настал. Семья в сборе.</span>'; return; }
    const d = Math.floor(diff / 864e5),
          h = Math.floor(diff / 36e5) % 24,
          m = Math.floor(diff / 6e4) % 60,
          s = Math.floor(diff / 1e3) % 60;
    D.textContent = d; H.textContent = pad(h); M.textContent = pad(m); S.textContent = pad(s);
    $("#cd-dl").textContent = plural(d, "день", "дня", "дней");
    setTimeout(tick, 1000);
  })();
})();

/* ---------- 10. Скрэмбл-декод заголовка ---------- */
(function scrambleTitle(){
  const el = $("#title"), fin = el.dataset.text;
  if (REDUCED || !fin) return;
  const CH = "АВДЖЗИКМНОПРСТУФХЦЧШЩЫЭЮЯ♠♦♣♥§$#";
  let frame = 0;
  const iv = setInterval(() => {
    frame++; let out = "";
    for (let i = 0; i < fin.length; i++) {
      if (frame > i * 3 + 14)      out += fin[i];
      else if (frame > i * 2)      out += CH[Math.random() * CH.length | 0];
      else                         out += "·";
    }
    el.textContent = out;
    if (out === fin) clearInterval(iv);
  }, 42);
})();

/* ---------- 11. Появление блоков по скроллу ---------- */
(function setupReveal(){
  const els = $$(".rv");
  if (!("IntersectionObserver" in window) || REDUCED) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
  els.forEach(e => io.observe(e));
})();

/* ---------- 12. План: подсветка текущего шага и прогресс ---------- */
(function setupSteps(){
  const steps = $$(".step"), line = $("#steps"), prog = $("#prog");
  const io = new IntersectionObserver(es => es.forEach(e =>
    e.target.classList.toggle("now", e.isIntersecting)),
    { rootMargin: "-42% 0px -48% 0px" });
  steps.forEach(s => io.observe(s));

  let raf = null;
  const upd = () => {
    raf = null;
    const r = line.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .5 - r.top) / r.height));
    prog.style.height = (p * 100) + "%";
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
  upd();
})();


/* ---------- 13. Штрафной барабан (единое непрерывное вращение) ---------- */
(function setupDrum(){
  const src = (DATA.bar.fanty && DATA.bar.fanty.length)
    ? DATA.bar.fanty
    : DATA.bar.shots.items.map(s => `${s.name} — залпом`);
  if (!src.length) return;

  const btn = $("#spin"), reel = $("#slot-reel"), stamp = $("#drum-stamp"), win = reel.parentElement;
  const H = 64, REPEAT = 4;
  let N = src.length, current = 0, busy = false;

  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const centerT = i => win.clientHeight / 2 - H / 2 - i * H;

  const build = () => {
    const F = shuffle([...src]);
    N = F.length;
    reel.innerHTML = Array.from({ length: REPEAT }, () =>
      F.map(t => `<div class="cell${t.length > 44 ? " len3" : t.length > 28 ? " len2" : ""}">${esc(t)}</div>`).join("")
    ).join("");
  };

  build();
  reel.style.transform = `translateY(${centerT(0)}px)`;
  addEventListener("resize", () => { reel.style.transform = `translateY(${centerT(current)}px)`; });

  const hit = () => { stamp.classList.add("hit"); setTimeout(() => stamp.classList.remove("hit"), 1400); };

  const outCubic = t => 1 - Math.pow(1 - t, 3);
  const outQuart = t => 1 - Math.pow(1 - t, 4);
  const inOut    = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const run = (segs, done) => {
    let i = 0;
    const next = () => {
      if (i >= segs.length) return done();
      const sg = segs[i++], t0 = performance.now();
      (function fr(now){
        const p = Math.min(1, (now - t0) / sg.dur);
        reel.style.transform = `translateY(${sg.a + (sg.b - sg.a) * sg.ease(p)}px)`;
        if (p < 1) requestAnimationFrame(fr); else next();
      })(t0);
    };
    next();
  };

  btn.addEventListener("click", () => {
    if (busy) return; busy = true;
    build();
    const f = Math.random() * N | 0;
    const span = 2 * N + (Math.random() * (N + 1) | 0);
    const s = Math.min(REPEAT * N - 1, f + span);
    const from = centerT(s), to = centerT(f);
    const base = 5200 + Math.random() * 2400;
    const mode = Math.random();

    if (REDUCED) { current = f; reel.style.transform = `translateY(${to}px)`; hit(); busy = false; return; }

    let segs;
    if (mode < 0.38) {
      // ИНЕРЦИЯ: торможение заканчивается ЗА центром, и лента сама
      // «качается» обратно — это хвост одного движения, без остановки
      const ov = H * (0.35 + Math.random() * 0.25);
      segs = [
        { a: from, b: to + ov, dur: base,          ease: outCubic },
        { a: to + ov, b: to,   dur: 450 + Math.random() * 300, ease: inOut },
      ];
    } else if (mode < 0.72) {
      // НАПРЯЖЕНИЕ: одна непрерывная кривая с длинным хвостом —
      // последняя ячейка доползает мучительно медленно
      segs = [{ a: from, b: to, dur: base + 1500, ease: outQuart }];
    } else {
      // КЛАССИКА: плавное докачивание одной кривой
      segs = [{ a: from, b: to, dur: base, ease: outCubic }];
    }

    run(segs, () => { current = f; hit(); busy = false; });
  });
})();


/* ---------- 14. Лёгкий 3D-наклон карточек игр ---------- */
(function setupTilt(){
  if (REDUCED || matchMedia("(pointer:coarse)").matches) return;
  $$(".gcard").forEach(c => {
    const cs  = getComputedStyle(c);
    const rot = cs.getPropertyValue("--rot") || "0deg";
    const dy  = cs.getPropertyValue("--dy")  || "0px";
    c.addEventListener("mousemove", e => {
      const r = c.getBoundingClientRect(),
            x = (e.clientX - r.left) / r.width  - .5,
            y = (e.clientY - r.top)  / r.height - .5;
      c.style.transform =
        `translateY(calc(${dy} - 6px)) rotate(${rot}) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    });
    c.addEventListener("mouseleave", () => { c.style.transform = ""; });
  });
})();


/* ---------- 15. Запасные «карты», если картинки недоступны ---------- */
(function setupImgFallback(){
  const SUITS = ["♠", "♥", "♦", "♣"];
  const make = (label, suit) => {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">` +
      `<rect width="800" height="520" fill="#1c150d"/>` +
      `<g fill="none" stroke="#c9a227" stroke-opacity=".16"><rect x="14" y="14" width="772" height="492"/><rect x="28" y="28" width="744" height="464"/></g>` +
      `<text x="400" y="310" font-size="180" text-anchor="middle" fill="#c9a227" fill-opacity=".30" font-family="Georgia,serif">${suit}</text>` +
      `<text x="400" y="430" font-size="24" letter-spacing="6" text-anchor="middle" fill="#e8c95a" fill-opacity=".85" font-family="Courier New,monospace">${label.toUpperCase()}</text>` +
      `</svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  };
  const fix = img => {
    if (img.dataset.fb) return;
    img.dataset.fb = "1";
    img.src = make(img.alt || "La Famiglia", SUITS[(img.alt || "").length % SUITS.length]);
  };
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => fix(img));
    if (img.complete && img.naturalWidth === 0 && img.src) fix(img); // уже протухла до бинда
  });
})();



/* ---------- 16. Модальное окно рецептов ---------- */
(function setupRecipes(){
  const modal = $("#recipe-modal");
  const title = $("#recipe-modal-title");
  const ingredients = $("#recipe-ingredients");
  const serving = $("#recipe-serving");
  const secret = $("#recipe-secret");
  const secretSection = $("#recipe-secret-section");
  const closeBtn = $("#recipe-modal-close");

  if (!modal || !RECIPES) return;

  const open = (name) => {
    const r = RECIPES[name];
    if (!r) return;
    title.textContent = name;
    ingredients.innerHTML = r.ingredients.map(i =>
      `<li><span class="ing-item">${esc(i.item)}</span><span class="ing-amount">${esc(i.amount)}</span></li>`
    ).join("");
    serving.textContent = r.serving;
    if (r.secret) {
      secret.textContent = r.secret;
      secretSection.style.display = "";
    } else {
      secretSection.style.display = "none";
    }
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  };

  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("active")) close(); });

  // клики по строкам меню
  document.querySelectorAll(".m-item").forEach(el => {
    const nameEl = el.querySelector(".name");
    if (!nameEl) return;
    const name = nameEl.textContent.trim();
    if (RECIPES[name]) {
      el.setAttribute("data-recipe", name);
      el.addEventListener("click", () => open(name));
    }
  });
})();