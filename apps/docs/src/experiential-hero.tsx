import * as React from "react";
import * as THREE from "three";
import { Badge, Button, FlytrapIcon, ExternalLinkIcon } from "@flytrap/ui";
import flytrapAlienHero from "./assets/flytrap-alien-hero.jpg";
import flytrapAlienStanding from "./assets/flytrap-alien-standing.jpg";

const anatomyModules = [
  { label: "Tokens", value: "230", detail: "primitive · semantic · component", side: "left", top: "18%" },
  { label: "Components", value: "39", detail: "aliases anatômicos por estado", side: "left", top: "48%" },
  { label: "AI Mood", value: "vibrant", detail: "recomendações moldadas por emoção", side: "right", top: "22%" },
  { label: "Organism", value: "DS", detail: "botões, cards e fields como tecidos", side: "right", top: "56%" },
] as const;

const companionPanels = [
  { label: "Foundations", value: "DNA", detail: "cores · type · motion", left: "7%", top: "18%" },
  { label: "Components", value: "Tissue", detail: "button · card · input", left: "9%", top: "42%" },
  { label: "AI layer", value: "Neural", detail: "mood · agent · stream", left: "68%", top: "24%" },
  { label: "Deploy", value: "Capsule", detail: "vercel · pages · docs", left: "72%", top: "55%" },
] as const;

type PointerState = {
  dragging: boolean;
  x: number;
  y: number;
};

type ScrollState = {
  progress: number;
};

function Flytrap3DFigure({
  alt,
  className,
  innerClassName,
  innerStyle,
  shadowClassName,
  style,
}: {
  alt?: string;
  className: string;
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
  shadowClassName?: string;
  style?: React.CSSProperties;
}) {
  return <div className={className} style={style}>
    <div
      className={["relative size-full [transform-style:preserve-3d] will-change-transform", innerClassName].filter(Boolean).join(" ")}
      style={innerStyle}
    >
      <img
        aria-hidden="true"
        className="absolute inset-0 size-full object-contain opacity-75 blur-2xl mix-blend-screen saturate-150"
        draggable={false}
        src={flytrapAlienHero}
        style={{ transform: "translateZ(-160px) scale(1.16)" }}
      />
      <img
        aria-hidden="true"
        className="absolute inset-0 size-full object-contain opacity-90 mix-blend-screen"
        draggable={false}
        src={flytrapAlienHero}
        style={{ transform: "translateZ(-60px) scale(1.06)" }}
      />
      <img
        alt={alt ?? ""}
        aria-hidden={alt ? undefined : "true"}
        className="flytrap-pose-a absolute inset-0 size-full object-contain"
        draggable={false}
        src={flytrapAlienHero}
        style={{ transform: "translateZ(0px)" }}
      />
      <img
        aria-hidden="true"
        className="flytrap-pose-b absolute inset-0 size-full object-contain"
        draggable={false}
        src={flytrapAlienStanding}
        style={{ transform: "translateZ(0px)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          background: "radial-gradient(circle at calc(50% + var(--flytrap-eye-x, 0px)) calc(38% + var(--flytrap-eye-y, 0px)), rgba(255,255,255,.5), transparent 46%)",
          transform: "translateZ(3px)",
        }}
      />
    </div>
    {shadowClassName ? <div aria-hidden="true" className={shadowClassName} /> : null}
  </div>;
}

function disposeObject(object: THREE.Object3D) {
  if ("geometry" in object && object.geometry instanceof THREE.BufferGeometry) {
    object.geometry.dispose();
  }

  if ("material" in object) {
    const material = object.material;
    if (Array.isArray(material)) {
      material.forEach(item => item.dispose());
    } else if (material instanceof THREE.Material) {
      material.dispose();
    }
  }
}

