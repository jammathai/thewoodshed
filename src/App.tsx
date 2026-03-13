import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { allNotes } from "./Note";
import type { Pattern } from "./Pattern";
import Prompt, { type PromptProps } from "./Prompt";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

function pickRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function App() {
  const [allPatterns, setAllPatterns] = useState<Pattern[]>([]);
  const [promptProps, setPromptProps] = useState<PromptProps>({
    root: "C",
    pattern: { name: "", intervals: [] },
  });

  const allPatternsRef = useRef(allPatterns);
  useEffect(() => {
    allPatternsRef.current = allPatterns;
  }, [allPatterns]);

  useEffect(() => {
    async function getPatterns() {
      const { data } = await supabase.from("patterns").select();
      setAllPatterns((data as Pattern[]) ?? []);
    }

    void getPatterns();

    function pickPrompt() {
      setPromptProps({
        root: pickRandom(allNotes),
        pattern: pickRandom(allPatternsRef.current),
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
    </>
  );
}

export default App;
