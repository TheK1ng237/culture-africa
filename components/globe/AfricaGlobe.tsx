"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { isLand } from "./africaGeo";

export interface GlobeMarker {
  slug: string;
  name: string;
  lat: number;
  lng: number;
}

interface AfricaGlobeProps {
  markers: GlobeMarker[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  onUnavailable: () => void;
}

interface GlobeApi {
  focusOn: (slug: string | null) => void;
}

const RADIUS = 1;
const CENTER_LNG = 20;
const CENTER_LAT = 4;
const DEG = Math.PI / 180;

function toVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

/** Rotation Y du groupe « globe » pour amener la longitude au centre de la vue. */
const rotationForLng = (lng: number) => -lng * DEG - Math.PI / 2;

function buildLandDots(step: number): Float32Array {
  const positions: number[] = [];
  for (let lat = -36; lat <= 38; lat += step) {
    const lngStep = step / Math.max(Math.cos(lat * DEG), 0.3);
    for (let lng = -19; lng <= 52; lng += lngStep) {
      if (isLand(lng, lat)) {
        const v = toVec3(lat, lng, RADIUS * 1.003);
        positions.push(v.x, v.y, v.z);
      }
    }
  }
  // Madagascar déborde du pas longitudinal standard.
  for (let lat = -26; lat <= -12; lat += step) {
    for (let lng = 43; lng <= 51; lng += step) {
      if (isLand(lng, lat)) {
        const v = toVec3(lat, lng, RADIUS * 1.003);
        positions.push(v.x, v.y, v.z);
      }
    }
  }
  return new Float32Array(positions);
}

function buildGraticule(): THREE.LineSegments {
  const pts: number[] = [];
  const push = (a: THREE.Vector3, b: THREE.Vector3) => pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let lng = -180; lng < 180; lng += 6) push(toVec3(lat, lng, 1.001), toVec3(lat, lng + 6, 1.001));
  }
  for (let lng = -180; lng < 180; lng += 30) {
    for (let lat = -84; lat < 84; lat += 6) push(toVec3(lat, lng, 1.001), toVec3(lat + 6, lng, 1.001));
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return new THREE.LineSegments(
    geometry,
    new THREE.LineBasicMaterial({ color: 0xc9a24d, transparent: true, opacity: 0.1 }),
  );
}

