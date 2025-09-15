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
import { GenerativeAIWorkshopComp } from "@/components/workshops/generative-ai-workshop";
import { Workshop } from "@/components/workshops/workshop";
import { useApiQuery } from "@/hooks/useApiQuery";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const GenerativeAIWorkshop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [gender, setGender] = useState("all");
  const [year, setYear] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/workshops/get?gender=${gender === "all" ? "" : gender}&year=${
      year === "all" ? "" : year
    }&page=${page}&limit=${limit}&search=${searchTerm}&type=generative-ai`,
    queryKeys: [
      "workshops",
      "generative-ai",
      gender,
      page,
      searchTerm,
      limit,
      year,
    ],
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
        <Link href="/admin/workshops" className="flex gap-1 items-center mb-4">
          <ArrowLeft className="text-3xl cursor-pointer" />
          <TypographyH2 heading="Generative AI Workshop Registrations" />
        </Link>
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
        <div className="flex gap-4 items-center">
          <Select value={gender} onValueChange={(value) => setGender(value)}>
            <SelectTrigger className="flex justify-between bg-white w-32 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={(value) => setYear(value)}>
            <SelectTrigger className="flex justify-between bg-white w-32 items-center h-10 text-sm font-normal font-sans border">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleModal} variant="codIntern">
            Export Data
          </Button>
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>University Roll No</TableHead>
              {/* <TableHead className="text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.workshops?.map((workshop) => (
              <GenerativeAIWorkshopComp
                key={workshop._id}
                workshop={workshop}
              />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <GenerativeAIWorkshopComp.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.workshops?.length === 0 && !isLoading && (
          <DataNotFound name="Workshops" />
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
          queryKey="workshops"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          type="generative-ai"
        />
      )}
    </div>
  );
};

export default GenerativeAIWorkshop;
