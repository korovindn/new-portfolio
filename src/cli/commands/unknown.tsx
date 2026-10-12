import type { OutputComponent, Run } from "./commands";

export const Output: OutputComponent = () => {
  return <div className="text-term-error">command not found</div>;
};

export const run: Run = (state) => state;
