// µ# = NC-Träger
const muSharp = {
  nc: {
    // hier liegt dein Ganzes NC
    state: "NC-GANZ",
    meta: "META_1x",
  }
};

// Parteien (12er optional, hier nur Beispiel)
const parties = [
  { id: 1, name: "P1", op: null },
  { id: 2, name: "P2", op: null },
  { id: 3, name: "P3", op: null },
  { id: 4, name: "P4", op: null }
];

// CALC-Kern: minimal, hat aber Zugriff auf alles
function CALC(input) {
  // Zugriff auf µ# (NC)
  const nc = muSharp.nc;

  // OP: Ableitung pro Partei
  parties.forEach(p => {
    p.op = {
      from: input,
      ncState: nc.state,
      meta: nc.meta
    };
  });

  // Rückgabe: NC bleibt getragen in µ#
  return {
    nc,
    parties
  };
}

// RESPO: Buttons → CALC
const respoEl = document.getElementById("respo");
const logEl = document.getElementById("log");

if (respoEl && logEl) {
  respoEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".cmd");
    if (!btn) return;

    const cmd = btn.dataset.cmd || btn.textContent.trim();

    // RESPO → CALC
    const result = CALC(cmd);

    // Log-Ausgabe (Item-Code sichtbar)
    logEl.innerHTML = `
      <div>CMD: ${cmd}</div>
      <div>NC: ${result.nc.state} (${result.nc.meta})</div>
      <div>OP:</div>
      <ul>
        ${result.parties.map(p => `
          <li>${p.name}: from=${p.op.from}</li>
        `).join("")}
      </ul>
    `;
  });
}

