import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "leaflet/dist/leaflet.css";
import App from "./App";
import { PreferencesProvider, usePreferences } from "./lib/preferences";
import { createAppTheme } from "./theme";

function ThemedRoot() {
  const { themeMode } = usePreferences();

  return (
    <ThemeProvider theme={createAppTheme(themeMode)}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PreferencesProvider>
      <ThemedRoot />
    </PreferencesProvider>
  </React.StrictMode>,
);
