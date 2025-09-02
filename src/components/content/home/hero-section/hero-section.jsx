"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Form } from "@/components/ui/form";
import { updatePreview } from "@/lib/updatePreview";
import { cn } from "@/lib/utils";
import {
  heroSectionBannersSchema,
  HomeHeroSectionSchema,
} from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImageUploadField } from "../../image-upload-field";
import { TextField } from "./text-field";
import { ButtonField } from "./button-field";
import { TextField1 } from "./text-field1";

export const HeroSection = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const form = useForm({
    resolver: zodResolver(HomeHeroSectionSchema),
    defaultValues: {
      image1: "",
      image2: "",
      image3: "",
      image1Preview: "/home/banner-1.png",
      image2Preview: "/home/banner-2.png",
      image3Preview: "/home/banner-3.png",
      banner1: {
        card1: {
          title: "Training",
          desc: "Al-Driven Courses Designed for Real-World Jobs",
          button: { text: "View Courses", link: "#" },
        },
        card2: {
          title: "Get Hired",
          desc: "Get Trained at Codintern. Apply on Our Job Portal. Get Hired - For Free!",
          button: { text: "View Hiring Drives", link: "#" },
        },
      },
      banner2: {
        button1: { text: "Request Call Back", link: "#" },
        button2: { text: "Enquire Now", link: "#" },
      },
      banner3: {
        button1: { text: "Talk To Your Advisor", link: "#" },
        button2: { text: "Apply For Job", link: "#" },
      },
    },
  });

  const { handleSubmit, watch, setValue } = form;

  const image1 = watch("image1");
  const image2 = watch("image2");
  const image3 = watch("image3");

  useEffect(() => {
    updatePreview(image1, "image1Preview", setValue);
    updatePreview(image2, "image2Preview", setValue);
    updatePreview(image3, "image3Preview", setValue);
  }, [form, image1, image2, image3]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const onSubmit = async (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("image", data.image1[0]);
  };

  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{ loop: true }}
        setApi={setApi}
        className="w-full relative"
      >
        <div className="w-48 xl:w-[252px] hidden md:grid absolute bottom-3 left-1/12 z-10 h-1.5 bg-[#D7C0F8] rounded-md grid-cols-3">
          <div
            onClick={() => api.scrollTo(0)}
            className={cn("rounded-md", current === 1 && "bg-para-3")}
          ></div>
          <div
            onClick={() => api.scrollTo(1)}
            className={cn("rounded-md", current === 2 && "bg-para-3")}
          ></div>
          <div
            onClick={() => api.scrollTo(2)}
            className={cn("rounded-md", current === 3 && "bg-para-3")}
          ></div>
        </div>

        <CarouselContent>
          <CarouselItem>
            <img
              // className="h-[70vh] md:size-full"
              className="h-[30vh] w-full md:h-[80vh]"
              width={562}
              height={430}
              src={watch("image1Preview")}
              alt="hero-banner"
            />
          </CarouselItem>
          <CarouselItem className="">
            <img
              // className="h-[70vh] md:size-full"
              className="h-[30vh] w-full md:h-[80vh]"
              width={562}
              height={430}
              src={watch("image2Preview")}
              alt="hero-banner"
            />
          </CarouselItem>
          <CarouselItem className="">
            <img
              // className="h-[70vh] md:size-full"
              className="h-[30vh] w-full md:h-[80vh]"
              width={562}
              height={430}
              src={watch("image3Preview")}
              alt="hero-banner"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-2">
          {/* Uploads */}
          <div className="flex gap-4">
            <ImageUploadField name="image1" previewName="image1Preview" />
            <ImageUploadField name="image2" previewName="image2Preview" />
            <ImageUploadField name="image3" previewName="image3Preview" />
          </div>

          {/* Banner 1 */}
          <section className="space-y-4 border p-4 rounded-xl">
            <h2 className="font-semibold text-lg">Banner 1</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="space-y-3 border rounded-lg p-3">
                <h3 className="font-medium">Card 1</h3>
                <TextField name="banner1.card1.title" label="Title" />
                <TextField1 name="banner1.card1.desc" label="Description" />
                <ButtonField name="banner1.card1.button" />
              </div>

              {/* Card 2 */}
              <div className="space-y-3 border rounded-lg p-3">
                <h3 className="font-medium">Card 2</h3>
                <TextField name="banner1.card2.title" label="Title" />
                <TextField1 name="banner1.card2.desc" label="Description" />
                <ButtonField name="banner1.card2.button" />
              </div>
            </div>
          </section>

          {/* Banner 2 */}
          <section className="space-y-4 border p-4 rounded-xl">
            <h2 className="font-semibold text-lg">Banner 2</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ButtonField name="banner2.button1" />
              <ButtonField name="banner2.button2" />
            </div>
          </section>

          {/* Banner 3 */}
          <section className="space-y-4 border p-4 rounded-xl">
            <h2 className="font-semibold text-lg">Banner 3</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ButtonField name="banner3.button1" />
              <ButtonField name="banner3.button2" />
            </div>
          </section>

          <div className="flex justify-end">
            <Button variant="codIntern">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
