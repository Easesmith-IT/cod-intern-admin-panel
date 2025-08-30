"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useApiQuery } from "@/hooks/useApiQuery";
import { dateRangeSchema } from "@/schemas/CourseApplicationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "./DatePicker";

export const ExportToCsvModal = ({
  isModalOpen,
  setIsModalOpen,
  queryKey = "course-applications",
}) => {
  const params = useParams();
  const [url, setUrl] = useState("");

  const form = useForm({
    resolver: zodResolver(dateRangeSchema),
    // defaultValues:{
    //     startDate: new Date(),
    //     endDate: new Date()
    // }
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const fromDate = watch("startDate");
  const toDate = watch("endDate");

  let result;
  let isResultLoading;
  let refetchResult;

  if (params.courseId) {
    const { data, isLoading, error, refetch, isSuccess } = useApiQuery({
      url: `/admin/course-applications/export/${params.courseId}?from=${fromDate}&to=${toDate}`,
      queryKeys: ["course-applications", fromDate, toDate],
      options: {
        enabled: false,
      },
      axiosOptions: { responseType: "blob" },
    });

    result = data;
    isResultLoading = isLoading;
    refetchResult = refetch;
  } else {
    const { data, isLoading, error, refetch, isSuccess } = useApiQuery({
      url: `/admin/${queryKey}/export?from=${fromDate}&to=${toDate}`,
      queryKeys: [queryKey, fromDate, toDate],
      options: {
        enabled: false,
      },
      axiosOptions: { responseType: "blob" },
    });
    result = data;
    isResultLoading = isLoading;
    refetchResult = refetch;
  }

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    refetchResult();
  };

  console.log("result", result);

  useEffect(() => {
    if (result) {
      if (result instanceof Blob) {
        const downloadUrl = URL.createObjectURL(result);
        setUrl(downloadUrl);
        console.log("downloadUrl", downloadUrl);
      }
      //   const csvBlob = new Blob([result], { type: "text/csv" });
      //   const downloadUrl = URL.createObjectURL(csvBlob);
      //   setUrl(downloadUrl);
    }
  }, [result]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Date Range</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      disabled={{ after: new Date() }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-5 items-center">
              <Button>{isResultLoading ? "Fetching..." : "Submit"}</Button>
              {url && (
                <a href={url} download={`${queryKey}.csv`}>
                  <Button type="button">Download CSV</Button>
                </a>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
