import { noopRun, type OutputComponent } from "./commands";

export const Output: OutputComponent = ({ history }) => {
  return (
    <ol>
      {history.map((input, index) => (
        <li key={index} className="whitespace-pre">
          <span className="text-term-dim">{String(index + 1).padStart(5)}</span>
          {"  "}
          {input}
        </li>
      ))}
    </ol>
  );
};

export const run = noopRun;
