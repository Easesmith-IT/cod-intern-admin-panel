"use client";

import React, { useEffect, useState } from "react";
import { PaginationComp } from "../shared/PaginationComp";
import DataNotFound from "../shared/DataNotFound";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApiQuery } from "@/hooks/useApiQuery";
import { TypographyH2 } from "../typography/typography-h2";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "./student";

const students = [
  {
    studentId: "STU1001",
    name: "Vivek Kumar",
    company: "TechSoft Ltd",
    email: "vivek.kumar@example.com",
    phone: "9876543210",
    auth: "google",
    verified: true,
    courses: 3,
    jobs: 2,
    skills: ["JavaScript", "React", "Node.js"],
    status: "active",
  },
  {
    studentId: "STU1002",
    name: "Ananya Singh",
    company: "EduWorks",
    email: "ananya.singh@example.com",
    phone: "9123456789",
    auth: "local",
    verified: false,
    courses: 1,
    jobs: 0,
    skills: ["Python", "SQL"],
    status: "pending",
  },
  {
    studentId: "STU1003",
    name: "Rahul Mehta",
    company: "DesignHub",
    email: "rahul.mehta@example.com",
    phone: "9988776655",
    auth: "facebook",
    verified: true,
    courses: 5,
    jobs: 1,
    skills: ["UI/UX", "Figma", "Photoshop"],
    status: "suspended",
  },
  {
    studentId: "STU1004",
    name: "Sneha Patel",
    company: "BizAnalytics",
    email: "sneha.patel@example.com",
    phone: "9876501234",
    auth: "google",
    verified: true,
    courses: 2,
    jobs: 3,
    skills: ["Excel", "PowerBI", "SQL"],
    status: "inactive",
  },
];

export const StudentsClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/students/get?status=${
      status === "all" ? "" : status
    }&category=${
      category === "all" ? "" : category
    }&page=${page}&limit=${limit}&search=${searchTerm}`,
    queryKeys: ["students", status, category, page, searchTerm, limit],
  });

  useEffect(() => {
    if (data?.pagination) {
      setPageCount(() => data?.pagination?.totalPages);
    }
  }, [data]);

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <TypographyH2 heading="Student Management" />
          <p className="text-muted-foreground">Manage students</p>
        </div>

        {/* <Button variant="codIntern" asChild className="bg-main">
          <Link href="/admin/students/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        </Button> */}
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 items-center">
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="flex justify-between bg-white w-32 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="flex justify-between bg-white w-44 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="fresher">Fresher</SelectItem>
              <SelectItem value="experienced">Experienced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Auth</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Jobs</TableHead>
              {/* <TableHead>Skills</TableHead> */}
              <TableHead className="w-20">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student) => (
              <Student key={student.studentId} student={student} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Student.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.students?.length === 0 && !isLoading && (
          <DataNotFound name="Students" />
        )}

        <PaginationComp
          page={page}
          pageCount={pageCount}
          setPage={setPage}
          className="mt-8 mb-5"
        />
      </div>
    </div>
  );
};
