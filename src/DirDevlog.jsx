// Direction 1 — "devlog": terminal / log aesthetic with a real typeable prompt

const { useState, useRef, useEffect } = React;

function Prompt() {
  const [history, setHistory] = useState([
    { kind: "out", text: "dvagolab — terminal build, v0.9\ntype `help` for available commands, or start typing." },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const push = (out) => setHistory((h) => [...h, { kind: "cmd", text: raw }, { kind: "out", text: out }]);
    if (!cmd) return;
    switch (cmd) {
      case "help":
        push("available: whoami · projects · labs · contact · clear\ntry tab-completion in your head."); break;
      case "whoami":
        push("dvagolab — independent software lab.\nbackend · security · cloud. currently also: a small mobile game."); break;
      case "projects":
        push("P-001  Viking Mobile Game   [active]\nP-002  Next thing                [planned]"); break;
      case "labs":
      case "experiments":
        push(DVAGO.experiments.map(x => `${x.code}  ${x.name.padEnd(34)} [${x.s}]`).join("\n")); break;
      case "contact":
        push(`email:  ${DVAGO.contact.email}\ngithub: ${DVAGO.contact.github}\nrss:    ${DVAGO.contact.rss}`); break;
      case "clear":
        setHistory([{ kind: "out", text: "" }]); return;
      case "sudo":
        push("nice try."); break;
      default:
        push(`unknown command: ${cmd}\n(try \`help\`)`);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter") { run(value); setValue(""); }
  };

  return (
    <div className="prompt" onClick={() => inputRef.current?.focus()} ref={scrollRef}>
      {history.map((h, i) => h.kind === "cmd"
        ? <div key={i} className="line"><span className="you">dvago@lab</span> <span style={{color:"var(--fg-muted)"}}>~</span> % {h.text}</div>
        : <div key={i} className="out">{h.text}</div>
      )}
      <div className="input-row">
        <span className="chev">%</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder="try: whoami"
          autoFocus
        />
        <span className="hint">enter ↵</span>
      </div>
    </div>
  );
}

function DirDevlog() {
  return (
    <div className="devlog page">
      <header className="topbar">
        <div className="brand"><span className="dot" /> dvagolab</div>
        <nav>
          <a href="#projects">projects</a>
          <a href="#labs">labs</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="status">
          <span>build_0.9</span>
          <span>·</span>
          <span>{new Date().toISOString().slice(0,10)}</span>
        </div>
      </header>

      <section className="hero">
        <div>
          <h1>dvago<span className="slash">/</span>lab</h1>
          <p className="sub">
            An independent software lab. <em>Backend, security, cloud.</em> Currently
            also: a small mobile game in the oven. One person. Ships slowly, on purpose.
          </p>
        </div>
        <Prompt />
      </section>

      <section className="section" id="projects">
        <h2>current projects</h2>
        <div className="projects">
          {DVAGO.projects.map((p, i) => (
            <article key={p.id} className={"card " + (i === 0 ? "featured" : "")}>
              <div className="tag">
                <span>{p.code}</span>
                <span>·</span>
                <b>{p.status}</b>
                <span>·</span>
                <span>{p.kind}</span>
              </div>
              {i === 0 && Array.isArray(p.shots) && p.shots.length > 0 && (
                <div className="preview-gallery" role="region" aria-label={`${p.name} screenshots`}>
                  <div className="preview-gallery-track">
                    {p.shots.map((src, si) => (
                      <figure key={si} className="preview-gallery-slide">
                        <img
                          src={src}
                          alt={si === 0 ? `Screenshot: ${p.name}` : ""}
                          loading={si === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </figure>
                    ))}
                  </div>
                  <p className="preview-gallery-hint">Swipe · more shots</p>
                </div>
              )}
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="meta">
                <span>progress · {p.progress}</span>
                <span>eta · {p.eta}</span>
                <span>stack · {p.stack}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="labs">
        <h2>labs · what we're exploring</h2>
        <div className="labs">
          {DVAGO.experiments.map((x) => (
            <div key={x.code} className="lab">
              <div className="id">{x.code}</div>
              <div>
                <div className="name">{x.name}</div>
                <div className="desc">{x.desc}</div>
              </div>
              <div className="desc" style={{textAlign:"right"}}>
                {x.s === "live" ? "reading notes · weekly" : x.s === "paused" ? "on the shelf" : "idea-stage"}
              </div>
              <div className="st" data-s={x.s}>{x.status}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div>
          <h2>Say hi.<br/>Quietly is fine.</h2>
          <p>
            If you want to work together, poke holes in a design, or just trade notes about
            some corner of backend / security / cloud — the door is open.
          </p>
        </div>
        <div className="chan">
          <div className="k">email</div>
          <div className="v"><a href={`mailto:${DVAGO.contact.email}`}>{DVAGO.contact.email}</a></div>
          <div className="k">github</div>
          <div className="v"><a href={`https://${DVAGO.contact.github}`}>{DVAGO.contact.github}</a></div>
          <div className="k">rss</div>
          <div className="v"><a href={`https://${DVAGO.contact.rss}`}>{DVAGO.contact.rss}</a></div>
          <div className="k">signal</div>
          <div className="v">{DVAGO.contact.signal}</div>
        </div>
      </section>

      <footer className="footer">
        <span>© dvagolab · 2025 →</span>
        <span>compiled with care · no trackers · no ads</span>
      </footer>
    </div>
  );
}

window.DirDevlog = DirDevlog;
