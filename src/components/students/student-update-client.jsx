"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Info } from "lucide-react";
import { TypographyH2 } from "../typography/typography-h2";
import Spinner from "../shared/Spinner";
import { PATCH } from "@/constants/apiMethods";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StudentUpdateSchema } from "@/schemas/StudentUpdateSchema";

export const StudentUpdateClient = ({ studentId }) => {
  const router = useRouter();

  // Initialize React Hook Form
  const form = useForm({
    resolver: zodResolver(StudentUpdateSchema),
    defaultValues: {
      name: "",
      emailId: "",
      phone: "",
      alternatePhone: "",
      bio: "",
      contactMethod: "",
      profileVisibility: false,
    },
  });

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/students/${studentId}`,
    queryKeys: ["student", studentId],
  });

  const { mutateAsync: updateStudent, isPending: isUpdating } = useApiMutation({
    url: `/admin/students/${studentId}`,
    method: PATCH,
    invalidateKey: ["student", studentId],
  });

  const student = data?.data?.student;

  // Reset form when student data loads
  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name || "",
        emailId: student.emailId || "",
        phone: student.phone || "",
        alternatePhone: student.alternatePhone || "",
        bio: student.bio || "",
        contactMethod: student.contactMethod || "",
        profileVisibility: student.profileVisibility || false,
      });
    }
  }, [student, form]);

  const onSubmit = async (formData) => {
    const submitData = new FormData();

    // Add form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== "") {
        submitData.append(key, formData[key]);
      }
    });

    await updateStudent(submitData);
    router.push(`/admin/students/${studentId}`);
  };

  const handleBack = () => {
    router.push(`/admin/students/${studentId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/students")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Student not found or error loading data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div>
        <button
          onClick={handleBack}
          className="flex justify-start items-center"
        >
          <ArrowLeft />
          <TypographyH2 heading="Edit Student" />
        </button>
        <p className="text-muted-foreground">Update student information</p>
      </div>

      {/* Edit Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="emailId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Alternate Phone Field */}
                <FormField
                  control={form.control}
                  name="alternatePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter alternate phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact Method Field */}
                <FormField
                  control={form.control}
                  name="contactMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        key={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select contact method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio Field */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter student bio"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button
              variant="codIntern"
              type="submit"
              disabled={isUpdating || !form.formState.isValid}
            >
              {isUpdating ? <Spinner /> : "Update Student"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
