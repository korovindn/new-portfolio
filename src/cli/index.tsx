import { getCommand } from "./commands";
import { useCLI } from "./use-cli";
import { formatPath } from "../fs";

const Prefix = ({ cwd }: { cwd: string }) => {
  return (
    <span>
      <span className="text-term-accent">guest@korovindn.ru:</span>
      <span className="text-term-dim">{formatPath(cwd)}</span>$
    </span>
  );
};

export const CLI = () => {
  const {
    handleCommand,
    handleChange,
    handleKeyDown,
    inputRef,
    history,
    session,
    command,
    cwd,
  } = useCLI();

  return (
    <div className="p-4">
      {session.map((entry) => {
        const { Output } = getCommand(entry.name);

        return (
          <div key={entry.id}>
            <Prefix cwd={entry.cwd} />{" "}
            <span className="whitespace-pre-wrap">{entry.input}</span>
            {entry.name && (
              <Output
                name={entry.name}
                args={entry.args}
                cwd={entry.cwd}
                history={history.slice(0, entry.historySize)}
                call={handleCommand}
              />
            )}
          </div>
        );
      })}
      <div className="flex w-full items-center gap-2">
        <Prefix cwd={cwd} />
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={command}
          className="w-full flex-1 bg-transparent outline-none"
        />
      </div>
    </div>
  );
};
