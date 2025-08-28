"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { statusMap } from "@/constants/constants";
import { TypographyH2 } from "@/components/typography/typography-h2";

const student = {
  customId: "STU0001",
  name: "Vivek Kumar",
  emailId: "vivek.kumar@example.com",
  image: "/user-placeholder.png",
  phone: "9876543210",
  alternatePhone: "9123456789",
  bio: "Passionate learner and aspiring software engineer.",
  currentRole: "Frontend Developer",
  profileVisibility: true,
  contactMethod: "email",
  rememberMe: false,
  authProvider: "google",
  providerId: "google-oauth-123",
  emailVerified: true,
  courses: [
    {
      course: "65f1234abcd",
      progress: 80,
      status: "inprogress",
      enrolledAt: "2024-06-01",
    },
    {
      course: "65f1234abcd",
      progress: 20,
      status: "completed",
      enrolledAt: "2024-06-01",
    },
  ],
  jobApplications: [
    { job: "65j5678efgh", status: "applied", appliedAt: "2024-07-10" },
    { job: "65j5678efgh", status: "applied", appliedAt: "2024-07-10" },
  ],
  education: [
    {
      level: "Bachelor",
      institutionName: "XYZ University",
      streamOrSpecialization: "Computer Science",
      startYear: 2020,
      endYear: 2024,
      grade: "A",
    },
  ],
  experience: [
    {
      jobTitle: "Intern",
      companyName: "TechSoft Ltd",
      startDate: "2023-01-01",
      endDate: "2023-06-30",
      isCurrent: false,
    },
  ],
  certificates: [
    { title: "React Developer", issuedBy: "Udemy", issueDate: "2023-05-01" },
  ],
  skills: ["JavaScript", "React", "Node.js"],
  resumeUrl: "https://example.com/resume.pdf",
  portfolioLinks: ["https://github.com/vivek"],
  addresses: [
    {
      addressLine: "123 Street",
      city: "New Delhi",
      state: "Delhi",
      pinCode: "110001",
      isDefault: true,
    },
  ],
  notificationSettings: {
    pauseAllNotifications: false,
    courseProgressReminders: true,
    jobAlerts: true,
  },
  settings: {
    playbackSpeed: "1.0x",
    subtitles: true,
    courseLanguage: "English",
    weeklyLearningGoal: "5 hrs",
  },
  bringsYouHere: ["Career growth", "New skills"],
  areaOfInterest: {
    tech: ["Web Development", "AI"],
    business: [],
    creative: [],
    academic: [],
  },
  status: "active",
};

const StudentDetails = () => {
  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push("/admin/students")}
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft />
      <TypographyH2 heading="Student Details" />
      </button>
      {/* Profile Header */}
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Image
            src={student.image}
            alt={student.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="flex-1">
            <CardTitle>{student.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{student.emailId}</p>
            <Badge variant={statusMap[student.status]} className="capitalize">
              {student.status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Custom ID</TableCell>
                <TableCell>{student.customId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>{student.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alternate Phone</TableCell>
                <TableCell>{student.alternatePhone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Current Role</TableCell>
                <TableCell>{student.currentRole}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bio</TableCell>
                <TableCell>{student.bio}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-5 flex-wrap">
          {student.courses.map((c, idx) => (
            <div key={idx} className="mb-2 border p-4">
              <p>
                <span className="font-medium">Course ID</span>: {c.course}
              </p>
              <p>
                <span className="font-medium">Status</span>:{" "}
                <Badge
                  className="capitalize h-6"
                  variant={
                    c.status === "completed"
                      ? "success"
                      : c.status === "archived"
                      ? "destructive"
                      : "inProgress"
                  }
                >
                  {c.status}
                </Badge>
              </p>
              <p>
                <span className="font-medium">Progress</span>: {c.progress}%
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Job Applications</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-5 flex-wrap">
          {student.jobApplications.map((j, idx) => (
            <div key={idx} className="mb-2 border p-4">
              <p>
                <span className="font-medium">Job ID</span>: {j.job}
              </p>
              <p>
                <span className="font-medium">Status</span>: {j.status}
              </p>
              <p>
                <span className="font-medium">Applied At</span>: {j.appliedAt}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          {student.education.map((e, idx) => (
            <div key={idx} className="mb-2">
              <p>
                {e.level} - {e.institutionName}
              </p>
              <p>
                {e.streamOrSpecialization} ({e.startYear} - {e.endYear})
              </p>
              <p>Grade: {e.grade}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 flex-wrap">
          {student.skills.map((s, idx) => (
            <Badge key={idx} variant="secondary">
              {s}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDetails;
