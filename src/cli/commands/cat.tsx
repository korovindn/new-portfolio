import { getNode, resolvePath } from "../../fs";
import { noopRun, type OutputComponent } from "./commands";

const File = ({ cwd, target }: { cwd: string; target: string }) => {
  const node = getNode(resolvePath(cwd, target));

  if (!node) {
    return (
      <div className="text-term-error">
        cat: {target}: No such file or directory
      </div>
    );
  }

  if (node.type === "dir") {
    return <div className="text-term-error">cat: {target}: Is a directory</div>;
  }

  if ("href" in node) {
    return (
      <div>
        <span className="text-term-dim">binary file, open </span>
        <a
          className="text-term-link underline"
          href={node.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {target}
        </a>
      </div>
    );
  }

  return <node.Content />;
};

export const Output: OutputComponent = ({ cwd, args }) => {
  if (!args.length) {
    return <div className="text-term-dim">usage: cat &lt;file&gt;</div>;
  }

  return (
    <div>
      {args.map((target, index) => (
        <File key={index} cwd={cwd} target={target} />
      ))}
    </div>
  );
};

export const run = noopRun;
