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

export const StudentsClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [authProvider, setAuthProvider] = useState("all");

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/students?status=${
      status === "all" ? "" : status
    }&emailVerified=${
      category === "all" ? "all" : category === "verified" ? true : false
    }&page=${page}&limit=${limit}&search=${searchTerm}&authProvider=${
      authProvider === "all" ? "" : authProvider
    }`,
    queryKeys: [
      "students",
      status,
      category,
      page,
      searchTerm,
      limit,
      authProvider,
    ],
  });

  console.log("data", data);

  useEffect(() => {
    if (data?.data?.pagination) {
      setPageCount(() => data?.data?.pagination?.totalPages);
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
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="flex justify-between bg-white w-44 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Email Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={authProvider}
            onValueChange={(value) => setAuthProvider(value)}
          >
            <SelectTrigger className="flex justify-between bg-white w-44 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Auth Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="local">Local</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              {/* <TableHead>Name</TableHead> */}
              <TableHead>Student</TableHead>
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
            {data?.data?.students?.map((student) => (
              <Student
                key={student._id || student.customId}
                student={student}
              />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Student.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.data?.students?.length === 0 && !isLoading && (
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
