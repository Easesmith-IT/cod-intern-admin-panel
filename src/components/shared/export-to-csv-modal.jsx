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

export const ExportToCsvModal = ({ isModalOpen, setIsModalOpen }) => {
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

  const { data, isLoading, error, refetch, isSuccess } = useApiQuery({
    url: `/admin/course-applications/export/${params.courseId}?from=${fromDate}&to=${toDate}`,
    queryKeys: ["course-applications", fromDate, toDate],
    options: {
      enabled: false,
    },
    axiosOptions: { responseType: "blob" },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    refetch();
  };

  console.log("result", data);

  useEffect(() => {
    if (data) {
      if (data instanceof Blob) {
        const downloadUrl = URL.createObjectURL(data);
        setUrl(downloadUrl);
        console.log("downloadUrl", downloadUrl);
      }
      //   const csvBlob = new Blob([data], { type: "text/csv" });
      //   const downloadUrl = URL.createObjectURL(csvBlob);
      //   setUrl(downloadUrl);
    }
  }, [data]);

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

            {!isSuccess ? (
              <Button>{isLoading ? "Fetching..." : "Submit"}</Button>
            ) : (
              <a href={url} download="course_applications.csv">
                <Button type="button">Download CSV</Button>
              </a>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
