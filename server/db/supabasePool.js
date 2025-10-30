import { createClient } from "@supabase/supabase-js";
import { Pool } from "pg";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  max: 20, // 20 pooled connections per instance
});

export { supabase };
