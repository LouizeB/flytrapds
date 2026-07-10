import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, useTexture } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import organismBr from "../assets/flytrap-organism-br.webp";
import spriteWideA from "../assets/flytrap-sprite-wide-a.webp";
import spriteWideB from "../assets/flytrap-sprite-wide-b.webp";

type LivingSceneSignal = {
  pointerX: number;
  pointerY: number;
  progress: number;
  reduceMotion: boolean;
};

type LivingSceneRef = React.MutableRefObject<LivingSceneSignal>;
type SceneQuality = "rich" | "low";

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}

function getSceneQuality(): SceneQuality {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCores = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  const compactViewport = window.matchMedia("(max-width: 900px)").matches;

  return lowMemory || lowCores || compactViewport ? "low" : "rich";
}

function useSceneQuality() {
  const [quality, setQuality] = React.useState<SceneQuality>("rich");

  React.useEffect(() => {
    const update = () => setQuality(getSceneQuality());

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return quality;
}

function useLivingSceneSignal() {
  const signalRef = React.useRef<LivingSceneSignal>({
    pointerX: 0,
    pointerY: 0,
    progress: 0,
    reduceMotion: false,
  });

  React.useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      signalRef.current.progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      frame = 0;
    };

    const requestScrollUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScroll);
    };

    const updatePointer = (event: PointerEvent) => {
      signalRef.current.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      signalRef.current.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const updateMotionPreference = () => {
      signalRef.current.reduceMotion = reduceMotionQuery.matches;
    };

    updateScroll();
    updateMotionPreference();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    reduceMotionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      window.removeEventListener("pointermove", updatePointer);
      reduceMotionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return signalRef;
}

function Rig({ signalRef }: { signalRef: LivingSceneRef }) {
  useFrame(({ camera }, delta) => {
    const signal = signalRef.current;
    const progress = signal.progress;
    const targetX = signal.pointerX * 0.55 + Math.sin(progress * Math.PI * 2) * 0.22;
    const targetY = 0.28 - progress * 1.55 + signal.pointerY * -0.28;
    const targetZ = 8.3 - Math.sin(progress * Math.PI) * 1.25;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.2, delta);
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, signal.pointerX * -0.018, 2.4, delta);
    camera.lookAt(0, -progress * 1.6, 0);
  });

  return null;
}

function BioField({ signalRef, quality }: { signalRef: LivingSceneRef; quality: SceneQuality }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const nodeCount = quality === "low" ? 38 : 64;
  const nodes = React.useMemo(() => Array.from({ length: nodeCount }, (_, index) => {
    const ring = index % 16;
    const layer = Math.floor(index / 16);
    const angle = (ring / 16) * Math.PI * 2 + layer * 0.32;
    const radius = 1.4 + layer * 0.72 + Math.sin(index * 1.7) * 0.16;

    return {
      color: index % 3 === 0 ? "#ff4fbd" : index % 3 === 1 ? "#b8ff35" : "#7cecff",
      position: new THREE.Vector3(Math.cos(angle) * radius, 2.6 - layer * 1.4, Math.sin(angle) * radius * 0.42 - 1.8),
      scale: 0.035 + (index % 5) * 0.007,
    };
  }), [nodeCount]);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const signal = signalRef.current;
    const elapsed = clock.elapsedTime;
    group.position.y = THREE.MathUtils.damp(group.position.y, (signal.progress - 0.45) * -2.6, 2.5, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, Math.sin(signal.progress * Math.PI) * 0.22, 2.1, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, signal.pointerX * 0.22 + signal.progress * 0.58, 2.1, delta);
    group.rotation.z = signal.reduceMotion ? 0 : Math.sin(elapsed * 0.16) * 0.025;
  });

  return <group ref={groupRef}>
    {nodes.map((node, index) => <Float
      floatIntensity={signalRef.current.reduceMotion ? 0 : 0.35}
      floatingRange={[-0.07, 0.07]}
      key={index}
      rotationIntensity={0.28}
      speed={0.9 + (index % 7) * 0.08}
    >
      <mesh position={node.position} scale={node.scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={node.color} depthWrite={false} opacity={0.45} transparent />
      </mesh>
    </Float>)}
    {nodes.slice(0, quality === "low" ? 22 : 42).map((node, index) => {
      const target = nodes[(index + 17) % nodes.length];
      return <Line
        color={index % 2 === 0 ? "#ff4fbd" : "#7cecff"}
        depthWrite={false}
        key={`bio-line-${index}`}
        lineWidth={0.65}
        opacity={0.1}
        points={[node.position, target.position]}
        transparent
      />;
    })}
  </group>;
}

