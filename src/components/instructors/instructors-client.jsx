"use client";

import React, { useEffect, useState } from "react";
import { PaginationComp } from "../shared/PaginationComp";
import DataNotFound from "../shared/DataNotFound";
import { Search, Plus } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useApiQuery } from "@/hooks/useApiQuery";
import { TypographyH2 } from "../typography/typography-h2";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Instructor } from "./instructor";
import Link from "next/link";

export const InstructorsClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState("all");
  const [expertise, setExpertise] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/instructors?isActive=${
      isActive === "all" ? "all" : isActive === "active"
    }&page=${page}&limit=${limit}&search=${searchTerm}&expertise=${
      expertise === "all" ? "" : expertise
    }`,
    queryKeys: ["instructors", isActive, expertise, page, searchTerm, limit],
  });

  console.log("instructors data", data);

  useEffect(() => {
    if (data?.pagination) {
      setPageCount(() => data?.pagination?.totalPages);
    }
  }, [data]);

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <TypographyH2 heading="Instructor Management" />
          <p className="text-muted-foreground">Manage instructors and their profiles</p>
        </div>

        <Button variant="codIntern" asChild className="bg-main">
          <Link href="/admin/instructors/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Instructor
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 items-center">
          <Select value={isActive} onValueChange={(value) => setIsActive(value)}>
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
            value={expertise}
            onValueChange={(value) => setExpertise(value)}
          >
            <SelectTrigger className="flex justify-between bg-white w-44 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Expertise Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Expertise</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="Machine Learning">Machine Learning</SelectItem>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Mobile Development">Mobile Development</SelectItem>
              <SelectItem value="DevOps">DevOps</SelectItem>
              <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Instructor</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Expertise</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Certifications</TableHead>
              <TableHead className="w-20">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.instructors?.map((instructor) => (
              <Instructor
                key={instructor._id}
                instructor={instructor}
              />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Instructor.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.instructors?.length === 0 && !isLoading && (
          <DataNotFound name="Instructors" />
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
