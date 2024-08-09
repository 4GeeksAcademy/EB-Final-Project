// src/app/shifts/page.js
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import ShiftForm from '@/components/ShiftForm';

export default function Shifts() {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    const { data, error } = await supabase.from('shifts').select('*');
    if (error) {
      console.error('Error fetching shifts:', error);
    } else {
      setShifts(data);
    }
  };

  const handleSave = (newShift) => {
    setShifts((prevShifts) =>
      selectedShift
        ? prevShifts.map((shift) => (shift.id === newShift.id ? newShift : shift))
        : [...prevShifts, newShift]
    );
    setSelectedShift(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Shifts</h1>
      <ShiftForm shift={selectedShift} onSave={handleSave} />
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {shift.name} - {shift.position} - {shift.start_time} to {shift.end_time}
            <button onClick={() => setSelectedShift(shift)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
