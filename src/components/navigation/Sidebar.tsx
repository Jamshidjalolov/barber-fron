import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import {
  alpha,
  Avatar,
  Box,
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { usePreferences } from "../../lib/preferences";
import { AdminUser, PageKey } from "../../types";
import { BrandLogo } from "../common/BrandLogo";
import { LogoutConfirmDialog } from "./LogoutConfirmDialog";

interface SidebarProps {
  activePage: PageKey;
  currentUser: AdminUser;
  onLogout: () => void;
  onPageChange: (page: PageKey) => void;
}

const navigationItems = [
  { key: "dashboard" as const, label: "Bosh sahifa", icon: DashboardRoundedIcon },
  { key: "barberlar" as const, label: "Barberlar", icon: Groups2RoundedIcon },
  { key: "navbatlar" as const, label: "Navbatlar", icon: EventNoteRoundedIcon },
  { key: "skidkalar" as const, label: "Skidkalar", icon: LocalOfferRoundedIcon },
  { key: "sozlamalar" as const, label: "Sozlamalar", icon: SettingsRoundedIcon },
];

function formatLoginLabel(username: string) {
  return username.includes("@") ? username : `@${username}`;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "AD";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function Sidebar({
  activePage,
  currentUser,
  onLogout,
  onPageChange,
}: SidebarProps) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { t } = usePreferences();
  const theme = useTheme();

  return (
    <>
      <Stack
        sx={{
          height: "100%",
          p: { xs: 2, md: 2.2 },
          gap: 3.2,
          background: (theme) => theme.palette.mode === "light"
            ? "none"
            : "radial-gradient(circle at 14% 4%, rgba(139,92,246,0.2), transparent 28%), radial-gradient(circle at 88% 20%, rgba(34,211,238,0.12), transparent 26%)",
        }}
      >
        <BrandLogo badgeSize={48} tone={theme.palette.mode === "light" ? "dark" : "light"} />

        <List
          sx={{
            p: 0.7,
            display: "grid",
            gap: 0.75,
            borderRadius: "20px",
            backgroundColor: (theme) => theme.palette.mode === "light" ? alpha("#000000", 0.02) : alpha("#ffffff", 0.05),
            border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#000000", 0.05)}` : `1px solid ${alpha("#c4b5fd", 0.12)}`,
            boxShadow: (theme) => theme.palette.mode === "light" ? "none" : "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {navigationItems.map(({ key, label, icon: Icon }) => {
            const selected = activePage === key;

            return (
              <ListItemButton
                key={key}
                selected={selected}
                onClick={() => onPageChange(key)}
                sx={{
                  minHeight: 48,
                  borderRadius: "14px",
                  px: 1.6,
                  color: selected ? (theme) => theme.palette.mode === "light" ? "#fff" : "#fff" : "text.secondary",
                  background: selected
                    ? (theme) => theme.palette.mode === "light" ? "linear-gradient(135deg, #fbbd05 0%, #f2a900 100%)" : "linear-gradient(135deg, rgba(139,92,246,1) 0%, rgba(34,211,238,0.86) 100%)"
                    : "transparent",
                  "&.Mui-selected": {
                    background: (theme) => theme.palette.mode === "light"
                      ? "linear-gradient(135deg, #fbbd05 0%, #f2a900 100%)"
                      : "linear-gradient(135deg, rgba(139,92,246,1) 0%, rgba(34,211,238,0.86) 100%)",
                    color: "#fff",
                    boxShadow: (theme) => theme.palette.mode === "light" ? `0 8px 24px ${alpha("#fbbd05", 0.35)}` : `0 16px 28px ${alpha("#8b5cf6", 0.28)}`,
                  },
                  "&.Mui-selected:hover": {
                    background: (theme) => theme.palette.mode === "light"
                      ? "linear-gradient(135deg, #fbbd05 0%, #f2a900 100%)"
                      : "linear-gradient(135deg, rgba(139,92,246,1) 0%, rgba(34,211,238,0.86) 100%)",
                  },
                  "&:hover": {
                    backgroundColor: selected ? undefined : alpha("#ffffff", 0.07),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>
                  <Icon sx={{ fontSize: "1.15rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t(label)}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: "inherit",
                    fontSize: "0.92rem",
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Box
          sx={{
            mt: "auto",
            p: 1,
            borderRadius: "18px",
            background: (theme) => theme.palette.mode === "light"
              ? "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.8) 100%)"
              : "linear-gradient(180deg, rgba(21,21,36,0.78) 0%, rgba(11,12,24,0.7) 100%)",
            border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#e5e7eb", 1)}` : `1px solid ${alpha("#c4b5fd", 0.14)}`,
            boxShadow: (theme) => theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.04)" : "0 18px 42px rgba(0, 0, 0, 0.24)",
            backdropFilter: (theme) => theme.palette.mode === "light" ? "none" : "blur(18px)",
          }}
        >
          <Stack spacing={0.85}>
            <Stack
              direction="row"
              spacing={0.9}
              alignItems="center"
              sx={{
                p: 0.75,
                borderRadius: "14px",
                backgroundColor: (theme) => theme.palette.mode === "light" ? alpha("#000000", 0.04) : alpha("#ffffff", 0.06),
                border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#e5e7eb", 1)}` : `1px solid ${alpha("#c4b5fd", 0.11)}`,
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "13px",
                  bgcolor: "#8b5cf6",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  boxShadow: `0 12px 24px ${alpha("#8b5cf6", 0.24)}`,
                }}
              >
                {getInitials(currentUser.name)}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    lineHeight: 1.1,
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {currentUser.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  title={formatLoginLabel(currentUser.username)}
                  sx={{
                    mt: 0.2,
                    fontSize: "0.76rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {formatLoginLabel(currentUser.username)}
                </Typography>
              </Box>

              <IconButton
                onClick={() => setLogoutOpen(true)}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "11px",
                  backgroundColor: (theme) => theme.palette.mode === "light" ? alpha("#000000", 0.04) : "#111111",
                  color: (theme) => theme.palette.mode === "light" ? "text.secondary" : "#fff",
                  border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#000000", 0.1)}` : `1px solid ${alpha("#ffffff", 0.1)}`,
                  flexShrink: 0,
                  "&:hover": {
                    backgroundColor: alpha("#fb7185", 0.22),
                    color: "#e11d48",
                  },
                }}
              >
                <LogoutRoundedIcon sx={{ fontSize: "0.95rem" }} />
              </IconButton>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.8}>
              <Chip
                label={currentUser.role}
                size="small"
                sx={{
                  height: 25,
                  borderRadius: "10px",
                  backgroundColor: (theme) => theme.palette.mode === "light" ? alpha("#8b5cf6", 0.1) : alpha("#8b5cf6", 0.18),
                  color: (theme) => theme.palette.mode === "light" ? "#6d28d9" : "#ddd6fe",
                  border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#8b5cf6", 0.2)}` : `1px solid ${alpha("#c4b5fd", 0.16)}`,
                  "& .MuiChip-label": {
                    px: 1.05,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  },
                }}
              />

              <Stack
                direction="row"
                spacing={0.55}
                alignItems="center"
                sx={{
                  px: 0.8,
                  py: 0.42,
                  borderRadius: "999px",
                  backgroundColor: alpha("#34d399", 0.12),
                  border: `1px solid ${alpha("#34d399", 0.14)}`,
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "#34d399",
                    boxShadow: `0 0 12px ${alpha("#34d399", 0.8)}`,
                  }}
                />
                <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#86efac" }}>
                  {t("Online")}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      <LogoutConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          onLogout();
        }}
      />
    </>
  );
}
