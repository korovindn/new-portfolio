import { Fragment, useState } from "react";
import { noopRun, type OutputComponent } from "./commands";
import type { ParseKeys } from "i18next";
import { useTranslation } from "react-i18next";

type ContactKeys = Extract<ParseKeys, `contact.${string}`>;

const Phone = ({ value }: { value: string }) => {
  const [shown, setShown] = useState(false);
  const start = value.slice(0, 9);
  const end = value.slice(9);

  return (
    <span>
      <span onClick={() => setShown(true)} className="cursor-pointer">
        {shown
          ? value
          : `${start}${end
              .split("")
              .map(() => "*")
              .join("")}`}
      </span>
    </span>
  );
};

const CONTACT_ITEMS: {
  label: ContactKeys;
  value: string;
  link?: string;
}[] = [
  {
    label: "contact.email",
    value: "korovindn@proton.me",
    link: "mailto:korovindn@proton.me",
  },
  {
    label: "contact.linkedin",
    value: "Dmitry Korovin",
    link: "https://linkedin.com/in/dmitry-korovin-0768a4288/",
  },
  {
    label: "contact.telegram",
    value: "@korovin_dmitry",
    link: "https://t.me/korovin_dmitry",
  },
  {
    label: "contact.phone",
    value: "+7 (995) 887-04-90",
    link: "https://wa.me/79958870490",
  },
  {
    label: "contact.github",
    value: "korovindn",
    link: "https://github.com/korovindn",
  },
];

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="grid grid-cols-5 max-w-lg">
        {CONTACT_ITEMS.map((item) => (
          <Fragment key={item.label}>
            <div className="col-span-2">{t(item.label)}</div>
            <div className="col-span-3">
              {item.label === "contact.phone" ? (
                <Phone value={item.value} />
              ) : (
                <a
                  className="text-term-link underline"
                  href={item.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.value}
                </a>
              )}
            </div>
          </Fragment>
        ))}
      </div>
      <br />
    </div>
  );
};

export const Output: OutputComponent = () => <Contact />;

export const run = noopRun;
