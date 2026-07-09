import * as React from "react";
import * as THREE from "three";

type ScrollState = {
  progress: number;
};

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

function useOrganicScene(canvasRef: React.RefObject<HTMLCanvasElement | null>, scrollRef: React.RefObject<ScrollState>) {
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

export function useScrollProgress() {
  const scrollRef = React.useRef<ScrollState>({ progress: 0 });
  const [progress, setProgress] = React.useState(0);

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

  return { scrollRef, progress };
}

export function OrganicBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { scrollRef, progress } = useScrollProgress();

  useOrganicScene(canvasRef, scrollRef);

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05060a]">
    <canvas className="absolute inset-0 size-full opacity-60" ref={canvasRef} />
    <div className="flytrap-motion flytrap-organic absolute left-[-14rem] top-[16%] size-[42rem] animate-[flytrap-pulse_7.4s_ease-in-out_infinite] border border-[#ff4fbd]/12 bg-[#ff4fbd]/6 blur-[1px]" style={{ rotate: `${progress * 30}deg` }} />
    <div className="flytrap-motion flytrap-organic absolute right-[-12rem] top-[52%] size-[38rem] animate-[flytrap-pulse_6.2s_ease-in-out_infinite] border border-[#b8ff35]/12 bg-[conic-gradient(from_120deg,transparent,rgba(184,255,53,.12),transparent,rgba(255,79,189,.14),transparent)] blur-[.5px]" style={{ rotate: `${progress * -42}deg`, animationDelay: "-3s" }} />
    <div className="flytrap-motion absolute left-[8vw] top-[38%] size-40 animate-[flytrap-pulse_5.2s_ease-in-out_infinite] rounded-full bg-[#b8ff35]/18 blur-3xl" style={{ translate: `0px ${Math.sin(progress * Math.PI * 2) * 30}px` }} />
    <div className="flytrap-motion absolute right-[12vw] top-[72%] size-48 animate-[flytrap-pulse_6.6s_ease-in-out_infinite] rounded-full bg-[#ff4fbd]/18 blur-3xl" style={{ translate: `0px ${Math.cos(progress * Math.PI * 2) * 26}px` }} />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,10,.2),rgba(7,5,12,.6))]" />
  </div>;
}

export function AtmosphereLayer() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60rem_34rem_at_74%_3%,rgba(255,79,189,.15),transparent),radial-gradient(ellipse_40rem_28rem_at_0%_16%,rgba(139,92,246,.1),transparent),radial-gradient(ellipse_36rem_30rem_at_100%_34%,rgba(139,92,246,.09),transparent),radial-gradient(ellipse_44rem_30rem_at_8%_56%,rgba(241,0,129,.06),transparent),radial-gradient(ellipse_40rem_28rem_at_96%_72%,rgba(139,92,246,.08),transparent),radial-gradient(ellipse_50rem_32rem_at_88%_98%,rgba(139,92,246,.11),transparent)]" />
    <div className="absolute inset-0 opacity-[.04] bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:72px_72px]" />
    <div
      className="absolute inset-0 opacity-[.05] mix-blend-overlay"
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
