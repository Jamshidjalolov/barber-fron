import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { alpha, Box, Stack, Typography } from "@mui/material";
import { BookingItem } from "../../types";
import { BookingsTable } from "../bookings/BookingsTable";
import { SectionCard } from "../common/SectionCard";
import { usePreferences } from "../../lib/preferences";

interface RecentBookingsCardProps {
  items: BookingItem[];
}

export function RecentBookingsCard({ items }: RecentBookingsCardProps) {
  const { t } = usePreferences();
  
  return (
    <SectionCard>
      <Stack spacing={1.6}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={0.9}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Stack spacing={0.35}>
            <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.08rem" } }}>
              {t("So'nggi navbatlar")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.84rem" }}>
              {t("Bugungi eng yaqin 6 ta navbat")}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.45}
            alignItems="center"
            sx={{
              px: 0.9,
              py: 0.45,
              backgroundColor: (theme) => theme.palette.mode === "light" ? alpha("#000000", 0.04) : alpha("#ffffff", 0.06),
              border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#e5e7eb", 1)}` : `1px solid ${alpha("#c4b5fd", 0.12)}`,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
              {t("Barchasi")}
            </Typography>
            <ArrowOutwardRoundedIcon fontSize="small" color="action" />
          </Stack>
        </Stack>

        <Box sx={{ borderRadius: "14px", overflow: "hidden" }}>
          <BookingsTable items={items} />
        </Box>
      </Stack>
    </SectionCard>
  );
}
