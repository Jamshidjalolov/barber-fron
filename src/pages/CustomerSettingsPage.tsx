import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { TelegramQRCode } from "../components/common/TelegramQRCode";
import { PageHeader } from "../components/common/PageHeader";
import { CustomerAccount } from "../types";
import { useState } from "react";

interface CustomerSettingsPageProps {
  currentUser: CustomerAccount;
  telegramBotUsername?: string;
  reminderMinutes: number;
  onUpdateLocalProfile: (patch: Partial<CustomerAccount>) => void;
  onBack: () => void;
}

export function CustomerSettingsPage({
  currentUser,
  telegramBotUsername,
  reminderMinutes,
  onUpdateLocalProfile,
  onBack,
}: CustomerSettingsPageProps) {
  const [name, setName] = useState(currentUser.name ?? "");
  const [phone, setPhone] = useState(currentUser.phone ?? "");

  const handleSave = () => {
    onUpdateLocalProfile({ name: name.trim(), phone: phone.trim() });
    onBack();
  };

  return (
    <Stack spacing={2.4}>
      <PageHeader
        title="Sozlamalar"
        subtitle="Profilingizni tahrirlash va Telegram botga ulash shu yerda."
        icon={<SettingsRoundedIcon sx={{ fontSize: "1.2rem" }} />}
        eyebrow="Foydalanuvchi"
      />

      <Box sx={{ p: 1.5 }}>
        <Stack spacing={1.6} sx={{ maxWidth: 720 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 0.6 }}>
              To'liq ism
            </Typography>
            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 0.6 }}>
              Telefon raqami
            </Typography>
            <TextField fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Box>

          <Stack spacing={1.1}>
            <Typography variant="subtitle1">Telegram bot</Typography>
            {telegramBotUsername ? (
              <TelegramQRCode
                botUsername={telegramBotUsername}
                role="customer"
                subjectId={currentUser.id}
                linked={Boolean(currentUser.telegramConnected)}
                chatId={currentUser.telegramChatId ?? undefined}
                compact
                size={140}
                title={currentUser.telegramConnected ? "Telegram sozlamalari" : "Telegram botni ulash"}
                description={
                  currentUser.telegramConnected
                    ? "Bot orqali bron va eslatmalar keladi."
                    : `Start bosing. Bronlar va ${reminderMinutes} daqiqa oldingi eslatmalar Telegramga keladi.`
                }
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Telegram bot username backend sozlamalaridan topilmadi.
              </Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={1} sx={{ pt: 1.2 }}>
            <Button variant="outlined" onClick={onBack} sx={{ textTransform: "none" }}>
              Bekor qilish
            </Button>
            <Button variant="contained" onClick={handleSave} sx={{ textTransform: "none" }}>
              Saqlash
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
