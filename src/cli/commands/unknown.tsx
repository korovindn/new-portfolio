import { noopRun, type OutputComponent } from "./commands";

export const Output: OutputComponent = ({ name }) => {
  return <div className="text-term-error">command not found: {name}</div>;
};

export const run = noopRun;
