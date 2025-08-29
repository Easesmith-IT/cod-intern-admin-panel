"use client";

import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { POST, PATCH } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { FaqSchema, EditFaqSchema } from "@/schemas/FaqSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TypographyH2 } from "../typography/typography-h2";

export const FaqForm = ({ faq = null, isEdit = false }) => {
  const router = useRouter();
  
  const form = useForm({
    resolver: zodResolver(isEdit ? EditFaqSchema : FaqSchema),
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
      category: faq?.category || "General",
      courseId: faq?.courseId?._id || "",
      order: faq?.order || 0,
      isActive: faq?.isActive !== undefined ? faq.isActive : true,
    },
  });

  const { control, handleSubmit, watch, reset, setValue } = form;
  const watchCategory = watch("category");

  // Fetch courses for the course selection dropdown
  const { data: coursesData } = useApiQuery({
    url: "/admin/courses/get?status=published&limit=100",
    queryKeys: ["courses", "published"],
  });

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: isEdit ? `/admin/faqs/update/${faq?._id}` : "/admin/faqs/create",
    method: isEdit ? PATCH : POST,
    invalidateKey: ["faq"],
  });

  const onSubmit = async (data) => {
    console.log("FAQ form data:", data);
    
    // Clean up data based on category
    const cleanedData = {
      question: data.question,
      answer: data.answer,
      category: data.category,
      order: Number(data.order) || 0,
      isActive: data.isActive,
    };

    // Only include courseId if category is "Courses" and courseId is provided
    if (data.category === "Courses" && data.courseId) {
      cleanedData.courseId = data.courseId;
    }

    await submitForm(cleanedData);
  };

  useEffect(() => {
    if (result && !isEdit) {
      console.log("FAQ created:", result);
      router.push("/admin/faqs");
    } else if (result && isEdit) {
      console.log("FAQ updated:", result);
      router.push("/admin/faqs");
    }
  }, [result, isEdit]);

  // Clear courseId when category changes from "Courses" to "General"
  useEffect(() => {
    if (watchCategory === "General") {
      setValue("courseId", "");
    }
  }, [watchCategory, setValue]);

  return (
    <div className="space-y-5">
      <button
        onClick={() => router.push("/admin/faqs")}
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft />
        <TypographyH2 heading={isEdit ? "Edit FAQ" : "Add FAQ"} />
      </button>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full border rounded-xl bg-white px-5 py-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Question Field */}
            <FormField
              control={control}
              name="question"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Question *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the FAQ question"
                      className="resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Answer Field */}
            <FormField
              control={control}
              name="answer"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Answer *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the FAQ answer"
                      className="resize-none h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Field */}
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      {/* <SelectItem value="Courses">Courses</SelectItem> */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course Selection (only show if category is "Courses") */}
            {watchCategory === "Courses" && (
              <FormField
                control={control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {coursesData?.courses?.map((course) => (
                          <SelectItem key={course._id} value={course._id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Order Field */}
            <FormField
              control={control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Active Status */}
            <FormField
              control={control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel>Active Status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/faqs")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="codIntern"
              disabled={isSubmitFormLoading}
              className="bg-main"
            >
              {isSubmitFormLoading ? (
                <Spinner spinnerClassName="size-4" />
              ) : isEdit ? (
                "Update FAQ"
              ) : (
                "Create FAQ"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
