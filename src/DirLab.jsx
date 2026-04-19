// Direction 3 — "/lab": playful ASCII lab with ambient glow

const { useEffect: useLabEffect, useRef: useLabRef, useState: useLabState } = React;

const ASCII_ART = [
  "  ┌───────────── dvagolab · ambient field ─────────────┐",
  "  │                                                    │",
  "  │   ╭──────╮        ╭──────╮        ╭──────╮         │",
  "  │   │  be  │────────│ core │────────│ sec  │         │",
  "  │   ╰──────╯        ╰───┬──╯        ╰──────╯         │",
  "  │                       │                            │",
  "  │                   ╭───┴──╮                         │",
  "  │                   │ cloud│                         │",
  "  │                   ╰──┬───╯                         │",
  "  │       ╭──────╮       │       ╭──────╮              │",
  "  │       │ game │───────┼───────│ /lab │              │",
  "  │       ╰──────╯       │       ╰──────╯              │",
  "  │                      ·                             │",
  "  │     · · · · running · · · · running · · · ·        │",
  "  │                                                    │",
  "  └────────────────────────────────────────────────────┘",
].join("\n");

const GAME_ART = `
 ┌──────────────────────────────────────────────┐
 │  .  .       .                    .    .     │
 │         ·   .     .        .         .      │
 │   .           ▲                 .       .   │
 │     .       ╱ ╲      .   .   .              │
 │   .        ╱···╲          ·               . │
 │          ╱·····╲    ╭──╮                    │
 │    .   ╱·······╲    │◇ │   .   .       ·    │
 │       ──────────────┴──┴──────────────       │
 │  p-001 · untitled mobile game · in-progress │
 └──────────────────────────────────────────────┘`.trim();

function AsciiField() {
  const boxRef = useLabRef(null);
  const glowRef = useLabRef(null);

  useLabEffect(() => {
    const onMove = (e) => {
      if (!boxRef.current || !glowRef.current) return;
      const r = boxRef.current.getBoundingClientRect();
      const x = e.clientX - r.left - 100;
      const y = e.clientY - r.top - 100;
      glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    const el = boxRef.current;
    if (el) el.addEventListener("mousemove", onMove);
    return () => { if (el) el.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div className="ascii" ref={boxRef}>
      <div className="glow" ref={glowRef} />
      <pre>{ASCII_ART}</pre>
    </div>
  );
}

function Wordmark() {
  const [tick, setTick] = useLabState(0);
  useLabEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 3500);
    return () => clearInterval(i);
  }, []);
  const rotating = ["backend.", "security.", "cloud.", "a game."];
  return (
    <div>
      <h1 className="wordmark">dvago<span className="slash">/</span>lab<span className="cursor" /></h1>
      <p className="sub">
        An independent software lab shipping small, considered things.<br/>
        Currently building: <em>{rotating[tick % rotating.length]}</em>
      </p>
      <div className="running">
        <span className="pulse" />
        <span>lab is <b style={{color:"var(--fg)"}}>running</b> — last build {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function DirLab() {
  return (
    <div className="lab page">
      <header className="topbar">
        <div className="brand"><span className="dot" /> dvagolab</div>
        <nav>
          <a href="#projects">/projects</a>
          <a href="#labs">/labs</a>
          <a href="#contact">/contact</a>
        </nav>
        <div className="status">
          <span className="accent">●</span>
          <span>online</span>
        </div>
      </header>

      <div className="shell">
        <section className="hero">
          <Wordmark />
          <AsciiField />
        </section>

        <section className="section" id="projects">
          <div className="section-title">
            <span className="slash">//</span>
            <span className="name">projects</span>
            <span className="line" />
            <span>{DVAGO.projects.length} items</span>
          </div>
          <div className="projects">
            {DVAGO.projects.map((p, i) => (
              <article key={p.id} className={"pcard " + (i === 0 ? "featured" : "")}>
                {i === 0 && <div className="art">{GAME_ART}</div>}
                <div style={{fontSize:11, color:"var(--fg-muted)", letterSpacing:".12em"}}>
                  {p.code} · {p.kind}
                </div>
                <h3>{p.name} <span className="arrow">→</span></h3>
                <p>{p.desc}</p>
                <div className="row">
                  <span>status · <span style={{color: p.statusKey === "active" ? "var(--accent)" : "var(--fg-dim)"}}>{p.status}</span></span>
                  <span>progress · {p.progress}</span>
                  <span>eta · {p.eta}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="labs">
          <div className="section-title">
            <span className="slash">//</span>
            <span className="name">labs</span>
            <span className="line" />
            <span>what we're exploring</span>
          </div>
          <div className="experiments">
            {DVAGO.experiments.map((x) => (
              <div key={x.code} className="xp">
                <div className="code">{x.code}</div>
                <div className="name">{x.name}</div>
                <div className="desc">{x.desc}</div>
                <div className="status" data-s={x.s}>● {x.status}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <h2>Let's build something <span className="accent">small and good.</span></h2>
          <p>Open for collaboration, consulting, and quiet correspondence. Response time: honest.</p>
          <div className="chs">
            <a className="primary" href={`mailto:${DVAGO.contact.email}`}>{DVAGO.contact.email}</a>
            <a href={`https://${DVAGO.contact.github}`}>github →</a>
            <a href={`https://${DVAGO.contact.rss}`}>build log →</a>
          </div>
        </section>
      </div>

      <footer className="footer">
        <span>© dvagolab</span>
        <span>made with: attention · coffee · fewer dependencies</span>
      </footer>
    </div>
  );
}

window.DirLab = DirLab;
