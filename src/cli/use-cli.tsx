import { useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  COMMANDS,
  getCommand,
  type Entry,
  type State,
} from "./commands";
import { tokenize } from "./tokenize";
import { getNode, HOME, resolvePath } from "../fs";

const INITIAL_ENTRY: Entry = {
  id: 0,
  input: Command.HELP,
  name: Command.HELP,
  args: [],
  cwd: HOME,
  historySize: 0,
};

const PATH_COMMANDS: string[] = [Command.LS, Command.CD, Command.CAT];

const commonPrefix = (values: string[]) =>
  values.reduce((prefix, value) => {
    let i = 0;

    while (i < prefix.length && prefix[i] === value[i]) i++;

    return prefix.slice(0, i);
  });

/**
 * completions for the last word of input: command names or paths
 */
const complete = (input: string, cwd: string): string[] => {
  const words = input.trimStart().split(/\s+/);
  const word = words[words.length - 1];

  if (words.length === 1) {
    return COMMANDS.filter((command) => command.startsWith(word));
  }

  if (!PATH_COMMANDS.includes(words[0])) {
    return [];
  }

  const slash = word.lastIndexOf("/");
  const dirPart = word.slice(0, slash + 1);
  const base = word.slice(slash + 1);
  const dir = getNode(resolvePath(cwd, dirPart || "."));

  if (dir?.type !== "dir") {
    return [];
  }

  return Object.entries(dir.children)
    .filter(
      ([name, node]) =>
        name.startsWith(base) &&
        (words[0] !== Command.CD || node.type === "dir"),
    )
    .map(([name, node]) => dirPart + name + (node.type === "dir" ? "/" : ""));
};

export const useCLI = () => {
  const [command, setCommand] = useState("");
  const [session, setSession] = useState<State["session"]>([INITIAL_ENTRY]);
  const [history, setHistory] = useState<State["history"]>([]);
  const [cwd, setCwd] = useState<State["cwd"]>(HOME);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentHistoryIndex = useRef<number>(0);
  const nextId = useRef<number>(1);

  /**
   * run any command
   */
  const handleCommand = useCallback(
    (input: string) => {
      const [name = "", ...args] = tokenize(input);
      const nextHistory = input ? [...history, input] : history;

      const entry: Entry = {
        id: nextId.current++,
        input,
        name,
        args,
        cwd,
        historySize: nextHistory.length,
      };

      const state: State = {
        history: nextHistory,
        session: [...session, entry],
        cwd,
      };

      const newState = name ? getCommand(name).run(state, args) : state;

      setHistory(newState.history);
      setSession(newState.session);
      setCwd(newState.cwd);

      setCommand("");
      currentHistoryIndex.current = 0;
    },
    [history, session, cwd],
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

          if (currentHistoryIndex.current < history.length) {
            currentHistoryIndex.current++;
            setCommand(history[history.length - currentHistoryIndex.current]);
          }

          break;
        }
        case "ArrowDown": {
          e.preventDefault();

          if (currentHistoryIndex.current > 0) {
            currentHistoryIndex.current--;
            setCommand(
              currentHistoryIndex.current === 0
                ? ""
                : history[history.length - currentHistoryIndex.current],
            );
          }

          break;
        }
        case "Tab": {
          e.preventDefault();

          const completions = complete(command, cwd);

          if (!completions.length) {
            break;
          }

          const word =
            completions.length === 1
              ? completions[0]
              : commonPrefix(completions);
          const suffix =
            completions.length === 1 && !word.endsWith("/") ? " " : "";

          setCommand(command.replace(/\S*$/, () => word + suffix));

          break;
        }
        default: {
          break;
        }
      }
    },
    [command, history, cwd, handleCommand],
  );

  return {
    handleCommand,
    handleChange,
    handleKeyDown,
    inputRef,
    history,
    session,
    command,
    cwd,
  };
};
