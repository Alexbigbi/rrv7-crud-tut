import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tjactcsqdtoazzualjzk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqYWN0Y3NxZHRvYXp6dWFsanprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjE4NTcsImV4cCI6MjA2NTQ5Nzg1N30.DjR0C5LLyu_gZmOqacjI0HgVQzOyOFXpzIWwKEBML4w";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
