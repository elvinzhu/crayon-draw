export function getRandom(max: number, min?: number): number {
  min = min ? min : 0;
  return Math.random() * ((max ? max : 1) - min) + min;
}

export function clamp(n: number, max: number, min?: number) {
  if (typeof min !== "number") min = 0;
  return n > max ? max : n < min ? min : n;
}
