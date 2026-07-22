import * as React from "react";

const bootSteps = [
  "Initializing bio-interface",
  "Syncing design tokens",
  "Warming neural shaders",
  "Mapping component anatomy",
  "Opening Flytrap Design System",
] as const;

function getBootStep(progress: number) {
  const index = Math.min(bootSteps.length - 1, Math.floor((progress / 100) * bootSteps.length));
  return bootSteps[index];
}

export function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const completedRef = React.useRef(false);

  const complete = React.useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setExiting(true);
    window.setTimeout(onComplete, 120);
  }, [onComplete]);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 650 : 1900;
    const startedAt = performance.now();
    let frame = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      if (completedRef.current) return;

      const raw = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      const nextProgress = Math.min(100, Math.round(eased * 100));
      setProgress(nextProgress);

      if (raw < 1) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      if (!completedRef.current) {
        completedRef.current = true;
        setExiting(true);
        exitTimer = window.setTimeout(onComplete, reduceMotion ? 80 : 520);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return <div
    aria-label="Loading Flytrap Design System"
    className={[
      "fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#05060a] text-white transition-[opacity,transform,filter] duration-500",
      exiting ? "pointer-events-none opacity-0 blur-sm scale-[1.015]" : "opacity-100",
    ].join(" ")}
  >
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(241,0,129,.28),transparent_28rem),radial-gradient(circle_at_78%_72%,rgba(184,255,53,.12),transparent_24rem),linear-gradient(180deg,#05060a,#08040d)]" />
    <div aria-hidden="true" className="absolute inset-0 opacity-[.08] bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] bg-[size:48px_48px]" />
    <div aria-hidden="true" className="flytrap-motion absolute left-[-12rem] top-[22%] h-8 w-[70vw] animate-[flytrap-neon-crawl_7s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,79,189,.86),rgba(139,92,246,.52),transparent)] bg-[length:240%_100%] blur-[12px] rotate-[-10deg]" />
    <div aria-hidden="true" className="flytrap-motion absolute bottom-[18%] right-[-16rem] h-10 w-[82vw] animate-[flytrap-neon-crawl_8.5s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(184,255,53,.32),rgba(255,79,189,.64),transparent)] bg-[length:240%_100%] blur-[14px] rotate-[9deg]" />

    <div className="relative mx-6 w-full max-w-2xl rounded-[2rem] border border-[#ff4fbd]/40 bg-[linear-gradient(145deg,rgba(15,17,28,.9),rgba(3,5,10,.76))] p-6 shadow-[0_0_80px_rgba(241,0,129,.22),inset_0_0_42px_rgba(139,92,246,.12)] backdrop-blur-2xl md:p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-[#ff4fbd]">Flytrap boot sequence</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Flytrap Design System
            <span className="block text-[#b8ff35] drop-shadow-[0_0_20px_rgba(184,255,53,.42)]">awakening</span>
          </h2>
        </div>
        <div className="grid size-20 shrink-0 place-items-center rounded-full border border-[#ff4fbd]/45 bg-[#ff4fbd]/10 shadow-[0_0_34px_rgba(241,0,129,.28)]">
          <span className="font-mono text-2xl font-bold text-white">{progress}</span>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em]">
          <span className="text-editorial-muted">{getBootStep(progress)}</span>
          <span className="text-[#ff4fbd]">{progress}%</span>
        </div>
        <div
          aria-label="Loading progress"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          className="relative h-3 overflow-hidden rounded-full border border-white/10 bg-white/[.06]"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#f10081,#ff64c1,#b8ff35)] shadow-[0_0_22px_rgba(255,79,189,.62)] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
          <div aria-hidden="true" className="flytrap-motion absolute inset-0 animate-[flytrap-scan_1.8s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)]" />
        </div>
      </div>

      <div className="mt-6 grid gap-2 font-mono text-xs uppercase tracking-[0.18em] text-editorial-muted sm:grid-cols-3">
        <span className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">Tokens: synced</span>
        <span className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">3D: deferred</span>
        <span className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">A11y: active</span>
      </div>
      <button
        className="mt-5 rounded-full border border-[#b8ff35]/45 bg-[#b8ff35]/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#d8ff91] transition-colors hover:bg-[#b8ff35]/18 focus-visible:ring-2 focus-visible:ring-[#b8ff35]"
        onClick={complete}
        type="button"
      >
        Enter now
      </button>
    </div>
  </div>;
}
