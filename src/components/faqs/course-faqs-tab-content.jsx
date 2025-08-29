"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpen, HelpCircle, Plus } from "lucide-react";
import Link from "next/link";
import { CourseFaq } from "./course-faq";
import { FaqSkeleton } from "./faq-skeleton";

export const CourseFaqsTabContent = ({ courseId, courseTitle }) => {
  const { data, isLoading, error } = useApiQuery({
    url: `/admin/faqs/get?category=Courses&courseId=${courseId}&isActive=true&limit=5`,
    queryKeys: ["course-faqs-preview", courseId],
  });

  const faqs = data?.faqs || [];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-blue-500" />
              <div>
                <CardTitle className="text-lg">Course FAQs</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Frequently asked questions specific to this course
                </p>
              </div>
              <Badge variant="outline" className="ml-auto">
                {faqs.length} Active FAQ{faqs.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href={`/admin/courses/${courseId}/faqs`}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Manage All
                </Link>
              </Button>
              <Button variant="codIntern" asChild className="bg-main">
                <Link href={`/admin/courses/${courseId}/faqs/create`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add FAQ
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            These FAQs help students understand course-specific details, requirements, and expectations. 
            Students can view these FAQs to get quick answers to common questions about "{courseTitle}".
          </p>
        </CardContent>
      </Card>

      {/* FAQs List */}
      {isLoading ? (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-4">
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : faqs.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {faqs.map((faq, index) => (
                <div key={faq._id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                          Q
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium text-gray-900 line-clamp-2">
                        {faq.question}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {faq.answer}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Order: {faq.order || 0}
                          </Badge>
                          <Badge 
                            variant={faq.isActive ? "success" : "secondary"} 
                            className="text-xs"
                          >
                            {faq.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/courses/${courseId}/faqs/${faq._id}`}>
                              View
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/courses/${courseId}/faqs/${faq._id}/update`}>
                              Edit
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          {faqs.length >= 5 && (
            <div className="p-4 border-t bg-gray-50">
              <div className="text-center">
                <Button variant="outline" asChild>
                  <Link href={`/admin/courses/${courseId}/faqs`}>
                    View All FAQs ({data?.pagination?.totalFaqs || faqs.length})
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No FAQs Yet
            </h3>
            <p className="text-gray-500 mb-4">
              This course doesn't have any FAQs yet. Create the first FAQ to help students understand course details.
            </p>
            <Button variant="codIntern" asChild className="bg-main">
              <Link href={`/admin/courses/${courseId}/faqs/create`}>
                <Plus className="h-4 w-4 mr-2" />
                Create First FAQ
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
