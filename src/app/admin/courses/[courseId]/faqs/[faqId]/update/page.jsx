"use client";

import { CourseFaqForm } from "@/components/faqs/course-faq-form";
import { useApiQuery } from "@/hooks/useApiQuery";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EditCourseFaq = () => {
  const params = useParams();
  const router = useRouter();
  const { courseId, faqId } = params;

  // Get course details
  const { data: courseData, isLoading: isCourseLoading } = useApiQuery({
    url: `/admin/courses/${courseId}`,
    queryKeys: ["course", courseId],
  });

  // Get FAQ details
  const { data: faqData, isLoading: isFaqLoading } = useApiQuery({
    url: `/admin/faqs/get/${faqId}`,
    queryKeys: ["course-faq", faqId],
  });

  const isLoading = isCourseLoading || isFaqLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!courseData?.course) {
    return (
      <div className="text-center py-12">
        <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Not Found</h3>
        <p className="text-gray-500 mb-4">The course you're trying to edit FAQ for doesn't exist.</p>
        <Button onClick={() => router.push("/admin/courses")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>
    );
  }

  if (!faqData?.faq) {
    return (
      <div className="text-center py-12">
        <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">FAQ Not Found</h3>
        <p className="text-gray-500 mb-4">The FAQ you're trying to edit doesn't exist.</p>
        <Button onClick={() => router.push(`/admin/courses/${courseId}/faqs`)} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course FAQs
        </Button>
      </div>
    );
  }

  const course = courseData.course;
  const faq = faqData.faq;

  return (
    <div>
      <CourseFaqForm 
        faq={faq} 
        isEdit={true} 
        courseId={courseId}
        courseTitle={course.title}
      />
    </div>
  );
};

export default EditCourseFaq;
