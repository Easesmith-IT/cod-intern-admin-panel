import { Form } from "@/components/ui/form";
import { POST } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { HeroSectionSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EditableTextarea } from "../EditableTextarea";
import { Skeleton } from "@/components/ui/skeleton";

export const HeroSection = ({ data, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(HeroSectionSchema),
    defaultValues: {
      desc: "Need assistance or more details about our AI-accelerated programs? Contact CodIntern. Our team is dedicated to helping you achieve your learning and career goals.",
    },
  });
  const [isDescEdit, setIsDescEdit] = useState(false);

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { isSubmitted, submitCount },
  } = form;

  const { _id = "", content } = data || {};

  useEffect(() => {
    // Only reset if the incoming data is actually different
    if (data) {
      reset(content);
    }
  }, [data, reset]);

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: `/admin/content?id=${_id}`,
    method: POST,
    invalidateKey: ["content", "contact-us", "hero"],
  });

  useEffect(() => {
    if (isSubmitted && result) {
      setIsDescEdit(false);
    }
  }, [submitCount]);

  const onSubmit = (values) => {
    console.log("Data:", values);

    const apiData = {
      pageName: "contact-us",
      sectionName: "hero",
      content: values,
    };
    submitForm(apiData);
  };

  return (
    <div
      style={{
        background: "linear-gradient(100.43deg, #E3E7FF 0%, #FFE7FC 100%)",
      }}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section-container py-14 md:py-28">
            <h1 className="text-2xl leading-9 lg:leading-14 md:text-4xl lg:text-5xl font-medium font-stolzl text-center text-para-3">
              Connect With <span className="text-main">Us</span>
            </h1>
            {/* <p className="text-center text-para max-w-[970px] mx-auto font-stolzl text-xs sm:text-sm md:text-base lg:text-lg mt-2">
              Need assistance or more details about our AI-accelerated programs?
              Contact CodIntern. Our team is dedicated to helping you achieve
              your learning and career goals.
            </p> */}
            {isLoading ? (
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[70%] mx-auto" />
              </div>
            ) : (
              <EditableTextarea
                className="relative max-w-[970px] mx-auto"
                textareaClassName="h-20 max-w-[970px] text-center"
                pClassName="max-w-[970px] text-center"
                isloading={isSubmitFormLoading}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
