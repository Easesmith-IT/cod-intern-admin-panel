"use client";

import React from "react";
import { useParams } from "next/navigation";
import { InstructorUpdateClient } from "@/components/instructors/instructor-update-client";

const InstructorUpdatePage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div className="w-full">
      <InstructorUpdateClient instructorId={id} />
    </div>
  );
};

export default InstructorUpdatePage;
