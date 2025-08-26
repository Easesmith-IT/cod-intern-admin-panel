"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PATCH } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { step6Schema } from "@/schemas/CourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  IndianRupee,
  Send,
  Star,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Instructor, SelectedInstructor } from "../instructor/instructor";
import Spinner from "@/components/shared/Spinner";
import DataNotFound from "@/components/shared/DataNotFound";

const Step6PublishCourse = ({ data, updateData, onPrevious }) => {
  const router = useRouter();
  const [selectedInstructors, setSelectedInstructors] = useState([]);

  const form = useForm({
    resolver: zodResolver(step6Schema),
    defaultValues: {
      instructors: [],
      status: "published",
      ...data.publishInfo,
    },
  });

  const {
    data: instructorsData,
    isLoading,
    error,
  } = useApiQuery({
    url: `/admin/instructors`,
    queryKeys: ["instructors"],
  });

  const instructors = instructorsData?.instructors || [];

  const { mutateAsync: publishCourse, isPending,data:result } = useApiMutation({
    url: `/admin/courses/${
      data.courseId || "68ac6333b7d88323aa5aa749"
    }/publish`,
    method: PATCH,
  });

  const onSubmit = async (formData) => {
    await publishCourse(formData);

    // Update local data state
    updateData("publishInfo", formData);
  };

  useEffect(() => {
    if (result) {
      console.log("result", result);
      router.push("/admin/courses");
    }
  }, [result]);

  const selectedInstructorIds = form.watch("instructors");
  const selectedInstructorDetails = instructors.filter((instructor) =>
    selectedInstructorIds.includes(instructor._id)
  );

  // Course completion checklist
  const completionChecklist = [
    {
      label: "Basic Information",
      completed: !!data.basicInfo?.title,
      description: "Course title, description, category",
    },
    {
      label: "Course Details",
      completed: !!data.courseDetails?.pricing,
      description: "Pricing, certificate, highlights",
    },
    {
      label: "Modules & Lessons",
      completed: data.modules?.length > 0,
      description: "Course content and structure",
    },
    {
      label: "Projects & Batches",
      completed: !!data.extras?.projects || !!data.extras?.batches,
      description: "Projects and batch scheduling",
    },
    {
      label: "Additional Details",
      completed: !!data.additionalDetails?.courseDuration,
      description: "Duration, features, materials",
    },
  ];

  const allStepsCompleted = completionChecklist.every((item) => item.completed);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Course Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Completion Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle
                    className={`h-5 w-5 ${
                      allStepsCompleted ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <span>Course Completion Status</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Review your course setup before publishing
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completionChecklist.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg border"
                    >
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                      <Badge variant={item.completed ? "success" : "secondary"}>
                        {item.completed ? "Complete" : "Incomplete"}
                      </Badge>
                    </div>
                  ))}
                </div>

                {!allStepsCompleted && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-orange-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Some sections are incomplete. You can still publish as
                        draft and complete them later.
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructor Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Assign Instructors</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select instructors who will teach this course
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading && <Spinner />}
                  {instructors.map((instructor) => (
                    <Instructor
                      key={instructor._id}
                      instructor={instructor}
                      selectedInstructorIds={selectedInstructorIds}
                    />
                  ))}

                  {!isLoading && instructorsData?.instructors.length === 0 && (
                    <DataNotFound name="Instructors" />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="instructors"
                  render={() => (
                    <FormItem className="mt-4">
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Course Preview & Publish */}
          <div className="space-y-6">
            {/* Course Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Course Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.basicInfo?.thumbnail && (
                  <img
                    src={data.basicInfo.thumbnail}
                    alt="Course thumbnail"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}

                <div>
                  <h3 className="font-medium text-lg">
                    {data.basicInfo?.title || "Course Title"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {data.basicInfo?.category || "Category"} •{" "}
                    {data.basicInfo?.level || "Level"}
                  </p>
                </div>

                {data.courseDetails?.pricing && (
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-4 w-4" />
                    {data.courseDetails.pricing.discountPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          ₹
                          {data.courseDetails.pricing.discountPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{data.courseDetails.pricing.price.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold">
                        ₹{data.courseDetails.pricing.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  {data.modules?.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{data.modules.length} modules</span>
                    </div>
                  )}

                  {data.additionalDetails?.courseDuration && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{data.additionalDetails.courseDuration}</span>
                    </div>
                  )}

                  {data.extras?.batches?.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {data.extras.batches.length} batches available
                      </span>
                    </div>
                  )}
                </div>

                {selectedInstructorDetails.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Instructors</h4>
                    <div className="space-y-2">
                      {selectedInstructorDetails.map((instructor) => (
                        <SelectedInstructor
                          key={instructor._id}
                          instructor={instructor}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Publish Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Publish Course</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">
                            <div className="flex flex-col items-start">
                              <span>Save as Draft</span>
                              <span className="text-xs text-muted-foreground">
                                Save progress, not visible to students
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="published">
                            <div className="flex flex-col items-start">
                              <span>Publish Now</span>
                              <span className="text-xs text-muted-foreground">
                                Make course available to students
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">
                      Publishing Notes:
                    </h4>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Students can enroll once published</li>
                      <li>• You can edit course content anytime</li>
                      <li>• Course will appear in course catalog</li>
                      {/* <li>• Email notifications will be sent to subscribers</li> */}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    variant="codIntern"
                    disabled={isPending || selectedInstructorIds.length === 0}
                    className="w-full bg-primary"
                    size="lg"
                  >
                    {isPending
                      ? "Publishing..."
                      : form.watch("status") === "published"
                      ? "Publish Course"
                      : "Save as Draft"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={onPrevious}
                    className="w-full"
                  >
                    Previous Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Step6PublishCourse;
