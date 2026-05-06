import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { alpha, Grid, Stack, Typography } from "@mui/material";
import { PageHeader } from "../components/common/PageHeader";
import { BookingsChartCard } from "../components/dashboard/BookingsChartCard";
import { PerformanceCard } from "../components/dashboard/PerformanceCard";
import { RecentBookingsCard } from "../components/dashboard/RecentBookingsCard";
import { StatsOverview } from "../components/dashboard/StatsOverview";
import { BarberBookingSummary, BookingItem, DiscountItem, PerformanceItem, StatMetric } from "../types";
import { formatUzbekReadableDate } from "../utils/date";
import { usePreferences } from "../lib/preferences";

interface DashboardPageProps {
  metrics: StatMetric[]; 
  chartItems: BarberBookingSummary[];
  performanceItems: PerformanceItem[];
  recentItems: BookingItem[];
  discounts: DiscountItem[];
}

export function DashboardPage({
  metrics,
  chartItems,
  performanceItems,
  recentItems,
  discounts,
}: DashboardPageProps) {
  const activeDiscounts = discounts.filter((item) => item.isActive);
  const { t, locale } = usePreferences();

  // Metric larni tarjima qilish uchun ularni aylanib chiqamiz
  const translateNote = (note: string) => {
    if (note.includes("ta navbat bor")) return locale === "ru" ? `Сегодня ${note.replace(/\D/g, "")} записей` : note;
    if (note.includes("tasi hozir band")) {
      const nums = note.match(/\d+/g);
      return locale === "ru" ? `Из ${nums?.[0]} барберов ${nums?.[1]} сейчас заняты` : note;
    }
    if (note.includes("ta xizmat tugadi")) return locale === "ru" ? `Сегодня завершено ${note.replace(/\D/g, "")} услуг` : note;
    if (note.includes("Eng yaqin navbat")) {
      const time = note.match(/\d{2}:\d{2}/);
      return locale === "ru" ? `Ближайшая запись в ${time?.[0]}` : note;
    }
    return t(note);
  };

  const translatedMetrics = metrics.map(metric => ({
    ...metric,
    title: t(metric.title),
    note: translateNote(metric.note)
  }));

  return (
    <Stack spacing={1.7}>
      <PageHeader
        title={t("Bosh sahifa")}
        subtitle={t("Bugungi ishlar qisqacha")}
        meta={locale === "ru" ? new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }) : formatUzbekReadableDate(new Date())}
        icon={<DashboardRoundedIcon sx={{ fontSize: "1.2rem" }} />}
        eyebrow={t("Admin paneli")}
      />

      <StatsOverview items={translatedMetrics} />

      {activeDiscounts.length ? (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            px: 1.35,
            py: 1.15,
            borderRadius: "20px",
            border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#10b981", 0.2)}` : `1px solid ${alpha("#34d399", 0.16)}`,
            backgroundColor: (theme) => theme.palette.mode === "light" ? alpha("#10b981", 0.06) : alpha("#34d399", 0.08),
            backdropFilter: (theme) => theme.palette.mode === "light" ? "none" : "blur(14px)",
          }}
        >
          <LocalOfferRoundedIcon sx={{ color: (theme) => theme.palette.mode === "light" ? "#059669" : "#86efac" }} />
          <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === "light" ? "#047857" : "#bbf7d0", fontWeight: 700 }}>
            {locale === "ru" ? `Сейчас есть ${activeDiscounts.length} активных скидок.` : `Hozir ${activeDiscounts.length} ta faol skidka bor.`}
          </Typography>
        </Stack>
      ) : null}

      <Grid container spacing={1.7}>
        <Grid item xs={12} lg={7}>
          <BookingsChartCard items={chartItems} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <PerformanceCard items={performanceItems} />
        </Grid>
      </Grid>

      <RecentBookingsCard items={recentItems} />
    </Stack>
  );
}
