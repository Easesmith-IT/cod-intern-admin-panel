"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { PATCH, POST } from "@/constants/apiMethods";
import { categories, subCategories } from "@/constants/constants";
import { useApiMutation } from "@/hooks/useApiMutation";
import { step1Schema } from "@/schemas/CourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Step1BasicInfo = ({ data, updateData, onNext, currentStep }) => {
  console.log("data", data);
  const params = useParams();

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      title: "",
      description: "",
      overview: "",
      category: "",
      subCategory: "",
      level: "beginner",
      language: "English",
      introVideo: "",
      ...data.basicInfo,
    },
  });

  const { reset, getValues, watch } = form;

  console.log("getValues", getValues());
  useEffect(() => {
    if (data.basicInfo) {
      reset(data.basicInfo);
      setThumbnailPreview(data.basicInfo.thumbnail);
    }
  }, [data.basicInfo]);

  const {
    mutateAsync: updateCourse,
    isPending,
    data: result,
  } = useApiMutation({
    url: `/admin/courses/${params.courseId}/edit`,
    method: PATCH,
  });

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const onSubmit = async (formData) => {
    // Create FormData for file upload
    const submitData = new FormData();

    // Add form fields
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    // Add thumbnail if selected
    if (thumbnailFile) {
      submitData.append("thumbnail", thumbnailFile);
    }

    await updateCourse(submitData);
    updateData("basicInfo", formData);
  };

  useEffect(() => {
    if (result) {
      console.log("result", result);
      const id = result.course._id;

      // Update local data state
      updateData("courseId", id);
      onNext();
    }
  }, [result]);

  const selectedCategory = watch("category");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Complete Web Development Bootcamp"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the course"
                          rows={3}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="overview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Overview *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed overview of what students will learn"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Thumbnail Upload */}
                <div>
                  <FormLabel>Course Thumbnail</FormLabel>
                  <div className="mt-2">
                    {thumbnailPreview ? (
                      <div className="relative inline-block">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-32 h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={removeThumbnail}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <label
                          htmlFor="thumbnail-upload"
                          className="cursor-pointer flex flex-col items-center space-y-2"
                        >
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Click to upload thumbnail
                          </span>
                          <span className="text-xs text-gray-500">
                            PNG, JPG up to 10MB
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="introVideo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intro Video URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://youtube.com/watch?v=..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Classification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        key={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedCategory && subCategories[selectedCategory] && (
                  <FormField
                    control={form.control}
                    name="subCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          key={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a sub category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subCategories[selectedCategory].map((subCat) => (
                              <SelectItem key={subCat} value={subCat}>
                                {subCat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Level *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Title:</strong>{" "}
                    {form.watch("title") || "Course Title"}
                  </div>
                  <div className="text-sm">
                    <strong>Category:</strong>{" "}
                    {form.watch("category") || "Not selected"}
                  </div>
                  <div className="text-sm">
                    <strong>Level:</strong> {form.watch("level") || "beginner"}
                  </div>
                  <div className="text-sm">
                    <strong>Language:</strong>{" "}
                    {form.watch("language") || "English"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="codIntern" disabled={isPending}>
            {isPending ? "Updating Course..." : "Update Course & Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Step1BasicInfo;
