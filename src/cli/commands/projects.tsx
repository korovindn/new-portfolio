import { useTranslation } from "react-i18next";
import { PROJECTS } from "../../fs/projects";
import { noopRun, type OutputComponent } from "./commands";

export const Output: OutputComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="font-bold">{t("projects.title")}</h2>
      <br />
      <ul>
        {PROJECTS.map((item) => (
          <li key={item.id}>
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
              <span className="text-term-dim"> @{t(item.where)}</span>
            )}
            {item.description && (
              <span className="text-term-dim"> - {t(item.description)}</span>
            )}
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};

export const run = noopRun;
