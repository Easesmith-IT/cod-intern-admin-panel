import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SingleCard } from "./single-card";

export const AccelerateYourCareer = () => {
  return (
    <section className="py-12 md:py-24 section-container md:px-20">
      <div className="flex justify-center text-center section-container px-0 max-w-[900px]">
        <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium capitalize">
          <span className="text-main">Fast-Track Your Career</span> with
          Industry-Aligned Courses
          <Image
            src="/ellipse-group.svg"
            className="inline-block ml-2"
            width={46}
            height={16}
            alt="Ellipse"
          />
        </h2>
      </div>

      <Carousel className="max-w-5xl mx-auto w-full">
        <CarouselContent className="mt-10">
          <SingleCard
            index={0}
            title="Data Science & Analytics with AI"
            desc="Analyze data and build AI models using Python, SQL, and machine learning techniques."
            timing="8-10 Months Campus & Online Training"
          />
          <SingleCard
            index={1}
            title="Python Full Stack Development"
            desc="Build dynamic web applications using Python, Django, and front-end technologies."
            timing="8-10 Months Campus & Online Training"
          />
          <SingleCard
            index={2}
            title="Java Full Stack Development"
            desc="Develop robust applications with Java, Spring Boot, and modern front-end tools."
            timing="8-10 Months Campus & Online Training"
          />
          <SingleCard
            index={3}
            title="DevOps with AWS"
            desc="Build dynamic web applications using Python, Django, and front-end technologies"
            timing="6-8 Months Campus & Online Training"
          />
          <SingleCard
            index={4}
            title="Digital Marketing with AI"
            desc="Master digital marketing strategies enhanced with AI tools and analytics."
            timing="8-10 Months Campus & Online Training"
          />
          <SingleCard
            index={5}
            title="Software Testing With AI"
            desc="Test software quality with manual methods and automation tools like Selenium and JIRA"
            timing="4-6 Months Campus & Online Training"
          />
        </CarouselContent>
        <CarouselPrevious
          className="hidden md:block [&_svg]:translate-x-1"
          variant="default"
        />
        <CarouselNext
          className="hidden md:block [&_svg]:translate-x-1"
          variant="default"
        />
        <div className="md:hidden mt-10 max-w-[200px] mx-auto px-6 flex justify-between">
          <CarouselPrevious className="static" variant="default" />
          <CarouselNext className="static" variant="default" />
        </div>
      </Carousel>
    </section>
  );
};
