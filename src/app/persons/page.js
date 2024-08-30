import { createClient } from "@/utils/supabase/server";
import { Td } from "@/components/Td";
import { MyLink } from "@/components/MyLink";

export default async function PersonsList() {
  const supabase = createClient();
  const { data, error } = await supabase.from("persons").select("*");

  if (error) {
    return <div className="text-red-500">Error querying data</div>;
  }

  return (
    <div className="w-10/12 mx-auto flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Person List</h1>
      <div className="flex justify-end mb-4">
        <MyLink href="/persons/add" className="text-blue-500 hover:underline">
          Add Person
        </MyLink>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-sky-100">
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">DOB</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((person, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <Td className="border border-gray-300 p-2">{index + 1}</Td>
              <Td className="border border-gray-300 p-2">
                <MyLink
                  href={`/persons/${person.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {person.name} {person.last}
                </MyLink>
              </Td>
              <Td className="border border-gray-300 p-2">{person.dob}</Td>
              <Td className="border border-gray-300 p-2">{person.address}</Td>
              <Td className="border border-gray-300 p-2">{person.email}</Td>
              <Td className="border border-gray-300 p-2">{person.role}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
