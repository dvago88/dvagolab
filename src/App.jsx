// App root: applies tweaks to <html> + picks a direction.

const { useState: useAppState, useEffect: useAppEffect } = React;

function App() {
  const [tweaks, setTweaks] = useAppState(window.TWEAKS || { direction: "devlog", accent: "lime", density: "comfortable" });

  useAppEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-accent", tweaks.accent);
    el.setAttribute("data-density", tweaks.density);
  }, [tweaks.accent, tweaks.density]);

  let body;
  if (tweaks.direction === "blueprint") body = <DirBlueprint />;
  else if (tweaks.direction === "lab")  body = <DirLab />;
  else                                   body = <DirDevlog />;

  return (
    <React.Fragment>
      {body}
      <Tweaks value={tweaks} onChange={setTweaks} />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
