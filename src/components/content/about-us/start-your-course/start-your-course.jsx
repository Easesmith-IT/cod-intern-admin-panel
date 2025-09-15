"use client";

import { StartYourCourseSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Info from "./info";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import Spinner from "@/components/shared/Spinner";

export const StartYourCourse = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(StartYourCourseSchema),
    defaultValues: {
      stats: [
        {
          icon: null,
          iconPreview: "/about-us/reviews.svg",
          number: "100",
          label: "Company Reviews",
        },
        {
          icon: null,
          iconPreview: "/about-us/reviews.svg",
          number: "200",
          label: "Students Placed",
        },
        {
          icon: null,
          iconPreview: "/about-us/reviews.svg",
          number: "100",
          label: "Job Openings",
        },
      ],
    },
  });

  const { reset, handleSubmit, control } = form;
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "stats",
  });

  const { _id = "", content, images } = data || {};

  useEffect(() => {
    // Only reset if the incoming data is actually different
    if (data) {
      reset({
        stats: content.stats.map((item, index) => ({
          ...item,
          iconPreview: images?.[index]?.image,
        })),
      });
    }
  }, [data, reset]);

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: `/admin/content?id=${_id}`,
    method: POST,
    invalidateKey: ["content", "about-us", "start-your-course"],
  });

  const onSubmit = (values) => {
    console.log("Saved content:", values);

    const formData = new FormData();
    const stats = values.stats.map(({ iconPreview, icon, ...rest }) => rest);

    values.stats.forEach((item) => {
      if (item.icon instanceof File) {
        formData.append("images", item.icon);
      }
    });

    formData.append("pageName", "about-us");
    formData.append("sectionName", "start-your-course");
    formData.append("content", JSON.stringify({ stats }));
    submitForm(formData);
  };

  const onError = (error) => {
    console.log("error:", error);
  };

  return (
    <section className="py-10 md:py-0 md:h-[316px] bg-para-3 ">
      <div className="section-container h-full flex flex-col md:flex-row gap-10 md:gap-5 justify-between overflow-hidden items-center relative">
        <Image
          src="/about-us/start-your-course.png"
          className="absolute left-1/6"
          width={1000}
          height={316}
          alt="start-your-course"
        />
        <h3 className="max-w-[400px] font-stolzl text-white text-2xl leading-10 lg:leading-14 md:text-4xl  text-center md:text-left font-medium">
          Lets Start Your Course With Us?
        </h3>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex gap-4 sm:gap-10 md:gap-20 lg:gap-32">
              {fields.map((field, index) => (
                <Info key={field.id} index={index} item={field} />
              ))}
            </div>
            <div className="flex gap-2 justify-end mt-5 relative z-10">
              <Button variant="codIntern" type="submit">
                {isSubmitFormLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
