import { getNode, resolvePath } from "../../fs";
import type { OutputComponent, Run } from "./commands";

const resolve = (cwd: string, args: string[]) => {
  const target = args[0] ?? "~";
  const path = resolvePath(cwd, target);
  const node = getNode(path);

  if (!node) {
    return { path, error: `cd: no such file or directory: ${target}` };
  }

  if (node.type !== "dir") {
    return { path, error: `cd: not a directory: ${target}` };
  }

  return { path, error: null };
};

export const Output: OutputComponent = ({ cwd, args }) => {
  const { error } = resolve(cwd, args);

  return error ? <div className="text-term-error">{error}</div> : null;
};

export const run: Run = (state, args) => {
  const { path, error } = resolve(state.cwd, args);

  return error ? state : { ...state, cwd: path };
};
