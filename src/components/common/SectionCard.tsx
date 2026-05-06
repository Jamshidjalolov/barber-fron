import { Paper, PaperProps } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionCardProps extends PaperProps {
  children: ReactNode;
}

export function SectionCard({ children, sx, ...rest }: SectionCardProps) {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      {...rest}
      sx={{
        p: { xs: 2, md: 2.6 },
        borderRadius: "22px",
        background: (theme) => theme.palette.mode === "light"
          ? "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.9) 100%)"
          : "linear-gradient(180deg, rgba(20,20,34,0.84) 0%, rgba(11,12,24,0.72) 100%)",
        border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha("#e5e7eb", 1)}` : `1px solid ${alpha("#c4b5fd", 0.14)}`,
        boxShadow: (theme) => theme.palette.mode === "light" ? "0 8px 30px rgba(0,0,0,0.04)" : `0 22px 52px ${alpha("#000", 0.32)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`,
        backdropFilter: (theme) => theme.palette.mode === "light" ? "none" : "blur(22px)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: (theme) => theme.palette.mode === "light"
            ? "linear-gradient(135deg, rgba(251,189,5,0.08) 0%, transparent 32%, rgba(34,211,238,0.04) 100%)"
            : "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, transparent 32%, rgba(34,211,238,0.08) 100%)",
        },
        "& > *": {
          position: "relative",
          zIndex: 1,
        },
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}
