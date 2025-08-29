"use client";

import React from "react";
import { useParams } from "next/navigation";
import { StudentDetailClient } from "@/components/students/student-detail-client";

const StudentDetailPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div className="w-full">
      <StudentDetailClient studentId={id} />
    </div>
  );
};

export default StudentDetailPage;