function useFlytrapScene(canvasRef: React.RefObject<HTMLCanvasElement | null>, pointerRef: React.RefObject<PointerState>) {
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const lab = new THREE.Group();
    scene.add(lab);

    const magenta = new THREE.Color("#ff4fbd");
    const acid = new THREE.Color("#b8ff35");
    const cyan = new THREE.Color("#7cecff");

    const ambient = new THREE.AmbientLight("#ffffff", 0.8);
    scene.add(ambient);

    const pointLight = new THREE.PointLight("#ff4fbd", 16, 18);
    pointLight.position.set(-3.6, 2.2, 4);
    scene.add(pointLight);

    const orbGeometry = new THREE.SphereGeometry(0.16, 32, 32);
    const panelGeometry = new THREE.BoxGeometry(1.34, 0.86, 0.035);
    const edgeGeometry = new THREE.EdgesGeometry(panelGeometry);

    const orbs = Array.from({ length: 18 }, (_, index) => {
      const color = index % 3 === 0 ? magenta : index % 3 === 1 ? acid : cyan;
      const material = new THREE.MeshBasicMaterial({
        color,
        opacity: 0.18 + (index % 4) * 0.055,
        transparent: true,
      });
      const mesh = new THREE.Mesh(orbGeometry, material);
      const angle = (index / 18) * Math.PI * 2;
      const radius = 2.2 + (index % 5) * 0.42;
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.23) * 1.85, -1.2 + (index % 6) * 0.42);
      mesh.userData.speed = 0.18 + (index % 7) * 0.035;
      mesh.userData.offset = index * 0.7;
      lab.add(mesh);
      return mesh;
    });

    const panels = Array.from({ length: 7 }, (_, index) => {
      const material = new THREE.LineBasicMaterial({
        color: index % 2 === 0 ? "#ff4fbd" : "#b8ff35",
        opacity: 0.42,
        transparent: true,
      });
      const panel = new THREE.LineSegments(edgeGeometry, material);
      panel.position.set(index % 2 === 0 ? -3.25 : 3.25, 2.2 - index * 0.72, -0.4 - index * 0.18);
      panel.rotation.set(0.12, index % 2 === 0 ? 0.36 : -0.36, 0.04);
      panel.userData.speed = 0.16 + index * 0.025;
      panel.userData.offset = index;
      lab.add(panel);
      return panel;
    });

    const tendrils = Array.from({ length: 6 }, (_, index) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(index % 2 === 0 ? -4.2 : 4.2, -2.9 + index * 0.55, -1.1),
        new THREE.Vector3(index % 2 === 0 ? -2.4 : 2.4, -1.2 + index * 0.24, -0.7),
        new THREE.Vector3(index % 2 === 0 ? -0.8 : 0.8, 0.25 + index * 0.18, -0.25),
        new THREE.Vector3(index % 2 === 0 ? 1.7 : -1.7, 1.1 - index * 0.15, -0.55),
      ]);
      const geometry = new THREE.TubeGeometry(curve, 64, 0.012, 8, false);
      const material = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? "#ff4fbd" : "#b8ff35",
        opacity: 0.22,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.speed = 0.12 + index * 0.02;
      mesh.userData.offset = index * 0.8;
      lab.add(mesh);
      return mesh;
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const pointer = pointerRef.current;
      const intensity = pointer?.dragging ? 1.7 : 1;

      lab.rotation.y += (((pointer?.x ?? 0) * 0.24 * intensity) - lab.rotation.y) * 0.055;
      lab.rotation.x += (((pointer?.y ?? 0) * -0.14 * intensity) - lab.rotation.x) * 0.055;

      if (!reduceMotion) {
        orbs.forEach((orb, index) => {
          orb.position.y += Math.sin(elapsed * orb.userData.speed + orb.userData.offset) * 0.0025;
          orb.rotation.y = elapsed * (0.2 + index * 0.01);
        });

        panels.forEach(panel => {
          panel.rotation.z = Math.sin(elapsed * panel.userData.speed + panel.userData.offset) * 0.045;
        });

        tendrils.forEach(tendril => {
          tendril.rotation.z = Math.sin(elapsed * tendril.userData.speed + tendril.userData.offset) * 0.035;
        });
      }

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scene.traverse(disposeObject);
      orbGeometry.dispose();
      panelGeometry.dispose();
      edgeGeometry.dispose();
      renderer.dispose();
    };
  }, [canvasRef, pointerRef]);
}

