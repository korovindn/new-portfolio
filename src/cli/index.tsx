import { Command, Commands, isCommand } from "./commands";
import { useCLI } from "./use-cli";

const Prefix = () => {
  return (
    <span>
      <span className="text-term-accent">guest@korovindn.ru:</span>
      <span className="text-term-dim">~</span>$
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
  } = useCLI();

  return (
    <div className="p-4">
      {session.map((command, index) => {
        const { Output } = isCommand(command) ? Commands[command] : Commands[Command.UNKNOWN];

        return (
          <div>
            <Prefix /> {command}
            <Output
              key={index}
              state={{ history, session }}
              call={handleCommand}
            />
          </div>
        );
      })}
      <div className="flex w-full items-center gap-2">
        <Prefix />
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
