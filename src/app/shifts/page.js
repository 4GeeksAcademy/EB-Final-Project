"use client";

import React from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';

const ShiftsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Weekly Schedule</h1>
      <WeeklyCalendar />
    </div>
  );
};

export default ShiftsPage;
