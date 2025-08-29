"use client";

import React from "react";
import { useParams } from "next/navigation";
import { StudentUpdateClient } from "@/components/students/student-update-client";

const StudentUpdatePage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div className="w-full">
      <StudentUpdateClient studentId={id} />
    </div>
  );
};

export default StudentUpdatePage;
