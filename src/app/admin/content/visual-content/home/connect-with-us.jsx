"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectWithUsSchema } from "@/schemas/ContentSchema";
import { Form } from "@/components/ui/form";
import { EditableTextarea } from "@/components/content/EditableTextarea";

export const ConnectWithUs = () => {
  const form = useForm({
    resolver: zodResolver(ConnectWithUsSchema),
    defaultValues: {
      //  image: "",
      //  imagePreview: "/sharpenYourSkill/sharpen-your-skill-img.jpg",
      desc: "Unlock your future with CodIntern's innovative, AI-powered learning platform. We offer tailored learning paths, experiential real-world projects, and invaluable mentor guidance to enable you to become an expert in high-demand tech skills and build the future you want with confidence.",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (values) => {
    console.log("Steps Data:", values);
    // send to backend (save to DB)
  };

  return (
    <section
      style={{ backgroundImage: "url(/connect-with-us-bg.jpg)" }}
      className="h-[383px] my-24 overflow-hidden"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section-container flex justify-between items-center">
            <div className="py-16">
              <h3 className="text-2xl font-stolzl leading-9 md:text-4xl  font-medium lg:leading-[60px] text-white max-w-[900px]">
                Connect with Confidence — We’re Ready to Build What’s Next.
              </h3>
              {/* <p className="font-stolzl max-w-[710px] text-xs md:text-sm text-[#FFFFFFCC] mt-4 mb-6 font-book">
                Unlock your future with CodIntern's innovative, AI-powered
                learning platform. We offer tailored learning paths,
                experiential real-world projects, and invaluable mentor guidance
                to enable you to become an expert in high-demand tech skills and
                build the future you want with confidence.
              </p> */}
              <EditableTextarea
                className="max-w-[710px] mb-6"
                textareaClassName="h-24 max-w-[710px] text-[#FFFFFFCC]"
                pClassName="text-[#FFFFFFCC] max-w-[710px]"
                isSubmitBtn={false}
              />
              <div className="flex flex-col max-w-[710px] justify-between items-end">
                <Button className="" variant="">
                  Submit
                </Button>
              </div>
              <Button className="rounded-md text-xs md:text-sm">
                Read More
              </Button>
            </div>
            <div className="hidden md:block">
              <Image
                src="/connect-with-us-img.svg"
                className="mt-14"
                width={156}
                height={312}
                alt="connect-with-us"
              />
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};
