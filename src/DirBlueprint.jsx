// Direction 2 — "blueprint": engineering schematic with a system map

function SystemMap() {
  // positions are percentages so it scales
  const nodes = [
    { id: "core", label: "dvagolab", sub: "core", x: 46, y: 42, core: true },
    { id: "be",   label: "backend",  sub: "rust · go · ts", x: 8,  y: 18 },
    { id: "sec",  label: "security", sub: "threat · crypto · auth", x: 8,  y: 66 },
    { id: "cld",  label: "cloud",    sub: "aws · gcp · edge", x: 74, y: 18 },
    { id: "game", label: "game",     sub: "P-001 · mobile", x: 74, y: 66 },
    { id: "lab",  label: "/labs",    sub: "open notes", x: 46, y: 82 },
  ];
  const edges = [
    ["be","core"], ["sec","core"], ["cld","core"],
    ["game","core"], ["lab","core"],
  ];
  const pos = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div className="map" aria-label="system map">
      <svg className="svg-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a,b], i) => {
          const A = pos[a], B = pos[b];
          return (
            <line
              key={i}
              x1={A.x + 6} y1={A.y + 3}
              x2={B.x + 6} y2={B.y + 3}
              stroke="var(--rule-strong)"
              strokeWidth="0.15"
              strokeDasharray="0.6 0.4"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      {nodes.map((n) => (
        <div
          key={n.id}
          className="node"
          data-core={n.core || undefined}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <b>{n.label}</b>
          {n.sub}
        </div>
      ))}
    </div>
  );
}

function DirBlueprint() {
  return (
    <div className="blueprint page">
      <header className="topbar">
        <div className="brand"><span className="dot" /> dvagolab <span className="muted">· schematic</span></div>
        <nav>
          <a href="#work">work</a>
          <a href="#map">system</a>
          <a href="#labs">labs</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="status">
          <span>DVG-LAB / REV-A</span>
          <span>·</span>
          <span>SHEET 01/04</span>
        </div>
      </header>

      <div className="shell">
        <section className="hero">
          <div className="coord">
            <div className="coord-cell">
              <span className="dim">FILE</span>
              <span>dvagolab.index</span>
            </div>
            <div className="coord-cell">
              <span className="dim">REV</span>
              <span>A · 2026.04</span>
            </div>
            <div className="coord-cell">
              <span className="dim">STATUS</span>
              <span>OPEN · ACCEPTING</span>
            </div>
          </div>

          <div>
            <h1 className="h1">An independent <span className="mark">software&nbsp;lab</span>, designed for long time horizons.</h1>
            <p className="sub">
              dvagolab is a one-person studio shipping small, considered things across
              backend, security, and cloud — alongside a mobile game quietly taking shape
              in the background. This page is the schematic. Everything here is honest about scale.
            </p>
          </div>

          <div className="hero-meta">
            <div className="stamp"><b>●</b> LAB ACTIVE</div>
            <div className="stamp">EST · 2025</div>
            <div className="stamp">REMOTE</div>
            <div className="stamp">ONE PERSON</div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-head">
            <div className="num">§ 01</div>
            <div className="tit">Current work</div>
            <div>Active builds and what's planned next.</div>
          </div>
          <div className="body">
            <div className="projects">
              {DVAGO.projects.map((p) => (
                <div key={p.id} className="proj">
                  <div className="id">{p.code}</div>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                  </div>
                  <div className="specs">
                    <div className="k">kind</div><div className="v">{p.kind}</div>
                    <div className="k">stack</div><div className="v">{p.stack}</div>
                    <div className="k">progress</div><div className="v">{p.progress}</div>
                    <div className="k">eta</div><div className="v">{p.eta}</div>
                  </div>
                  <div className="status" data-s={p.statusKey}>{p.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="map">
          <div className="section-head">
            <div className="num">§ 02</div>
            <div className="tit">System map</div>
            <div>How the pieces relate. Hover to inspect.</div>
          </div>
          <div className="body">
            <SystemMap />
            <div className="bp-expertise" style={{marginTop: 24, display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 16, fontSize: 12}}>
              {DVAGO.expertise.map((e) => (
                <div key={e.k} style={{borderTop: "1px solid var(--rule-strong)", paddingTop: 10}}>
                  <div style={{color:"var(--fg-muted)", letterSpacing:".14em", fontSize: 10, textTransform:"uppercase", marginBottom: 4}}>{e.k}</div>
                  <div style={{color:"var(--fg-dim)", fontFamily:"var(--sans)"}}>{e.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="labs">
          <div className="section-head">
            <div className="num">§ 03</div>
            <div className="tit">/labs</div>
            <div>Ongoing explorations. Notes kept in public.</div>
          </div>
          <div className="body">
            <div style={{display:"grid", gridTemplateColumns: "1fr", gap: 0, border:"1px solid var(--rule-strong)"}}>
              {DVAGO.experiments.map((x, i) => (
                <div key={x.code} className="bp-exp-row" style={{
                  display:"grid",
                  gridTemplateColumns: "90px 1fr 1.4fr 120px",
                  gap: 20, alignItems: "baseline",
                  padding: "16px 24px",
                  borderTop: i === 0 ? 0 : "1px solid var(--rule)",
                }}>
                  <div style={{color:"var(--fg-muted)", fontSize: 11, letterSpacing:".14em"}}>{x.code}</div>
                  <div style={{fontFamily:"var(--sans)", fontSize: 15}}>{x.name}</div>
                  <div style={{color:"var(--fg-dim)", fontFamily:"var(--sans)", fontSize: 13}}>{x.desc}</div>
                  <div className="status" data-s={x.s === "live" ? "active" : ""} style={{
                    fontSize: 10, letterSpacing:".18em", textTransform:"uppercase",
                    color: x.s === "live" ? "var(--accent)" : x.s === "paused" ? "#f3c969" : "var(--fg-muted)",
                  }}>{x.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="coord">
            <div className="coord-cell">
              <span className="dim">§ 04</span>
              <span>CONTACT</span>
            </div>
          </div>
          <div>
            <h2>Open for <em>collaboration</em>, consulting, and curious conversation.</h2>
            <div className="ch-grid">
              <a className="ch" href={`mailto:${DVAGO.contact.email}`}>
                <div className="k">email</div>
                <div className="v">{DVAGO.contact.email}</div>
              </a>
              <a className="ch" href={`https://${DVAGO.contact.github}`}>
                <div className="k">github</div>
                <div className="v">{DVAGO.contact.github}</div>
              </a>
              <a className="ch" href={`https://${DVAGO.contact.rss}`}>
                <div className="k">build log (rss)</div>
                <div className="v">{DVAGO.contact.rss}</div>
              </a>
              <div className="ch">
                <div className="k">signal</div>
                <div className="v">{DVAGO.contact.signal}</div>
              </div>
            </div>
          </div>
          <div className="coord" style={{textAlign:"right"}}>
            <div className="coord-cell" style={{alignItems:"flex-end"}}>
              <span className="dim">DRAWN BY</span>
              <span>dvagolab</span>
            </div>
            <div className="coord-cell" style={{alignItems:"flex-end"}}>
              <span className="dim">SCALE</span>
              <span>1 : 1</span>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <span>© dvagolab · All revisions</span>
        <span>SHEET 04/04 · END</span>
      </footer>
    </div>
  );
}

window.DirBlueprint = DirBlueprint;
