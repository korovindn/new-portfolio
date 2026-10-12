import type { ParseKeys } from "i18next";

export interface Entry {
  id: number;
  input: string;
  name: string;
  args: string[];
  cwd: string;
  historySize: number;
}

export interface State {
  session: Entry[];
  history: string[];
  cwd: string;
}

export type Run = (state: State, args: string[]) => State;

interface OutputProps {
  name: string;
  args: string[];
  cwd: string;
  history: string[];
  call: (input: string) => void;
}

export type OutputComponent = React.FC<OutputProps>;

export interface CommandModule {
  Output: OutputComponent;
  run: Run;
}

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

export const COMMANDS: Command[] = Object.values(Command).filter(
  (command) => command !== Command.UNKNOWN,
);

export const isCommand = (command: string): command is Command => {
  return Object.values(Command).includes(command as Command);
};

type CommandKey = Extract<ParseKeys, `command.${string}`>;

type ShellCommand =
  | Command.CAT
  | Command.CD
  | Command.ECHO
  | Command.HISTORY
  | Command.LS
  | Command.PWD;
type HelperCommand = Command.UNKNOWN;

export const HELP: Record<
  Exclude<Command, HelperCommand | ShellCommand>,
  CommandKey
> = {
  [Command.WHOAMI]: "command.whoami",
  [Command.PROJECTS]: "command.projects",
  [Command.CONTACT]: "command.contact",
  [Command.CV]: "command.cv",
  [Command.HELP]: "command.help",
  [Command.CLEAR]: "command.clear",
};

export const noopRun: Run = (state) => state;
