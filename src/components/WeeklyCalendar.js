import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { ShiftPersonWeek } from "./ShiftPersonWeek";
import { useRouter } from "next/navigation";
import { addDays, format, lastDayOfWeek, setWeek } from "date-fns";

const WeeklyCalendar = ({ week }) => {
  const [workers, setWorkers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchWorkers = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("persons").select("*");
      if (error) {
        console.error("Error fetching workers:", error);
      } else {
        const formattedWorkers = data.map((person) => ({
          name: `${person.name} ${person.last}`,
          role: person.role,
          id: person.id,
          totalHours: 0,
        }));
        setWorkers(formattedWorkers);
      }
    };

    fetchWorkers();
  }, []);

  const weekDates = useMemo(() => {
    const startOfWeek = setWeek(new Date(), week);
    const endOfWeek = addDays(startOfWeek, 6);
    return { startOfWeek, endOfWeek };
  }, [week]);

  const daysOfWeek = useMemo(() => {
    return [
      weekDates.startOfWeek,
      addDays(weekDates.startOfWeek, 1),
      addDays(weekDates.startOfWeek, 2),
      addDays(weekDates.startOfWeek, 3),
      addDays(weekDates.startOfWeek, 4),
      addDays(weekDates.startOfWeek, 5),
      weekDates.endOfWeek,
    ];
  }, [weekDates]);

  const handlePreviousWeek = () => {
    router.push(`/shifts/${week - 1}`);
  };

  const handleNextWeek = () => {
    router.push(`/shifts/${week + 1}`);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousWeek}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Previous Week
        </button>
        <h2 className="text-2xl font-bold">
          {format(weekDates.startOfWeek, "MMMM do")} -{" "}
          {format(weekDates.endOfWeek, "MMMM do")}
        </h2>
        <button
          onClick={handleNextWeek}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next Week
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Role</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="py-2 px-4 border-b">
                {format(day, "MMM d")}
              </th>
            ))}
            <th className="py-2 px-4 border-b">Estimated Hours</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, workerIndex) => (
            <ShiftPersonWeek
              worker={worker}
              key={worker.id}
              daysOfWeek={daysOfWeek}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
