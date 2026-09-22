"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Quality = "high" | "low";

type NeuralNetworkProps = {
  quality: Quality;
  animated: boolean;
};

function spherePoints(count: number, radius: number, jitter = 0) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const j = jitter ? (Math.random() - 0.5) * jitter : 0;
    pts.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius + j,
        y * radius + j,
        Math.sin(theta) * r * radius + j,
      ),
    );
  }
  return pts;
}

function nearestEdges(points: THREE.Vector3[], k: number, maxDist: number) {
  const pairs: [number, number][] = [];
  for (let i = 0; i < points.length; i++) {
    const ds = points
      .map((p, j) => ({ j, d: p.distanceToSquared(points[i]) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k);
    for (const e of ds) {
      if (Math.sqrt(e.d) < maxDist) pairs.push([i, e.j]);
    }
  }
  return pairs;
}

function makeCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Generative-style neural network: a sphere of nodes joined by nearest-neighbor
 * edges, a glowing core with orbit rings and data pulses, plus a soft grid floor.
 * Reacts subtly to the pointer and animates smoothly.
 */
export function NeuralNetwork({ quality, animated }: NeuralNetworkProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Group>(null);

  const low = quality === "low";
  const shellCount = low ? 30 : 56;
  const innerCount = low ? 6 : 12;

  const { nodePositions, edgePositions, pulsOrbits } = useMemo(() => {
    const shell = spherePoints(shellCount, 2.3, 0.14);
    const inner = spherePoints(innerCount, 1.1, 0.8);
    const nodes = [...shell, ...inner];
    const edges = nearestEdges(nodes, 3, 3.1);
    const edgePos = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      edgePos.set([nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z], i * 6);
    });
    const orbits = [0, 1, 2, 3].map((i) => ({
      radius: 0.9 + (i % 3) * 0.28,
      speed: (i % 2 === 0 ? 1 : -1) * (0.5 + i * 0.12),
      phase: i * 1.7,
      tilt: (i % 2) * 0.5 - 0.25,
    }));
    return { nodePositions: nodes, edgePositions: edgePos, pulsOrbits: orbits };
  }, [shellCount, innerCount]);

  const sprite = useMemo(() => makeCircleTexture(), []);

  useFrame((state, delta) => {
    if (!animated) return;
    const t = state.clock.elapsedTime;
    const pointer = state.pointer;

    if (group.current) {
      // continuous drift + subtle pointer parallax
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.y += pointer.x * 0.02;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.12,
        0.04,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        pointer.x * 0.05,
        0.04,
      );
    }

    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(t * 1.3) * 0.07);
    }

    const pulseGroup = pulse.current;
    if (pulseGroup) {
      pulseGroup.rotation.y = t * 0.35;
      pulsOrbits.forEach((orb, i) => {
        const p = pulseGroup.children[i];
        if (!p) return;
        const a = t * orb.speed + orb.phase;
        p.position.set(Math.cos(a) * orb.radius, Math.sin(a * 0.6) * 0.12, Math.sin(a) * orb.radius);
      });
    }

    // camera drift
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * 0.5, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.y * 0.35, 0.03);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <group ref={group}>
        {/* network nodes */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(nodePositions.flatMap((p) => [p.x, p.y, p.z])),
                3,
              ]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.11}
            sizeAttenuation
            map={sprite}
            color="#1dcd9f"
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* network edges */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#1dcd9f"
            transparent
            opacity={low ? 0.22 : 0.3}
            depthWrite={false}
          />
        </lineSegments>

        {/* glowing core */}
        <mesh ref={core}>
          <icosahedronGeometry args={[0.42, 2]} />
          <meshBasicMaterial
            color="#1dcd9f"
            transparent
            opacity={0.18}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#9ff9dd" transparent opacity={0.9} depthWrite={false} />
        </mesh>

        {/* orbit rings */}
        <mesh rotation={[0.3, 0, 0.1]}>
          <torusGeometry args={[1.05, 0.006, 8, 90]} />
          <meshBasicMaterial
            color="#1dcd9f"
            transparent
            opacity={0.5}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh rotation={[0.7, 0.4, 0]}>
          <torusGeometry args={[1.45, 0.005, 8, 90]} />
          <meshBasicMaterial
            color="#1dcd9f"
            transparent
            opacity={0.35}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* data pulses */}
        <group ref={pulse}>
          {pulsOrbits.map((orb, i) => (
            <mesh key={i}>
              <sphereGeometry args={[low ? 0.05 : 0.06, 12, 12]} />
              <meshBasicMaterial
                color="#9ff9dd"
                transparent
                opacity={0.95}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* depth grid floor */}
      <gridHelper
        args={[16, 24, low ? 0x0f2a22 : 0x12352a, 0x081c16]}
        position={[0, -2.9, 0]}
      />
    </>
  );
}