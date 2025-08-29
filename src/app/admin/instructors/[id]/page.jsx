"use client";

import React from "react";
import { useParams } from "next/navigation";
import { InstructorDetailClient } from "@/components/instructors/instructor-detail-client";

const InstructorDetailPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div className="w-full">
      <InstructorDetailClient instructorId={id} />
    </div>
  );
};

export default InstructorDetailPage;
