"use server";

import { createClient } from "@/utils/supabase/server";
import { getWeek } from "date-fns";
import { revalidatePath } from "next/cache";

export async function createShift(personId, date, sessions) {
  const supabase = createClient();
  const { data } = await supabase
    .from("shifts")
    .insert([{ persons_id: personId, shift_date: date, sessions: sessions }])
    .select();

  const d = new Date(date);
  const week = getWeek(d);

  revalidatePath(`/shifts/${week}`);
  return data[0];
}

export async function updateShift(shiftId, sessions, date) {
  const supabase = createClient();

  console.log({ shiftId, sessions, date });
  await supabase
    .from("shifts")
    .update({ sessions: sessions })
    .eq("id", shiftId);

  const d = new Date(date);
  const week = getWeek(d);

  revalidatePath(`/shifts/${week}`);

  const { data } = await supabase
    .from("shifts")
    .select("*")
    .eq("id", shiftId)
    .single();
  return data;
}

export async function deleteShift(shiftId, date) {
  const supabase = createClient();

  const { error } = await supabase.from("shifts").delete().eq("id", shiftId);
  const d = new Date(date);
  const week = getWeek(d);

  revalidatePath(`/shifts/${week}`);
}