function usePageAtmosphere(canvasRef: React.RefObject<HTMLCanvasElement | null>, scrollRef: React.RefObject<ScrollState>) {
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
    camera.position.set(0, 0, 9.5);

    const organism = new THREE.Group();
    scene.add(organism);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.075, 1);
    const nodeMaterials = [
      new THREE.MeshBasicMaterial({ color: "#ff4fbd", opacity: 0.3, transparent: true }),
      new THREE.MeshBasicMaterial({ color: "#b8ff35", opacity: 0.24, transparent: true }),
      new THREE.MeshBasicMaterial({ color: "#7cecff", opacity: 0.2, transparent: true }),
    ];

    const nodes = Array.from({ length: 72 }, (_, index) => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterials[index % nodeMaterials.length]);
      const column = index % 12;
      const row = Math.floor(index / 12);
      const x = (column - 5.5) * 0.78 + Math.sin(row) * 0.25;
      const y = 3.4 - row * 1.15;
      const z = -2.8 + (index % 6) * 0.42;
      mesh.position.set(x, y, z);
      mesh.userData.offset = index * 0.37;
      mesh.userData.baseY = y;
      organism.add(mesh);
      return mesh;
    });

    const lineMaterial = new THREE.LineBasicMaterial({ color: "#ffffff", opacity: 0.08, transparent: true });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    nodes.forEach((node, index) => {
      const next = nodes[index + 1];
      const below = nodes[index + 12];
      [next, below].forEach(target => {
        if (!target) return;
        linePositions.push(node.position.x, node.position.y, node.position.z);
        linePositions.push(target.position.x, target.position.y, target.position.z);
      });
    });
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const network = new THREE.LineSegments(lineGeometry, lineMaterial);
    organism.add(network);

    const ringGeometry = new THREE.TorusGeometry(1.2, 0.006, 8, 96);
    const rings = Array.from({ length: 5 }, (_, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? "#ff4fbd" : "#b8ff35",
        opacity: 0.12,
        transparent: true,
      });
      const ring = new THREE.Mesh(ringGeometry, material);
      ring.position.set(index % 2 === 0 ? -3.6 : 3.6, 2.6 - index * 1.45, -1.6);
      ring.scale.setScalar(0.8 + index * 0.18);
      ring.rotation.set(1.15, 0.3 + index * 0.2, 0.4);
      ring.userData.speed = 0.06 + index * 0.012;
      organism.add(ring);
      return ring;
    });

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let frame = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const progress = scrollRef.current?.progress ?? 0;
      const scrollY = (progress - 0.5) * 4;

      organism.position.y += ((scrollY * 1.1) - organism.position.y) * 0.035;
      organism.rotation.y += ((progress - 0.5) * 0.72 - organism.rotation.y) * 0.025;
      organism.rotation.x += (Math.sin(progress * Math.PI) * 0.13 - organism.rotation.x) * 0.025;

      if (!reduceMotion) {
        nodes.forEach(node => {
          node.position.y = node.userData.baseY + Math.sin(elapsed * 0.5 + node.userData.offset) * 0.08;
          node.rotation.x = elapsed * 0.15;
          node.rotation.y = elapsed * 0.18;
        });

        rings.forEach(ring => {
          ring.rotation.z += ring.userData.speed * 0.01;
          ring.rotation.x += ring.userData.speed * 0.006;
        });
      }

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      scene.traverse(disposeObject);
      nodeGeometry.dispose();
      nodeMaterials.forEach(material => material.dispose());
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeometry.dispose();
      renderer.dispose();
    };
  }, [canvasRef, scrollRef]);
}

