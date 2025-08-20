"use client";

import { Application } from "@/components/jobs/applications/application";
import DataNotFound from "@/components/shared/DataNotFound";
import { PaginationComp } from "@/components/shared/PaginationComp";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApiQuery } from "@/hooks/useApiQuery";
import { ArrowLeft, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const params = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/jobs/job-applications/get/${params.jobId}?status=${
      status === "all" ? "" : status
    }&page=${page}&limit=${limit}&search=${searchTerm}`,
    queryKeys: ["job-application", status, page, searchTerm, limit],
  });

  console.log("data", data);

  useEffect(() => {
    if (data?.pagination) {
      setPageCount(() => data?.pagination?.totalPages);
    }
  }, [data]);

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push(`/admin/jobs/${params.jobId}`)}
          className="flex gap-1 items-center"
        >
          <ArrowLeft className="text-3xl cursor-pointer" />
          <TypographyH2 heading="Job Applications" />
        </button>
        <p className="text-muted-foreground">Manage job applications</p>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search jobs applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {/* <div className="flex gap-4 items-center">
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="flex justify-between bg-white w-32 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              {/* <TableHead className="w-60">Job</TableHead> */}
              {/* <TableHead>Company</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Phone</TableHead>
              {/* <TableHead>Applications</TableHead> */}
              {/* <TableHead className="w-20">Status</TableHead> */}
              {/* <TableHead className="text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.applications?.map((application) => (
              <Application key={application._id} application={application} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Application.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.applications?.length === 0 && !isLoading && (
          <DataNotFound name="Job Applications" />
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

export default Applications;
