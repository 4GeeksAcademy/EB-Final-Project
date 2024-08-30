import { MyLink } from "@/components/MyLink";
import { getShifts } from "@/services/getShifts";
// import { removePerson } from "@/services/removePersons";

export default async function PersonPage({ params: { id } }) {
  // const shifts = await getShifts(id);
  const shifts = await getShifts(id);

  if (!shifts) {
    return <div className="text-red-500">Error querying data</div>;
  }
  const person = Array.isArray(shifts) ? shifts[0] : shifts;

  return (
    <div className="w-6/12 mx-auto flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center">Shifts Info</h1>
      <div className="grid grid-cols-2 gap-4 p-4 bg-sky-100 shadow rounded">
        <div className="font-semibold">Name</div>
        <div>
          {person.persons.name} {person.persons.last}
        </div>
        {/* 
        <div>Last Name</div>
        <div>{person.dob}</div>
 
        <div>Address</div>
        <div>{person.address}</div>

        <div>Email</div>
        <div>{person.email}</div> */}

        <div className="font-semibold">Role</div>
        <div>{person.persons.role}</div>
      </div>
      <table className="w-full border-collapse border border-sky-300 mt-4">
        <thead>
          <tr className="bg-sky-100">
            <th className="border border-gray-300 p-2">Shift Date</th>
            <th className="border border-gray-300 p-2">Shift</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((item, index) => (
            <tr key={index} className="hover:bg-sky-100">
              <td className="border border-gray-300 p-2">{item.shift_date}</td>
              <td className="border border-gray-300 p-2">
                {item.sessions.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <MyLink
          href={`/persons/${id}/update`}
          className="text-blue-500 hover:underline"
        >
          Update Info
        </MyLink>
      </div>
    </div>
  );
}
