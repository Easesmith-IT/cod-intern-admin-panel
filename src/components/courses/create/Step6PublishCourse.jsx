"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle,
  AlertCircle,
  User,
  Users,
  BookOpen,
  Star,
  IndianRupee,
  Clock,
  Calendar,
  Eye,
  Send,
} from "lucide-react";
import { useApiMutation, useApiQuery } from "@/hooks/useApiMutation";
import { PATCH } from "@/constants/apiMethods";
import { useRouter } from "next/navigation";

// Validation schema matching backend
const step6Schema = z.object({
  instructors: z.array(z.string()).min(1, "At least one instructor is required"),
  status: z.enum(["draft", "published", "archived"]),
});

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

  // Mock instructors data - replace with actual API call
  const instructors = [
    {
      _id: "1",
      name: "John Smith",
      email: "john@example.com",
      expertise: ["React", "Node.js", "JavaScript"],
      bio: "Senior Full Stack Developer with 8+ years experience",
      profileImage: "/instructor1.jpg",
      coursesCount: 12,
      studentsCount: 2500,
      rating: 4.8,
    },
    {
      _id: "2", 
      name: "Sarah Johnson",
      email: "sarah@example.com",
      expertise: ["Python", "Data Science", "Machine Learning"],
      bio: "Data Science Expert and AI Researcher",
      profileImage: "/instructor2.jpg",
      coursesCount: 8,
      studentsCount: 1800,
      rating: 4.9,
    },
    {
      _id: "3",
      name: "Mike Chen",
      email: "mike@example.com",
      expertise: ["Mobile Development", "Flutter", "React Native"],
      bio: "Mobile App Development Specialist",
      profileImage: "/instructor3.jpg",
      coursesCount: 6,
      studentsCount: 1200,
      rating: 4.7,
    },
  ];

  const { mutateAsync: publishCourse, isPending } = useApiMutation({
    url: `/courses/${data.courseId}/publish`,
    method: PATCH,
    isToast: true,
  });

  const toggleInstructorSelection = (instructorId) => {
    const currentInstructors = form.getValues("instructors");
    if (currentInstructors.includes(instructorId)) {
      form.setValue(
        "instructors",
        currentInstructors.filter(id => id !== instructorId)
      );
    } else {
      form.setValue("instructors", [...currentInstructors, instructorId]);
    }
  };

  const onSubmit = async (formData) => {
    try {
      await publishCourse(formData);
      
      // Update local data state
      updateData("publishInfo", formData);
      
      // Redirect to courses list or success page
      router.push("/admin/courses?success=course-published");
    } catch (error) {
      console.error("Error publishing course:", error);
    }
  };

  const selectedInstructorIds = form.watch("instructors");
  const selectedInstructorDetails = instructors.filter(instructor => 
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

  const allStepsCompleted = completionChecklist.every(item => item.completed);

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
                  {instructors.map((instructor) => (
                    <div
                      key={instructor._id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedInstructorIds.includes(instructor._id)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleInstructorSelection(instructor._id)}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={instructor.profileImage}
                            alt={instructor.name}
                          />
                          <AvatarFallback>
                            {instructor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{instructor.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {instructor.email}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 text-sm">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>{instructor.rating}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {instructor.coursesCount} courses
                              </div>
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {instructor.expertise.slice(0, 3).map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {instructor.bio}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                        <div
                          key={instructor._id}
                          className="flex items-center space-x-2"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={instructor.profileImage}
                              alt={instructor.name}
                            />
                            <AvatarFallback className="text-xs">
                              {instructor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{instructor.name}</span>
                        </div>
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
                      <li>• Email notifications will be sent to subscribers</li>
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
