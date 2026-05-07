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
const PREFERENCES_VERSION = 2;

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

  // Barber settings translations
  "Ish sozlamalari": "Настройки работы",
  "Ish vaqti, narxlar va lokatsiyani shu yerda boshqaring.": "Управляйте временем работы, ценами и локацией здесь.",
  "Ish vaqti": "Время работы",
  "Boshlanish": "Начало",
  "Tugash": "Окончание",
  "Lokatsiya": "Локация",
  "Xarita ustidan nuqtani bosing yoki markerni suring.": "Нажмите на карту или перетащите маркер.",
  "Joy olinmoqda...": "Определение местоположения...",
  "Mening joyim": "Моё местоположение",
  "Manzil": "Адрес",
  "Masalan, Chilonzor 5-kvartal": "Например, Чилонзор 5-й квартал",
  "Latitude": "Широта",
  "Longitude": "Долгота",
  "Profil ko'rinishi": "Вид профиля",
  "Xizmat narxlari": "Цены на услуги",
  "Rasmni almashtirish": "Заменить фото",
  "Rasm tanlash": "Выбрать фото",
  "Media yuklanmoqda...": "Медиа загружается...",
  "Video/Rasm tanlash": "Выбрать видео/фото",
  "Telegram sozlamalari": "Настройки Telegram",
  "Telegram botni ulash": "Подключить Telegram бот",
  "Yangi bronlar, qabul/rad/tugatish tugmalari va eslatmalar shu botga keladi.": "Новые записи, кнопки принятия/отклонения/завершения и уведомления будут приходить в этот бот.",
  "Start bosing. Navbatlar va": "Нажмите Start. Записи и",
  "daqiqa oldingi eslatmalar shu yerga keladi.": "минуты до записи напоминания будут приходить сюда.",
  "Ism familya": "Фамилия и имя",
  "Mutaxassislik": "Специальность",
  "Reyting": "Рейтинг",
  "Tajriba yili": "Годы опыта",
  "Bio": "Био",
  "Mijozlar ko'radigan tavsif": "Описание, видимое клиентам",
  "Media yuklandi va mijozlar barber kartasida ko'radi.": "Медиа загружено и будет видно в карточке барбера.",
  "Mediani almashtirish": "Заменить медиа",
  "Soch olish": "Стрижка",
  "Fade qirqim": "Фейд",
  "Soch + soqol": "Стрижка + борода",
  "Premium paket": "Премиум пакет",
  "Soqol dizayni": "Дизайн бороды",
  "Realtime": "В реальном времени",
  "Kutilayotganlar": "Ожидающие",
  "Oxirgi bron": "Последняя запись",
  "Jadvalda ko'rinadi": "Отображается в расписании",
  "Hozircha yangi bron yo'q": "Пока нет новых записей",

  // Kengaytirilgan lug'at:
  "Bugungi ishlar qisqacha": "Кратко о сегодняшних делах",
  "Jami daromad": "Общий доход",
  "Jami bronlar": "Всего записей",
  "Jami mijozlar": "Всего клиентов",
  "Jami barberlar": "Всего барберов",
  "Daromad tahlili": "Обзор дохода",
  "Ushbu oy": "Этот месяц",
  "Yangi bronlar": "Новые записи",
  "Barchasini ko'rish": "Смотреть все",
  "Eng ko'p xizmatlar": "Популярные услуги",
  "Barberlar natijasi": "Результаты барберов",
  "Kelgusi bronlar": "Предстоящие записи",
  "Barber": "Барбер",
  "Bronlar": "Записи",
  "Daromad": "Доход",
  "Reyting": "Рейтинг",
  "Xizmat": "Услуга",
  "Vaqt": "Время",
  "Narx": "Цена",
  "Holat": "Статус",
  "Harakat": "Действие",
  "Tasdiqlandi": "Подтверждено",
  "Jarayonda": "В процессе",
  "Tugallandi": "Завершено",
  "Rad etildi": "Отклонено",
  "Kutilmoqda": "Ожидается",
  "Qabul qilish": "Принять",
  "Tugatish": "Завершить",
  "Kirish": "Войти",
  "Ro'yxatdan o'tish": "Регистрация",
  "Ism": "Имя",
  "Telefon raqam": "Номер телефона",
  "Username": "Имя пользователя",
  "Parol": "Пароль",
  "Hisob yaratish": "Создать аккаунт",
  "Hisobingiz yo'qmi? ": "Нет аккаунта? ",
  "Hisobingiz bormi? ": "Есть аккаунт? ",
  "Hozircha ma'lumot yo'q": "Пока нет данных",
  
  // Dashboard qo'shimcha so'zlar:
  "Barberlar holati": "Статус барберов",
  "Kim nechta mijozga xizmat qildi": "Кто скольким клиентам оказал услугу",
  "oldinda": "впереди",
  "Hozircha yo'q": "Пока нет",
  "ta xizmat tugadi": "услуг завершено",
  "ta tugagan": "завершено",
  "ta jami": "всего",
  "So'nggi navbatlar": "Последние записи",
  "Bugungi eng yaqin 6 ta navbat": "Ближайшие 6 записей на сегодня",
  "Barchasi": "Все",
  "Bugungi navbatlar": "Сегодняшние записи",
  "Har bir barberning bugungi navbatlari": "Сегодняшние записи каждого барбера",
  "ta navbat": "записей",
  "tugagan": "завершено",
  "kutilmoqda": "ожидается",
  "Tugagan navbatlar": "Завершенные записи",
  "ta": "шт",
  "Buyurtma": "Заказ",
  "Mijoz": "Клиент",
  "To'lov": "Оплата",
  "Jami navbatlar": "Всего записей",
  "Ishdagi barberlar": "Барберы на смене",
  "Tugagan xizmatlar": "Завершенные услуги",
  "Navbat kutayotganlar": "Ожидающие в очереди",
  "Bugun navbat yo'q": "Сегодня нет записей",
  "Hali xizmat tugamagan": "Услуги еще не завершены",
  "Kutilayotgan navbat yo'q": "Очереди нет",

  // Auth pages
  "Foydalanuvchi": "Пользователь",
  "Admin": "Админ",
  "Rolni tanlang va kiriting.": "Выберите роль и войдите.",
  "Email yoki login": "Эл. почта или логин",
  "Parolni kiriting": "Введите пароль",
  "Eslab qolish": "Запомнить меня",
  "Kutib turing...": "Подождите...",
  "Kirishda xato yuz berdi.": "Ошибка при входе.",
  "Ism, telefon raqam va parolni kiriting.": "Введите имя, номер телефона и пароль.",
  "Parol yarating": "Создайте пароль",
  "Hisobim bor, kiraman": "У меня есть аккаунт, войти",
  "Ro'yxatdan o'tishda xato yuz berdi.": "Ошибка при регистрации.",
  "Ism, mutaxassislik va username to'liq kiritilishi kerak.": "Имя, специальность и имя пользователя должны быть заполнены.",
  "Ish vaqtini to'liq kiriting.": "Введите время работы полностью.",
  "Ish tugash vaqti boshlanishdan keyin bo'lishi kerak.": "Время окончания должно быть после начала.",
  "Narxlar 0 dan katta yoki teng bo'lishi kerak.": "Цены должны быть >= 0.",
  "Reyting va tajriba to'g'ri kiritilishi kerak.": "Рейтинг и опыт должны быть указаны корректно.",
  "Lokatsiya koordinatalari noto'g'ri.": "Координаты локации неверны.",
  "Sozlamalarni saqlab bo'lmadi.": "Не удалось сохранить настройки.",
  "Faylni yuklab bo'lmadi.": "Не удалось загрузить файл.",
  "Brauzer lokatsiyani o'qiy olmadi.": "Браузер не смог определить местоположение.",
  "Joriy joylashuvni olib bo'lmadi.": "Не удалось получить текущее местоположение.",
};

function readStoredPreferences(): Pick<PreferencesValue, "themeMode" | "locale"> {
  if (typeof window === "undefined") {
    return { themeMode: "light", locale: "uz" };
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Partial<{
      version: number;
      themeMode: AppThemeMode;
      locale: AppLocale;
    }>;

    return {
      themeMode: parsed.version === PREFERENCES_VERSION && parsed.themeMode === "dark" ? "dark" : "light",
      locale: parsed.locale === "ru" ? "ru" : "uz",
    };
  } catch {
    return { themeMode: "light", locale: "uz" };
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

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: PREFERENCES_VERSION, themeMode, locale }));
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
