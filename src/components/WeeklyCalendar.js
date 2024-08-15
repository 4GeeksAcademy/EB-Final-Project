import { createClient } from "@/utils/supabase/server";
import { ShiftPersonWeek } from "./ShiftPersonWeek";
import {
  addDays,
  endOfWeek,
  format,
  lastDayOfWeek,
  setWeek,
  startOfWeek,
} from "date-fns";
import Link from "next/link";

const WeeklyCalendar = async ({ week }) => {
  const supabase = createClient();

  const { data: sessions } = await supabase.from("sessions").select("*");

  const { data, error } = await supabase.from("persons").select("*");
  if (error) {
    console.error("Error fetching workers:", error);
  }
  const persons = data.map((person) => ({
    name: `${person.name} ${person.last}`,
    role: person.role,
    id: person.id,
    totalHours: 0,
  }));

  const weekDate = setWeek(new Date(), week);
  const weekStart = startOfWeek(weekDate);
  const weekEnd = endOfWeek(weekDate);
  const weekDates = { startOfWeek: weekStart, endOfWeek: weekEnd };

  const daysOfWeek = [
    weekDates.startOfWeek,
    addDays(weekDates.startOfWeek, 1),
    addDays(weekDates.startOfWeek, 2),
    addDays(weekDates.startOfWeek, 3),
    addDays(weekDates.startOfWeek, 4),
    addDays(weekDates.startOfWeek, 5),
    weekDates.endOfWeek,
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <Link
          href={`/shifts/${week - 1}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Previous Week
        </Link>
        <h2 className="text-2xl font-bold">
          {format(weekDates.startOfWeek, "MMMM do")} -{" "}
          {format(weekDates.endOfWeek, "MMMM do")}
        </h2>
        <Link
          href={`/shifts/${week + 1}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next Week
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Role</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="py-2 px-4 border-b">
                {format(day, "EEE do")}
              </th>
            ))}
            <th className="py-2 px-4 border-b">Estimated Hours</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <ShiftPersonWeek
              person={person}
              key={person.id}
              daysOfWeek={daysOfWeek}
              sessions={sessions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
