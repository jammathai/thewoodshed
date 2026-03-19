import { useState, type Dispatch, type SetStateAction } from "react";
import type { Pattern } from "./Pattern";
import PatternToggle from "./PatternToggle";

export type PatternGroupRow = { id: string; name: string };
type PatternGroupProps = {
  allPatterns: Pattern[];
  selectedPatterns: Pattern[];
  setSelectedPatterns: Dispatch<SetStateAction<Pattern[]>>;
} & PatternGroupRow;

export default function PatternGroup({
  allPatterns,
  selectedPatterns,
  setSelectedPatterns,
  id,
  name,
}: PatternGroupProps) {
  const [expanded, setExpanded] = useState(true);

  const patterns = allPatterns.filter((pattern) => pattern.group_id === id);

  return (
    <li className={"pattern-group" + (expanded ? " expanded" : "")}>
      <div
        className="pattern-group-heading"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <span>{name}</span>
        <span className="float-right">{expanded ? "⏶" : "⏷"}</span>
      </div>
      <div className="pattern-group-content">
        <ul>
          {patterns.map((pattern, index) => {
            const selected = selectedPatterns.includes(pattern);

            const toggleCallback = selected
              ? () => {
                  setSelectedPatterns(
                    selectedPatterns.filter((value) => value !== pattern),
                  );
                }
              : () => {
                  setSelectedPatterns([...selectedPatterns, pattern]);
                };

            return (
              <PatternToggle
                pattern={pattern}
                selected={selected}
                toggleCallback={toggleCallback}
                key={index}
              />
            );
          })}
        </ul>
      </div>
    </li>
  );
}
