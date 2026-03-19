import { noteValues, type Note } from "./Note";

type RootToggleProps = {
  note: Note;
  selected: boolean;
  toggleCallback: () => void;
};

export default function RootToggle({
  note,
  selected,
  toggleCallback,
}: RootToggleProps) {
  return (
    <li
      className={
        (note.length === 1 ? "white-key" : "black-key") +
        (selected ? " selected" : "")
      }
      onClick={toggleCallback}
      style={{
        gridRow: (() => {
          switch (note.at(-1)) {
            case "♯":
              return "1 / 2";
            case "♭":
              return "2 / 3";
            default:
              return "1 / 3";
          }
        })(),
        gridColumn: noteValues[note] + 1,
      }}
    >
      {note}
    </li>
  );
}
