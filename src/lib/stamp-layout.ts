import { StampPosition } from "@/data/types";

export function getStampsPerPage(viewportWidth: number): number {
  if (viewportWidth < 640) return 1;
  return 2;
}

const templates: Record<number, StampPosition[][]> = {
  1: [
    [{ x: 10, y: 10, rotation: -3, scale: 1.0 }],
    [{ x: 8, y: 15, rotation: 5, scale: 0.95 }],
    [{ x: 12, y: 8, rotation: -2, scale: 1.0 }],
  ],
  2: [
    [
      { x: 5, y: 3, rotation: -5, scale: 0.9 },
      { x: 12, y: 50, rotation: 8, scale: 0.95 },
    ],
    [
      { x: 8, y: 5, rotation: 3, scale: 0.95 },
      { x: 5, y: 52, rotation: -7, scale: 0.9 },
    ],
    [
      { x: 10, y: 2, rotation: -4, scale: 0.92 },
      { x: 8, y: 48, rotation: 6, scale: 0.93 },
    ],
  ],
};

export function calculateStampPositions(
  stampCount: number,
  pageIndex: number
): StampPosition[] {
  const options = templates[stampCount] || templates[2];
  return options[pageIndex % options.length].slice(0, stampCount);
}
