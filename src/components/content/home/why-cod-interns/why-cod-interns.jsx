"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Feature } from "./feature";
import features from "@/data/features.json";
import { WhyCodInternsSchema } from "@/schemas/ContentSchema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Pencil, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const WhyCodInterns = () => {
  const form = useForm({
    resolver: zodResolver(WhyCodInternsSchema),
    defaultValues: {
      //  image: "",
      //  imagePreview: "/sharpenYourSkill/sharpen-your-skill-img.jpg",
      desc: "Success is not just a goal at CodIntern; it is the unavoidable result of our learner-centric, AI-powered ecosystem. We offer the unmatched training, state-of-the-art support, and precise guidance required to turn your untapped potential into extraordinary performance and a career you're genuinely proud of, from clever skill mapping and adaptive learning paths to individualized career matching and professional mentoring.",
    },
  });

  const [isDescEdit, setIsDescEdit] = useState(false);

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { isSubmitted, submitCount },
  } = form;

  useEffect(() => {
    if (isSubmitted) {
      setIsDescEdit(false);
    }
  }, [submitCount]);

  const onSubmit = (values) => {
    console.log("Steps Data:", values);
    // send to backend (save to DB)
  };

  return (
    <section className="section-container max-w-6xl mx-0 py-12 sm:py-24 overflow-x-hidden">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-16"
        >
          <div className="">
            <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium lg:w-[525px]">
              <span className="text-main">What Attracts</span> Diverse Learners
              to CodIntern's Programs?
              <Image
                src="/ellipse-group.svg"
                className="inline-block ml-2"
                width={46}
                height={16}
                alt="Ellipse"
              />
            </h2>

            {/* <p className="mt-5 font-stolzl font-book text-xs sm:text-base text-para lg:w-[520px]">
              Success is not just a goal at CodIntern; it is the unavoidable
              result of our learner-centric, AI-powered ecosystem. We offer the
              unmatched training, state-of-the-art support, and precise guidance
              required to turn your untapped potential into extraordinary
              performance and a career you're genuinely proud of, from clever
              skill mapping and adaptive learning paths to individualized career
              matching and professional mentoring.
            </p> */}

            <div className="relative max-w-[520px]">
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
                <>
                  <FormField
                    control={control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormControl>
                          <Textarea
                            className="h-52 !text-base resize-none"
                            placeholder="Enter Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="mt-4" variant="codIntern">
                    Submit
                  </Button>
                </>
              ) : (
                <p className="mt-5 font-stolzl font-book text-xs sm:text-base text-para lg:w-[520px]">
                  {watch("desc")}
                </p>
              )}
            </div>
          </div>
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
            }}
            className="lg:max-w-3xl"
          >
            <CarouselContent className="-ml-3">
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  index={index}
                  title={feature?.title}
                  desc={feature?.desc}
                />
              ))}
            </CarouselContent>
            <div className="flex gap-8 items-center justify-center md:justify-start mt-10">
              <CarouselPrevious variant="default" className="static" />
              <CarouselNext variant="default" className="static" />
            </div>
          </Carousel>
        </form>
      </Form>
    </section>
  );
};
