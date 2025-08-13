"use client";

import { Admin } from "@/components/admins/admin";
import { AdminSkeleton } from "@/components/admins/admin-skeleton";
import DataNotFound from "@/components/shared/DataNotFound";
import { PaginationComp } from "@/components/shared/PaginationComp";
import { TypographyH2 } from "@/components/typography.jsx/typography-h2";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const Admins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/admins/get?status=${status === "all" ? "" : status}&category=${
      category === "all" ? "" : category
    }&page=${page}&limit=${limit}&search=${searchTerm}`,
    queryKeys: ["admin", status, category, page, searchTerm, limit],
  });

  useEffect(() => {
    if (data?.pagination) {
      setPageCount(() => data?.pagination?.totalPages);
    }
  }, [data]);

  console.log("data", data);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <TypographyH2 heading="Admin Management" />
          <p className="text-muted-foreground">
            Manage your administrative users and their access levels
          </p>
        </div>
        <Button variant="codIntern" asChild className="bg-main">
          <Link href="/admin/admins/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Admin
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search admins..."
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
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admin ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="w-20 text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.admins?.map((admin) => (
              <Admin key={admin._id} admin={admin} />
            ))}
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <AdminSkeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {data?.admins?.length === 0 && !isLoading && (
          <DataNotFound name="Admins" />
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

export default Admins;
