import type { Note } from "./Note";
import type { Pattern } from "./Pattern";
import "./Prompt.css";

export type PromptProps = { root: Note; pattern: Pattern };

export default function Prompt(props: PromptProps) {
  const { root, pattern } = props;
  return (
    <div className="prompt">
      {root}
      {pattern.name}
    </div>
  );
}
