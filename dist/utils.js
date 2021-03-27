export function getRandom(max, min) {
    min = min ? min : 0;
    return Math.random() * ((max ? max : 1) - min) + min;
}
export function clamp(n, max, min) {
    if (typeof min !== "number")
        min = 0;
    return n > max ? max : n < min ? min : n;
}
