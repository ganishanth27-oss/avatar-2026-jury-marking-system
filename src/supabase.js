import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://ydxcgyiydgqsaggciqag.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeGNneWl5ZGdxc2FnZ2NpcWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMzk0ODYsImV4cCI6MjEwNTgxNTQ4Nn0.ta5ouz5DmE4pRi5TPvSzITbpbPPV5HWJ1Hg12PJk3Dw";


export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);