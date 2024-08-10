"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client'; // Asegúrate de usar la dirección de servicio correcta

const ScheduleTable = () => {
  const [schedule, setSchedule] = useState([]);
  const [editingShift, setEditingShift] = useState(null);
  const [newShift, setNewShift] = useState({ day: '', worker: '', position: '', time: '' });

  useEffect(() => {
    const fetchSchedule = async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .eq('week', getCurrentWeek());

      if (error) {
        console.error('Error fetching schedule:', error);
        return;
      }

      setSchedule(data);
    };

    fetchSchedule();
  }, []);

  const getCurrentWeek = () => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const endOfWeek = new Date(currentDate.setDate(startOfWeek.getDate() + 6));
    return `${startOfWeek.toISOString().split('T')[0]} - ${endOfWeek.toISOString().split('T')[0]}`;
  };

  const handleEdit = (shift) => {
    setEditingShift(shift);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('schedules')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting shift:', error);
      return;
    }

    setSchedule(schedule.filter(shift => shift.id !== id));
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('schedules')
      .update(editingShift)
      .eq('id', editingShift.id);

    if (error) {
      console.error('Error updating shift:', error);
      return;
    }

    setSchedule(schedule.map(shift => (shift.id === editingShift.id ? editingShift : shift)));
    setEditingShift(null);
  };

  const handleAdd = async () => {
    const { data, error } = await supabase
      .from('schedules')
      .insert([newShift]);

    if (error) {
      console.error('Error adding shift:', error);
      return;
    }

    setSchedule([...schedule, ...data]);
    setNewShift({ day: '', worker: '', position: '', time: '' });
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Day</th>
            <th className="py-2 px-4 border-b">Worker</th>
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Shift</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => (
            schedule.filter(shift => shift.day === day).map((shift, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-red-100' : 'bg-yellow-100'}>
                <td className="py-2 px-4 border-b">{shift.day}</td>
                <td className="py-2 px-4 border-b">{shift.worker}</td>
                <td className="py-2 px-4 border-b">{shift.position}</td>
                <td className="py-2 px-4 border-b">{shift.time}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleEdit(shift)} className="text-blue-500 hover:text-blue-700">Edit</button>
                  <button onClick={() => handleDelete(shift.id)} className="text-red-500 hover:text-red-700 ml-2">Delete</button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>

      {editingShift && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Edit Shift</h2>
          <input
            type="text"
            value={editingShift.worker}
            onChange={(e) => setEditingShift({ ...editingShift, worker: e.target.value })}
            placeholder="Worker"
            className="border p-2 mb-2"
          />
          <input
            type="text"
            value={editingShift.position}
            onChange={(e) => setEditingShift({ ...editingShift, position: e.target.value })}
            placeholder="Position"
            className="border p-2 mb-2"
          />
          <input
            type="text"
            value={editingShift.time}
            onChange={(e) => setEditingShift({ ...editingShift, time: e.target.value })}
            placeholder="Shift"
            className="border p-2 mb-2"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white p-2">Save</button>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Add New Shift</h2>
        <input
          type="text"
          value={newShift.worker}
          onChange={(e) => setNewShift({ ...newShift, worker: e.target.value })}
          placeholder="Worker"
          className="border p-2 mb-2"
        />
        <input
          type="text"
          value={newShift.position}
          onChange={(e) => setNewShift({ ...newShift, position: e.target.value })}
          placeholder="Position"
          className="border p-2 mb-2"
        />
        <input
          type="text"
          value={newShift.time}
          onChange={(e) => setNewShift({ ...newShift, time: e.target.value })}
          placeholder="Shift"
          className="border p-2 mb-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white p-2">Add</button>
      </div>
    </div>
  );
};

export default ScheduleTable;
