"use client";

import { PersonForm } from "@/components/PersonForm";
import { createPerson } from "@/services/createPerson";
import { format } from "date-fns";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddPerson() {
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  const handleSave = async (data) => {
    const safeData = { dob: format(data.dob, "yyyy-MM-dd"), ...data };
    setIsSaving(true);
    await createPerson(safeData);
    setIsSaving(false);
    router.back();
  };

  return (
    <div>
      <h1 className="text-center text-xl font-semibold mt-5">Add person</h1>
      <PersonForm
        onSave={handleSave}
        isSaving={isSaving}
        buttonLabel="Create Person"
      />
    </div>
  );
}
