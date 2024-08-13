import { createClient } from "@/utils/supabase/server";

export const getPerson = async (id) => {
  const supabase = createClient();
  const { data, } = await supabase
    .from("persons")
    .select("*")
    .eq("id", id)
    .single();

  return data || null;
};