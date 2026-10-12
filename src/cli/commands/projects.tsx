import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";
import type { OutputComponent, Run } from "./commands";

type ProjectsKeys = Extract<ParseKeys, `projects.${string}`>;

type Item = {
  label: ProjectsKeys;
  link?: string;
  where?: ProjectsKeys;
};

const ITEMS: Item[] = [
  {
    label: "projects.tripstat",
    link: "https://tripstat.io",
  },
  {
    label: "projects.nitid",
    link: "https://nitid.site",
  },
  {
    label: "projects.telemost",
    link: "https://telemost.yandex.ru",
    where: "projects.yandex",
  },
  {
    label: "projects.gitverse",
    link: "https://gitverse.ru",
    where: "projects.sber",
  },
  {
    label: "projects.rdm",
    where: "projects.mts",
  },
];

export const Output: OutputComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="font-bold">{t("projects.title")}</h2>
      <br />
      <ul>
        {ITEMS.map((item) => (
          <li key={item.label}>
            -{" "}
            {item.link ? (
              <a
                className="text-term-link underline"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(item.label)}
              </a>
            ) : (
              <span>{t(item.label)}</span>
            )}
            {item.where && (
              <span className="text-term-dim"> ({t(item.where)})</span>
            )}
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};

export const run: Run = (state) => state;
