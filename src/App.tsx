import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

type Instrument = Database["public"]["Tables"]["instruments"]["Row"];

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

function App() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    async function getInstruments() {
      const { data } = await supabase.from("instruments").select();
      setInstruments(data ?? []);
    }

    void getInstruments();
  }, []);

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.name}>{instrument.name}</li>
      ))}
    </ul>
  );
}

export default App;
