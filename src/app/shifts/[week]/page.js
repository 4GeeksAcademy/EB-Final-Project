import React from "react";
import WeeklyCalendar from "@/components/WeeklyCalendar";

const ShiftsPage = ({ params: { week } }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Weekly Schedule</h1>
      <WeeklyCalendar week={parseInt(week)} />
    </div>
  );
};

export default ShiftsPage;
