import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { TypographyH2 } from "../typography/typography-h2";
import { ArrowLeft } from "lucide-react";

export const StudentDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div> */}

      <div>
        <button
          className="flex justify-start items-center"
        >
          <ArrowLeft />
          <TypographyH2 heading="Student Details" />
        </button>
        <p className="text-muted-foreground">
          View and manage student information
        </p>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />{" "}
            {/* Profile image */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" /> {/* Name */}
              <Skeleton className="h-4 w-24" /> {/* Student ID */}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Skeleton className="h-8 w-28 rounded-md" /> {/* Dropdown */}
          </div>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" /> {/* Pending badge */}
          <Skeleton className="h-6 w-16 rounded-full" /> {/* Local badge */}
          <Skeleton className="h-6 w-20 rounded-full" />{" "}
          {/* Unverified badge */}
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="grid w-full grid-cols-5 gap-4 border-b bg-white p-2">
        <Skeleton className="h-8" /> {/* Personal */}
        <Skeleton className="h-8" /> {/* Education */}
        <Skeleton className="h-8" /> {/* Experience */}
        <Skeleton className="h-8" /> {/* Courses */}
        <Skeleton className="h-8" /> {/* Settings */}
      </div>

      {/* Personal Information Card */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" /> {/* Section title */}
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* Label */}
            <Skeleton className="h-6 w-40" /> {/* Value */}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
