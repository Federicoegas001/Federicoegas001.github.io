/* Kit común de demos: barra superior + consola de red simulada.
   Uso: <body data-title="NovaBank" data-sub="Fintech" data-stack="React,Tailwind" data-repo="https://..."> */
(function () {
  const b = document.body;
  const thumb = location.hash === "#thumb";
  if (thumb) document.documentElement.classList.add("fx-thumb");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const stack = (b.dataset.stack || "").split(",").filter(Boolean);
  const repo = b.dataset.repo || "";
  const bar = document.createElement("div");
  bar.className = "fx-bar";
  bar.innerHTML =
    '<a class="fx-back" href="../index.html#proyectos">← Portfolio</a>' +
    '<div class="fx-title"><b>' + esc(b.dataset.title || "Demo") + "</b><span>" + esc(b.dataset.sub || "") + "</span></div>" +
    '<div class="fx-chips">' + stack.map((s) => '<span class="fx-chip">' + esc(s) + "</span>").join("") + "</div>" +
    '<div class="fx-sp"></div>' +
    (repo
      ? '<a class="fx-btn" href="' + esc(repo) + '" target="_blank" rel="noopener">Ver código ↗</a>'
      : '<span class="fx-btn ghost" title="Repositorio privado">Repo privado</span>') +
    '<div class="fx-note"><b>Demo interactiva:</b> ' + esc(b.dataset.note || "corre en tu navegador con datos de ejemplo; la consola muestra las llamadas que haría al backend real.") + "</div>";
  if (!thumb) b.prepend(bar);

  const con = document.createElement("section");
  con.className = "fx-console min";
  con.setAttribute("aria-label", "Consola de red simulada");
  con.innerHTML = '<header tabindex="0" role="button" aria-expanded="false"><i></i><span>Consola · backend</span><em>0 requests</em></header><ol></ol>';
  b.appendChild(con);
  const list = con.querySelector("ol");
  const count = con.querySelector("em");
  const head = con.querySelector("header");
  let n = 0;
  const toggle = () => {
    con.classList.toggle("min");
    head.setAttribute("aria-expanded", String(!con.classList.contains("min")));
  };
  head.addEventListener("click", toggle);
  head.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });

  window.Kit = {
    log(method, path, status) {
      n++;
      count.textContent = n + (n === 1 ? " request" : " requests");
      const li = document.createElement("li");
      li.className = "new";
      const st = status == null ? "" : String(status);
      const err = /^[45]/.test(st);
      li.innerHTML = '<span class="fx-m ' + esc(method) + '">' + esc(method) + '</span><span class="fx-p" title="' + esc(path) + '">' + esc(path) + '</span><span class="fx-s' + (err ? " e" : "") + '">' + esc(st) + "</span>";
      list.appendChild(li);
      list.scrollTop = list.scrollHeight;
    },
    open() { if (con.classList.contains("min")) toggle(); },
    money(v, cur) {
      return new Intl.NumberFormat("es-AR", { style: "currency", currency: cur || "ARS", maximumFractionDigits: cur === "USD" ? 2 : 0 }).format(v);
    },
    esc,
  };
})();
