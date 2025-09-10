"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reviewSchema } from "@/schemas/ReviewSchema";
import { useApiMutation } from "@/hooks/useApiMutation";
import { PATCH, POST } from "@/constants/apiMethods";
import Spinner from "../shared/Spinner";
import ReactStars from "react-stars";
import { useEffect } from "react";

export const AddReviewModal = ({ isModalOpen, setIsModalOpen, review }) => {
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      platform: review?.platform || "Google",
      rating: review?.rating || 5,
      reviewerRole: review?.reviewerRole || "Student",
      category: review?.category || "General",
      status: review?.status || "active",
      reviewerName: review?.reviewerName || "",
      reviewText: review?.reviewText || "",
    },
  });

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: "/admin/reviews/create",
    method: POST,
    invalidateKey: ["review"],
    // isToast: false,
  });

  const {
    mutateAsync: updateReview,
    isPending,
    data,
  } = useApiMutation({
    url: `/admin/reviews/update/${review._id}`,
    method: PATCH,
    invalidateKey: ["review"],
    // isToast: false,
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Call your API here, e.g., axios.post("/api/reviews", data)

    if (review) {
      await updateReview(data);
    } else {
      await submitForm(data);
    }
  };

  useEffect(() => {
    if (result || data) {
      setIsModalOpen(false);
    }
  }, [result, data]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Review</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-5">
              {/* Platform */}
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="Website">Website</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (0-5)</FormLabel>
                    {/* <Input type="number" min={0} max={5} {...field} /> */}
                    <ReactStars
                      count={5}
                      size={24}
                      color2={"#ffd700"}
                      edit={true}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Review Text */}
            <FormField
              control={form.control}
              name="reviewText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Text</FormLabel>
                  <Textarea
                    {...field}
                    placeholder="Write your review..."
                    className="resize-none"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reviewer Name */}
            <FormField
              control={form.control}
              name="reviewerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reviewer Name</FormLabel>
                  <Input {...field} placeholder="Your name" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-5">
              {/* Reviewer Role */}
              <FormField
                control={form.control}
                name="reviewerRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reviewer Role</FormLabel>
                    <Input {...field} placeholder="Student / Professional" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      key={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                disabled={isSubmitFormLoading}
                type="submit"
                variant="codIntern"
              >
                {isSubmitFormLoading || isPending ? (
                  <Spinner spinnerClassName="size-6" />
                ) : (
                  "Submit Review"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
