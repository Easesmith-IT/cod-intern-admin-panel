"use client";

import { HeroSectionSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditableTextarea } from "../EditableTextarea";

export const HeroSection = () => {
  const form = useForm({
    resolver: zodResolver(HeroSectionSchema),
    defaultValues: {
      desc: "CodIntern, a DPIIT-approved EdTech platform and Skill India Training Partner, equips students with AI-facilitated learning, experiential learning, and career guidance—filling the gap between education and employment for a technology-enabled workforce in India.",
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
    console.log("Data:", values);
    // send to backend (save to DB)
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
            {" "}
            {/* h-[420px] flex flex-col justify-center */}
            <h1 className="text-2xl leading-9 lg:leading-14 md:text-4xl lg:text-5xl font-medium font-stolzl text-center text-para-3">
              About <span className="text-main">Us</span>
            </h1>
            {/* <p className="text-center text-para max-w-[970px] mx-auto font-stolzl text-xs sm:text-sm md:text-base lg:text-lg mt-2">
              CodIntern, a DPIIT-approved EdTech platform and Skill India
              Training Partner, equips students with AI-facilitated learning,
              experiential learning, and career guidance—filling the gap between
              education and employment for a technology-enabled workforce in
              India.
            </p> */}
            <EditableTextarea
              className="relative max-w-[970px] mx-auto"
              textareaClassName="h-20 max-w-[970px]"
              pClassName="max-w-[970px]"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
