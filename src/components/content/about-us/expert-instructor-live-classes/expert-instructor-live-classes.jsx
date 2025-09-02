"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronDown, Pencil, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Info } from "./info";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpertInstructorLiveClassesSchema } from "@/schemas/ContentSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploadField } from "../../image-upload-field";
import { updatePreview } from "@/lib/updatePreview";
import { RichTextEditor } from "@/components/tiptap-editor";
import parse from "html-react-parser";
import { options } from "@/constants/constants";

export const ExpertInstructorLiveClasses = () => {
  const form = useForm({
    resolver: zodResolver(ExpertInstructorLiveClassesSchema),
    defaultValues: {
      image: null,
      imagePreview: "/about-us/expert-instructor.svg",
      desc: `<p>At CodIntern, we think that excellent mentors are the first step toward great learning. Our knowledgeable instructors are more than just instructors; they are tech executives, professionals in the field, and seasoned educators with practical project management experience from top businesses. Every live session benefits from their extensive subject knowledge, real-world perspectives, and enthusiasm for teaching.</p><p></p><p>Our live classes are incredibly engaging, interactive, and created to mimic actual work environments. Every session, whether it's about project management, coding, or career preparation, is practical, results-oriented, and in line with industry standards. Students can work with peers, ask questions in real time, and get tailored feedback that helps them grasp concepts more quickly.</p><p></p><p>Additionally, we offer round-the-clock assistance via our dedicated help channels because we understand that learning never ends. Our mentor network and support staff are always available by message, so you never have to learn alone, whether you're having trouble with an assignment, need technical help, or simply want career advice.</p><p></p><p>At CodIntern, you're not just learning — you're growing with the support of an entire ecosystem built for your success.</p>`,
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitted, submitCount },
  } = form;

  const [isDescEdit, setIsDescEdit] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      setIsDescEdit(false);
    }
  }, [submitCount]);

  const image = watch("image");

  useEffect(() => {
    updatePreview(image, "imagePreview", setValue);
  }, [form, image]);

  const onSubmit = (values) => {
    console.log("Saved content:", values);
  };

  return (
    <section className="py-12 md:py-24 section-container">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-20 items-center"
        >
          <div className="max-w-3xl">
            <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium capitalize">
              <span className="text-main">Live Skill-Building</span> Sessions by
              Experts
              <Image
                src="/ellipse-group.svg"
                className="inline-block ml-2"
                width={46}
                height={16}
                alt="Ellipse"
              />
            </h2>

            <div className="relative">
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
                <FormField
                  control={control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Desc *</FormLabel> */}
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="font-stolzl text-xs sm:text-sm text-para max-w-[869px] mt-4 font-book">
                  {watch("desc") && parse(watch("desc"), options)}
                </div>
              )}
            </div>

            {/* <p className="font-stolzl text-xs sm:text-sm text-para max-w-[869px] mt-4 font-book">
              At CodIntern, we think that excellent mentors are the first step
              toward great learning. Our knowledgeable instructors are more than
              just instructors; they are tech executives, professionals in the
              field, and seasoned educators with practical project management
              experience from top businesses. Every live session benefits from
              their extensive subject knowledge, real-world perspectives, and
              enthusiasm for teaching.
            </p>
            <p className="font-stolzl text-xs sm:text-sm text-para max-w-[869px] mt-3 font-book">
              Our live classes are incredibly engaging, interactive, and created
              to mimic actual work environments. Every session, whether it's
              about project management, coding, or career preparation, is
              practical, results-oriented, and in line with industry standards.
              Students can work with peers, ask questions in real time, and get
              tailored feedback that helps them grasp concepts more quickly.
            </p>
            <p className="font-stolzl text-xs sm:text-sm text-para max-w-[869px] mt-3 font-book">
              Additionally, we offer round-the-clock assistance via our
              dedicated help channels because we understand that learning never
              ends. Our mentor network and support staff are always available by
              message, so you never have to learn alone, whether you're having
              trouble with an assignment, need technical help, or simply want
              career advice.
            </p>
            <p className="font-stolzl text-xs sm:text-sm text-para max-w-[869px] mt-3 font-book">
              At CodIntern, you're not just learning — you're growing with the
              support of an entire ecosystem built for your success.
            </p> */}
            {/* <Button
          variant="ghost"
          className="font-semibold text-para-3 my-5 hover:bg-transparent has-[>svg]:px-0 group"
        >
          <span>Show More</span>
          <ChevronDown className="group-hover:translate-y-1 transition group-active:translate-y-0" />
        </Button> */}
            <Separator className="mt-5" />
            <div className="flex gap-2 justify-between items-center mt-8">
              <div className="flex gap-10">
                <Info title="24/7 Support" />
                {/* <Info title="24/7 Support" />
          <Info title="24/7 Support" />
          <Info title="24/7 Support" /> */}
              </div>
              <Button variant="codIntern" type="submit">
                Save
              </Button>
            </div>
          </div>
          <div>
            {/* <Image
              src="/about-us/expert-instructor.svg"
              width={401}
              height={419}
              alt="expert-instructor"
            /> */}
            <ImageUploadField
              name="image"
              previewName="imagePreview"
              imgClassName="w-[401px] h-[419px] shadow-none"
              placeholderClassName="w-[401px] h-[419px]"
            />
          </div>
        </form>
      </Form>
    </section>
  );
};
