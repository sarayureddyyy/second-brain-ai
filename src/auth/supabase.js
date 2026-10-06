import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "https://xxmqfkqawpdivxrltnii.supabase.co",
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_vvMT0Ik8Yl4H0kFFFpBbeg_Vuc4w7_a",
);
