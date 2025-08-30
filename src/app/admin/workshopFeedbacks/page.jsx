"use client";

import DataNotFound from "@/components/shared/DataNotFound";
import { ExportToCsvModal } from "@/components/shared/export-to-csv-modal";
import { PaginationComp } from "@/components/shared/PaginationComp";
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
import { Workshop } from "@/components/workshops/workshop";
import { WorkshopFeedback } from "@/components/workshops/workshop-feedback";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const WorkshopFeedbacks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/workshops/feedbacks/get?page=${page}&limit=${limit}&search=${searchTerm}`,
    queryKeys: ["workshops", page, searchTerm, limit],
  });

  useEffect(() => {
    if (data?.pagination) {
      setPageCount(() => data?.pagination?.totalPages);
    }
  }, [data]);

  console.log("data", data);

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <TypographyH2 heading="Feedbacks" />
          {/* <p className="text-muted-foreground">Manage workshops</p> */}
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search workshop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleModal} variant="codIntern">
          Export Data
        </Button>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>College Name</TableHead>
              <TableHead>Enrolment Number</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Overall Satisfaction</TableHead>
              <TableHead>Topic Relevance (1-5)</TableHead>
              <TableHead>Trainer Effectiveness</TableHead>
              <TableHead>Overall Experience</TableHead>
              <TableHead>Additional Comments</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Workshop Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.feedbacks?.map((feedback) => (
              <WorkshopFeedback key={feedback._id} feedback={feedback} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <WorkshopFeedback.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.feedbacks?.length === 0 && !isLoading && (
          <DataNotFound name="Feedbacks" />
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
          queryKey="workshops/feedbacks"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default WorkshopFeedbacks;
