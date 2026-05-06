import { alpha, createTheme } from "@mui/material/styles";

const neonPurple = "#8b5cf6";
const neonCyan = "#22d3ee";
const luxuryGold = "#f6c85f";
const ink = "#05050a";
const panel = "#11111d";

export function createAppTheme(mode: "dark" | "light" = "dark") {
  const isLight = mode === "light";
  const backgroundDefault = isLight ? "#f7f8fb" : ink;
  const backgroundPaper = isLight ? "#ffffff" : alpha(panel, 0.82);
  const textPrimary = isLight ? "#111827" : "#f8fafc";
  const textSecondary = isLight ? "#6b7280" : "#aab2c8";

  const primaryMain = isLight ? "#fbbd05" : neonPurple;
  const primaryLight = isLight ? "#fcd04b" : "#c4b5fd";
  const primaryDark = isLight ? "#d9a100" : "#5b21b6";

  return createTheme({
  palette: {
    mode,
    primary: {
      main: primaryMain,
      light: primaryLight,
      dark: primaryDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: neonCyan,
      light: "#67e8f9",
      dark: "#0891b2",
      contrastText: "#031014",
    },
    success: {
      main: "#34d399",
    },
    warning: {
      main: luxuryGold,
    },
    error: {
      main: "#fb7185",
    },
    background: {
      default: backgroundDefault,
      paper: backgroundPaper,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    divider: isLight ? alpha("#64748b", 0.16) : alpha("#c4b5fd", 0.13),
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Manrope", "Segoe UI", sans-serif',
    h3: {
      fontWeight: 800,
      fontSize: "2.05rem",
      lineHeight: 1.05,
    },
    h4: {
      fontWeight: 800,
      fontSize: "1.6rem",
      lineHeight: 1.1,
    },
    h5: {
      fontWeight: 800,
      fontSize: "1.2rem",
    },
    h6: {
      fontWeight: 800,
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.94rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.88rem",
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: "0.94rem",
    },
    subtitle2: {
      fontWeight: 700,
      fontSize: "0.8rem",
      letterSpacing: "0.02em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: backgroundDefault,
          backgroundImage: isLight
            ? "radial-gradient(circle at 8% -8%, rgba(251,189,5,0.18), transparent 32%), radial-gradient(circle at 92% 0%, rgba(14,165,233,0.13), transparent 30%), linear-gradient(135deg, #f8fafc 0%, #f4f6fb 48%, #eef6ff 100%)"
            : "radial-gradient(circle at 12% -8%, rgba(139,92,246,0.32), transparent 32%), radial-gradient(circle at 92% 6%, rgba(34,211,238,0.18), transparent 30%), radial-gradient(circle at 50% 112%, rgba(246,200,95,0.14), transparent 35%), linear-gradient(135deg, #05050a 0%, #0b0714 36%, #12091f 62%, #07111d 100%)",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          color: textPrimary,
          WebkitFontSmoothing: "antialiased",
          textRendering: "optimizeLegibility",
        },
        "#root": {
          minHeight: "100vh",
        },
        "::selection": {
          backgroundColor: alpha(neonCyan, 0.35),
          color: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: textPrimary,
          backgroundColor: isLight ? "#ffffff" : undefined,
          boxShadow: isLight ? "0px 8px 24px rgba(0, 0, 0, 0.04)" : "0 24px 70px rgba(0, 0, 0, 0.38)",
          backgroundImage: isLight
            ? "none"
            : "linear-gradient(180deg, rgba(19,19,32,0.88) 0%, rgba(12,12,22,0.78) 100%)",
          border: isLight ? "none" : `1px solid ${alpha("#c4b5fd", 0.13)}`,
          backdropFilter: isLight ? "none" : "blur(22px)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          color: textPrimary,
          backgroundColor: isLight ? "#ffffff" : undefined,
          backgroundImage: isLight
            ? "none"
            : "linear-gradient(180deg, rgba(19,19,32,0.86) 0%, rgba(12,12,22,0.76) 100%)",
          border: isLight ? "none" : `1px solid ${alpha("#c4b5fd", 0.12)}`,
          boxShadow: isLight ? "0px 8px 24px rgba(0, 0, 0, 0.04)" : undefined,
          backdropFilter: isLight ? "none" : "blur(18px)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: isLight ? `1px solid ${alpha("#e5e7eb", 1)}` : `1px solid ${alpha("#c4b5fd", 0.13)}`,
          background: isLight
            ? "#ffffff"
            : "linear-gradient(180deg, rgba(8,8,16,0.98) 0%, rgba(17,10,31,0.96) 54%, rgba(6,12,22,0.98) 100%)",
          boxShadow: isLight ? "4px 0 24px rgba(0,0,0,0.02)" : "18px 0 60px rgba(0,0,0,0.28)",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#020617", 0.68),
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          color: textPrimary,
          background: isLight
            ? "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.96) 100%)"
            : "linear-gradient(180deg, rgba(18,18,31,0.96) 0%, rgba(9,10,20,0.94) 100%)",
          border: `1px solid ${isLight ? alpha("#94a3b8", 0.2) : alpha("#c4b5fd", 0.16)}`,
          boxShadow: isLight
            ? "0 34px 100px rgba(15,23,42,0.16)"
            : "0 34px 100px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
          backgroundImage: isLight
            ? "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.96) 100%)"
            : "linear-gradient(180deg, rgba(18,18,31,0.96) 0%, rgba(9,10,20,0.94) 100%)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: isLight ? textPrimary : "#f8fafc",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: isLight ? textPrimary : "#f8fafc",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${alpha("#c4b5fd", 0.1)}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: isLight ? textPrimary : "#f8fafc",
          backgroundColor: isLight ? "#ffffff" : alpha("#080814", 0.78),
          backgroundImage: isLight ? "none" : "linear-gradient(180deg, rgba(10,10,20,0.88) 0%, rgba(10,10,20,0.66) 100%)",
          borderBottom: isLight ? `1px solid ${alpha("#e5e7eb", 1)}` : `1px solid ${alpha("#c4b5fd", 0.13)}`,
          boxShadow: isLight ? "none" : undefined,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: textPrimary,
          backgroundColor: isLight ? alpha("#ffffff", 0.96) : alpha("#0f1020", 0.82),
          transition: "box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isLight ? alpha("#94a3b8", 0.24) : alpha("#c4b5fd", 0.16),
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(neonCyan, 0.36),
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 4px ${alpha(isLight ? "#fbbd05" : neonPurple, 0.18)}`,
            backgroundColor: isLight ? "#ffffff" : alpha("#111827", 0.92),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(isLight ? "#fbbd05" : neonPurple, 0.62),
          },
        },
        input: {
          color: textPrimary,
          "&::placeholder": {
            color: isLight ? alpha("#64748b", 0.62) : alpha("#cbd5e1", 0.62),
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: textSecondary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: "none",
          fontWeight: 800,
        },
        contained: {
          background: isLight 
            ? "linear-gradient(135deg, #fbbd05 0%, #f2a900 100%)" 
            : "linear-gradient(135deg, rgba(139,92,246,1) 0%, rgba(34,211,238,0.92) 100%)",
          boxShadow: isLight ? `0 8px 24px ${alpha("#fbbd05", 0.35)}` : `0 18px 34px ${alpha(neonPurple, 0.3)}`,
          color: "#ffffff",
          "&:hover": {
            boxShadow: isLight ? `0 12px 28px ${alpha("#fbbd05", 0.45)}` : `0 22px 42px ${alpha(neonCyan, 0.24)}`,
          },
          "&.Mui-disabled": {
            color: alpha(isLight ? "#000000" : "#ffffff", 0.62),
            background: isLight ? alpha("#9ca3af", 0.3) : alpha("#1e293b", 0.72),
          },
        },
        outlined: {
          color: textPrimary,
          borderColor: isLight ? alpha("#64748b", 0.22) : alpha("#c4b5fd", 0.2),
          backgroundColor: isLight ? alpha("#ffffff", 0.72) : alpha("#0f1020", 0.48),
          "&:hover": {
            borderColor: alpha(neonCyan, 0.5),
            backgroundColor: alpha(neonCyan, 0.08),
          },
        },
        text: {
          color: "#c4b5fd",
          "&:hover": {
            backgroundColor: alpha(neonPurple, 0.1),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 800,
          borderColor: alpha("#c4b5fd", 0.16),
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: isLight ? textSecondary : "#e5e7eb",
          transition: "transform 160ms ease, background-color 160ms ease, border-color 160ms ease",
          "&:hover": {
            transform: "translateY(-1px)",
            backgroundColor: isLight ? alpha("#000000", 0.04) : undefined,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          height: 8,
          backgroundColor: alpha("#c4b5fd", 0.12),
        },
        bar: {
          borderRadius: 999,
          background: `linear-gradient(90deg, ${neonPurple} 0%, ${neonCyan} 100%)`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: isLight ? "#475569" : "#c4b5fd",
          fontWeight: 800,
          backgroundColor: isLight ? alpha("#f8fafc", 0.9) : alpha("#8b5cf6", 0.08),
          borderBottom: `1px solid ${isLight ? alpha("#94a3b8", 0.18) : alpha("#c4b5fd", 0.14)}`,
        },
        body: {
          color: textPrimary,
          borderBottom: `1px solid ${isLight ? alpha("#94a3b8", 0.14) : alpha("#c4b5fd", 0.09)}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backdropFilter: "blur(14px)",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? alpha("#ffffff", 0.98) : alpha("#10101c", 0.92),
          border: `1px solid ${isLight ? alpha("#94a3b8", 0.22) : alpha("#c4b5fd", 0.16)}`,
          color: isLight ? "#0f172a" : "#f8fafc",
          boxShadow: isLight ? "0 20px 50px rgba(15,23,42,0.12)" : "0 20px 50px rgba(0,0,0,0.36)",
        },
      },
    },
  },
  });
}

export const theme = createAppTheme("light");
