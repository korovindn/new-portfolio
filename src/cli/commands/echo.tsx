import { noopRun, type OutputComponent } from "./commands";

export const Output: OutputComponent = ({ args }) => {
  return <div className="whitespace-pre-wrap">{args.join(" ")}</div>;
};

export const run = noopRun;
