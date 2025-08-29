"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApiQuery } from "@/hooks/useApiQuery";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Edit,
  Eye,
  FileText,
  FolderOpen,
  Globe,
  HelpCircle,
  IndianRupee,
  Play,
  Plus,
  Star,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import Spinner from "@/components/shared/Spinner";
import DataNotFound from "@/components/shared/DataNotFound";
import Image from "next/image";
import { CourseCardSkeleton } from "@/components/courses/course-card-skeleton";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { CourseFaqsTabContent } from "@/components/faqs/course-faqs-tab-content";

const CourseDetails = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId;

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/courses/${courseId}`,
    queryKeys: ["course", courseId],
  });

  const course = data?.course;
  console.log("course", course);

  if (isLoading) {
    return <CourseCardSkeleton />;
  }

  if (error || !course) {
    return <DataNotFound name="Course" />;
  }

  // Calculate total course duration
  const totalDuration = course.modules?.reduce((total, module) => {
    return (
      total +
      (module.lessons?.reduce(
        (lessonTotal, lesson) => lessonTotal + (lesson.duration || 0),
        0
      ) || 0)
    );
  }, 0);

  const formatDuration = (minutes) => {
    if (!minutes) return "0 min";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? mins + "m" : ""}`;
    }
    return `${mins}m`;
  };

  // Calculate total enrolled students across all batches
  const totalStudents =
    course.batches?.reduce((total, batch) => {
      return total + (batch.students?.length || 0);
    }, 0) || 0;

  // Get the price from pricing object
  const coursePrice =
    course.pricing?.discountPrice ||
    course.pricing?.price ||
    course.batches?.[0]?.offerPrice ||
    course.batches?.[0]?.price ||
    0;

  const originalPrice = course.pricing?.price || course.batches?.[0]?.price;
  const discountedPrice =
    course.pricing?.discountPrice || course.batches?.[0]?.offerPrice;

  const savings =
    originalPrice && discountedPrice && discountedPrice < originalPrice
      ? originalPrice - discountedPrice
      : 0;
  const savingsPercentage =
    savings > 0 ? Math.round((savings / originalPrice) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/admin/courses")}
            className="flex gap-1 items-center"
          >
            <ArrowLeft />
            <TypographyH2 heading="Course Details" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/courses/${courseId}/queries`}>
              <Eye className="h-4 w-4 mr-2" />
              View Course Applications / Queries
            </Link>
          </Button>
          <Button asChild size="sm" variant="codIntern">
            <Link href={`/admin/courses/${courseId}/update`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Course Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Course Thumbnail */}
            <div className="flex-shrink-0">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-64 h-48 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-64 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="capitalize" variant="outline">
                    {course.category}
                  </Badge>
                  <Badge className="capitalize" variant="secondary">
                    {course.level}
                  </Badge>
                  <Badge
                    className="capitalize"
                    variant={
                      course.status === "published"
                        ? "success"
                        : course.status === "archived"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {course.status}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h1>
                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">
                      {formatDuration(totalDuration)}
                    </div>
                    <div className="text-xs text-gray-500">Duration</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">
                      {course.modules?.length || 0}
                    </div>
                    <div className="text-xs text-gray-500">Modules</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">{totalStudents}</div>
                    <div className="text-xs text-gray-500">Enrolled</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">
                      {course.averageRating?.toFixed(1) || "0.0"}
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              {course.pricing && (
                <div className="flex items-center space-x-4">
                  {course.pricing.isFree ? (
                    <span className="text-2xl font-bold text-green-600">
                      FREE
                    </span>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="h-5 w-5" />
                      {discountedPrice && discountedPrice < originalPrice ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold">
                            {discountedPrice.toLocaleString()}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            {originalPrice.toLocaleString()}
                          </span>
                          <Badge variant="destructive">
                            {savingsPercentage}% OFF
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold">
                          {originalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules & Lessons</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="details">Additional Details</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Course Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {course.overview || "No overview provided."}
                </p>
              </CardContent>
            </Card>

            {/* Course Highlights */}
            {course.courseHighlights?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.courseHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{highlight.label}</div>
                          {highlight.value && (
                            <div className="text-sm text-gray-600">
                              {highlight.value}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Student Benefits */}
            {course.studentBenefits?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Student Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.studentBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Star className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{benefit.label}</div>
                          {benefit.value && (
                            <div className="text-sm text-gray-600">
                              {benefit.value}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certificate Info */}
            {course.certificate && (
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Title
                      </div>
                      <div>{course.certificate.title}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Provider
                      </div>
                      <div>{course.certificate.provider}</div>
                    </div>
                    {course.certificate.issueDate && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          Issue Date
                        </div>
                        <div>
                          {format(
                            new Date(course.certificate.issueDate),
                            "MMM dd, yyyy"
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Modules & Lessons Tab */}
        <TabsContent value="modules" className="space-y-4">
          {course.modules?.length > 0 ? (
            course.modules.map((module, moduleIndex) => (
              <Card key={moduleIndex}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span>
                        Module {moduleIndex + 1}: {module.title}
                      </span>
                    </CardTitle>
                    <Badge variant="outline">
                      {module.lessons?.length || 0} lessons
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </CardHeader>
                <CardContent>
                  {module.lessons?.length > 0 ? (
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {lesson.contentType === "video" ? (
                              <Video className="h-4 w-4 text-red-500" />
                            ) : lesson.contentType === "document" ? (
                              <FileText className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Play className="h-4 w-4 text-green-500" />
                            )}
                            <div>
                              <div className="font-medium">
                                {lessonIndex + 1}. {lesson.title}
                              </div>
                              <div className="text-sm text-gray-500 capitalize">
                                {lesson.contentType}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {lesson.isPreviewFree && (
                              <Badge variant="secondary" className="text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                Free
                              </Badge>
                            )}
                            <div className="text-sm text-gray-500">
                              {formatDuration(lesson.duration)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      No lessons added yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No modules added yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          {course.projects?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Image
                      src={project.icon}
                      width={74}
                      height={60}
                      className="w-full"
                      alt={project.title}
                    />
                    <CardTitle className="flex items-center space-x-2">
                      <FolderOpen className="h-5 w-5 text-orange-600" />
                      <span>{project.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.tools?.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          Technologies & Tools:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.tools.map((tool, toolIndex) => (
                            <Badge key={toolIndex} variant="outline">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No projects added yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Batches Tab */}
        <TabsContent value="batches" className="space-y-4">
          {course.batches?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {course.batches.map((batch, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span>{batch.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            batch.status === "ongoing"
                              ? "success"
                              : batch.status === "completed"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {batch.status}
                        </Badge>
                        <div className="text-sm text-gray-500">
                          {batch.students?.length || 0} / {batch.seatsLimit}{" "}
                          enrolled
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">
                          Schedule
                        </div>
                        <div className="space-y-1">
                          <div>
                            {batch.schedule?.days?.join(", ") ||
                              "Not specified"}
                          </div>
                          <div className="text-sm text-gray-600">
                            {batch.schedule?.time?.start &&
                            batch.schedule?.time?.end
                              ? `${batch.schedule.time.start} - ${batch.schedule.time.end}`
                              : "Time not specified"}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">
                          Duration
                        </div>
                        <div>
                          {batch.startDate
                            ? format(new Date(batch.startDate), "MMM dd, yyyy")
                            : "TBD"}
                          {batch.endDate && (
                            <>
                              {" - "}
                              {format(new Date(batch.endDate), "MMM dd, yyyy")}
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">
                          Pricing
                        </div>
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="h-4 w-4" />
                          {batch.offerPrice &&
                          batch.offerPrice < batch.price ? (
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">
                                {batch.offerPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {batch.price.toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="font-semibold">
                              {batch.price?.toLocaleString() || "Free"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No batches scheduled yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Instructors Tab */}
        <TabsContent value="instructors" className="space-y-4">
          {course.instructors?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.instructors.map((instructor, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={instructor.profileImage}
                          alt={`${instructor.firstName} ${instructor.lastName}`}
                        />
                        <AvatarFallback>
                          {instructor.firstName?.[0]}
                          {instructor.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {instructor.firstName} {instructor.lastName}
                        </h3>
                        {instructor.title && (
                          <p className="text-sm text-gray-600 mb-2">
                            {instructor.title}
                          </p>
                        )}
                        {instructor.bio && (
                          <p className="text-sm text-gray-700 line-clamp-3">
                            {instructor.bio}
                          </p>
                        )}
                        {instructor.specializations?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {instructor.specializations.map(
                              (spec, specIndex) => (
                                <Badge key={specIndex} variant="secondary">
                                  {spec}
                                </Badge>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No instructors assigned yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs">
          <CourseFaqsTabContent courseId={courseId} courseTitle={course.title} />
        </TabsContent>

        {/* Additional Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Duration
                    </div>
                    <div>{course.courseDuration || "Not specified"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Class Timing
                    </div>
                    <div>{course.classTiming || "Not specified"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Total Seats
                    </div>
                    <div>{course.totalSeats || "Not specified"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Language
                    </div>
                    <div>{course.language || "Not specified"}</div>
                  </div>
                </div>

                <Separator />

                {/* Career Support */}
                <div>
                  <h4 className="font-medium mb-2">Career Support</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Job Interviews:
                      </span>
                      <span className="ml-2">
                        {course.interviews === "unlimited"
                          ? "Unlimited"
                          : course.interviews || "0"}
                      </span>
                    </div>
                    {course.integratedInternship?.hasInternship && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Internships:
                        </span>
                        <span className="ml-2">
                          {course.integratedInternship.count === "unlimited"
                            ? "Unlimited"
                            : course.integratedInternship.count || "1"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform & Venue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Platform & Venue</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Venue
                  </div>
                  <div className="capitalize">{course.venue || "Online"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Platform
                  </div>
                  <div>{course.onlinePlatform || "Not specified"}</div>
                </div>
                {course.meetingLink && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Meeting Link
                    </div>
                    <div className="text-sm text-blue-600 break-all">
                      <a
                        href={course.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {course.meetingLink}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Features */}
            {course.features?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{feature.title}</div>
                          {feature.subtitle && (
                            <div className="text-sm text-gray-600">
                              {feature.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {course.brochure && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium">Course Brochure</div>
                      <div className="text-sm text-gray-600">PDF Document</div>
                    </div>
                    {/* <Button size="sm" variant="outline">
                      Download
                    </Button> */}
                  </div>
                )}
                {course.syllabusFile && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Detailed Syllabus</div>
                      <div className="text-sm text-gray-600">PDF Document</div>
                    </div>
                    {/* <Button size="sm" variant="outline">
                      Download
                    </Button> */}
                  </div>
                )}
                {!course.brochure && !course.syllabusFile && (
                  <p className="text-gray-500 italic">
                    No materials uploaded yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetails;
