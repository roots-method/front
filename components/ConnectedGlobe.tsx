"use client";

import { useEffect, useRef } from "react";

type GeoPoint = { lat: number; lon: number };
type Vector3 = [number, number, number];
type ProjectedPoint = { x: number; y: number; z: number };

const TAU = Math.PI * 2;
const toRadians = (value: number) => (value * Math.PI) / 180;

const LAND_CLUSTERS = [
  { lat: 42, lon: -103, rx: 42, ry: 24, tilt: -0.18 },
  { lat: 12, lon: -86, rx: 16, ry: 18, tilt: 0.1 },
  { lat: -17, lon: -60, rx: 18, ry: 38, tilt: -0.12 },
  { lat: 51, lon: 14, rx: 25, ry: 13, tilt: 0.05 },
  { lat: 6, lon: 20, rx: 24, ry: 34, tilt: 0.12 },
  { lat: 39, lon: 83, rx: 56, ry: 25, tilt: -0.06 },
  { lat: -25, lon: 136, rx: 19, ry: 13, tilt: 0.15 },
  { lat: 66, lon: -40, rx: 12, ry: 8, tilt: 0 },
];

const LAND_POINTS: GeoPoint[] = LAND_CLUSTERS.flatMap((cluster) => {
  const points: GeoPoint[] = [];
  for (let y = -cluster.ry; y <= cluster.ry; y += 5.8) {
    for (let x = -cluster.rx; x <= cluster.rx; x += 5.8) {
      const normalizedX = x / cluster.rx;
      const normalizedY = y / cluster.ry;
      const jitter = Math.sin((x + 17) * (y - 9) * 0.07) * 0.09;
      if (normalizedX * normalizedX + normalizedY * normalizedY + jitter < 0.86) {
        points.push({
          lat: cluster.lat + y + x * cluster.tilt,
          lon: cluster.lon + x,
        });
      }
    }
  }
  return points;
});

const ROUTES: [GeoPoint, GeoPoint][] = [
  [{ lat: 37.8, lon: -122.4 }, { lat: 51.5, lon: -0.1 }],
  [{ lat: 51.5, lon: -0.1 }, { lat: 17.4, lon: 78.5 }],
  [{ lat: 17.4, lon: 78.5 }, { lat: 1.3, lon: 103.8 }],
  [{ lat: 1.3, lon: 103.8 }, { lat: -33.9, lon: 151.2 }],
  [{ lat: 17.4, lon: 78.5 }, { lat: 25.2, lon: 55.3 }],
  [{ lat: 25.2, lon: 55.3 }, { lat: -1.3, lon: 36.8 }],
  [{ lat: 37.8, lon: -122.4 }, { lat: -23.5, lon: -46.6 }],
];

function toVector(point: GeoPoint): Vector3 {
  const latitude = toRadians(point.lat);
  const longitude = toRadians(point.lon);
  return [
    Math.cos(latitude) * Math.sin(longitude),
    -Math.sin(latitude),
    Math.cos(latitude) * Math.cos(longitude),
  ];
}

function normalize(vector: Vector3): Vector3 {
  const magnitude = Math.hypot(...vector) || 1;
  return vector.map((value) => value / magnitude) as Vector3;
}

function interpolateRoute(start: GeoPoint, end: GeoPoint, progress: number): Vector3 {
  const from = toVector(start);
  const to = toVector(end);
  const dot = Math.max(-1, Math.min(1, from[0] * to[0] + from[1] * to[1] + from[2] * to[2]));
  const angle = Math.acos(dot);
  if (angle < 0.001) return from;
  const sine = Math.sin(angle);
  return normalize(
    from.map((value, index) =>
      value * Math.sin((1 - progress) * angle) / sine + to[index] * Math.sin(progress * angle) / sine,
    ) as Vector3,
  );
}

function rotateY(vector: Vector3, angle: number): Vector3 {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return [
    vector[0] * cosine + vector[2] * sine,
    vector[1],
    -vector[0] * sine + vector[2] * cosine,
  ];
}

