import type { MessageTree } from "./en";

export const ru = {
  help: {
    hello: "привет, я дима коровин",
    description: "фронтенд-инженер в яндексе",
    hint: "↑/↓ — история, tab — автодополнение",
    availableCommands: "доступные команды",
  },
  whoami: {
    title: "я фронтенд-инженер с 4.5 годами опыта в российском бигтехе",
    use: "использую",
    worked: "работал",
    yandex: "яндекс",
    yandexTime: "2024-н.в.",
    sber: "сбер",
    sberTime: "2023-2024",
    mts: "мтс",
    mtsTime: "2022-2023",
    studied: "учился",
    bmstu: "мгту им. н. э. баумана",
    bmstuTime: "2017-2021",
  },
  projects: {
    title: "что я наделал",
    tripstat: "tripstat",
    nitid: "nitid",
    telemost: "телемост",
    gitverse: "gitverse",
    rdm: "rdm self-service",
    yandex: "яндекс",
    sber: "сбер",
    mts: "мтс",
  },
  contact: {
    email: "email",
    github: "github",
    linkedin: "linkedin",
    telegram: "telegram",
    phone: "телефон",
  },
  clear: {
    title: "терминал очищен",
  },
  command: {
    help: "этот список",
    clear: "очистить терминал",
    whoami: "кто я",
    projects: "что я наделал",
    contact: "как связаться",
    cv: "скачать резюме",
  },
} as const satisfies MessageTree;