function TentacleStrands({ signalRef, quality }: { signalRef: LivingSceneRef; quality: SceneQuality }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const strandCount = quality === "low" ? 5 : 9;
  const pointCount = quality === "low" ? 24 : 34;
  const strands = React.useMemo(() => Array.from({ length: strandCount }, (_, index) => {
    const y = 2.9 - index * 0.74;
    const side = index % 2 === 0 ? -1 : 1;
    const points = Array.from({ length: pointCount }, (_point, pointIndex) => {
      const t = pointIndex / (pointCount - 1);
      const wave = Math.sin(t * Math.PI * 2.2 + index * 0.72);
      return new THREE.Vector3(
        side * (5.4 - t * 10.8),
        y + wave * 0.28 + Math.sin(t * Math.PI) * 0.32,
        -2.8 + Math.cos(t * Math.PI * 2 + index) * 0.7,
      );
    });

    return {
      color: index % 3 === 0 ? "#ff4fbd" : index % 3 === 1 ? "#b8ff35" : "#8b5cf6",
      points,
    };
  }), [pointCount, strandCount]);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const signal = signalRef.current;
    const elapsed = clock.elapsedTime;
    group.position.y = THREE.MathUtils.damp(group.position.y, signal.progress * -3.1, 2.4, delta);
    group.position.x = THREE.MathUtils.damp(group.position.x, signal.pointerX * -0.42, 2.8, delta);
    group.rotation.z = signal.reduceMotion ? 0 : Math.sin(elapsed * 0.12 + signal.progress * 2) * 0.055;
  });

  return <group ref={groupRef}>
    {strands.map((strand, index) => <Line
      color={strand.color}
      depthWrite={false}
      key={`strand-${index}`}
      lineWidth={index % 2 === 0 ? 1.5 : 0.9}
      opacity={index % 2 === 0 ? 0.38 : 0.22}
      points={strand.points}
      transparent
    />)}
  </group>;
}

function TexturePlanes({ signalRef }: { signalRef: LivingSceneRef }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const [wideA, wideB, organism] = useTexture([spriteWideA, spriteWideB, organismBr]);

  React.useEffect(() => {
    [wideA, wideB, organism].forEach(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
    });
  }, [organism, wideA, wideB]);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const signal = signalRef.current;
    const elapsed = clock.elapsedTime;
    group.position.y = THREE.MathUtils.damp(group.position.y, signal.progress * -2.2, 2.3, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, signal.pointerX * 0.08, 2.6, delta);
    if (!signal.reduceMotion) {
      group.position.x = Math.sin(elapsed * 0.18) * 0.12;
    }
  });

  return <group ref={groupRef}>
    <mesh position={[-2.9, -3.15, -3.2]} rotation={[0.18, 0, 0.04]} scale={[4.6, 1.4, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial alphaTest={0.02} depthWrite={false} map={wideA} opacity={0.56} transparent />
    </mesh>
    <mesh position={[3.25, 0.2, -3.4]} rotation={[0.08, 0, -0.12]} scale={[5.2, 1.55, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial alphaTest={0.02} depthWrite={false} map={wideB} opacity={0.42} transparent />
    </mesh>
    <mesh position={[4.85, -2.65, -2.2]} rotation={[0.2, -0.25, 0.16]} scale={[1.15, 1.02, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial alphaTest={0.04} depthWrite={false} map={organism} opacity={0.72} transparent />
    </mesh>
  </group>;
}

function SignalRings({ signalRef }: { signalRef: LivingSceneRef }) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const signal = signalRef.current;
    group.position.y = THREE.MathUtils.damp(group.position.y, 1.5 - signal.progress * 3.6, 2.2, delta);
    group.position.x = THREE.MathUtils.damp(group.position.x, 2.8 + signal.pointerX * 0.22, 2.5, delta);
    if (!signal.reduceMotion) {
      group.rotation.z = clock.elapsedTime * 0.055;
      group.rotation.x = 1.15 + Math.sin(clock.elapsedTime * 0.2) * 0.04;
    }
  });

  return <group ref={groupRef} rotation={[1.15, 0.16, -0.3]}>
    {[0, 1, 2, 3, 4].map(index => <mesh key={index} scale={1 + index * 0.34}>
      <torusGeometry args={[1.05, 0.008, 10, 128]} />
      <meshBasicMaterial color={index % 2 === 0 ? "#ff4fbd" : "#7cecff"} depthWrite={false} opacity={0.2 - index * 0.024} transparent />
    </mesh>)}
  </group>;
}

function LivingWorld({ signalRef, quality }: { signalRef: LivingSceneRef; quality: SceneQuality }) {
  const rich = quality === "rich";

  return <>
    <Rig signalRef={signalRef} />
    <ambientLight intensity={rich ? 0.35 : 0.28} />
    <BioField quality={quality} signalRef={signalRef} />
    <TentacleStrands quality={quality} signalRef={signalRef} />
    <SignalRings signalRef={signalRef} />
    <TexturePlanes signalRef={signalRef} />
    <EffectComposer multisampling={0}>
      <Bloom intensity={rich ? 0.82 : 0.42} luminanceSmoothing={0.35} luminanceThreshold={0.08} mipmapBlur radius={rich ? 0.55 : 0.28} />
      <ChromaticAberration offset={rich ? [0.0007, 0.0009] : [0, 0]} />
      <Vignette darkness={rich ? 0.58 : 0.38} eskil={false} offset={0.2} />
    </EffectComposer>
  </>;
}

export function LivingScene3D() {
  const signalRef = useLivingSceneSignal();
  const [webglReady, setWebglReady] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const quality = useSceneQuality();
  const dpr: [number, number] = quality === "low" ? [0.75, 1] : [1, 1.5];

  React.useEffect(() => {
    setWebglReady(canUseWebGL());
  }, []);

  if (!webglReady || reduceMotion) return null;

  return <Canvas
    camera={{ fov: 42, position: [0, 0.2, 8.5] }}
    className="absolute inset-0 size-full opacity-90 mix-blend-screen"
    dpr={dpr}
    gl={{ alpha: true, antialias: quality === "rich", powerPreference: quality === "rich" ? "high-performance" : "low-power" }}
  >
    <React.Suspense fallback={null}>
      <LivingWorld quality={quality} signalRef={signalRef} />
    </React.Suspense>
  </Canvas>;
}
