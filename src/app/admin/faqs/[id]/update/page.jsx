"use client";

import { FaqForm } from "@/components/faqs/faq-form";
import { useApiQuery } from "@/hooks/useApiQuery";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EditFaq = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const { data: faq, isLoading } = useApiQuery({
    url: `/admin/faqs/get/${id}`,
    queryKeys: ["faq", id],
  });

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

  if (!faq?.faq) {
    return (
      <div className="text-center py-12">
        <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">FAQ Not Found</h3>
        <p className="text-gray-500 mb-4">The FAQ you're trying to edit doesn't exist.</p>
        <Button onClick={() => router.push("/admin/faqs")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to FAQs
        </Button>
      </div>
    );
  }

  return (
    <div>
      <FaqForm faq={faq.faq} isEdit={true} />
    </div>
  );
};

export default EditFaq;
