"use client";

import { Faq } from "@/components/faqs/faq";
import { FaqSkeleton } from "@/components/faqs/faq-skeleton";
import DataNotFound from "@/components/shared/DataNotFound";
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
import { useApiQuery } from "@/hooks/useApiQuery";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Faqs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [isActive, setIsActive] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/faqs/get?category=${
      category === "all" ? "" : category
    }&isActive=${
      isActive === "all" ? "" : isActive
    }&page=${page}&limit=${limit}&search=${searchTerm}`,
    queryKeys: ["faq", category, isActive, page, searchTerm, limit],
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
          <TypographyH2 heading="FAQ Management" />
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>

        <Button variant="codIntern" asChild className="bg-main">
          <Link href="/admin/faqs/create">
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 items-center">
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="flex justify-between bg-white w-32 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Courses">Courses</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={isActive}
            onValueChange={(value) => setIsActive(value)}
          >
            <SelectTrigger className="flex justify-between bg-white w-32 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-80">Question</TableHead>
              <TableHead className="w-80">Answer</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="text-center w-20">Order</TableHead>
              <TableHead className="w-20">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.faqs?.map((faq) => (
              <Faq key={faq._id} faq={faq} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <FaqSkeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.faqs?.length === 0 && !isLoading && <DataNotFound name="FAQs" />}

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

export default Faqs;
