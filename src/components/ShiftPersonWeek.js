import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { ShiftDateSession } from "./ShiftDateSessions";

export async function ShiftPersonWeek({ person, daysOfWeek, sessions }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("shifts")
    .select("*")
    .eq("persons_id", person.id)
    .in(
      "shift_date",
      daysOfWeek.map((d) => format(d, "yyyy-MM-dd"))
    );

  if (error) {
    console.log(error);
  }
  const shifts = data;
  console.log(JSON.stringify(shifts, null, 2));

  return (
    <tr>
      <td className="py-2 px-4 border-b">{person.name}</td>
      <td className="py-2 px-4 border-b">{person.role}</td>
      {daysOfWeek?.map((day, dayIndex) => {
        const d = format(day, "yyyy-MM-dd");
        const shift = shifts.find((s) => s.shift_date === d);
        return (
          <td key={dayIndex} className="py-2 px-4 border-b">
            <ShiftDateSession
              person={person}
              sessions={sessions}
              shift={shift}
              date={d}
            />
          </td>
        );
      })}
      <td className="py-2 px-4 border-b">{person.totalHours} hrs</td>
    </tr>
  );
}
