import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetcher = async (url: string, options: RequestInit = {}): Promise<any> => {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    try {
        return await response.json();
    } catch (error) {
        return null;
    }
};

export const getColorFromRange = (value: number): string => {
    // Clamp value between 0 and 1
    value = Math.max(0, Math.min(1, value));

    // Interpolate hue from red (0°) → orange (30°) → green (120°)
    const hue =
        value < 0.5
            ? 0 + 30 * (value * 2) // Red to orange
            : 30 + 90 * ((value - 0.5) * 2); // Orange to green

    // Convert HSL to RGB
    const hslToHex = (h: number, s: number, l: number): string => {
        s /= 100;
        l /= 100;

        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) =>
            Math.round((l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))) * 255)
                .toString(16)
                .padStart(2, "0");

        return `#${f(0)}${f(8)}${f(4)}`;
    };

    return hslToHex(hue, 100, 50); // Full saturation and medium lightness
};