import { createClient } from "@supabase/supabase-js";

// These come from .env.local
// createClient() sets up the connection — it does NOT make a network call yet
// Network calls happen only when you do .from("table").select() etc.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
