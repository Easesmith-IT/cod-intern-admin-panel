"use client";

import { TypographyH2 } from "@/components/typography/typography-h2";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Application } from "@/components/courses/applications/application";
import DataNotFound from "@/components/shared/DataNotFound";
import { PaginationComp } from "@/components/shared/PaginationComp";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExportToCsvModal } from "@/components/shared/export-to-csv-modal";

const Queries = () => {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/course-applications/${params.courseId}?status=${
      status === "all" ? "" : status
    }&page=${page}&limit=${limit}&search=${searchTerm}`,
    queryKeys: ["course-applications", status, page, limit, searchTerm],
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
          <Link
            href={`/admin/courses/${params.courseId}`}
            className="flex gap-1 items-center"
          >
            <ArrowLeft />
            <TypographyH2 heading="Course Queries" />
          </Link>
          <p className="text-muted-foreground">Manage course queries</p>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleModal} variant="codIntern">
          Export Data
        </Button>
        {/* <div className="flex gap-4 items-center">
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="flex justify-between bg-white w-32 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Query ID</TableHead> */}
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Graduation Year</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Applied Date</TableHead>
              {/* <TableHead className="text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.applications.map((application) => (
              <Application key={application._id} application={application} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Application.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.applications?.length === 0 && !isLoading && (
          <DataNotFound name="Applications" />
        )}

        <PaginationComp
          page={page}
          pageCount={pageCount}
          setPage={setPage}
          className="mt-8 mb-5"
        />
      </div>

      {isModalOpen && (
        <ExportToCsvModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Queries;
