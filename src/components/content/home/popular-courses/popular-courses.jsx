"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import courseCategory from "@/data/courseCategory.json";
import { PopularCoursesSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CourseCard } from "./course-card";
import { CourseCategory } from "./course-category";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import Spinner from "@/components/shared/Spinner";

export const PopularCourses = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("web_development");
  const form = useForm({
    resolver: zodResolver(PopularCoursesSchema),
    defaultValues: {
      desc: "Provides a range of AI-powered courses created especially to prepare students for the demands of the tech-driven workforce. These programs use intelligent systems to offer individualized learning paths, guaranteeing that participants acquire state-of-the-art, industry-relevant AI skills and get ready for positions in a workplace that is becoming more automated and data-driven.",
    },
  });
  const [isDescEdit, setIsDescEdit] = useState(false);

  const {
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    formState: { isSubmitted, submitCount },
  } = form;

  // useEffect(() => {
  //   if (isSubmitted) {
  //     setIsDescEdit(false);
  //   }
  // }, [submitCount]);

  const { _id = "", content = {} } = data || {};

  useEffect(() => {
    if (data) {
      reset({
        desc:
          content.desc ||
          "Provides a range of AI-powered courses created especially to prepare students for the demands of the tech-driven workforce. These programs use intelligent systems to offer individualized learning paths, guaranteeing that participants acquire state-of-the-art, industry-relevant AI skills and get ready for positions in a workplace that is becoming more automated and data-driven.",
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
    invalidateKey: ["content", "home", "popular-courses"],
  });

  const onSubmit = (values) => {
    console.log("Steps Data:", values);
    const apiData = {
      pageName: "home",
      sectionName: "popular-courses",
      content: values,
    };
    submitForm(apiData);
  };


  return (
    <section className="section-container max-w-6xl">
      <div className="flex justify-center text-center section-container px-0 max-w-[900px]">
        <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium capitalize">
          <span className="text-main">Our flagship</span> course offerings
          <Image
            src="/ellipse-group.svg"
            className="inline-block ml-2"
            width={46}
            height={16}
            alt="Ellipse"
          />
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative max-w-4xl w-full mx-auto">
            <button
              type="button"
              onClick={() => setIsDescEdit((prev) => !prev)}
              className="size-7 absolute shadow -top-4 -right-4 p-1.5 rounded-full bg-white flex justify-center items-center"
            >
              {isDescEdit ? (
                <X className="size-5" />
              ) : (
                <Pencil className="size-5" />
              )}
            </button>
            {isDescEdit ? (
              <div className="flex flex-col items-end">
                <FormField
                  control={control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem className="mt-4 w-full">
                      <FormControl>
                        <Textarea
                          className="h-32 !text-base resize-none"
                          placeholder="Enter Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <p className="text-center text-xs lg:text-base font-stolzl font-book text-para mt-4">
                {watch("desc")}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              disabled={isSubmitFormLoading}
              variant="codIntern"
            >
              {isSubmitFormLoading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="max-w-5xl mx-auto w-full px-12 py-3 mt-10"
      >
        <CarouselContent className="-ml-3">
          {courseCategory.map((category, index) => (
            <CourseCategory
              key={index}
              index={index}
              name={category.name}
              label={category.label}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious variant="default" className="left-0 z-10" />
        <CarouselNext variant="default" className="right-0 z-10" />
      </Carousel>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        <CourseCard
          src="/course/Data Analysis using Python.png"
          name="Data Analysis using Python"
        />
        <CourseCard
          src="/course/Data Visualization using Power BI.png"
          name="Data Visualization using Power BI"
        />
        <CourseCard
          src="/course/Data Visualization using Tableau.png"
          name="Data Visualization using Tableau"
        />
        <CourseCard
          src="/course/Machine Learning and Artificial Intelligence with Python.png"
          name="Machine Learning and Artificial Intelligence with Python"
        />
      </div>
    </section>
  );
};
