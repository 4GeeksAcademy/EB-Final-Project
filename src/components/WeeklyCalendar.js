"use client";

import React, { useState } from 'react';

const WeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getWeekDates = (date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDates.push(day);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(new Date(currentWeek));
  const month = weekDates[0].toLocaleString('default', { month: 'long' });

  const handlePreviousWeek = () => {
    setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)));
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousWeek} className="bg-blue-500 text-white px-4 py-2">Previous Week</button>
        <h2 className="text-2xl font-bold">{month} {weekDates[0].getDate()} - {weekDates[6].getDate()}</h2>
        <button onClick={handleNextWeek} className="bg-blue-500 text-white px-4 py-2">Next Week</button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Worker</th>
            <th className="py-2 px-4 border-b">Position</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="py-2 px-4 border-b">{day} {weekDates[index].getDate()}</th>
            ))}
            <th className="py-2 px-4 border-b">Estimated Hours</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí puedes agregar las filas con los datos correspondientes */}
          <tr>
            <td className="py-2 px-4 border-b">Worker Name</td>
            <td className="py-2 px-4 border-b">Position</td>
            {daysOfWeek.map((day, index) => (
              <td key={index} className="py-2 px-4 border-b">Content for {day}</td>
            ))}
            <td className="py-2 px-4 border-b">Total Hours</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