export default function ConnectedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let rotation = 0.8;
    let lastTime = performance.now();
    const startTime = lastTime;
    let frameId = 0;

    const fit = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const observer = new ResizeObserver(fit);
    observer.observe(canvas);
    fit();

    const project = (vector: Vector3, centerX: number, centerY: number, radius: number): ProjectedPoint => ({
      x: centerX + vector[0] * radius,
      y: centerY + vector[1] * radius,
      z: vector[2],
    });

    const geoPoint = (point: GeoPoint, centerX: number, centerY: number, radius: number) =>
      project(rotateY(toVector(point), rotation), centerX, centerY, radius);

    const routePoint = (
      route: [GeoPoint, GeoPoint],
      progress: number,
      centerX: number,
      centerY: number,
      radius: number,
    ) => project(rotateY(interpolateRoute(route[0], route[1], progress), rotation), centerX, centerY, radius);

    const drawGrid = (centerX: number, centerY: number, radius: number) => {
      context.lineWidth = 1;
      context.strokeStyle = "rgba(200,210,204,.16)";

      for (let latitude = -60; latitude <= 60; latitude += 30) {
        context.beginPath();
        let active = false;
        for (let longitude = -180; longitude <= 180; longitude += 4) {
          const point = geoPoint({ lat: latitude, lon: longitude }, centerX, centerY, radius);
          if (point.z > 0) {
            if (!active) context.moveTo(point.x, point.y);
            else context.lineTo(point.x, point.y);
            active = true;
          } else active = false;
        }
        context.stroke();
      }

      for (let longitude = -150; longitude <= 180; longitude += 30) {
        context.beginPath();
        let active = false;
        for (let latitude = -86; latitude <= 86; latitude += 3) {
          const point = geoPoint({ lat: latitude, lon: longitude }, centerX, centerY, radius);
          if (point.z > 0) {
            if (!active) context.moveTo(point.x, point.y);
            else context.lineTo(point.x, point.y);
            active = true;
          } else active = false;
        }
        context.stroke();
      }
    };

    const drawLand = (centerX: number, centerY: number, radius: number) => {
      for (const landPoint of LAND_POINTS) {
        const point = geoPoint(landPoint, centerX, centerY, radius);
        if (point.z <= 0) continue;
        context.globalAlpha = 0.16 + 0.64 * point.z;
        context.fillStyle = "#c8d2cc";
        context.beginPath();
        context.arc(point.x, point.y, 2.15, 0, TAU);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const drawRoutes = (centerX: number, centerY: number, radius: number, elapsed: number) => {
      const duration = 1.35;
      const gap = 0.55;
      const cycle = ROUTES.length * (duration + gap) + 2.8;
      const cycleTime = reducedMotion ? cycle : elapsed % cycle;

      ROUTES.forEach((route, index) => {
        const start = index * (duration + gap);
        const progress = reducedMotion ? 1 : Math.max(0, Math.min(1, (cycleTime - start) / duration));
        if (progress <= 0) return;

        context.beginPath();
        let active = false;
        const segments = 42;
        for (let segment = 0; segment <= segments * progress; segment += 1) {
          const point = routePoint(route, segment / segments, centerX, centerY, radius);
          if (point.z > 0.02) {
            if (!active) context.moveTo(point.x, point.y);
            else context.lineTo(point.x, point.y);
            active = true;
          } else active = false;
        }
        context.strokeStyle = "#c85c3c";
        context.lineWidth = 2.7;
        context.lineCap = "round";
        context.stroke();

        const endpoint = routePoint(route, progress, centerX, centerY, radius);
        if (progress < 1 && endpoint.z > 0) {
          context.fillStyle = "#e2a84a";
          context.shadowColor = "#e2a84a";
          context.shadowBlur = 12;
          context.beginPath();
          context.arc(endpoint.x, endpoint.y, 5.8, 0, TAU);
          context.fill();
          context.shadowBlur = 0;
        }

        if (progress === 1) {
          const destination = geoPoint(route[1], centerX, centerY, radius);
          if (destination.z > 0) {
            context.fillStyle = "#f8f5ef";
            context.beginPath();
            context.arc(destination.x, destination.y, 4.2, 0, TAU);
            context.fill();
            context.strokeStyle = "rgba(226,168,74,.55)";
            context.lineWidth = 1.3;
            context.beginPath();
            context.arc(destination.x, destination.y, 8.5 + Math.sin(elapsed * 2 + index) * 1.5, 0, TAU);
            context.stroke();
          }
        }
      });
    };

    const drawOrbit = (centerX: number, centerY: number, radius: number, elapsed: number) => {
      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.22);
      context.strokeStyle = "rgba(200,210,204,.32)";
      context.lineWidth = 1.2;
      context.beginPath();
      context.ellipse(0, 0, radius * 1.17, radius * 0.34, 0, 0, TAU);
      context.stroke();

      const angle = reducedMotion ? 0.7 : elapsed * 0.55;
      const orbitX = Math.cos(angle) * radius * 1.17;
      const orbitY = Math.sin(angle) * radius * 0.34;
      context.fillStyle = "#e2a84a";
      context.shadowColor = "#e2a84a";
      context.shadowBlur = 13;
      context.beginPath();
      context.arc(orbitX, orbitY, 5.4, 0, TAU);
      context.fill();
      context.restore();
      context.shadowBlur = 0;
    };

    const draw = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!reducedMotion) rotation += delta * 0.105;

      const elapsed = (now - startTime) / 1000;
      context.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.48;
      const radius = Math.min(width, height) * 0.315;

      drawOrbit(centerX, centerY, radius, elapsed);
      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, TAU);
      context.clip();
      context.fillStyle = "#142d27";
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
      drawGrid(centerX, centerY, radius);
      drawLand(centerX, centerY, radius);
      drawRoutes(centerX, centerY, radius, elapsed);
      context.restore();

      context.strokeStyle = "rgba(200,210,204,.58)";
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, TAU);
      context.stroke();

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="home-editorial__globe" aria-hidden="true">
      <canvas ref={canvasRef} />
      <span>Signals become systems</span>
    </div>
  );
}
