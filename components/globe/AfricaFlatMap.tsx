"use client";

import { AFRICA_MAINLAND, MADAGASCAR, type LngLat } from "./africaGeo";
import type { GlobeMarker } from "./AfricaGlobe";

const MIN_LNG = -20;
const MAX_LNG = 55;
const MAX_LAT = 38;
const MIN_LAT = -36;
const SCALE = 10;
const WIDTH = (MAX_LNG - MIN_LNG) * SCALE;
const HEIGHT = (MAX_LAT - MIN_LAT) * SCALE;

const project = ([lng, lat]: LngLat): [number, number] => [(lng - MIN_LNG) * SCALE, (MAX_LAT - lat) * SCALE];
const toPath = (polygon: LngLat[]) =>
  polygon.map((point, i) => `${i === 0 ? "M" : "L"}${project(point).join(" ")}`).join(" ") + " Z";

interface AfricaFlatMapProps {
  markers: GlobeMarker[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

/** Carte 2D utilisée lorsque WebGL n’est pas disponible. */
export function AfricaFlatMap({ markers, selectedSlug, onSelect }: AfricaFlatMapProps) {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mx-auto h-full max-h-[34rem] w-full" role="group" aria-label="Carte simplifiée de l’Afrique avec les pays à explorer">
      <path d={toPath(AFRICA_MAINLAND)} fill="#2a1d14" stroke="#c9a24d" strokeOpacity="0.6" strokeWidth="2" />
      <path d={toPath(MADAGASCAR)} fill="#2a1d14" stroke="#c9a24d" strokeOpacity="0.6" strokeWidth="2" />
      {markers.map((marker) => {
        const [x, y] = project([marker.lng, marker.lat]);
        const active = marker.slug === selectedSlug;
        return (
          <g
            key={marker.slug}
            role="button"
            tabIndex={0}
            aria-label={`Afficher ${marker.name}`}
            aria-pressed={active}
            onClick={() => onSelect(marker.slug)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(marker.slug);
              }
            }}
            className="cursor-pointer"
          >
            <circle cx={x} cy={y} r={20} fill="transparent" />
            <circle cx={x} cy={y} r={active ? 10 : 6} fill={active ? "#e8503a" : "#c9a24d"} />
          </g>
        );
      })}
    </svg>
  );
}
