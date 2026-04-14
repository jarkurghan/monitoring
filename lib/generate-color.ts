const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const hslToHex = (h: number, s: number, l: number) => {
    const hh = ((h % 360) + 360) % 360;
    const ss = clamp01(s / 100);
    const ll = clamp01(l / 100);

    const c = (1 - Math.abs(2 * ll - 1)) * ss;
    const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
    const m = ll - c / 2;

    let r = 0,
        g = 0,
        b = 0;
    if (hh < 60) {
        r = c;
        g = x;
    } else if (hh < 120) {
        r = x;
        g = c;
    } else if (hh < 180) {
        g = c;
        b = x;
    } else if (hh < 240) {
        g = x;
        b = c;
    } else if (hh < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    const toHex = (v: number) =>
        Math.round((v + m) * 255)
            .toString(16)
            .padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const hashString = (input: string) => {
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
};

const DISTINCT_HUES = [
    0, 137.5, 275, 52.5, 190, 327.5, 105, 242.5, 20, 157.5, 295, 72.5, 210, 347.5, 125, 262.5, 40, 177.5, 315, 92.5, 230, 7.5, 145, 282.5, 60, 197.5, 335,
    112.5, 250, 27.5, 165, 302.5, 80, 217.5, 355, 132.5,
] as const;

export const generateColor = (name: string) => {
    const key = (name ?? "").trim().toLowerCase() || "unknown";
    const h1 = hashString(key);
    const h2 = hashString(`${key}::salt`);

    const baseHue = DISTINCT_HUES[h1 % DISTINCT_HUES.length];
    const hueJitter = ((h2 % 13) - 6) * 0.85;
    const h = baseHue + hueJitter;

    const s = 62 + (h2 % 11);
    const l = 43 + (h1 % 9);
    return hslToHex(h, s, l);
};
