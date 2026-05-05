import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import TelegramIcon from "@mui/icons-material/Telegram";
import {
  Alert,
  alpha,
  Avatar,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { TelegramQRCode } from "../components/common/TelegramQRCode";
import { PageHeader } from "../components/common/PageHeader";
import { CustomerAccount, CustomerSettingsPayload } from "../types";

interface CustomerSettingsPageProps {
  currentUser: CustomerAccount;
  telegramBotUsername?: string;
  reminderMinutes: number;
  onSubmit: (payload: CustomerSettingsPayload) => Promise<CustomerAccount>;
  onUploadMedia: (file: File) => Promise<string>;
  onBack: () => void;
}

export function CustomerSettingsPage({
  currentUser,
  telegramBotUsername,
  reminderMinutes,
  onSubmit,
  onUploadMedia,
  onBack,
}: CustomerSettingsPageProps) {
  const [fullName, setFullName] = useState(currentUser.name ?? "");
  const [phone, setPhone] = useState(currentUser.phone ?? "");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState(currentUser.photoUrl ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setFullName(currentUser.name ?? "");
    setPhone(currentUser.phone ?? "");
    setPhotoUrl(currentUser.photoUrl ?? "");
  }, [currentUser.id, currentUser.name, currentUser.phone, currentUser.photoUrl]);

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");
    setUploading(true);

    try {
      const uploadedUrl = await onUploadMedia(file);
      setPhotoUrl(uploadedUrl);
      setSuccess("Rasm yuklandi. Saqlashni bosing.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Rasm yuklanmadi.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();

    if (cleanName.length < 2) {
      setError("Ism kamida 2 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    if (cleanPhone.length < 7) {
      setError("Telefon raqamini to'g'ri kiriting.");
      return;
    }

    if (cleanPassword && cleanPassword.length < 4) {
      setError("Yangi parol kamida 4 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updated = await onSubmit({
        fullName: cleanName,
        phone: cleanPhone,
        password: cleanPassword || undefined,
        photoUrl: photoUrl.trim(),
      });
      setFullName(updated.name);
      setPhone(updated.phone);
      setPhotoUrl(updated.photoUrl ?? "");
      setPassword("");
      setSuccess("Profil sozlamalari saqlandi.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Profil saqlanmadi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 1.5, sm: 2.5, lg: 3 },
        py: { xs: 1.8, sm: 2.5, lg: 3 },
        background:
          "radial-gradient(circle at 18% 4%, rgba(139,92,246,0.3), transparent 30%), radial-gradient(circle at 88% 10%, rgba(34,211,238,0.14), transparent 30%), linear-gradient(135deg, #05050a 0%, #10071d 54%, #06111e 100%)",
      }}
    >
      <Stack spacing={2.4} sx={{ width: "min(1080px, 100%)", mx: "auto" }}>
        <PageHeader
          title="Sozlamalar"
          subtitle="Umumiy profil, rasm, parol va Telegram bot ulanishi shu sahifada boshqariladi."
          icon={<SettingsRoundedIcon sx={{ fontSize: "1.2rem" }} />}
          eyebrow="Foydalanuvchi paneli"
          action={
            <Button
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={onBack}
              sx={{
                minHeight: 44,
                borderRadius: "16px",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Bronlarga qaytish
            </Button>
          }
        />

        {(error || success) ? (
          <Alert
            severity={error ? "error" : "success"}
            onClose={() => {
              setError("");
              setSuccess("");
            }}
            sx={{
              borderRadius: "18px",
              bgcolor: error ? alpha("#ef4444", 0.12) : alpha("#34d399", 0.12),
              color: "#f8fafc",
              border: `1px solid ${alpha(error ? "#ef4444" : "#34d399", 0.22)}`,
            }}
          >
            {error || success}
          </Alert>
        ) : null}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 380px" },
            gap: { xs: 2, lg: 2.4 },
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              p: { xs: 1.35, md: 1.8 },
              borderRadius: "28px",
              background:
                "linear-gradient(135deg, rgba(18,18,31,0.9) 0%, rgba(8,10,20,0.76) 100%)",
              border: `1px solid ${alpha("#c4b5fd", 0.16)}`,
              boxShadow: "0 24px 70px rgba(0,0,0,0.3)",
              backdropFilter: "blur(22px)",
            }}
          >
            <Stack spacing={1.65}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.35} alignItems={{ xs: "flex-start", sm: "center" }}>
                <Avatar
                  src={photoUrl || undefined}
                  sx={{
                    width: 84,
                    height: 84,
                    borderRadius: "24px",
                    bgcolor: "#8b5cf6",
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    border: `1px solid ${alpha("#ffffff", 0.16)}`,
                  }}
                >
                  {fullName.trim().slice(0, 2).toUpperCase() || "MJ"}
                </Avatar>

                <Stack spacing={0.8} sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="h6">Umumiy profil</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ism, telefon, profil rasmi va parolni yangilang. Bu ma'lumotlar bronlarda ham ishlatiladi.
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={uploading ? <CircularProgress size={16} /> : <AddPhotoAlternateRoundedIcon />}
                      disabled={uploading || saving}
                      sx={{ borderRadius: "14px", textTransform: "none", fontWeight: 700 }}
                    >
                      Rasm yuklash
                      <input hidden type="file" accept="image/*" onChange={handlePhotoChange} />
                    </Button>
                    {photoUrl ? (
                      <Button
                        variant="text"
                        disabled={uploading || saving}
                        onClick={() => setPhotoUrl("")}
                        sx={{ borderRadius: "14px", textTransform: "none", color: "#c4b5fd" }}
                      >
                        Rasmni olib tashlash
                      </Button>
                    ) : null}
                  </Stack>
                </Stack>
              </Stack>

              <Box sx={{ height: 1, bgcolor: alpha("#c4b5fd", 0.12) }} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                  gap: 1.2,
                }}
              >
                <TextField
                  label="To'liq ism"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRoundedIcon sx={{ color: "#8d96ad" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Telefon raqami"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphoneRoundedIcon sx={{ color: "#8d96ad" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Yangi parol"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  helperText="Bo'sh qoldirsangiz parol o'zgarmaydi."
                  sx={{ gridColumn: { xs: "auto", md: "1 / -1" } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockResetRoundedIcon sx={{ color: "#8d96ad" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={1.1} sx={{ pt: 0.5 }}>
                <Button
                  variant="outlined"
                  onClick={onBack}
                  disabled={saving || uploading}
                  sx={{
                    minHeight: 50,
                    borderRadius: "18px",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Bekor qilish
                </Button>
                <Button
                  variant="contained"
                  startIcon={saving ? <CircularProgress color="inherit" size={18} /> : <SaveRoundedIcon />}
                  onClick={handleSave}
                  disabled={saving || uploading}
                  sx={{
                    minHeight: 50,
                    borderRadius: "18px",
                    textTransform: "none",
                    fontWeight: 800,
                    flex: 1,
                    boxShadow: `0 18px 36px ${alpha("#8b5cf6", 0.28)}`,
                  }}
                >
                  {saving ? "Saqlanmoqda..." : "Profilni saqlash"}
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{
              p: { xs: 1.35, md: 1.65 },
              borderRadius: "28px",
              background:
                "linear-gradient(135deg, rgba(16,24,39,0.9) 0%, rgba(8,10,20,0.76) 100%)",
              border: `1px solid ${alpha("#22d3ee", 0.16)}`,
              boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
            }}
          >
            <Stack spacing={1.35}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "16px",
                    backgroundColor: alpha("#229ed9", 0.18),
                    color: "#7dd3fc",
                  }}
                >
                  <TelegramIcon />
                </Box>
                <Box>
                  <Typography variant="h6">Telegram bot</Typography>
                  <Typography variant="body2" color="text.secondary">
                    QR yoki link orqali ulab, bron statuslarini botdan oling.
                  </Typography>
                </Box>
              </Stack>

              {telegramBotUsername ? (
                <TelegramQRCode
                  botUsername={telegramBotUsername}
                  role="customer"
                  subjectId={currentUser.id}
                  linked={Boolean(currentUser.telegramConnected)}
                  chatId={currentUser.telegramChatId ?? undefined}
                  compact
                  size={150}
                  title={currentUser.telegramConnected ? "Telegram ulangan" : "Telegram botni ulash"}
                  description={
                    currentUser.telegramConnected
                      ? "Bron statuslari, eslatmalar va bot ichidagi bron qilish shu akkauntga ulangan."
                      : `Start bosing. Bronlar va ${reminderMinutes} daqiqa oldingi eslatmalar Telegramga keladi.`
                  }
                />
              ) : (
                <Alert severity="warning" sx={{ borderRadius: "18px" }}>
                  Telegram bot username backend sozlamalaridan topilmadi.
                </Alert>
              )}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
