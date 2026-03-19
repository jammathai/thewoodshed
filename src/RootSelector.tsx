import type { Dispatch, SetStateAction } from "react";
import { allNotes, type Note } from "./Note";
import RootToggle from "./RootToggle";

type RootSelectorProps = {
  selectedRoots: Note[];
  setSelectedRoots: Dispatch<SetStateAction<Note[]>>;
};

export default function RootSelector({
  selectedRoots,
  setSelectedRoots,
}: RootSelectorProps) {
  return (
    <ul className="root-selector">
      {allNotes.map((note) => {
        const selected = selectedRoots.includes(note);

        const toggleCallback = selected
          ? () => {
              setSelectedRoots(selectedRoots.filter((value) => value !== note));
            }
          : () => {
              setSelectedRoots([...selectedRoots, note]);
            };

        return (
          <RootToggle
            note={note}
            selected={selected}
            toggleCallback={toggleCallback}
          />
        );
      })}
    </ul>
  );
}
