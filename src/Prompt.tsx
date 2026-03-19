import type { Note } from "./Note";
import type { Pattern } from "./Pattern";

export type PromptProps = { root: Note; pattern: Pattern };

export default function Prompt({ root, pattern }: PromptProps) {
  return (
    <div className="prompt">
      {root}
      {pattern.name}
    </div>
  );
}
