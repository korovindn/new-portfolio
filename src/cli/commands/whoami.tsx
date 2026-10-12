import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";
import type { OutputComponent, Run } from "./commands";

type WhoamiKeys = Extract<ParseKeys, `whoami.${string}`>;

type Item = {
  label: WhoamiKeys;
  time: WhoamiKeys;
};

const TECH = ["typescript", "react", "redux", "react-query", "next.js"];

const WORKED_ITEMS: Item[] = [
  {
    label: "whoami.yandex",
    time: "whoami.yandexTime",
  },
  {
    label: "whoami.sber",
    time: "whoami.sberTime",
  },
  {
    label: "whoami.mts",
    time: "whoami.mtsTime",
  },
];

const STUDIED_ITEMS: Item[] = [
  {
    label: "whoami.bmstu",
    time: "whoami.bmstuTime",
  },
];

export const Output: OutputComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="font-bold">{t("whoami.title")}</h2>
      <br />
      <p className="text-term-accent">{t("whoami.use")}</p>
      <ul>
        {TECH.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
      <br />
      <p className="text-term-accent">{t("whoami.worked")}</p>
      <ul>
        {WORKED_ITEMS.map((item) => (
          <li key={item.label}>
            - {t(item.label)}{" "}
            <span className="text-term-dim">({t(item.time)})</span>
          </li>
        ))}
      </ul>
      <br />
      <p className="text-term-accent">{t("whoami.studied")}</p>
      <ul>
        {STUDIED_ITEMS.map((item) => (
          <li key={item.label}>
            - {t(item.label)}{" "}
            <span className="text-term-dim">({t(item.time)})</span>
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};

export const run: Run = (state) => state;
