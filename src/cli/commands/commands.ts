import type { ParseKeys } from "i18next";

export interface State {
  session: string[];
  history: string[];
}

export type Run = (state: State) => State;

interface OutputProps {
  path: string;
  state: State;
  call: (command: Command) => void;
}

export type OutputComponent = React.FC<OutputProps>;

export enum Command {
  HELP = "help",
  CLEAR = "clear",
  WHOAMI = "whoami",
  PROJECTS = "projects",
  CONTACT = "contact",
  CV = "cv",

  ECHO = "echo",
  LS = "ls",
  CD = "cd",
  PWD = "pwd",
  CAT = "cat",
  HISTORY = "history",

  UNKNOWN = "unknown",
}

export const COMMANDS: Command[] = Object.values(Command);

export const isCommand = (command: string): command is Command => {
  return Object.values(Command).includes(command as Command);
};

type CommandKey = Extract<ParseKeys, `command.${string}`>;

type ShellCommand = Command.CAT | Command.CD | Command.ECHO | Command.HISTORY | Command.LS | Command.PWD;
type HelperCommand = Command.UNKNOWN;

export const HELP: Record<Exclude<Command, HelperCommand | ShellCommand>, CommandKey> = {
  [Command.WHOAMI]: "command.whoami",
  [Command.PROJECTS]: "command.projects",
  [Command.CONTACT]: "command.contact",
  [Command.CV]: "command.cv",
  [Command.HELP]: "command.help",
  [Command.CLEAR]: "command.clear",
};
