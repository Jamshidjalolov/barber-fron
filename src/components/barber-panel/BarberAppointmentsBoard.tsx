import CallRoundedIcon from "@mui/icons-material/CallRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { alpha, Box, Button, Chip, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { BookingItem, BookingStatus } from "../../types";

export type BarberScheduleFilter = "all" | "pending" | "completed" | "rejected";

interface BarberAppointmentsBoardProps {
  items: BookingItem[];
  selectedDateLabel: string;
  total: number;
  pending: number;
  completed: number;
  rejected: number;
  filter: BarberScheduleFilter;
  highlightedBookingId: string | null;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrevDate: () => void;
  onNextDate: () => void;
  onFilterChange: (filter: BarberScheduleFilter) => void;
  onOpenDetails: (booking: BookingItem) => void;
  onCopyPhone: (booking: BookingItem) => void;
  onAdvanceStatus: (booking: BookingItem) => void;
  onRejectBooking: (booking: BookingItem) => void;
}

export function BarberAppointmentsBoard({
  items,
  selectedDateLabel,
  total,
  pending,
  completed,
  rejected,
  filter,
  highlightedBookingId,
  canGoPrev,
  canGoNext,
  onPrevDate,
  onNextDate,
  onFilterChange,
  onOpenDetails,
  onCopyPhone,
  onAdvanceStatus,
  onRejectBooking,
}: BarberAppointmentsBoardProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        p: { xs: 1.5, md: 1.8 },
        borderRadius: "28px",
        background: isLight
          ? "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(249,250,251,0.8) 100%)"
          : "linear-gradient(180deg, rgba(19,20,34,0.86) 0%, rgba(10,11,22,0.72) 100%)",
        border: isLight ? `1px solid ${alpha("#000000", 0.08)}` : `1px solid ${alpha("#c4b5fd", 0.14)}`,
        boxShadow: isLight ? "0 12px 30px rgba(0,0,0,0.04)" : "0 24px 64px rgba(0,0,0,0.28)",
        backdropFilter: "blur(22px)",
      }}
    >
      <Stack spacing={1.6}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={1.4}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", lg: "center" }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontSize: { xs: "1.55rem", md: "1.8rem" } }}>
              Kunlik jadval
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.35 }}>
              Bugungi navbatlar, statuslar va mijozlar bilan ishlash shu yerda.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={onPrevDate}
              disabled={!canGoPrev}
              sx={{
                width: 44,
                height: 44,
                border: isLight ? `1px solid ${alpha("#000000", 0.08)}` : `1px solid ${alpha("#c4b5fd", 0.14)}`,
                backgroundColor: isLight ? alpha("#000000", 0.04) : alpha("#ffffff", 0.06),
              }}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>

            <Box sx={{ textAlign: "center", minWidth: { sm: 220 } }}>
              <Typography variant="h6">Tanlangan kun</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedDateLabel}
              </Typography>
            </Box>

            <IconButton
              onClick={onNextDate}
              disabled={!canGoNext}
              sx={{
                width: 44,
                height: 44,
                border: isLight ? `1px solid ${alpha("#000000", 0.08)}` : `1px solid ${alpha("#c4b5fd", 0.14)}`,
                backgroundColor: isLight ? alpha("#000000", 0.04) : alpha("#ffffff", 0.06),
              }}
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <LegendChip tone="pending" label={`${pending} ta kutilmoqda`} />
          <LegendChip tone="done" label={`${completed} ta tugallangan`} />
          <LegendChip tone="rejected" label={`${rejected} ta rad etilgan`} />
          <LegendChip tone="neutral" label={`${total} ta jami`} />
        </Stack>

        <Box
          sx={{
            p: 0.55,
            borderRadius: "20px",
            backgroundColor: isLight ? alpha("#000000", 0.03) : alpha("#ffffff", 0.05),
            border: isLight ? `1px solid ${alpha("#000000", 0.08)}` : `1px solid ${alpha("#c4b5fd", 0.1)}`,
            display: "inline-grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 0.6,
            width: { xs: "100%", md: "fit-content" },
          }}
        >
          {[
            { key: "all", label: "Hammasi" },
            { key: "pending", label: "Kutilmoqda" },
            { key: "completed", label: "Tugallangan" },
            { key: "rejected", label: "Rad etilgan" },
          ].map((item) => {
            const active = filter === item.key;

            return (
              <Button
                key={item.key}
                onClick={() => onFilterChange(item.key as BarberScheduleFilter)}
                variant={active ? "contained" : "text"}
                sx={{
                  minHeight: 44,
                  px: 2,
                  borderRadius: "16px",
                  boxShadow: active ? "0 10px 20px rgba(17,17,17,0.08)" : "none",
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        <Stack spacing={1.05}>
          {items.length === 0 ? (
            <Box
              sx={{
                p: 2.2,
                borderRadius: "22px",
                border: isLight ? `1px dashed ${alpha("#000000", 0.12)}` : `1px dashed ${alpha("#c4b5fd", 0.22)}`,
                textAlign: "center",
              }}
            >
              <Typography variant="body1">
                {total > 0
                  ? "Bu kunda navbat bor, lekin hozirgi filter bo'yicha ko'rinmayapti."
                  : "Bu kunga navbat topilmadi."}
              </Typography>
            </Box>
          ) : (
            items.map((booking) => {
              const isNew = highlightedBookingId === booking.id;
              const statusView = getStatusView(booking.status, isLight);

              return (
                <Box
                  component={motion.div}
                  layout
                  key={booking.id}
                  onClick={() => onOpenDetails(booking)}
                  sx={{
                    p: { xs: 1.35, md: 1.5 },
                    borderRadius: "24px",
                    border: `1px solid ${alpha(isNew ? (isLight ? "#d97706" : "#f6c85f") : (isLight ? "#e5e7eb" : "#c4b5fd"), isNew ? (isLight ? 0.3 : 0.24) : (isLight ? 1 : 0.13))}`,
                    background: isNew
                      ? isLight ? "linear-gradient(180deg, rgba(254,243,199,0.9) 0%, rgba(255,251,235,0.78) 100%)" : "linear-gradient(180deg, rgba(49,36,17,0.9) 0%, rgba(19,20,34,0.78) 100%)"
                      : isLight ? "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(249,250,251,0.5) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.035) 100%)",
                    boxShadow: isNew
                      ? `0 20px 44px ${alpha(isLight ? "#d97706" : "#f6c85f", 0.16)}`
                      : isLight ? "0 4px 12px rgba(0,0,0,0.02)" : "0 12px 28px rgba(0,0,0,0.16)",
                    cursor: "pointer",
                    transition: "transform 160ms ease, box-shadow 160ms ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: isNew
                        ? `0 26px 52px ${alpha("#f6c85f", 0.2)}`
                        : `0 20px 40px ${alpha("#8b5cf6", 0.14)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
                      gap: 1.2,
                      alignItems: "start",
                    }}
                  >
                    <Stack spacing={1}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={0.8}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="h6">{booking.customer}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            #{booking.id}
                          </Typography>
                        </Box>

                        {isNew ? (
                          <Chip
                            size="small"
                            label="Yangi bron"
                            sx={{
                              backgroundColor: isLight ? alpha("#f59e0b", 0.1) : alpha("#f6c85f", 0.16),
                              color: isLight ? "#d97706" : "#fde68a",
                              border: `1px solid ${alpha(isLight ? "#f59e0b" : "#f6c85f", 0.18)}`,
                            }}
                          />
                        ) : null}
                      </Stack>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.4}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <InfoLine icon={<ScheduleRoundedIcon sx={{ fontSize: "1rem" }} />} label={formatTimeLabel(booking.time)} />
                        <InfoLine icon={<CallRoundedIcon sx={{ fontSize: "1rem" }} />} label={booking.phone} />
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        {booking.service}
                      </Typography>

                      {booking.status === "Rad etildi" && booking.rejectionReason ? (
                        <Box
                          sx={{
                            px: 1,
                            py: 0.85,
                            borderRadius: "14px",
                            backgroundColor: isLight ? alpha("#ef4444", 0.1) : alpha("#fb7185", 0.1),
                            border: `1px solid ${alpha(isLight ? "#ef4444" : "#fb7185", 0.14)}`,
                          }}
                        >
                          <Typography variant="caption" sx={{ color: isLight ? "#b91c1c" : "#fecdd3", fontWeight: 700 }}>
                            Rad etish sababi
                          </Typography>
                          <Typography variant="body2" sx={{ color: isLight ? "#7f1d1d" : "#ffe4e6", mt: 0.2 }}>
                            {booking.rejectionReason}
                          </Typography>
                        </Box>
                      ) : null}
                    </Stack>

                    <Stack direction={{ xs: "row", md: "column" }} spacing={0.9} alignItems={{ md: "flex-end" }}>
                      <Chip
                        label={statusView.label}
                        sx={{
                          backgroundColor: statusView.bg,
                          color: statusView.color,
                        }}
                      />

                      {booking.status === "Tugallandi" ? (
                        <Chip
                          icon={<CheckCircleRoundedIcon />}
                          label="Yakunlangan"
                          sx={{
                            backgroundColor: isLight ? alpha("#10b981", 0.1) : alpha("#34d399", 0.12),
                            color: isLight ? "#047857" : "#86efac",
                            "& .MuiChip-icon": { color: isLight ? "#047857" : "#86efac" },
                          }}
                        />
                      ) : booking.status === "Rad etildi" ? (
                        <Chip
                          icon={<ReportProblemRoundedIcon />}
                          label="Rad etilgan"
                          sx={{
                            backgroundColor: isLight ? alpha("#ef4444", 0.1) : alpha("#fb7185", 0.12),
                            color: isLight ? "#b91c1c" : "#fecdd3",
                            "& .MuiChip-icon": { color: isLight ? "#b91c1c" : "#fecdd3" },
                          }}
                        />
                      ) : (
                        <Stack direction="row" spacing={0.8}>
                          <Button
                            variant="outlined"
                            onClick={(event) => {
                              event.stopPropagation();
                              onCopyPhone(booking);
                            }}
                            sx={{ minHeight: 40, borderRadius: "14px" }}
                          >
                            Qo&apos;ng&apos;iroq
                          </Button>
                          {booking.status === "Kutilmoqda" ? (
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={(event) => {
                                event.stopPropagation();
                                onRejectBooking(booking);
                              }}
                              sx={{ minHeight: 40, borderRadius: "14px" }}
                            >
                              Rad etish
                            </Button>
                          ) : null}
                          <Button
                            variant="contained"
                            onClick={(event) => {
                              event.stopPropagation();
                              onAdvanceStatus(booking);
                            }}
                            sx={{ minHeight: 40, borderRadius: "14px" }}
                          >
                            {getActionLabel(booking.status)}
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </Box>
                </Box>
              );
            })
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

function LegendChip({
  label,
  tone,
}: {
  label: string;
  tone: "pending" | "done" | "neutral" | "rejected";
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const styles =
    tone === "done"
      ? { bg: isLight ? alpha("#10b981", 0.12) : alpha("#34d399", 0.12), color: isLight ? "#047857" : "#86efac", icon: isLight ? "#059669" : "#34d399" }
      : tone === "rejected"
        ? { bg: isLight ? alpha("#ef4444", 0.12) : alpha("#fb7185", 0.12), color: isLight ? "#b91c1c" : "#fecdd3", icon: isLight ? "#dc2626" : "#fb7185" }
      : tone === "pending"
        ? { bg: isLight ? alpha("#f59e0b", 0.12) : alpha("#f6c85f", 0.12), color: isLight ? "#b45309" : "#fde68a", icon: isLight ? "#d97706" : "#f6c85f" }
        : { bg: isLight ? alpha("#000000", 0.06) : alpha("#ffffff", 0.06), color: isLight ? "#475569" : "#cbd5e1", icon: isLight ? "#64748b" : "#8d96ad" };

  return (
    <Stack
      direction="row"
      spacing={0.65}
      alignItems="center"
      sx={{
        px: 1.05,
        py: 0.7,
        borderRadius: "999px",
        backgroundColor: styles.bg,
      }}
    >
      <RadioButtonUncheckedRoundedIcon sx={{ fontSize: "0.8rem", color: styles.icon }} />
      <Typography variant="body2" sx={{ color: styles.color }}>
        {label}
      </Typography>
    </Stack>
  );
}

function InfoLine({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <Stack direction="row" spacing={0.65} alignItems="center">
      <Box sx={{ color: "#8d96ad", display: "grid", placeItems: "center" }}>{icon}</Box>
      <Typography variant="body1">{label}</Typography>
    </Stack>
  );
}

function formatTimeLabel(time: string) {
  const [rawHour, rawMinute] = time.split(":").map(Number);
  const suffix = rawHour >= 12 ? "PM" : "AM";
  const hour = rawHour % 12 || 12;
  return `${hour}:${String(rawMinute).padStart(2, "0")} ${suffix}`;
}

function getStatusView(status: BookingStatus, isLight: boolean) {
  if (status === "Rad etildi") {
    return {
      label: "Rad etildi",
      bg: isLight ? alpha("#ef4444", 0.1) : alpha("#fb7185", 0.14),
      color: isLight ? "#b91c1c" : "#fecdd3",
    };
  }

  if (status === "Tugallandi") {
    return {
      label: "Tayyor",
      bg: isLight ? alpha("#10b981", 0.1) : alpha("#34d399", 0.14),
      color: isLight ? "#047857" : "#86efac",
    };
  }

  if (status === "Jarayonda") {
    return {
      label: "Jarayonda",
      bg: isLight ? alpha("#0ea5e9", 0.1) : alpha("#22d3ee", 0.12),
      color: isLight ? "#0369a1" : "#67e8f9",
    };
  }

  if (status === "Tasdiqlandi") {
    return {
      label: "Qabul qilindi",
      bg: isLight ? alpha("#10b981", 0.1) : alpha("#34d399", 0.14),
      color: isLight ? "#047857" : "#86efac",
    };
  }

  return {
    label: "Kutilmoqda",
    bg: isLight ? alpha("#f59e0b", 0.1) : alpha("#f6c85f", 0.14),
    color: isLight ? "#b45309" : "#fde68a",
  };
}

function getActionLabel(status: BookingStatus) {
  if (status === "Kutilmoqda") {
    return "Qabul qilish";
  }

  if (status === "Tasdiqlandi") {
    return "Tugatish";
  }

  return "Tugatish";
}
