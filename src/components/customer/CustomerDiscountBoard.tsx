import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { alpha, Box, Button, Chip, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { DiscountItem } from "../../types";
import { formatUzbekReadableIsoDate } from "../../utils/date";

interface CustomerDiscountBoardProps {
  items: DiscountItem[];
  onChooseBarber: (barberId: string) => void;
}

export function CustomerDiscountBoard({
  items,
  onChooseBarber,
}: CustomerDiscountBoardProps) {
  if (!items.length) {
    return null;
  }

  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        p: { xs: 1.4, md: 1.65 },
        borderRadius: "26px",
        background: isLight
          ? "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(254,252,232,0.95) 54%, rgba(249,250,251,0.95) 100%)"
          : "linear-gradient(135deg, rgba(46,32,16,0.88) 0%, rgba(23,18,29,0.78) 54%, rgba(10,11,22,0.72) 100%)",
        border: isLight ? `1px solid ${alpha("#f59e0b", 0.16)}` : `1px solid ${alpha("#f6c85f", 0.2)}`,
        boxShadow: isLight ? "0 12px 30px rgba(0,0,0,0.04)" : "0 22px 52px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(18px)",
      }}
    >
      <Stack spacing={1.3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Box>
            <Typography variant="h6">Faol skidkalar</Typography>
            <Typography variant="body2" color="text.secondary">
              Barberlar qo&apos;ygan hozirgi chegirmalar shu yerda ko&apos;rinadi.
            </Typography>
          </Box>

          <Chip
            icon={<LocalOfferRoundedIcon sx={{ fontSize: "1rem !important" }} />}
            label={`${items.length} ta taklif`}
            sx={{
              height: 34,
              borderRadius: "999px",
              backgroundColor: isLight ? alpha("#f59e0b", 0.1) : alpha("#d5a546", 0.12),
              color: isLight ? "#d97706" : "#fde68a",
              border: isLight ? `1px solid ${alpha("#f59e0b", 0.16)}` : `1px solid ${alpha("#f6c85f", 0.18)}`,
              "& .MuiChip-label": { px: 1.1, fontWeight: 700 },
            }}
          />
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 1,
          }}
        >
          {items.slice(0, 4).map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 1.15,
                borderRadius: "20px",
                backgroundColor: isLight ? alpha("#000000", 0.03) : alpha("#ffffff", 0.06),
                border: isLight ? `1px solid ${alpha("#000000", 0.08)}` : `1px solid ${alpha("#ffffff", 0.1)}`,
              }}
            >
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="center">
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1">{item.barberName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.title}
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    label={`${item.percent}% skidka`}
                    sx={{
                      height: 28,
                      borderRadius: "999px",
                      backgroundColor: isLight ? alpha("#10b981", 0.1) : alpha("#3aa66f", 0.12),
                      color: isLight ? "#047857" : "#86efac",
                      border: isLight ? `1px solid ${alpha("#10b981", 0.16)}` : `1px solid ${alpha("#34d399", 0.16)}`,
                      "& .MuiChip-label": { px: 1.05, fontWeight: 800 },
                    }}
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {formatUzbekReadableIsoDate(item.date)} | {item.startTime} - {item.endTime}
                </Typography>

                {item.description ? (
                  <Typography variant="body2" sx={{ color: isLight ? "#475569" : "#cbd5e1" }}>
                    {item.description}
                  </Typography>
                ) : null}

                <Button
                  variant="outlined"
                  endIcon={<ArrowOutwardRoundedIcon />}
                  onClick={() => onChooseBarber(item.barberId)}
                  sx={{
                    alignSelf: "flex-start",
                    minHeight: 38,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Shu barberni tanlash
                </Button>
              </Stack>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
