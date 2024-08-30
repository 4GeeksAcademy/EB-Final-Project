import { createClient } from "@/utils/supabase/server";

export const getShifts = async (id) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("shifts")
    .select("*, persons!inner(name, last, role)")
    .eq("persons_id", id);
  console.log(data);
  return data || null;
};
