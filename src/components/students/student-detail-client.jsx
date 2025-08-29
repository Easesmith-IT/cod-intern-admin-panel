"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Briefcase,
  Award,
  Settings,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { TypographyH2 } from "../typography/typography-h2";
import { format } from "date-fns";
import Spinner from "../shared/Spinner";
import { statusMap } from "@/constants/constants";
import { PATCH } from "@/constants/apiMethods";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentDetailsSkeleton } from "./student-details-skeleton";

export const StudentDetailClient = ({ studentId }) => {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/students/${studentId}`,
    queryKeys: ["student", studentId],
  });

  const { mutateAsync: updateStatus, isPending: isUpdatingStatus } =
    useApiMutation({
      url: `/admin/students/${studentId}/status`,
      method: PATCH,
      invalidateKey: ["student", studentId],
    });

  const student = data?.data?.student;

  console.log("student", student);
  

  React.useEffect(() => {
    if (student?.status) {
      setStatus(student.status);
    }
  }, [student]);

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    await updateStatus({ status: newStatus });
  };

  const handleBack = () => {
    router.push("/admin/students");
  };

  const handleEdit = () => {
    router.push(`/admin/students/${studentId}/update`);
  };

  if (isLoading) {
    return (
        <StudentDetailsSkeleton />
    );
  }

  if (error || !student) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Student not found or error loading data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={handleBack}
            className="flex justify-start items-center"
          >
            <ArrowLeft />
            <TypographyH2 heading="Student Details" />
          </button>
          <p className="text-muted-foreground">
            View and manage student information
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Student
          </Button>
        </div>
      </div>

      {/* Student Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={student.image || "/user-placeholder.png"}
                  className="object-cover"
                  alt={student.name}
                />
                <AvatarFallback className="text-lg">
                  {student.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{student.name}</h3>
                <p className="text-muted-foreground">{student.customId}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={statusMap[status]} className="capitalize">
                    {status}
                  </Badge>
                  <Badge className="capitalize" variant="outline">{student.authProvider}</Badge>
                  <Badge
                    variant={student.emailVerified ? "success" : "destructive"}
                    className="flex items-center space-x-1"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    <span>
                      {student.emailVerified ? "Verified" : "Unverified"}
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {isUpdatingStatus && <Spinner className="h-4 w-4 mx-auto" />}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Name
                  </label>
                  <p className="text-sm">{student.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Student ID
                  </label>
                  <p className="text-sm font-mono">{student.customId}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <p className="text-sm">{student.emailId}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone
                  </label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <p className="text-sm">{student.phone || "Not provided"}</p>
                  </div>
                </div>
                {student.alternatePhone && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Alternate Phone
                    </label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <p className="text-sm">{student.alternatePhone}</p>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Joined
                  </label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <p className="text-sm">
                      {format(new Date(student.createdAt), "PPP")}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <p className="text-sm">
                      {format(new Date(student.updatedAt), "PPP")}
                    </p>
                  </div>
                </div>
              </div>
              {student.bio && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Bio
                    </label>
                    <p className="text-sm">{student.bio}</p>
                  </div>
                </>
              )}
              {student.skills && student.skills.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {student.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Education History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {student.education && student.education.length > 0 ? (
                <div className="space-y-4">
                  {student.education.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">{edu.level}</h4>
                          <p className="text-sm text-muted-foreground">
                            {edu.institutionName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {edu.boardOrUniversity}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Specialization:</span>{" "}
                            {edu.streamOrSpecialization}
                          </p>
                          {edu.grade && (
                            <p className="text-sm">
                              <span className="font-medium">Grade:</span>{" "}
                              {edu.grade} {edu.gradeFormat}
                            </p>
                          )}
                          <p className="text-sm">
                            <span className="font-medium">Duration:</span>{" "}
                            {edu.startYear} -{" "}
                            {edu.isPursuing ? "Present" : edu.endYear}
                          </p>
                          {edu.isPursuing && (
                            <Badge variant="secondary" className="mt-1">
                              Currently Pursuing
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No education information provided.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Work Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {student.experience && student.experience.length > 0 ? (
                <div className="space-y-4">
                  {student.experience.map((exp, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">{exp.jobTitle}</h4>
                        <p className="text-muted-foreground">
                          {exp.companyName}
                        </p>
                        {exp.location && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                        <p className="text-sm">
                          {format(new Date(exp.startDate), "MMM yyyy")} -{" "}
                          {exp.isCurrent
                            ? "Present"
                            : format(new Date(exp.endDate), "MMM yyyy")}
                        </p>
                        {exp.isCurrent && (
                          <Badge variant="secondary">Current Position</Badge>
                        )}
                        {exp.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No work experience provided.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Enrolled Courses ({student.courses?.length || 0})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student.courses && student.courses.length > 0 ? (
                  <div className="space-y-3">
                    {student.courses.map((course, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="space-y-1">
                          <p className="font-medium">Course #{index + 1}</p>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={
                                course.status === "completed"
                                  ? "success"
                                  : course.status === "in progress"
                                  ? "inProgress"
                                  : "secondary"
                              }
                            >
                              {course.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {course.progress}% complete
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Enrolled:{" "}
                            {format(
                              new Date(course.enrolledAt),
                              "MMM dd, yyyy"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No courses enrolled.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>
                    Job Applications ({student.jobApplications?.length || 0})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student.jobApplications &&
                student.jobApplications.length > 0 ? (
                  <div className="space-y-3">
                    {student.jobApplications.map((application, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="space-y-1">
                          <p className="font-medium">
                            Application #{index + 1}
                          </p>
                          <Badge
                            variant={
                              application.status === "offer"
                                ? "success"
                                : application.status === "interview"
                                ? "inProgress"
                                : application.status === "rejected"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {application.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            Applied:{" "}
                            {format(
                              new Date(application.appliedAt),
                              "MMM dd, yyyy"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No job applications.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Account Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Profile Visibility
                  </label>
                  <p className="text-sm">
                    {student.profileVisibility ? "Public" : "Private"}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Contact Method
                  </label>
                  <p className="text-sm">
                    {student.contactMethod || "Not specified"}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Learning Goal
                  </label>
                  <p className="text-sm">
                    {student.settings?.weeklyLearningGoal || 4} hours/week
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Playback Speed
                  </label>
                  <p className="text-sm">
                    {student.settings?.playbackSpeed || "1.0x"}
                  </p>
                </div>
              </div>

              {student.notificationSettings && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">
                      Notification Preferences
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          Course Progress Reminders
                        </span>
                        <Badge
                          variant={
                            student.notificationSettings.courseProgressReminders
                              ? "success"
                              : "secondary"
                          }
                        >
                          {student.notificationSettings.courseProgressReminders
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Assignment Deadlines</span>
                        <Badge
                          variant={
                            student.notificationSettings.assignmentDeadlines
                              ? "success"
                              : "secondary"
                          }
                        >
                          {student.notificationSettings.assignmentDeadlines
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Job Alerts</span>
                        <Badge
                          variant={
                            student.notificationSettings.jobAlerts
                              ? "success"
                              : "secondary"
                          }
                        >
                          {student.notificationSettings.jobAlerts
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Promotions & Discounts</span>
                        <Badge
                          variant={
                            student.notificationSettings.promotionsAndDiscounts
                              ? "success"
                              : "secondary"
                          }
                        >
                          {student.notificationSettings.promotionsAndDiscounts
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
