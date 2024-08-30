import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const removePerson = async (id) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("persons").delete().eq("id", id);
  if (error) {
    console.error("Error deleting shift:", error.message);
    return null; // Handle error
  }
  return data || null;
};
