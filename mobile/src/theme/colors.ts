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
  ink: "#f4f6f8",
  text: "#111827",
  muted: "#6b7280",
  paper: "#ffffff",
  surface: "#ffffff",
  surfaceStrong: "#f1f5f9",
  glass: "#ffffff",
  line: "rgba(15,23,42,0.08)",
  lineStrong: "rgba(15,23,42,0.14)",
  gold: "#fbbd05",
  goldDark: "#d9a100",
  purple: "#8b5cf6",
  purpleDark: "#5b21b6",
  cyan: "#0ea5e9",
  green: "#10b981",
  red: "#ef4444",
  blue: "#3b82f6",
  haze: "#e2e8f0",
  darkPanel: "#ffffff",
};

export type MobileThemeMode = "dark" | "light";
export const colors = { ...darkColors };

export const shadows = {
  soft: {
    boxShadow: "0px 18px 34px rgba(0, 0, 0, 0.34)",
    elevation: 8,
  },
};

export function applyMobileTheme(mode: MobileThemeMode) {
  Object.assign(colors, mode === "light" ? lightColors : darkColors);
  shadows.soft.boxShadow = mode === "light" ? "0px 8px 24px rgba(0, 0, 0, 0.08)" : "0px 18px 34px rgba(0, 0, 0, 0.34)";
}
