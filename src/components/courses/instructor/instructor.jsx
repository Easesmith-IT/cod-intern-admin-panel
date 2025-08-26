import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "react-hook-form";

export const Instructor = ({ instructor, selectedInstructorIds }) => {
  const { setValue, getValues } = useFormContext();

  const toggleInstructorSelection = (instructorId) => {
    const currentInstructors = getValues("instructors");
    if (currentInstructors.includes(instructorId)) {
      setValue(
        "instructors",
        currentInstructors.filter((id) => id !== instructorId)
      );
    } else {
      setValue("instructors", [...currentInstructors, instructorId]);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
        selectedInstructorIds.includes(instructor._id)
          ? "border-primary bg-primary/5"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={() => toggleInstructorSelection(instructor._id)}
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={instructor.profileImage}
            alt={instructor.firstName}
          />
          <AvatarFallback>
            {instructor.firstName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">
                {instructor.firstName} {instructor.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {instructor.email}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{instructor?.ratings?.average || 0}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {instructor.courses.length} courses
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex flex-wrap gap-1 mb-2">
              {instructor.expertise.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {instructor.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SelectedInstructor = ({ instructor }) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={instructor.profileImage} alt={instructor.firstName} />
        <AvatarFallback className="text-xs">
          {instructor.firstName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm">{instructor.firstName}</span>
    </div>
  );
};
