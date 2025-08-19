"use client";

import { EditableTextarea } from "@/components/content/EditableTextarea";
import { ImageUploadField } from "@/components/content/image-upload-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updatePreview } from "@/lib/updatePreview";
import { WeJustKeepGrowingSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export const WeJustKeepGrowing = () => {
  const form = useForm({
    resolver: zodResolver(WeJustKeepGrowingSchema),
    defaultValues: {
      image: "",
      imagePreview: "/we-just-keep-growing.jpg",
      desc: "Worried about COVID-19? Our Virtual Classroom training lets you learn from home, just as you would in a classroom, using and courses, so there’s more choice than ever.",
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitted, submitCount },
  } = form;

  const image = watch("image");

  useEffect(() => {
    updatePreview(image, "imagePreview", setValue);
  }, [form, image]);

  const onSubmit = (values) => {
    console.log("Steps Data:", values);
    // send to backend (save to DB)
  };

  return (
    <div className="section-container">
      <Form {...form}>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium">
            <span className="text-main">We Just</span> Keep Growing
            <Image
              src="/ellipse-group.svg"
              className="inline-block ml-2"
              width={46}
              height={16}
              alt="Ellipse"
            />
          </h2>
          <Button className="mt-4 ml-auto w-20" variant="codIntern">
            Submit
          </Button>

          {/* <p className="text-para text-center mt-4 text-xs lg:text-base font-stolzl font-book max-w-[814px] mx-auto">
        Worried about COVID-19? Our Virtual Classroom training lets you learn
        from home, just as you would in a classroom, using and courses, so
        there’s more choice than ever.
      </p> */}
          <EditableTextarea
            className="max-w-[814px] mb-6 text-center mx-auto"
            textareaClassName="h-20 max-w-[814px]"
            pClassName="max-w-[814px]"
            isSubmitBtn={false}
          />

          {/* <Image
            src="/we-just-keep-growing.jpg"
            className="mt-12"
            width={1000}
            height={340}
            alt="we just keep growing"
          /> */}

          <ImageUploadField
            name="image"
            previewName="imagePreview"
            imgClassName="max-w-[1000px] w-full h-[404px] shadow-none"
            placeholderClassName="max-w-[1000px] w-full h-[404px]"
          />
        </form>
      </Form>
    </div>
  );
};
