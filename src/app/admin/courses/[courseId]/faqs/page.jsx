"use client";

import { CourseFaq } from "@/components/faqs/course-faq";
import { FaqSkeleton } from "@/components/faqs/faq-skeleton";
import DataNotFound from "@/components/shared/DataNotFound";
import { PaginationComp } from "@/components/shared/PaginationComp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ArrowLeft, BookOpen, HelpCircle, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CourseFaqs = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);

  // Get course details
  const { data: courseData } = useApiQuery({
    url: `/admin/courses/${courseId}`,
    queryKeys: ["course", courseId],
  });

  // Get course FAQs
  const { data, isLoading, error } = useApiQuery({
    url: `/admin/faqs/get?category=Courses&courseId=${courseId}&isActive=${
      isActive === "all" ? "" : isActive
    }&page=${page}&limit=${limit}&search=${searchTerm}`,
    queryKeys: ["course-faqs", courseId, isActive, page, searchTerm, limit],
  });

  useEffect(() => {
    if (data?.pagination) {
      setPageCount(() => data?.pagination?.totalPages);
    }
  }, [data]);

  const course = courseData?.course;
  const faqs = data?.faqs || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push(`/admin/courses/${courseId}`)}
            className="flex gap-2 items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Course</span>
          </button>
        </div>
        <Button variant="codIntern" asChild className="bg-main">
          <Link href={`/admin/courses/${courseId}/faqs/create`}>
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Link>
        </Button>
      </div>

      {/* Course Context Card */}
      {course && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <div>
                <CardTitle className="text-lg">Course FAQs</CardTitle>
                <p className="text-sm text-muted-foreground">{course.title}</p>
              </div>
              <Badge variant="outline" className="ml-auto">
                {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage frequently asked questions specific to this course. These FAQs will help students understand course details, requirements, and expectations.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex items-center justify-between space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search course FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 items-center">
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

      {/* FAQ Table */}
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-80">Question</TableHead>
              <TableHead className="w-96">Answer</TableHead>
              <TableHead className="text-center w-20">Order</TableHead>
              <TableHead className="w-20">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs?.map((faq) => (
              <CourseFaq key={faq._id} faq={faq} courseId={courseId} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <FaqSkeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {faqs?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? "No FAQs match your search criteria." 
                : "This course doesn't have any FAQs yet."
              }
            </p>
            {!searchTerm && (
              <Button variant="outline" asChild>
                <Link href={`/admin/courses/${courseId}/faqs/create`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First FAQ
                </Link>
              </Button>
            )}
          </div>
        )}

        {faqs?.length > 0 && (
          <PaginationComp
            page={page}
            pageCount={pageCount}
            setPage={setPage}
            className="mt-8 mb-5"
          />
        )}
      </div>
    </div>
  );
};

export default CourseFaqs;
