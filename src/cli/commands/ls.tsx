import { formatPath, getNode, joinPath, resolvePath } from "../../fs";
import { noopRun, type OutputComponent } from "./commands";

export const Output: OutputComponent = ({ cwd, args, call }) => {
  const target = args.find((arg) => !arg.startsWith("-")) ?? ".";
  const path = resolvePath(cwd, target);
  const node = getNode(path);

  if (!node) {
    return (
      <div className="text-term-error">
        ls: cannot access '{target}': No such file or directory
      </div>
    );
  }

  if (node.type === "file") {
    return <div>{target}</div>;
  }

  const names = Object.keys(node.children).sort((a, b) => a.localeCompare(b));

  return (
    <div className="flex flex-wrap gap-x-6">
      {names.map((name) => {
        const isDir = node.children[name].type === "dir";
        const childPath = formatPath(joinPath(path, name));

        return (
          <span
            key={name}
            className={`cursor-pointer ${isDir ? "text-term-accent" : ""}`}
            onClick={() => call(isDir ? `ls ${childPath}` : `cat ${childPath}`)}
          >
            {name}
            {isDir && "/"}
          </span>
        );
      })}
    </div>
  );
};

export const run = noopRun;
