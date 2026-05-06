import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import TelegramIcon from "@mui/icons-material/Telegram";
import { alpha, Box, Stack, Typography } from "@mui/material";
import { TelegramQRCode } from "../components/common/TelegramQRCode";
import { PageHeader } from "../components/common/PageHeader";
import { PreferencesPanel, usePreferences } from "../lib/preferences";
import { AdminUser } from "../types";

interface AdminSettingsPageProps {
  currentUser: AdminUser;
  telegramBotUsername?: string;
  reminderMinutes: number;
}

export function AdminSettingsPage({
  currentUser,
  telegramBotUsername,
  reminderMinutes,
}: AdminSettingsPageProps) {
  const { locale, t } = usePreferences();

  return (
    <Stack spacing={2.4}>
      <PageHeader
        title={t("Sozlamalar")}
        subtitle={
          locale === "ru"
            ? "Профиль администратора, язык, режим экрана и Telegram бот находятся здесь."
            : "Admin profilingiz, til, ko'rinish rejimi va Telegram bot ulanishi shu yerda."
        }
        icon={<SettingsRoundedIcon sx={{ fontSize: "1.2rem" }} />}
        eyebrow={t("Admin paneli")}
      />

      <PreferencesPanel />

      <Box
        sx={{
          p: { xs: 1.35, md: 1.7 },
          borderRadius: "26px",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(18,18,31,0.9) 0%, rgba(8,10,20,0.76) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.9) 100%)",
          border: (theme) =>
            `1px solid ${theme.palette.mode === "light" ? alpha("#0ea5e9", 0.16) : alpha("#22d3ee", 0.16)}`,
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 18px 50px rgba(15,23,42,0.08)"
              : "0 24px 70px rgba(0,0,0,0.26)",
          backdropFilter: (theme) => theme.palette.mode === "light" ? "none" : "blur(20px)",
        }}
      >
        <Stack spacing={1.35}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "15px",
                display: "grid",
                placeItems: "center",
                backgroundColor: alpha("#229ed9", 0.18),
                color: "#7dd3fc",
              }}
            >
              <TelegramIcon />
            </Box>
            <Box>
              <Typography variant="h6">{t("Telegram bot")}</Typography>
              <Typography variant="body2" color="text.secondary">
                {locale === "ru"
                  ? "Подключите Telegram для системных уведомлений и новых бронирований."
                  : "Admin xabarlari va umumiy bron bildirishnomalari uchun ulaning."}
              </Typography>
            </Box>
          </Stack>

          {telegramBotUsername ? (
            <TelegramQRCode
              botUsername={telegramBotUsername}
              role="admin"
              subjectId={currentUser.id}
              linked={Boolean(currentUser.telegramConnected)}
              chatId={currentUser.telegramChatId ?? undefined}
              compact
              size={132}
              title={currentUser.telegramConnected ? "Telegram sozlamalari" : "Telegram botni ulash"}
              description={
                currentUser.telegramConnected
                  ? "Admin bildirishnomalari va yangi bronlar shu botga boradi."
                  : `Start bosing. Yangi bron, status va ${reminderMinutes} daqiqa oldingi eslatmalar Telegramga keladi.`
              }
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Telegram bot username backend sozlamalaridan topilmadi.
            </Typography>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
