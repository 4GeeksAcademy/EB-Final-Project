// components/ShiftForm.js
import { useState } from 'react';
import { supabase } from '../utils/supabase/client';

export default function ShiftForm({ shift, onSave }) {
  const [name, setName] = useState(shift ? shift.name : '');
  const [position, setPosition] = useState(shift ? shift.position : '');
  const [startTime, setStartTime] = useState(shift ? shift.start_time : '');
  const [endTime, setEndTime] = useState(shift ? shift.end_time : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data, error;
    if (shift) {
      ({ data, error } = await supabase
        .from('shifts')
        .update({ name, position, start_time: startTime, end_time: endTime })
        .eq('id', shift.id));
    } else {
      ({ data, error } = await supabase
        .from('shifts')
        .insert({ name, position, start_time: startTime, end_time: endTime }));
    }

    if (error) {
      console.error('Error saving shift:', error);
    } else {
      onSave(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
          Position
        </label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {shift ? 'Update Shift' : 'Add Shift'}
      </button>
    </form>
  );
}
