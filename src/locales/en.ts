export const en = {
  help: {
    hello: "hello, i'm dima korovin",
    description: "frontend-engineer at yandex",
    availableCommands: "available commands",
    hint: "↑/↓ — history, tab — autocomplete",
  },
  clear: {
    title: "terminal cleared",
  },
  whoami: {
    title:
      "i'm a frontend engineer with 4.5 years of experience in russian big tech",
    use: "use",
    worked: "worked",
    yandex: "yandex",
    yandexTime: "2024-present",
    sber: "sber",
    sberTime: "2023-2024",
    mts: "mts",
    mtsTime: "2022-2023",
    studied: "studied",
    bmstu: "bauman moscow state technical university",
    bmstuTime: "2017-2021",
  },
  projects: {
    title: "stuff i've made",
    tripstat: "tripstat",
    tripstatDesc: "interactive travel map, ai trip planner, traverer reviews",
    nitid: "nitid",
    nitidDesc: "rooms with realtime subtitles",
    telemost: "telemost",
    telemostDesc: "video calls and messaging service",
    gitverse: "gitverse",
    gitverseDesc: "git-hosting and collaborative development service",
    rdm: "rdm self-service",
    rdmDesc: "internal self-service portal for reference data management",
    yandex: "yandex",
    sber: "sber",
    mts: "mts",
  },
  contact: {
    email: "email",
    github: "github",
    linkedin: "linkedin",
    telegram: "telegram",
    phone: "phone",
  },
  command: {
    help: "this list",
    clear: "clear the terminal",
    whoami: "who am i",
    projects: "stuff i've made",
    contact: "how to reach me",
    cv: "download my cv",
  },
} as const;

export type Messages = typeof en;

type DeepString<T> = T extends string
  ? string
  : { [K in keyof T]: DeepString<T[K]> };

export type MessageTree = DeepString<Messages>;
