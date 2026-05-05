const darkColors = {
  ink: "#020405",
  text: "#f8fafc",
  muted: "#9ca3af",
  paper: "#050709",
  surface: "#111519",
  surfaceStrong: "#171b20",
  glass: "#15191e",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.16)",
  gold: "#d7aa55",
  goldDark: "#f2c96d",
  purple: "#c084fc",
  purpleDark: "#7e22ce",
  cyan: "#7dd3fc",
  green: "#4ade80",
  red: "#fb7185",
  blue: "#93c5fd",
  haze: "#1b2026",
  darkPanel: "#0b0e11",
};

const lightColors = {
  ink: "#f8fafc",
  text: "#101827",
  muted: "#64748b",
  paper: "#f7f8fb",
  surface: "#ffffff",
  surfaceStrong: "#f1f5f9",
  glass: "#ffffff",
  line: "rgba(15,23,42,0.08)",
  lineStrong: "rgba(15,23,42,0.14)",
  gold: "#f8b400",
  goldDark: "#d89200",
  purple: "#7c3aed",
  purpleDark: "#5b21b6",
  cyan: "#0284c7",
  green: "#16a34a",
  red: "#dc2626",
  blue: "#2563eb",
  haze: "#e2e8f0",
  darkPanel: "#ffffff",
};

export type MobileThemeMode = "dark" | "light";
export const colors = { ...darkColors };

export function applyMobileTheme(mode: MobileThemeMode) {
  Object.assign(colors, mode === "light" ? lightColors : darkColors);
}

export const shadows = {
  soft: {
    boxShadow: "0px 18px 34px rgba(0, 0, 0, 0.34)",
    elevation: 8,
  },
};
