import { useTranslation } from "react-i18next";

import { HELP, isCommand, type OutputComponent, type Run } from "./commands";

export const Output: OutputComponent = ({ call }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="font-bold">{t("help.hello")}</h2>
      <p className="text-term-dim">{t("help.description")}</p>
      <br />
      <p>{t("help.availableCommands")}</p>
      <ul>
        {Object.entries(HELP).map(([command, description]) => (
          <li key={command}>
            -{" "}
            <span
              className="text-term-accent cursor-pointer"
              onClick={() => isCommand(command) && call(command)}
            >
              {command}
            </span>{" "}
            - {t(description)}
          </li>
        ))}
      </ul>
      <br />
      <p className="text-term-dim">{t("help.hint")}</p>
    </div>
  );
};

export const run: Run = (state) => state;
