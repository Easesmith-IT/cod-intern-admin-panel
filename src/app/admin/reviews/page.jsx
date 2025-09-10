"use client";

import { AddReviewModal } from "@/components/reviews/add-review-modal";
import { Review } from "@/components/reviews/review";
import DataNotFound from "@/components/shared/DataNotFound";
import { PaginationComp } from "@/components/shared/PaginationComp";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("General");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/reviews/get?category=${category}&status=${
      status === "all" ? "" : status
    }&page=${page}&limit=${limit}`,
    queryKeys: ["review", status, page, limit, category],
  });

  console.log("data", data);

  useEffect(() => {
    if (data?.pagination) {
      setPageCount(() => data?.pagination?.totalPages);
    }
  }, [data]);
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <TypographyH2 heading="Review Management" />
        </div>

        <div className="flex gap-3 items-center">
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="flex justify-between bg-white w-32 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="codIntern"
            className="bg-main"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Review
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.reviews?.map((review) => (
            <Review key={review._id} review={review} />
          ))}
          
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <Review.Skeleton key={index} />
            ))}
        </div>

        {data?.reviews.length === 0 && !isLoading && (
          <DataNotFound name="Reviews" />
        )}

        <PaginationComp
          page={page}
          pageCount={pageCount}
          setPage={setPage}
          className="mt-8 mb-5"
        />
      </div>

      {isModalOpen && (
        <AddReviewModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
};

export default Reviews;
