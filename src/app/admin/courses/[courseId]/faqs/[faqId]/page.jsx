"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { DELETE, PATCH } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Edit3,
  HelpCircle,
  Hash,
  BookOpen,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import Spinner from "@/components/shared/Spinner";
import parse from "html-react-parser";
import { options } from "@/constants/constants";

const ViewCourseFaq = () => {
  const params = useParams();
  const router = useRouter();
  const { courseId, faqId } = params;
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Get course details
  const { data: courseData } = useApiQuery({
    url: `/admin/courses/${courseId}`,
    queryKeys: ["course", courseId],
  });

  // Get FAQ details
  const { data: faq, isLoading } = useApiQuery({
    url: `/admin/faqs/get/${faqId}`,
    queryKeys: ["course-faq", faqId],
  });

  const {
    mutateAsync: updateStatus,
    isPending: isStatusPending,
    error,
  } = useApiMutation({
    url: `/admin/faqs/update/${faqId}`,
    method: PATCH,
    invalidateKey: ["course-faq", "course-faqs"],
  });

  const { mutateAsync: deleteFaq, isPending: isDeletePending } =
    useApiMutation({
      url: `/admin/faqs/delete/${faqId}`,
      method: DELETE,
      invalidateKey: ["course-faqs"],
    });

  useEffect(() => {
    if (faq?.faq) {
      setIsActive(faq.faq.isActive);
    }
  }, [faq, error]);

  const handleStatusToggle = async (value) => {
    setIsActive(value);
    await updateStatus({ isActive: value });
  };

  const handleDeleteFaq = async () => {
    await deleteFaq();
    router.push(`/admin/courses/${courseId}/faqs`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!faq?.faq) {
    return (
      <div className="text-center py-12">
        <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">FAQ Not Found</h3>
        <p className="text-gray-500 mb-4">The FAQ you're looking for doesn't exist.</p>
        <Button onClick={() => router.push(`/admin/courses/${courseId}/faqs`)} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course FAQs
        </Button>
      </div>
    );
  }

  const faqData = faq.faq;
  const course = courseData?.course;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push(`/admin/courses/${courseId}/faqs`)}
          className="flex gap-2 items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Course FAQs</span>
        </button>

        <div className="flex items-center gap-3">
          <Button
            onClick={() =>
              router.push(`/admin/courses/${courseId}/faqs/${faqId}/update`)
            }
            variant="outline"
            size="sm"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit FAQ
          </Button>
          <Button
            onClick={() => setIsAlertModalOpen(true)}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Course Context Banner */}
      {course && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Course FAQ</p>
                <p className="text-sm text-blue-700">{course.title}</p>
              </div>
              <Badge
                variant="outline"
                className="ml-auto border-blue-300 text-blue-700"
              >
                Course-Specific
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Question Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <HelpCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <CardTitle className="text-lg">Question</CardTitle>
                  <Badge variant="outline" className="mt-2">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Course FAQ
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{faqData.question}</p>
            </CardContent>
          </Card>

          {/* Answer Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Answer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed whitespace-pre-line my-editor ml-4">
                {faqData.answer && parse(faqData.answer, options)}
              </p>
            </CardContent>
          </Card>

          {/* Course Details */}
          {course && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  Course Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">{course.title}</h4>
                    {course.description && (
                      <p className="text-muted-foreground mt-1">
                        {course.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="capitalize">
                      {course.category}
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {course.level}
                    </Badge>
                    <Badge
                      variant={
                        course.status === "published"
                          ? "success"
                          : course.status === "archived"
                          ? "destructive"
                          : "default"
                      }
                      className="capitalize"
                    >
                      {course.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">FAQ Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isActive ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="font-medium">
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <Switch
                  checked={isActive}
                  onCheckedChange={handleStatusToggle}
                  disabled={isStatusPending}
                />
              </div>
              {isStatusPending && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Spinner spinnerClassName="size-3" />
                  Updating status...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Display Order</p>
                  <p className="text-sm text-muted-foreground">
                    {faqData.order || 0}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(faqData.createdAt), "PPP 'at' p")}
                  </p>
                </div>
              </div>

              {faqData.updatedAt !== faqData.createdAt && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(faqData.updatedAt), "PPP 'at' p")}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push(`/admin/courses/${courseId}`)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View Course Details
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push(`/admin/courses/${courseId}/faqs`)}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                All Course FAQs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isAlertModalOpen && (
        <ConfirmModal
          header="Delete Course FAQ"
          description="This will permanently delete this course FAQ. This action cannot be undone."
          isModalOpen={isAlertModalOpen}
          setIsModalOpen={setIsAlertModalOpen}
          disabled={isDeletePending}
          onConfirm={handleDeleteFaq}
        />
      )}
    </div>
  );
};

export default ViewCourseFaq;
