"use client";

import React from "react";
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

export const ShapingFutures = ({ className }) => {
  const form = useForm({
    defaultValues: {
      subheading:
        "Identify the right decision-makers and seal the deal with confidence.",
      paragraph:
        "At CodIntern, we enable every student to think big and construct boldly. Our vision is to prepare future creators with the talent, mentorship, and attitude required to succeed. We're democratizing technology education to make it accessible, engaging, and meaningful.",
      infos: [
        {
          title: "Who We Are?",
          desc: "CodIntern, an DPIIT-certified EdTech platform and Skill India partner, enables students, particularly from Tier 2 and 3 cities, with future skills and practical exposure. Established by educators and technology leaders, we bridge the industry-academia gap through AI solutions, mentorship, and internship-based, experiential learning experiences.",
        },
        {
          title: "Our Mission",
          desc: "Our purpose is to empower students all over India with industry-grade skills, practical experience, and AI-based learning. We aim to close the skill-employability divide by making education in technology accessible, affordable, and results-focused—enabling every student to walk confidently from college to career, no matter where they come from or how far they reach.",
        },
        {
          title: "Our Vision",
          desc: "Our aspiration is to become India's leading career-launch platform, trusted by students, colleges and industry. We want to equip every student with the tools, guidance, and opportunities to succeed—growing and celebrating tech talent from across the nation for the digital economy.",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "infos",
  });

  function onSubmit(values) {
    console.log("Saved content:", values);
  }

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Subheading */}
          <FormField
            control={form.control}
            name="subheading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subheading</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Paragraph */}
          <FormField
            control={form.control}
            name="paragraph"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paragraph</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-lg space-y-3 relative"
              >
                <FormField
                  control={form.control}
                  name={`infos.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`infos.${index}.desc`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2"
                >
                  <Trash size={16} />
                </Button> */}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {/* <Button
              type="button"
              onClick={() =>
                append({ title: "New Info", desc: "New description here." })
              }
            >
              <Plus size={14} className="mr-2" /> Add Info
            </Button> */}

            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
