"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Trash } from "lucide-react";
import { InfoCard } from "./info-card";
import { ShapingFuturesSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditableTextarea } from "../../EditableTextarea";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import Spinner from "@/components/shared/Spinner";

export const ShapingFutures = ({ className, data }) => {
  console.log("ShapingFutures data", data);

  const form = useForm({
    resolver: zodResolver(ShapingFuturesSchema),
    defaultValues: {
      subheading:
        "Identify the right decision-makers and seal the deal with confidence.",
      paragraph:
        "At CodIntern, we enable every student to think big and construct boldly. Our vision is to prepare future creators with the talent, mentorship, and attitude required to succeed. We're democratizing technology education to make it accessible, engaging, and meaningful.",
      infos: [
        {
          image: null,
          imagePreview: "/about-us/who-we-are.svg",
          title: "Who We Are?",
          desc: "CodIntern, an DPIIT-certified EdTech platform and Skill India partner, enables students, particularly from Tier 2 and 3 cities, with future skills and practical exposure. Established by educators and technology leaders, we bridge the industry-academia gap through AI solutions, mentorship, and internship-based, experiential learning experiences.",
        },
        {
          image: null,
          imagePreview: "/about-us/our-mission.svg",
          title: "Our Mission",
          desc: "Our purpose is to empower students all over India with industry-grade skills, practical experience, and AI-based learning. We aim to close the skill-employability divide by making education in technology accessible, affordable, and results-focused—enabling every student to walk confidently from college to career, no matter where they come from or how far they reach.",
        },
        {
          image: null,
          imagePreview: "/about-us/our-vision.svg",
          title: "Our Vision",
          desc: "Our aspiration is to become India's leading career-launch platform, trusted by students, colleges and industry. We want to equip every student with the tools, guidance, and opportunities to succeed—growing and celebrating tech talent from across the nation for the digital economy.",
        },
      ],
    },
  });

  const { reset, handleSubmit, control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "infos",
  });

  const { _id = "", content, images } = data || {};

  useEffect(() => {
    // Only reset if the incoming data is actually different
    if (data) {
      reset({
        ...content,
        infos: content.infos.map((info, index) => ({
          ...info,
          imagePreview: images?.[index]?.image,
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
    invalidateKey: ["content", "about-us", "shaping-futures"],
  });

  const onSubmit = (values) => {
    console.log("Saved content:", values);

    const formData = new FormData();
    const infos = values.infos.map(({ imagePreview, image, ...rest }) => rest);

    values.infos.forEach((item) => {
      if (item.image instanceof File) {
        formData.append("images", item.image);
      }
    });

    formData.append("pageName", "about-us");
    formData.append("sectionName", "shaping-futures");
    formData.append("content", JSON.stringify({ ...values, infos }));
    submitForm(formData);
  };

  return (
    <section className={cn("section-container pb-12 md:pb-24", className)}>
      <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl font-medium capitalize text-center">
        <span className="text-main">Crafting Careers</span> with Vision
        <Image
          src="/ellipse-group.svg"
          className="inline-block ml-2"
          width={46}
          height={16}
          alt="Ellipse"
        />
      </h2>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Subheading */}
          <EditableTextarea
            name="subheading"
            className="w-full mx-auto max-w-max"
            textareaClassName="min-h-12 h-12 w-full"
            pClassName="font-stolzl text-xs sm:text-sm text-para mt-2 font-book text-center"
            isSubmitBtn={false}
          />

          {/* Paragraph */}
          <EditableTextarea
            name="paragraph"
            className="w-full mx-auto max-w-4xl"
            textareaClassName="h-24"
            pClassName="font-stolzl text-xs sm:text-sm text-para mt-4 font-book mx-auto text-center max-w-4xl"
            isSubmitBtn={false}
          />

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {fields.map((field, index) => (
              <InfoCard key={field.id} index={index} />
            ))}
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="codIntern" type="submit">
              {isSubmitFormLoading ? <Spinner /> : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
