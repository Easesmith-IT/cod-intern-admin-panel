"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SharpenYourSkillSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Benifit } from "./benifit";
import { Pencil, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { updatePreview } from "@/lib/updatePreview";
import { ImageUploadField } from "../../image-upload-field";

export const SharpenYourSkill = () => {
  const form = useForm({
    resolver: zodResolver(SharpenYourSkillSchema),
    defaultValues: {
      image: "",
      imagePreview: "/sharpenYourSkill/sharpen-your-skill-img.jpg",
      desc: "Take advantage of our state-of-the-art online courses, which are intended to give you the highly sought-after skills you need to succeed in the fast-paced workplace of today. Our programs combine real-world, hands-on learning with AI-driven insights to make sure you not only understand theoretical ideas but also become an expert in their practical application. From fundamental concepts to more complex specializations, we enable you to gain employable skills and quicken your professional path.",
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

  const image = watch("image");

  useEffect(() => {
    updatePreview(image, "imagePreview", setValue);
  }, [form, image]);

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
    <section className="section-container py-12 md:py-24">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row items-center sm:justify-between gap-10">
            <div className="">
              <div className="flex max-w-[590px]">
                <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium">
                  <span className="text-main">Master In-Demand Skills</span>{" "}
                  with Our Online Courses
                  <Image
                    src="/ellipse-group.svg"
                    className="inline-block ml-2"
                    width={46}
                    height={16}
                    alt="Ellipse"
                  />
                </h2>
              </div>
              <div className="relative max-w-[590px]">
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
                              className="h-56 !text-base resize-none"
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
                  <p className="font-stolzl font-book text-para max-w-[590px] text-xs sm:text-base mt-5">
                    {watch("desc")}
                  </p>
                )}
              </div>
              <Button
                size="lg"
                variant="linearGradient"
                className="rounded-sm px-5 h-12 mt-10"
              >
                Need More Information
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex flex-col gap-2">
                {/* <Image
                src="/sharpenYourSkill/sharpen-your-skill-img.jpg"
                width={353}
                height={404}
                alt="sharpen-your-skill-img"
              /> */}
                <ImageUploadField
                  name="image"
                  previewName="imagePreview"
                  imgClassName="w-[353px] h-[404px] shadow-none"
                  placeholderClassName="w-[353px] h-[404px]"
                />
              </div>
              <div className="sm:w-[245px] space-y-4">
                <h3 className="font-stolzl font-medium sm:hidden text-lg sm:text-2xl">
                  Benefits of Online Training
                </h3>
                <h3 className="font-stolzl hidden sm:block font-medium text-xl sm:text-2xl">
                  Benefits of <br /> Online Training
                </h3>
                <Benifit
                  src="/sharpenYourSkill/Flexibility.svg"
                  title="Flexibility in study"
                />
                <Benifit
                  src="/sharpenYourSkill/Easy.svg"
                  title="Easy On The Pockets"
                />
                <Benifit
                  src="/sharpenYourSkill/online-support.svg"
                  title="Online Support"
                />
                <Benifit
                  src="/sharpenYourSkill/Career.svg"
                  title="Progress Report"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="mt-4" variant="codIntern">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
