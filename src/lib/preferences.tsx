import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { alpha, Box, Button, Stack, Typography } from "@mui/material";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AppThemeMode = "dark" | "light";
export type AppLocale = "uz" | "ru";

interface PreferencesValue {
  themeMode: AppThemeMode;
  locale: AppLocale;
  setThemeMode: (mode: AppThemeMode) => void;
  setLocale: (locale: AppLocale) => void;
  t: (value: string) => string;
}

const STORAGE_KEY = "barbershop-preferences";

const ruDictionary: Record<string, string> = {
  "Sozlamalar": "Настройки",
  "Foydalanuvchi paneli": "Панель клиента",
  "Admin paneli": "Панель администратора",
  "Profil va sozlamalar": "Профиль и настройки",
  "Umumiy profil": "Общий профиль",
  "Telegram bot": "Telegram бот",
  "Bronlarga qaytish": "Вернуться к бронированиям",
  "Profilni saqlash": "Сохранить профиль",
  "Saqlanmoqda...": "Сохраняется...",
  "Bekor qilish": "Отмена",
  "Rasm yuklash": "Загрузить фото",
  "Rasmni olib tashlash": "Удалить фото",
  "To'liq ism": "Полное имя",
  "Telefon raqami": "Номер телефона",
  "Yangi parol": "Новый пароль",
  "Botni ulash": "Подключить бот",
  "Telegram ulangan": "Telegram подключен",
  "Bosh sahifa": "Главная",
  "Barberlar": "Барберы",
  "Navbatlar": "Записи",
  "Skidkalar": "Скидки",
  "Online": "Онлайн",
  "Kunduzgi": "Дневной",
  "Tungi": "Ночной",
  "Til": "Язык",
  "Ko'rinish": "Внешний вид",
  "O'zbekcha": "Узбекский",
  "Ruscha": "Русский",
};

function readStoredPreferences(): Pick<PreferencesValue, "themeMode" | "locale"> {
  if (typeof window === "undefined") {
    return { themeMode: "dark", locale: "uz" };
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Partial<{
      themeMode: AppThemeMode;
      locale: AppLocale;
    }>;

    return {
      themeMode: parsed.themeMode === "light" ? "light" : "dark",
      locale: parsed.locale === "ru" ? "ru" : "uz",
    };
  } catch {
    return { themeMode: "dark", locale: "uz" };
  }
}

const PreferencesContext = createContext<PreferencesValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const stored = useMemo(readStoredPreferences, []);
  const [themeMode, setThemeModeState] = useState<AppThemeMode>(stored.themeMode);
  const [locale, setLocaleState] = useState<AppLocale>(stored.locale);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ themeMode, locale }));
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.lang = locale === "ru" ? "ru" : "uz";
  }, [themeMode, locale]);

  const setThemeMode = useCallback((mode: AppThemeMode) => setThemeModeState(mode), []);
  const setLocale = useCallback((nextLocale: AppLocale) => setLocaleState(nextLocale), []);
  const t = useCallback((value: string) => (locale === "ru" ? ruDictionary[value] ?? value : value), [locale]);

  const value = useMemo(
    () => ({ themeMode, locale, setThemeMode, setLocale, t }),
    [locale, setLocale, setThemeMode, t, themeMode],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }
  return value;
}

export function PreferencesPanel() {
  const { themeMode, locale, setThemeMode, setLocale, t } = usePreferences();

  return (
    <Box
      sx={{
        p: { xs: 1.25, md: 1.5 },
        borderRadius: "24px",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(18,18,31,0.9) 0%, rgba(8,10,20,0.76) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(245,247,251,0.92) 100%)",
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 24px 70px rgba(0,0,0,0.26)"
            : "0 18px 50px rgba(15,23,42,0.08)",
      }}
    >
      <Stack spacing={1.35}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 42,
              height: 42,
              display: "grid",
              placeItems: "center",
              borderRadius: "15px",
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.14),
              color: "primary.light",
            }}
          >
            <TranslateRoundedIcon />
          </Box>
          <Box>
            <Typography variant="h6">{t("Ko'rinish")}</Typography>
            <Typography variant="body2" color="text.secondary">
              {locale === "ru"
                ? "Выберите дневной или ночной режим и язык интерфейса."
                : "Kunduzgi yoki tungi rejimni va ilova tilini tanlang."}
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={0.85}>
          <Typography variant="subtitle2" color="text.secondary">
            {t("Ko'rinish")}
          </Typography>
          <Stack direction="row" spacing={0.8}>
            <Button
              fullWidth
              variant={themeMode === "light" ? "contained" : "outlined"}
              startIcon={<LightModeRoundedIcon />}
              onClick={() => setThemeMode("light")}
            >
              {t("Kunduzgi")}
            </Button>
            <Button
              fullWidth
              variant={themeMode === "dark" ? "contained" : "outlined"}
              startIcon={<DarkModeRoundedIcon />}
              onClick={() => setThemeMode("dark")}
            >
              {t("Tungi")}
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={0.85}>
          <Typography variant="subtitle2" color="text.secondary">
            {t("Til")}
          </Typography>
          <Stack direction="row" spacing={0.8}>
            <Button fullWidth variant={locale === "uz" ? "contained" : "outlined"} onClick={() => setLocale("uz")}>
              UZ
            </Button>
            <Button fullWidth variant={locale === "ru" ? "contained" : "outlined"} onClick={() => setLocale("ru")}>
              RU
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
