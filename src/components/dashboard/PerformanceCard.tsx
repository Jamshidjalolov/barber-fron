import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import { alpha, Avatar, Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import { PerformanceItem } from "../../types";
import { SectionCard } from "../common/SectionCard";
import { usePreferences } from "../../lib/preferences";

interface PerformanceCardProps {
  items: PerformanceItem[];
}

export function PerformanceCard({ items }: PerformanceCardProps) {
  const { t } = usePreferences();
  const safeItems = items.length
    ? items
    : [{ name: t("Hozircha yo'q"), initials: "H", avatarColor: "#6d7486", completed: 0, total: 0 }];
  const bestPerformer = [...safeItems].sort(
    (left, right) =>
      right.completed / Math.max(right.total, 1) - left.completed / Math.max(left.total, 1),
  )[0];

  return (
    <SectionCard sx={{ height: "100%" }}>
      <Stack spacing={1.55}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Stack spacing={0.45}>
            <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.08rem" } }}>
              {t("Barberlar holati")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.84rem" }}>
              {t("Kim nechta mijozga xizmat qildi")}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={0.6}
            alignItems="center"
            sx={{
              px: 1,
              py: 0.58,
              borderRadius: "999px",
              backgroundColor: alpha("#f6c85f", 0.12),
              color: "#fde68a",
              border: `1px solid ${alpha("#f6c85f", 0.16)}`,
            }}
          >
            <WorkspacePremiumRoundedIcon sx={{ fontSize: "0.92rem" }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {bestPerformer.name} {t("oldinda")}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={0.9}>
          {safeItems.map((item) => {
            const progress = item.total > 0 ? (item.completed / item.total) * 100 : 0;

            return (
              <Card
                key={item.name}
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#e5e7eb", 1)}` : `1px solid ${alpha("#c4b5fd", 0.12)}`,
                  background: (theme) => theme.palette.mode === "light"
                    ? "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(249,250,251,0.5) 100%)"
                    : "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.035) 100%)",
                  backdropFilter: (theme) => theme.palette.mode === "light" ? "none" : "blur(14px)",
                  boxShadow: (theme) => theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.02)" : "none",
                }}
              >
                <CardContent sx={{ p: 1.15, "&:last-child": { pb: 1.15 } }}>
                  <Stack spacing={0.9}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={0.85}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                      <Stack direction="row" spacing={0.9} alignItems="center">
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: item.avatarColor,
                            color: "#fff",
                            fontWeight: 700,
                            borderRadius: "13px",
                            boxShadow: `0 10px 18px ${alpha(item.avatarColor, 0.14)}`,
                          }}
                        >
                          {item.initials}
                        </Avatar>

                        <Stack spacing={0.2}>
                          <Typography variant="subtitle2" sx={{ fontSize: "0.95rem" }}>
                            {item.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", fontSize: "0.76rem" }}
                          >
                            {item.completed} {t("ta xizmat tugadi")}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Typography
                        variant="caption"
                        sx={{
                          px: 0.75,
                          py: 0.35,
                          borderRadius: "999px",
                          backgroundColor: alpha(item.avatarColor, 0.12),
                          color: item.avatarColor,
                          fontWeight: 700,
                        }}
                      >
                        {Math.round(progress)}%
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.55} flexWrap="wrap" useFlexGap>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 0.75,
                          py: 0.35,
                          borderRadius: "999px",
                          backgroundColor: (theme) => theme.palette.mode === "light" ? alpha("#000000", 0.04) : alpha("#ffffff", 0.06),
                          border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#000000", 0.08)}` : `1px solid ${alpha("#c4b5fd", 0.1)}`,
                          color: "text.secondary",
                          fontWeight: 700,
                        }}
                      >
                        {item.completed} {t("ta tugagan")}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 0.75,
                          py: 0.35,
                          borderRadius: "999px",
                          backgroundColor: (theme) => theme.palette.mode === "light" ? alpha("#000000", 0.03) : alpha("#ffffff", 0.05),
                          border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#000000", 0.06)}` : `1px solid ${alpha("#c4b5fd", 0.1)}`,
                          color: "text.secondary",
                          fontWeight: 700,
                        }}
                      >
                        {item.total} {t("ta jami")}
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 8,
                        borderRadius: "999px",
                        backgroundColor: alpha(item.avatarColor, 0.12),
                        "& .MuiLinearProgress-bar": {
                          borderRadius: "999px",
                          background: `linear-gradient(90deg, ${alpha(
                            item.avatarColor,
                            0.8,
                          )} 0%, ${item.avatarColor} 100%)`,
                        },
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </SectionCard>
  );
}