function createRenderer(): THREE.WebGLRenderer | null {
  try {
    return new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
}

export default function AfricaGlobe({ markers, selectedSlug, onSelect, onUnavailable }: AfricaGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handlersRef = useRef({ onSelect, onUnavailable });
  const apiRef = useRef<GlobeApi | null>(null);

  useEffect(() => {
    handlersRef.current = { onSelect, onUnavailable };
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = createRenderer();
    if (!renderer) {
      handlersRef.current.onUnavailable();
      return;
    }

    const isSmall = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab;";
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const tilt = new THREE.Group();
    const globe = new THREE.Group();
    tilt.add(globe);
    scene.add(tilt);

    // Corps sombre : sert aussi à masquer les repères situés derrière le globe.
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 0.995, isSmall ? 32 : 56, isSmall ? 32 : 56),
      new THREE.MeshBasicMaterial({ color: 0x1a120d }),
    );
    globe.add(body);
    globe.add(buildGraticule());

    // Continent en points.
    const dotsGeometry = new THREE.BufferGeometry();
    dotsGeometry.setAttribute("position", new THREE.BufferAttribute(buildLandDots(isSmall ? 2.4 : 1.5), 3));
    const dots = new THREE.Points(
      dotsGeometry,
      new THREE.PointsMaterial({ color: 0xe6c27a, size: isSmall ? 0.024 : 0.017, sizeAttenuation: true, transparent: true, opacity: 0.92 }),
    );
    globe.add(dots);

    // Halo atmosphérique.
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.14, 48, 48),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: { glow: { value: new THREE.Color(0xc9a24d) } },
        vertexShader:
          "varying vec3 vNormal; void main(){ vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader:
          "varying vec3 vNormal; uniform vec3 glow; void main(){ float i = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0); gl_FragColor = vec4(glow, 1.0) * clamp(i, 0.0, 1.0) * 0.5; }",
      }),
    );
    scene.add(atmosphere);

    // Particules légères autour du globe.
    const particleCount = isSmall ? 60 : 220;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.5 + Math.random() * 1.2;
      const u = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      particlePositions[i * 3] = r * s * Math.cos(a);
      particlePositions[i * 3 + 1] = r * u;
      particlePositions[i * 3 + 2] = r * s * Math.sin(a);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xebdfc8, size: 0.012, transparent: true, opacity: 0.45, sizeAttenuation: true }),
    );
    scene.add(particles);

    // Repères interactifs.
    const markerMeshes = new Map<string, THREE.Mesh>();
    const hitMeshes: THREE.Mesh[] = [];
    const markerGeometry = new THREE.SphereGeometry(0.022, 16, 16);
    const hitGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const hitMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    for (const marker of markers) {
      const position = toVec3(marker.lat, marker.lng, RADIUS * 1.012);
      const visual = new THREE.Mesh(markerGeometry, new THREE.MeshBasicMaterial({ color: 0xc9a24d }));
      visual.position.copy(position);
      visual.userData.slug = marker.slug;
      globe.add(visual);
      markerMeshes.set(marker.slug, visual);
      const hit = new THREE.Mesh(hitGeometry, hitMaterial);
      hit.position.copy(position);
      hit.userData.slug = marker.slug;
      globe.add(hit);
      hitMeshes.push(hit);
    }

    // Étiquette de survol (DOM, sans état React).
    const label = document.createElement("div");
    label.style.cssText =
      "position:absolute;pointer-events:none;display:none;padding:4px 10px;border-radius:999px;background:#f6f0e4;color:#110d0a;font:500 13px/1.4 system-ui,sans-serif;white-space:nowrap;transform:translate(-50%,-140%);z-index:2;";
    container.appendChild(label);

    const nameBySlug = new Map(markers.map((m) => [m.slug, m.name]));
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let rotY = rotationForLng(CENTER_LNG);
    let targetY = rotY;
    let rotX = CENTER_LAT * DEG;
    let targetX = rotX;
    let selected: string | null = null;
    let hovered: string | null = null;
    let lastInteract = -10000;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;
    let running = false;
    let visible = true;

    function resize() {
      const w = container!.clientWidth || 1;
      const h = container!.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    function setPointer(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function pick(): string | null {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects([body, ...hitMeshes], false);
      if (hits.length === 0) return null;
      const first = hits[0].object;
      return first === body ? null : (first.userData.slug as string);
    }

    function onPointerDown(event: PointerEvent) {
      dragging = true;
      moved = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      lastInteract = performance.now();
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    }

    function onPointerMove(event: PointerEvent) {
      setPointer(event);
      if (dragging) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        moved += Math.abs(dx) + Math.abs(dy);
        lastX = event.clientX;
        lastY = event.clientY;
        targetY += dx * 0.006;
        rotY = targetY;
        targetX = Math.max(-0.6, Math.min(0.8, targetX + dy * 0.004));
        rotX = targetX;
        lastInteract = performance.now();
        return;
      }
      const slug = pick();
      if (slug !== hovered) {
        hovered = slug;
        canvas.style.cursor = slug ? "pointer" : "grab";
      }
      if (slug) {
        const rect = container!.getBoundingClientRect();
        label.textContent = nameBySlug.get(slug) ?? "";
        label.style.left = `${event.clientX - rect.left}px`;
        label.style.top = `${event.clientY - rect.top}px`;
        label.style.display = "block";
      } else {
        label.style.display = "none";
      }
    }

    function onPointerUp(event: PointerEvent) {
      const wasDragging = dragging;
      dragging = false;
      canvas.style.cursor = hovered ? "pointer" : "grab";
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      if (wasDragging && moved < 6) {
        setPointer(event);
        const slug = pick();
        if (slug) handlersRef.current.onSelect(slug);
      }
    }

    function onPointerLeave() {
      hovered = null;
      label.style.display = "none";
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    function tick(time: number) {
      const seconds = time / 1000;
      if (!dragging && !reduceMotion && time - lastInteract > 3500 && !selected) {
        targetY = rotationForLng(CENTER_LNG) + Math.sin(seconds * 0.3) * 0.6;
        targetX = CENTER_LAT * DEG;
      }
      if (!dragging) {
        rotY += (targetY - rotY) * 0.06;
        rotX += (targetX - rotX) * 0.06;
      }
      globe.rotation.y = rotY;
      tilt.rotation.x = rotX;
      if (!reduceMotion) particles.rotation.y = seconds * 0.02;

      markerMeshes.forEach((mesh, slug) => {
        const isSelected = slug === selected;
        const target = isSelected ? 1.8 + Math.sin(seconds * 4) * 0.25 : slug === hovered ? 1.5 : 1;
        mesh.scale.setScalar(target);
        (mesh.material as THREE.MeshBasicMaterial).color.setHex(isSelected ? 0xe8503a : 0xc9a24d);
      });
      renderer.render(scene, camera);
    }

    function setRunning(next: boolean) {
      if (next === running) return;
      running = next;
      renderer.setAnimationLoop(next ? tick : null);
    }

    const intersection = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        setRunning(visible && !document.hidden);
      },
      { threshold: 0.05 },
    );
    intersection.observe(container);
    const onVisibility = () => setRunning(visible && !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    setRunning(true);

    apiRef.current = {
      focusOn(slug) {
        selected = slug;
        if (!slug) return;
        const marker = markers.find((m) => m.slug === slug);
        if (!marker) return;
        targetY = rotationForLng(marker.lng);
        targetX = Math.max(-0.6, Math.min(0.8, marker.lat * DEG));
        lastInteract = performance.now() + 4000;
      },
    };

    return () => {
      apiRef.current = null;
      setRunning(false);
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else material?.dispose?.();
      });
      renderer.dispose();
      canvas.remove();
      label.remove();
    };
  }, [markers]);

  useEffect(() => {
    apiRef.current?.focusOn(selectedSlug);
  }, [selectedSlug]);

  return <div ref={containerRef} className="relative h-full w-full" />;
}
