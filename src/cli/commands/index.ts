import { Command, isCommand, type CommandModule } from "./commands";

import * as Help from "./help";
import * as Clear from "./clear";
import * as Whoami from "./whoami";
import * as Projects from "./projects";
import * as CV from "./cv";
import * as Contact from "./contact";
import * as Echo from "./echo";
import * as Ls from "./ls";
import * as Cd from "./cd";
import * as Pwd from "./pwd";
import * as Cat from "./cat";
import * as History from "./history";
import * as Unknown from "./unknown";

export * from "./commands";

export const Commands: Record<Command, CommandModule> = {
  [Command.HELP]: Help,
  [Command.CLEAR]: Clear,
  [Command.WHOAMI]: Whoami,
  [Command.PROJECTS]: Projects,
  [Command.CV]: CV,
  [Command.CONTACT]: Contact,
  [Command.ECHO]: Echo,
  [Command.LS]: Ls,
  [Command.CD]: Cd,
  [Command.PWD]: Pwd,
  [Command.CAT]: Cat,
  [Command.HISTORY]: History,
  [Command.UNKNOWN]: Unknown,
};

export const getCommand = (name: string): CommandModule =>
  Commands[isCommand(name) ? name : Command.UNKNOWN];
