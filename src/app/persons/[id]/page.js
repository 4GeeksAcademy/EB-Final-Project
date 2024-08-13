import { MyLink } from "@/components/MyLink";
import { getShifts } from "@/services/getShifts";

export default async function PersonPage({ params: { id } }) {
  const shifts = await getShifts(id);

  if(shifts) {
    console.log(shifts)
  }

  if (!shifts) {
    return <div>Error querying data</div>;
  }

  return (
    <div className="w-6/12 mx-auto flex flex-col gap-4">
      <h1>Shifts Info</h1>
      <div className="grid grid-cols-2 p-4 shadow rounded">
        {/* <div>Name</div>
        <div>
          {person.name} {person.last}
        </div>

        <div>DOB</div>
        <div>{person.dob}</div>

        <div>Address</div>
        <div>{person.address}</div>

        <div>Email</div>
        <div>{person.email}</div>

        <div>Role</div>
        <div>{person.role}</div> */}
      </div>
      

      <div className="flex flex-row gap-2">
        <MyLink href={`/persons/${id}/update`}>Update Info</MyLink>

     
      </div>
    </div>
  );
}