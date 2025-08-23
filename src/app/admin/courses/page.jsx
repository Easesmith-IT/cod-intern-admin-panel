"use client";

import { Course } from "@/components/courses/course";
import { CourseSkeleton } from "@/components/courses/course-skeleton";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import DataNotFound from "@/components/shared/DataNotFound";
import { PaginationComp } from "@/components/shared/PaginationComp";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/courses?status=${status === "all" ? "" : status}&category=${
      category === "all" ? "" : category
    }&level=${
      level === "all" ? "" : level
    }&page=${page}&limit=${limit}&search=${searchTerm}`,
    queryKeys: ["course", status, category, level, page, searchTerm, limit],
  });

  useEffect(() => {
    if (data?.pagination) {
      setPageCount(() => data?.pagination?.totalPages);
    }
  }, [data]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <TypographyH2 heading="Course Management" />
          <p className="text-muted-foreground">
            Manage courses, instructors, and course content
          </p>
        </div>

        <Button variant="codIntern" asChild className="bg-main">
          <Link href="/admin/courses/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses..."
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="flex justify-between bg-white w-44 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Mobile Development">Mobile Development</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={(value) => setLevel(value)}>
            <SelectTrigger className="flex justify-between bg-white w-36 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course ID</TableHead>
              <TableHead className="w-40">Course</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Students</TableHead>
              <TableHead className="w-20">Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.courses?.map((course) => (
              <Course key={course._id} course={course} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.courses?.length === 0 && !isLoading && <DataNotFound name="Courses" />}

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

export default Courses;
