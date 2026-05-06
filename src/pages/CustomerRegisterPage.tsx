import { useState } from "react";
import { RoleLoginPage } from "../components/auth/RoleLoginPage";
import { usePreferences } from "../lib/preferences";

interface CustomerRegisterPageProps {
  onBack: () => void;
  onOpenLogin: () => void;
  onRegister: (fullName: string, phone: string, password: string) => Promise<void>;
}

export function CustomerRegisterPage({
  onBack,
  onOpenLogin,
  onRegister,
}: CustomerRegisterPageProps) {
  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { t } = usePreferences();

  return (
    <RoleLoginPage
      eyebrow={t("Ro'yxatdan o'tish")}
      title={t("Ro'yxatdan o'tish")}
      description={t("Ism, telefon raqam va parolni kiriting.")}
      contentTitle=""
      contentDescription=""
      submitLabel={t("Ro'yxatdan o'tish")}
      highlights={[]}
      demoHints={[]}
      values={values}
      fields={[
        {
          key: "fullName",
          label: t("To'liq ism"),
          placeholder: t("To'liq ism"),
          autoComplete: "name",
        },
        {
          key: "phone",
          label: t("Telefon raqam"),
          placeholder: t("Telefon raqam"),
          autoComplete: "tel",
        },
        {
          key: "password",
          label: t("Parol"),
          placeholder: t("Parol yarating"),
          type: "password",
          autoComplete: "new-password",
        },
      ]}
      error={error}
      isSubmitting={submitting}
      secondaryActionLabel={t("Hisobim bor, kiraman")}
      onSecondaryAction={onOpenLogin}
      onBack={onBack}
      onChange={(field, value) => {
        setError("");
        setValues((current) => ({ ...current, [field]: value }));
      }}
      onSubmit={async () => {
        try {
          setSubmitting(true);
          await onRegister(values.fullName, values.phone, values.password);
        } catch (nextError) {
          setError(nextError instanceof Error ? nextError.message : t("Ro'yxatdan o'tishda xato yuz berdi."));
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
}
