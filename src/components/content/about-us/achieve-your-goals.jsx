"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Pencil, Plus, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AchieveYourGoalsSchema } from "@/schemas/ContentSchema";
import { EditableTextarea } from "../EditableTextarea";

export const AchieveYourGoals = () => {
  const form = useForm({
    resolver: zodResolver(AchieveYourGoalsSchema),
    defaultValues: {
      desc: "We don't only educate at CodIntern — we evolve. Our enhanced courses are tailored to narrow the gap between what they learn and what the job market requires. Through practical projects, AI-driven learning engines, and immersive mentorship, we empower learners to take bold strides towards their ideal jobs What You Can Achieve:",
      items: [
        {
          text: "Master In-Demand Skills From programming to AI, web development to aptitude — know what employers are really looking for.",
        },
        {
          text: "Crack Internships & Job Interviews Practice with resume assistance, mock interviews, and placement-ready training.",
        },
        {
          text: "Build Real-World Projects Practice in the real world. Practice problems, develop apps, and present your portfolio to recruiters.",
        },
        {
          text: "Learn Smarter with AI Get personalized learning with AI-created quizzes, progress monitoring, and adaptive difficulty levels.",
        },
        {
          text: "Upskill Anytime, Anywhere With multilingual material, downloadable content, and mobile-supported access — learning is within reach",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
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
    console.log("Data:", values);
    // send to backend (save to DB)
  };

  return (
    <div className="section-container py-12 md:py-24 flex flex-col-reverse xl:grid xl:grid-cols-[530px_1fr] items-center gap-14">
      <div>
        <div className="shadow-[0px_0px_15px_0px_#0000001F] max-w-[530px] p-4 rounded-md">
          <div className="flex gap-2 items-center">
            <h3 className="font-medium font-stolzl text-lg sm:text-2xl">
              Active User right now
            </h3>
            <Image
              src="/about-us/light-on.svg"
              width={29}
              height={31}
              alt="Light On"
            />
          </div>
          <div className="flex items-center flex-col sm:flex-row gap-4 mt-5">
            <div className="sm:w-[150px]">
              <h3 className="bg-gradient-to-r text-center font-stolzl font-bold text-3xl from-main to-para-3 bg-clip-text text-transparent">
                89%
              </h3>
              <p className="text-center text-para font-stolzl text-sm">
                of customer say they read reviews before buying a course
              </p>
              <Separator className="my-4" />
              <div className="flex gap-2 items-center justify-center sm:justify-start">
                <Image
                  src="/about-us/star-fill.svg"
                  width={24}
                  height={24}
                  alt="Star"
                />
                <Image
                  src="/about-us/star-fill.svg"
                  width={24}
                  height={24}
                  alt="Star"
                />
                <Image
                  src="/about-us/star-fill.svg"
                  width={24}
                  height={24}
                  alt="Star"
                />
                <Image
                  src="/about-us/star-fill.svg"
                  width={24}
                  height={24}
                  alt="Star"
                />
                <Image
                  src="/about-us/star-fill.svg"
                  width={24}
                  height={24}
                  alt="Star"
                />
              </div>
            </div>
            <div>
              <Image
                src="/about-us/active-user.jpg"
                width={393}
                height={203}
                alt="Active User"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium capitalize">
              <span className="text-main">Reach Your Ambitions</span> with
              Enhanced CodIntern Programs
              <Image
                src="/ellipse-group.svg"
                className="inline-block ml-2"
                width={46}
                height={16}
                alt="Ellipse"
              />
            </h2>
            {/* <p className="font-stolzl text-xs sm:text-sm text-para mt-5 font-book">
              We don't only educate at CodIntern — we evolve. Our enhanced
              courses are tailored to narrow the gap between what they learn and
              what the job market requires. Through practical projects,
              AI-driven learning engines, and immersive mentorship, we empower
              learners to take bold strides towards their ideal jobs What You
              Can Achieve:
            </p> */}
            <EditableTextarea
              className="w-full max-w-max"
              textareaClassName="h-32 w-full"
              pClassName="font-stolzl text-xs sm:text-sm text-para mt-5 font-book"
              isSubmitBtn={false}
            />
            <ul className="mt-5 space-y-5">
              {fields.map((field, index) => (
                <li key={field.id} className="flex gap-3 items-start">
                  <FormField
                    control={form.control}
                    name={`items.${index}.text`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel className="sr-only">
                          List item text
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...f}
                            rows={2}
                            className="text-xs sm:text-sm font-stolzl resize-none font-book text-para w-full"
                            placeholder="Enter list item text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-2 flex gap-2 items-center">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      size="sm"
                      aria-label={`Remove item ${index + 1}`}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex gap-2 justify-end mt-4">
              <Button
                type="button"
                variant="codIntern"
                onClick={() => append({ text: "New list item" })}
              >
                <Plus size={14} className="mr-2" /> Add item
              </Button>

              <Button type="submit" variant="codIntern">
                Save
              </Button>
            </div>
          </form>
        </Form>
        <Button
          asChild
          size="xl"
          className="mt-5 text-xs sm:text-sm"
          variant="linearGradient"
        >
          <Link href="/courses/123">View Our Courses</Link>
        </Button>
      </div>
    </div>
  );
};
