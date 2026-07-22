import * as React from "react";
import plate from "../assets/flytrap-plate.webp";

const LivingScene3D = React.lazy(async () => {
  const module = await import("./living-scene-3d");
  return { default: module.LivingScene3D };
});

export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setProgress(nextProgress);
      frame = 0;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return { progress };
}

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function useDeferredSceneMount(enabled: boolean) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) {
      setReady(false);
      return undefined;
    }

    let idleHandle = 0;
    let timeoutHandle: ReturnType<typeof globalThis.setTimeout> | undefined;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return undefined;

    const mountWhenIdle = () => {
      cleanupSignals();
      const mount = () => setReady(true);
      if ("requestIdleCallback" in window) idleHandle = window.requestIdleCallback(mount, { timeout: 2400 });
      else timeoutHandle = globalThis.setTimeout(mount, 900);
    };
    const cleanupSignals = () => {
      window.removeEventListener("pointerdown", mountWhenIdle);
      window.removeEventListener("keydown", mountWhenIdle);
      window.removeEventListener("scroll", mountWhenIdle);
    };

    window.addEventListener("pointerdown", mountWhenIdle, { once: true, passive: true });
    window.addEventListener("keydown", mountWhenIdle, { once: true });
    window.addEventListener("scroll", mountWhenIdle, { once: true, passive: true });

    return () => {
      cleanupSignals();
      if (idleHandle && "cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle) globalThis.clearTimeout(timeoutHandle);
    };
  }, [enabled]);

  return ready;
}

export function OrganicBackground({ enable3D = true, light = false }: { enable3D?: boolean; light?: boolean }) {
  const { progress } = useScrollProgress();
  const reducedMotion = useReducedMotionPreference();
  const shouldPrepare3D = enable3D && !light && !reducedMotion;
  const shouldMount3D = useDeferredSceneMount(shouldPrepare3D);

  return <div aria-hidden="true" className={["pointer-events-none fixed inset-0 z-0 overflow-hidden flytrap-reference-density", light ? "bg-[#fff7fb] opacity-80" : "bg-[#05060a]"].join(" ")}>
    {shouldMount3D && <React.Suspense fallback={null}>
      <LivingScene3D />
    </React.Suspense>}
    <div className="flytrap-motion absolute left-[-8rem] top-[8%] h-8 w-[70vw] animate-[flytrap-neon-crawl_9s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,79,189,.72),rgba(139,92,246,.58),transparent)] bg-[length:240%_100%] blur-[10px] rotate-[-11deg]" />
    <div className="flytrap-motion absolute right-[-9rem] top-[33%] h-10 w-[68vw] animate-[flytrap-neon-crawl_10s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(184,255,53,.36),rgba(255,79,189,.64),transparent)] bg-[length:240%_100%] blur-[12px] rotate-[18deg]" />
    <div className="flytrap-motion absolute bottom-[10%] left-[-6rem] h-12 w-[78vw] animate-[flytrap-neon-crawl_8s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,79,189,.7),rgba(124,236,255,.26),transparent)] bg-[length:240%_100%] blur-[14px] rotate-[6deg]" />
    <div className="flytrap-motion flytrap-organic absolute left-[-14rem] top-[16%] size-[48rem] animate-[flytrap-pulse_7.4s_ease-in-out_infinite] border border-[#ff4fbd]/18 bg-[#ff4fbd]/8 blur-[1px]" style={{ rotate: `${progress * 30}deg` }} />
    <div className="flytrap-motion flytrap-organic absolute right-[-12rem] top-[52%] size-[44rem] animate-[flytrap-pulse_6.2s_ease-in-out_infinite] border border-[#b8ff35]/18 bg-[conic-gradient(from_120deg,transparent,rgba(184,255,53,.16),transparent,rgba(255,79,189,.2),transparent)] blur-[.5px]" style={{ rotate: `${progress * -42}deg`, animationDelay: "-3s" }} />
    <div
      className="flytrap-motion absolute left-[-12vw] top-[39%] h-5 w-[46vw] animate-[flytrap-neon-crawl_7.6s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(184,255,53,.18),rgba(255,79,189,.34),rgba(124,236,255,.14),transparent)] bg-[length:240%_100%] blur-[18px] rotate-[22deg]"
      style={{ translate: `0px ${Math.sin(progress * Math.PI * 2) * 22}px` }}
    />
    <div
      className="flytrap-motion absolute right-[-14vw] top-[73%] h-6 w-[54vw] animate-[flytrap-neon-crawl_8.8s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,79,189,.38),rgba(139,92,246,.26),rgba(184,255,53,.12),transparent)] bg-[length:240%_100%] blur-[20px] rotate-[-14deg]"
      style={{ translate: `0px ${Math.cos(progress * Math.PI * 2) * 20}px` }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,10,.08),rgba(7,5,12,.58))]" />
  </div>;
}

export function AtmosphereLayer() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-x-0 top-0 flex flex-col">
      {[0, 1, 2, 3].map(index => <img
        alt=""
        aria-hidden="true"
        className={["w-full", index % 2 === 1 ? "-scale-y-100" : ""].join(" ")}
        draggable={false}
        key={index}
        src={plate}
      />)}
    </div>
    <div className="absolute inset-0 bg-[rgba(5,6,10,.2)]" />
    <div className="absolute inset-0 opacity-[.07] bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div
      className="flytrap-motion absolute inset-0 animate-[flytrap-noise-drift_7s_steps(2,end)_infinite] opacity-[.1] mix-blend-overlay"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")` }}
    />
  </div>;
}

export function TechFrame() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-2 z-50 hidden rounded-2xl border border-white/8 md:block">
    <svg className="absolute left-2 top-2 w-10 text-white/25" viewBox="0 0 40 40">
      <circle cx="12" cy="12" fill="none" r="7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" fill="#ff4fbd" fillOpacity="0.7" r="2.4" />
      <path d="M19 12h14M12 19v14" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
    <span className="absolute right-4 top-0 h-px w-24 bg-gradient-to-r from-transparent via-[#ff4fbd]/70 to-transparent" />
    <span className="absolute bottom-0 left-8 h-px w-32 bg-gradient-to-r from-transparent via-[#8b5cf6]/60 to-transparent" />
  </div>;
}
