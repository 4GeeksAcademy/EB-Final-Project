import { getWeek } from "date-fns";
import { redirect } from "next/navigation";
import { date } from "zod";

export default function Shifts() {
  const result = getWeek(new Date());
  redirect("/shifts/" + result);
}
