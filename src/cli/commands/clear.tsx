import { useTranslation } from "react-i18next";
import type { OutputComponent, Run } from "./commands";

export const Output: OutputComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("clear.title")}</h2>
    </div>
  );
};

export const run: Run = (state) => {
  return {
    ...state,
    session: [],
  };
};
