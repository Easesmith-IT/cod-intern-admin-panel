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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { POST, PATCH } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { EditFaqSchema } from "@/schemas/FaqSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "../ui/badge";

// Simplified schema for course FAQs (no category selection needed)
const CourseFaqSchema = EditFaqSchema.omit({ category: true, courseId: true });

export const CourseFaqForm = ({ faq = null, isEdit = false, courseId, courseTitle }) => {
  const router = useRouter();
  
  const form = useForm({
    resolver: zodResolver(CourseFaqSchema),
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
      order: faq?.order || 0,
      isActive: faq?.isActive !== undefined ? faq.isActive : true,
    },
  });

  const { control, handleSubmit, reset } = form;

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: isEdit ? `/admin/faqs/update/${faq?._id}` : "/admin/faqs/create",
    method: isEdit ? PATCH : POST,
    invalidateKey: ["course-faqs", courseId],
  });

  const onSubmit = async (data) => {
    console.log("Course FAQ form data:", data);
    
    const faqData = {
      question: data.question,
      answer: data.answer,
      category: "Courses", // Always "Courses" for course FAQs
      courseId: courseId, // Always set to current course
      order: Number(data.order) || 0,
      isActive: data.isActive,
    };

    await submitForm(faqData);
  };

  useEffect(() => {
    if (result && !isEdit) {
      console.log("Course FAQ created:", result);
      router.push(`/admin/courses/${courseId}/faqs`);
    } else if (result && isEdit) {
      console.log("Course FAQ updated:", result);
      router.push(`/admin/courses/${courseId}/faqs`);
    }
  }, [result, isEdit, courseId]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push(`/admin/courses/${courseId}/faqs`)}
          className="flex gap-2 items-center mb-4"
        >
          <ArrowLeft />
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Course FAQ" : "Add Course FAQ"}
          </h2>
        </button>
        
        {/* Course context indicator */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <div>
            <Badge variant="outline" className="mb-1">Course FAQ</Badge>
            <p className="text-sm text-muted-foreground">{courseTitle}</p>
          </div>
        </div>
      </div>

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
                      placeholder="Enter the FAQ question for this course"
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
                      placeholder="Enter the detailed answer for this course FAQ"
                      className="resize-none h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
              onClick={() => router.push(`/admin/courses/${courseId}/faqs`)}
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