export function PageAtmosphere() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const scrollRef = React.useRef<ScrollState>({ progress: 0 });
  const [progress, setProgress] = React.useState(0);
  const [gaze, setGaze] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      scrollRef.current.progress = nextProgress;
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

  React.useEffect(() => {
    let frame = 0;
    let nextGaze = { x: 0, y: 0 };

    const update = () => {
      setGaze(nextGaze);
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const x = ((event.clientX / window.innerWidth) * 2 - 1) * 24;
      const y = ((event.clientY / window.innerHeight) * 2 - 1) * 18;
      nextGaze = { x, y };
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  usePageAtmosphere(canvasRef, scrollRef);

  const phase = progress < 0.24
    ? "awakening"
    : progress < 0.48
      ? "dna"
      : progress < 0.74
        ? "tissue"
        : "nervous system";
  const characterOpacity = Math.min(0.74, Math.max(0.4, 0.5 + Math.sin(progress * Math.PI) * 0.18));
  const characterStyle = {
    "--flytrap-character-rotate": `${progress * -26}deg`,
    "--flytrap-character-scale": `${1.2 + progress * 0.24}`,
    "--flytrap-character-x": `${2 - progress * 24}vw`,
    "--flytrap-character-y": `${-48 + Math.sin(progress * Math.PI * 3) * 3}%`,
    "--flytrap-gaze-x": `${gaze.x * 1.15}px`,
    "--flytrap-gaze-y": `${gaze.y * 1.05}px`,
    "--flytrap-eye-x": `${gaze.x * 1.4}px`,
    "--flytrap-eye-y": `${gaze.y * 1.2}px`,
    filter: `hue-rotate(${progress * 42}deg) saturate(${1.34 + progress * 0.62}) contrast(${1.08 + progress * 0.1}) brightness(${1.03 + Math.sin(progress * Math.PI) * 0.08}) blur(${progress > 0.9 ? 0.45 : 0}px)`,
    opacity: characterOpacity,
  } as React.CSSProperties;

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05060a]">
    <canvas className="absolute inset-0 size-full opacity-70" ref={canvasRef} />
    <Flytrap3DFigure
      className="flytrap-motion absolute right-[-6vw] top-1/2 h-[min(74vh,720px)] w-[min(74vh,720px)] origin-center animate-[flytrap-breathe_6.4s_ease-in-out_infinite] [perspective:2200px] transition-[filter,opacity] duration-700 ease-out sm:h-[min(104vh,980px)] sm:w-[min(104vh,980px)] md:right-[-9vw] md:h-[min(146vh,1420px)] md:w-[min(146vh,1420px)] lg:right-[-4vw] lg:h-[min(178vh,1760px)] lg:w-[min(178vh,1760px)]"
      innerClassName="transition-transform duration-500 ease-out motion-reduce:transition-none"
      innerStyle={{ transform: `rotateX(${(gaze.y * -0.9 - progress * 7).toFixed(2)}deg) rotateY(${(gaze.x * 1.1 - 12 + progress * 24).toFixed(2)}deg)` }}
      style={characterStyle}
    />
    <div className="flytrap-motion flytrap-organic absolute right-[-18rem] top-1/2 hidden size-[64rem] -translate-y-1/2 animate-[flytrap-pulse_5.8s_ease-in-out_infinite] border border-[#ff4fbd]/15 bg-[#ff4fbd]/7 blur-[1px] lg:block" style={{ rotate: `${progress * 24}deg`, scale: `${1 + progress * 0.18}` }} />
    <div className="flytrap-motion flytrap-organic absolute right-[-4vw] top-[9%] hidden h-[56vh] w-[56vh] animate-[flytrap-pulse_7.2s_ease-in-out_infinite] border border-[#b8ff35]/15 bg-[conic-gradient(from_120deg,transparent,rgba(184,255,53,.16),transparent,rgba(255,79,189,.18),transparent)] blur-[.5px] lg:block" style={{ rotate: `${progress * -36}deg`, animationDelay: "-4s" }} />
    <div className="flytrap-motion absolute right-[6vw] top-[30%] hidden size-36 animate-[flytrap-pulse_4.8s_ease-in-out_infinite] rounded-full bg-[#b8ff35]/25 blur-2xl md:block" style={{ translate: `${progress * -30 + gaze.x * 0.22}px ${Math.sin(progress * Math.PI * 2) * 28 + gaze.y * 0.18}px` }} />
    <div className="flytrap-motion absolute right-[24vw] top-[62%] hidden size-40 animate-[flytrap-pulse_5.6s_ease-in-out_infinite] rounded-full bg-[#ff4fbd]/25 blur-2xl md:block" style={{ translate: `${progress * 32 + gaze.x * -0.18}px ${Math.cos(progress * Math.PI * 2) * 24 + gaze.y * -0.16}px` }} />
    <div className="flytrap-motion absolute right-[2vw] top-[12%] hidden h-[82vh] w-px animate-[flytrap-scan_4.6s_linear_infinite] bg-gradient-to-b from-transparent via-[#b8ff35]/80 to-transparent md:block" />
    {companionPanels.map((panel, index) => <div
      className="flytrap-motion absolute hidden w-52 animate-[flytrap-panel-float_6.5s_ease-in-out_infinite] rounded-2xl border border-white/12 bg-black/30 p-3 text-white shadow-2xl shadow-black/30 backdrop-blur-xl lg:block"
      key={panel.label}
      style={{
        "--flytrap-panel-x": `${(index % 2 === 0 ? 1 : -1) * (12 + progress * 18)}px`,
        "--flytrap-panel-y": `${Math.sin(progress * Math.PI * 2 + index) * 18 + gaze.y * 0.08}px`,
        animationDelay: `${index * -0.9}s`,
        left: panel.left,
        opacity: Math.max(0.18, Math.min(0.7, characterOpacity + (index % 2 ? -0.08 : 0.04))),
        top: panel.top,
      } as React.CSSProperties}
    >
      <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <img className="size-full object-cover opacity-55 saturate-150" draggable={false} src={flytrapAlienHero} />
      </div>
      <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.24em] text-white/42">{panel.label}</p>
      <p className="mt-1 font-display text-xl text-white/86">{panel.value}</p>
      <p className="text-xs text-white/48">{panel.detail}</p>
    </div>)}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,79,189,.2),transparent_28rem),radial-gradient(circle_at_78%_52%,rgba(184,255,53,.12),transparent_24rem),linear-gradient(180deg,rgba(5,6,10,.16),rgba(5,6,10,.72))]" />
    <div className="absolute bottom-6 left-6 hidden rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white/60 shadow-2xl shadow-black/30 backdrop-blur-xl lg:block">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[#b8ff35]/80">living page state</p>
      <p className="mt-1 font-display text-lg text-white/80">{phase}</p>
      <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-[#ff4fbd] to-[#b8ff35]" style={{ width: `${Math.max(8, progress * 100)}%` }} />
      </div>
    </div>
    <div className="absolute right-5 top-1/2 hidden h-[38vh] w-px -translate-y-1/2 overflow-hidden rounded-full bg-white/10 lg:block">
      <div className="w-full rounded-full bg-gradient-to-b from-[#ff4fbd] to-[#b8ff35]" style={{ height: `${Math.max(10, progress * 100)}%` }} />
    </div>
  </div>;
}

export function ExperientialHero() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pointerRef = React.useRef<PointerState>({ dragging: false, x: 0, y: 0 });
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);

  useFlytrapScene(canvasRef, pointerRef);

  const updatePointer = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerRef.current.x = Math.max(-1, Math.min(1, x));
    pointerRef.current.y = Math.max(-1, Math.min(1, y));
    setTilt({ x: pointerRef.current.x, y: pointerRef.current.y });
  };

  const startDrag = (event: React.PointerEvent<HTMLElement>) => {
    pointerRef.current.dragging = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePointer(event);
  };

  const stopDrag = (event: React.PointerEvent<HTMLElement>) => {
    pointerRef.current.dragging = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const heroStyle = {
    "--flytrap-tilt-x": `${tilt.y * -5}deg`,
    "--flytrap-tilt-y": `${tilt.x * 8}deg`,
    "--flytrap-eye-x": `${tilt.x * 8}px`,
    "--flytrap-eye-y": `${tilt.y * 5}px`,
  } as React.CSSProperties;

  return <section
    aria-labelledby="flytrap-lab-title"
    className="relative isolate min-h-[calc(100vh-2rem)] overflow-hidden border-b bg-[#05060a] px-6 py-16 text-white md:px-12 md:py-20"
    id="overview"
    onPointerCancel={stopDrag}
    onPointerDown={startDrag}
    onPointerLeave={event => {
      pointerRef.current.dragging = false;
      setIsDragging(false);
      updatePointer(event);
    }}
    onPointerMove={updatePointer}
    onPointerUp={stopDrag}
    style={heroStyle}
  >
    <canvas aria-hidden="true" className="absolute inset-0 size-full opacity-80" ref={canvasRef} />
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,79,189,.24),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(184,255,53,.18),transparent_28%),linear-gradient(180deg,rgba(5,6,10,.08),#05060a_88%)]" />
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05060a] to-transparent" />

    <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-10 lg:grid-cols-[minmax(280px,0.78fr)_minmax(460px,1.22fr)]">
      <div className="max-w-xl">
        <div className="flex flex-wrap gap-2">
          <Badge className="border-white/20 bg-white/10 text-white backdrop-blur" variant="outline">Three.js lab</Badge>
          <Badge className="border-[#b8ff35]/35 bg-[#b8ff35]/15 text-[#d9ff92]" variant="outline">Mood-aware UI</Badge>
          <Badge className="border-[#ff4fbd]/35 bg-[#ff4fbd]/15 text-[#ffb8e3]" variant="outline">Flytrap organism</Badge>
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.32em] text-[#b8ff35]">Design System como organismo vivo</p>
        <h1 id="flytrap-lab-title" className="mt-4 font-display text-5xl font-bold tracking-tight text-white md:text-7xl">
          Flytrap não é catálogo.
          <span className="block text-[#ff4fbd]">É laboratório.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-white/72">
          Uma experiência artística para explorar tokens, componentes e padrões de IA como anatomia: cada botão, card e estado vira tecido vivo de um sistema botânico, lúdico e tecnológico.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="#components">Explorar anatomia</a></Button>
          <Button asChild className="border-white/20 bg-white/5 text-white hover:bg-white/10" size="lg" variant="outline">
            <a href="https://github.com/LouizeB/flytrapds">Ver código <FlytrapIcon icon={ExternalLinkIcon} /></a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-white/50">
          {isDragging ? "Arrastando organismo · observação ativa" : "Arraste ou mova o cursor para inspecionar o organismo"}
        </p>
        <a
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#b8ff35] underline-offset-4 hover:underline"
          href="https://github.com/mrdoob/three.js/"
          rel="noreferrer"
          target="_blank"
        >
          Powered by mrdoob/three.js <FlytrapIcon icon={ExternalLinkIcon} size="sm" />
        </a>
      </div>

      <div className="relative min-h-[700px] select-none lg:min-h-[840px]">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[52%] h-[min(78vw,780px)] w-[min(76vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4fbd]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="flytrap-organic absolute left-1/2 top-1/2 h-[min(78vw,760px)] w-[min(70vw,680px)] -translate-x-1/2 -translate-y-1/2 border border-white/10 bg-white/[.035] shadow-[0_0_90px_rgba(255,79,189,.22)] backdrop-blur-[2px]"
        />
        <Flytrap3DFigure
          alt="Alienígena Flytrap botânica e tecnológica segurando uma interface holográfica do Design System."
          className="absolute left-1/2 top-[52%] z-10 h-[min(94vw,920px)] max-h-[90vh] w-[min(94vw,920px)] -translate-x-1/2 -translate-y-1/2 [perspective:1800px]"
          innerClassName="transition-transform duration-300 ease-out motion-reduce:transition-none"
          innerStyle={{ transform: "rotateX(var(--flytrap-tilt-x)) rotateY(var(--flytrap-tilt-y)) scale(1.04)" }}
          shadowClassName="absolute left-1/2 bottom-[6%] z-0 h-14 w-[58%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-2xl transition-transform duration-300 ease-out motion-reduce:transition-none"
        />
        <span aria-hidden="true" className="absolute left-[49.8%] top-[33.2%] z-20 size-8 rounded-full bg-[#ff4fbd]/35 blur-md transition-transform duration-200 motion-reduce:transition-none" style={{ transform: "translate(var(--flytrap-eye-x), var(--flytrap-eye-y))" }} />
        <span aria-hidden="true" className="absolute left-[54.8%] top-[33.4%] z-20 size-8 rounded-full bg-[#b8ff35]/25 blur-md transition-transform duration-200 motion-reduce:transition-none" style={{ transform: "translate(var(--flytrap-eye-x), var(--flytrap-eye-y))" }} />

        {anatomyModules.map(module => <article
          className={[
            "absolute z-30 hidden w-56 rounded-2xl border border-white/15 bg-black/45 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-xl lg:block",
            module.side === "left" ? "left-0" : "right-0",
          ].join(" ")}
          key={module.label}
          style={{ top: module.top }}
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white/48">{module.label}</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">{module.value}</p>
          <p className="mt-1 text-sm leading-5 text-white/62">{module.detail}</p>
          <div className="mt-4 h-px bg-gradient-to-r from-[#ff4fbd] via-white/40 to-[#b8ff35]" />
        </article>)}
      </div>
    </div>
  </section>;
}

export function OrganismAnatomy() {
  return <section className="relative overflow-hidden border-b border-white/10 bg-[#070910] px-6 py-16 text-white md:px-12" id="organism">
    <div aria-hidden="true" className="absolute left-1/2 top-0 size-[38rem] -translate-x-1/2 rounded-full bg-[#ff4fbd]/10 blur-3xl" />
    <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b8ff35]">Anatomia navegável</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          A página inteira vira corpo do Design System.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
          O catálogo deixa de ser uma lista neutra: foundations são DNA, componentes são órgãos de interface, padrões de IA são sistema nervoso e publicação vira cápsula de observação.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["DNA", "Tokens", "Primitives, semantic e component aliases mantendo o organismo consistente."],
          ["Tecido", "Components", "Buttons, cards, fields e feedback como partes reutilizáveis do corpo."],
          ["Sistema nervoso", "AI layer", "Agents, tools, aprovação, streaming e humor como sinais vivos."],
          ["Cápsula", "Deploy", "Vercel ou GitHub Pages como vitrine pública do laboratório Flytrap."],
        ].map(([part, title, description]) => <article className="rounded-3xl border border-white/12 bg-white/[.055] p-5 shadow-2xl shadow-black/20 backdrop-blur" key={part}>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#ff9bdd]">{part}</p>
          <h3 className="mt-3 font-display text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/62">{description}</p>
          <div className="mt-5 h-px bg-gradient-to-r from-[#ff4fbd] via-white/30 to-[#b8ff35]" />
        </article>)}
      </div>
    </div>
  </section>;
}
