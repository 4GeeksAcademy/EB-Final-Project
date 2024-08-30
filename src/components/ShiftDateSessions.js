"use client";

import { createShift, updateShift, deleteShift } from "@/services/shifts";
import clsx from "clsx";
import { useState } from "react";

export function ShiftDateSession({ sessions, shift, person, date }) {
  const [existingShift, setExistingShift] = useState(shift);

  const handlerShiftSelect = (id) => async () => {
    if (existingShift) {
      // Update
      if (existingShift.sessions.includes(id)) {
        // Remove id
        if (existingShift.sessions.length > 1) {
          const newShift = await updateShift(
            shift.id,
            shift.sessions.filter((x) => x !== id),
            date
          );
          setExistingShift(newShift);
        } else {
          // Remove shift
          await deleteShift(shift.id, date);
          setExistingShift(undefined);
        }
      } else {
        // Add id
        const newShift = await updateShift(
          shift.id,
          [...shift.sessions, id],
          date
        );
        setExistingShift(newShift);
      }
    } else {
      // Create
      const newShift = await createShift(person.id, date, [id]);
      setExistingShift(newShift);
    }
  };
  return (
    <div className="flex flex-row gap-1">
      {sessions.map((session) => (
        <button
          onClick={handlerShiftSelect(session.id)}
          key={session.id}
          type="button"
          className={clsx(
            "p-2 rounded text-xs border border-gray-200 ",
            existingShift && existingShift.sessions.includes(session.id)
              ? "bg-green-400 text-white hover:bg-green-500"
              : "bg-white text-gray-700 hover:bg-gray-100"
          )}
        >
          {session.id[0].toUpperCase()}
        </button>
      ))}
    </div>
  );
}
