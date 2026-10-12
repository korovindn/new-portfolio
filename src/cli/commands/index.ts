import { Command } from "./commands";

import * as Help from "./help";
import * as Clear from "./clear";
import * as Whoami from "./whoami";
import * as Projects from "./projects";
import * as CV from "./cv";
import * as Contact from "./contact";
import * as Unknown from "./unknown";

export * from "./commands";

export const Commands = {
  [Command.HELP]: Help,
  [Command.CLEAR]: Clear,
  [Command.WHOAMI]: Whoami,
  [Command.PROJECTS]: Projects,
  [Command.CV]: CV,
  [Command.CONTACT]: Contact,
  [Command.UNKNOWN]: Unknown,
};
