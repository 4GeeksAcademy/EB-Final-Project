export function ShiftPersonWeek({ worker, daysOfWeek }) {
  return (
    <tr>
      <td className="py-2 px-4 border-b">{worker.name}</td>
      <td className="py-2 px-4 border-b">{worker.role}</td>
      {daysOfWeek?.map((day, dayIndex) => (
        <td key={dayIndex} className="py-2 px-4 border-b">
          <div className="flex flex-col">
            {/* <select
                      value={shift.start}
                      onChange={(e) => handleShiftChange(workerIndex, dayIndex, 'start', e.target.value)}
                      className="mb-2"
                    >
                      <option value="">Start</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>{i}:00</option>
                      ))}
                    </select>
                    <select
                      value={shift.end}
                      onChange={(e) => handleShiftChange(workerIndex, dayIndex, 'end', e.target.value)}
                    >
                      <option value="">End</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>{i}:00</option>
                      ))}
                    </select> */}
          </div>
        </td>
      ))}
      <td className="py-2 px-4 border-b">{worker.totalHours} hrs</td>
    </tr>
  );
}
