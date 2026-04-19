// Tweaks panel: direction, accent, density. Host-integrated.

const { useState: useTwState, useEffect: useTwEffect } = React;

function Tweaks({ value, onChange }) {
  const [open, setOpen] = useTwState(true);
  const [hostOn, setHostOn] = useTwState(false);

  useTwEffect(() => {
    const handler = (e) => {
      const t = e?.data?.type;
      if (t === "__activate_edit_mode") setHostOn(true);
      if (t === "__deactivate_edit_mode") setHostOn(false);
    };
    window.addEventListener("message", handler);
    // Then announce availability
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  if (!hostOn) return null;
  if (!open) {
    return (
      <button
        className="tweaks"
        style={{width:"auto", padding:"8px 12px"}}
        onClick={() => setOpen(true)}
      >Tweaks ▴</button>
    );
  }

  const set = (k, v) => {
    const next = { ...value, [k]: v };
    onChange(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  const Seg = ({ k, opts }) => (
    <div className="seg">
      {opts.map(([id, label]) => (
        <button
          key={id}
          data-on={value[k] === id}
          onClick={() => set(k, id)}
        >{label}</button>
      ))}
    </div>
  );

  const accents = [
    ["lime",   "#c8f264"],
    ["amber",  "#f3c969"],
    ["cyan",   "#7dd8d1"],
    ["coral",  "#f2866b"],
    ["violet", "#b5a3f5"],
  ];

  return (
    <div className="tweaks">
      <h4>
        <span>Tweaks</span>
        <button className="close" onClick={() => setOpen(false)}>hide ▾</button>
      </h4>

      <div className="row">
        <label>Direction</label>
        <Seg k="direction" opts={[
          ["devlog", "devlog"],
          ["blueprint", "blueprint"],
          ["lab", "/lab"],
        ]} />
      </div>

      <div className="row">
        <label>Accent</label>
        <div className="swatches">
          {accents.map(([id, col]) => (
            <button
              key={id}
              title={id}
              data-on={value.accent === id}
              style={{ background: col }}
              onClick={() => set("accent", id)}
            />
          ))}
        </div>
      </div>

      <div className="row">
        <label>Density</label>
        <Seg k="density" opts={[
          ["compact", "compact"],
          ["comfortable", "comfort"],
          ["spacious", "spacious"],
        ]} />
      </div>

      <div style={{fontSize:10, color:"var(--fg-muted)", marginTop: 4}}>
        changes persist to the file
      </div>
    </div>
  );
}

window.Tweaks = Tweaks;
