import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import type { Note } from "./Note";
import { type Pattern } from "./Pattern";
import PatternGroup, { type PatternGroupRow } from "./PatternGroup";
import Prompt, { type PromptProps } from "./Prompt";
import RootSelector from "./RootSelector";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

function pickRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function App() {
  const [selectedRoots, setSelectedRoots] = useState<Note[]>([]);
  const [patternGroups, setPatternGroups] = useState<PatternGroupRow[]>([]);
  const [allPatterns, setAllPatterns] = useState<Pattern[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<Pattern[]>([]);
  const [promptProps, setPromptProps] = useState<PromptProps>({
    root: "C",
    pattern: { name: "", group_id: "", intervals: [] },
  });

  const selectedPatternsRef = useRef(selectedPatterns);
  const selectedRootsRef = useRef(selectedRoots);
  useEffect(() => {
    selectedPatternsRef.current = selectedPatterns;
  }, [selectedPatterns]);
  useEffect(() => {
    selectedRootsRef.current = selectedRoots;
  }, [selectedRoots]);

  useEffect(() => {
    async function getPatternGroups() {
      const { data } = await supabase.from("pattern_groups").select();
      if (data !== null) data.sort((a, b) => a.name.localeCompare(b.name));
      setPatternGroups(data ?? []);
    }

    async function getPatterns() {
      const { data } = await supabase.from("patterns").select();
      if (data !== null) data.sort((a, b) => a.name.localeCompare(b.name));
      setAllPatterns((data as Pattern[]) ?? []);
    }

    void getPatternGroups();
    void getPatterns();

    function pickPrompt() {
      if (
        selectedRootsRef.current.length === 0 ||
        selectedPatternsRef.current.length === 0
      )
        return;

      setPromptProps({
        root: pickRandom(selectedRootsRef.current),
        pattern: pickRandom(selectedPatternsRef.current),
      });
    }

    addEventListener("keydown", pickPrompt);

    return () => {
      removeEventListener("keydown", pickPrompt);
    };
  }, []);

  return (
    <>
      <Prompt {...promptProps} />
      <RootSelector
        selectedRoots={selectedRoots}
        setSelectedRoots={setSelectedRoots}
      />
      <ul className="pattern-groups">
        {patternGroups.map((group, index) => (
          <PatternGroup
            allPatterns={allPatterns}
            selectedPatterns={selectedPatterns}
            setSelectedPatterns={setSelectedPatterns}
            key={index}
            {...group}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
