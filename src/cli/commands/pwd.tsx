import { noopRun, type OutputComponent } from "./commands";

export const Output: OutputComponent = ({ cwd }) => {
  return <div>{cwd}</div>;
};

export const run = noopRun;
