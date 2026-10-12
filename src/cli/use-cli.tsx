import { useCallback, useEffect, useRef, useState } from "react";
import { Command, COMMANDS, Commands, isCommand, type State } from "./commands";

export const useCLI = () => {
  const [command, setCommand] = useState("");
  const [session, setSession] = useState<State["session"]>([Command.HELP]);
  const [history, setHistory] = useState<State["history"]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentHistoryIndex = useRef<number>(0);

  /**
   * run any command
   */
  const handleCommand = useCallback(
    (command: string) => {
      const state = {
        history: [...history, command],
        session: [...session, command],
      };

      const newState = Commands[isCommand(command) ? command : Command.UNKNOWN].run(state);

      setHistory(newState.history);
      setSession(newState.session);

      setCommand("");
    },
    [history, session],
  );

  /**
   * initial focus
   */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  /**
   * save focus
   */
  useEffect(() => {
    const saveFocus = () => {
      if (inputRef.current && !document.getSelection()?.toString()) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("mouseup", saveFocus);

    return () => document.removeEventListener("mouseup", saveFocus);
  }, []);

  /**
   * scroll to bottom when session is appended/cleared
   */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
    }
  }, [session]);

  /**
   * handle input change
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  }, []);

  /**
   * handle input key down
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.code) {
        case "Enter": {
          e.preventDefault();

          handleCommand(command.trim());

          break;
        }
        case "ArrowUp": {
          e.preventDefault();

          setCommand(history[history.length - currentHistoryIndex.current - 1]);
          currentHistoryIndex.current++;

          break;
        }
        case "ArrowDown": {
          e.preventDefault();

          setCommand(history[history.length - currentHistoryIndex.current + 1]);
          currentHistoryIndex.current--;

          if (currentHistoryIndex.current <= 0) {
            currentHistoryIndex.current = 0;
            setCommand("");
          }

          break;
        }
        case "Tab": {
          e.preventDefault();

          const completions = COMMANDS.filter((completion) =>
            completion.startsWith(command),
          );

          if (completions.length === 1) {
            setCommand(completions[0]);
          }

          break;
        }
        default: {
          break;
        }
      }
    },
    [command, history],
  );

  return {
    handleCommand,
    handleChange,
    handleKeyDown,
    inputRef,
    history,
    session,
    command,
  };
};
