import type { Pattern } from "./Pattern";

type PatternToggleProps = {
  pattern: Pattern;
  selected: boolean;
  toggleCallback: () => void;
};

export default function PatternToggle({
  pattern,
  selected,
  toggleCallback,
}: PatternToggleProps) {
  return (
    <li
      className={"pattern-toggle" + (selected ? " selected" : "")}
      onClick={toggleCallback}
    >
      <span className="placeholder">•</span>
      {pattern.name}
    </li>
  );
}
