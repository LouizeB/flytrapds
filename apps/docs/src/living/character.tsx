import * as React from "react";
import standingArt from "../assets/ladyflytrap-standing-cutout.webp";
import lyingArt from "../assets/ladyflytrap-lying-cutout.webp";
import standingEcho from "../assets/flytrap-alien-standing-3d.webp";
import lyingEcho from "../assets/flytrap-alien-lying-3d.webp";

const poses = {
  standing: standingArt,
  lying: lyingArt,
} as const;

const poseEchoes = {
  standing: standingEcho,
  lying: lyingEcho,
} as const;

type CharacterPose = keyof typeof poses;

function useGazeTilt(enabled: boolean) {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let next = { x: 0, y: 0 };

    const update = () => {
      setTilt(next);
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      next = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [enabled]);

  return tilt;
}

export function CharacterLayer({
  pose,
  alt,
  className,
  float = true,
  tilt = true,
  glow = true,
  style,
}: {
  pose: CharacterPose;
  alt?: string;
  className?: string;
  float?: boolean;
  tilt?: boolean;
  glow?: boolean;
  style?: React.CSSProperties;
}) {
  const gaze = useGazeTilt(tilt);

  return <div className={["pointer-events-none select-none [perspective:1600px]", className].filter(Boolean).join(" ")} style={style}>
    {glow && <div aria-hidden="true" className="flytrap-motion flytrap-organic absolute inset-[6%] animate-[flytrap-pulse_6.8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_42%,rgba(255,79,189,.34),rgba(184,255,53,.12)_52%,transparent_74%)] blur-2xl" />}
    <div
      className={["relative size-full [transform-style:preserve-3d] transition-transform duration-500 ease-out motion-reduce:transition-none", float ? "flytrap-motion animate-[flytrap-float_7.2s_ease-in-out_infinite]" : ""].filter(Boolean).join(" ")}
      style={tilt ? { transform: `rotateX(${(gaze.y * -3.2).toFixed(2)}deg) rotateY(${(gaze.x * 4.4).toFixed(2)}deg)` } : undefined}
    >
      <img
        aria-hidden="true"
        className="absolute inset-0 size-full object-contain opacity-60 blur-xl saturate-150"
        draggable={false}
        src={poses[pose]}
        style={{ transform: "translateZ(-120px) scale(1.08)" }}
      />
      <img
        aria-hidden="true"
        className="flytrap-motion absolute inset-0 size-full animate-[flytrap-pulse_8.2s_ease-in-out_infinite] object-contain opacity-20 mix-blend-screen blur-sm saturate-150"
        draggable={false}
        src={poseEchoes[pose]}
        style={{ transform: "translate3d(2.4%, -1.5%, -80px) scale(1.04)" }}
      />
      <img
        alt={alt ?? ""}
        aria-hidden={alt ? undefined : "true"}
        className="absolute inset-0 size-full object-contain drop-shadow-[0_40px_90px_rgba(0,0,0,.72)]"
        draggable={false}
        src={poses[pose]}
        style={{ transform: "translateZ(0px)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background: `radial-gradient(circle at ${50 + gaze.x * 14}% ${34 + gaze.y * 10}%, rgba(255,255,255,.55), transparent 44%)`,
          transform: "translateZ(2px)",
        }}
      />
    </div>
  </div>;
}
