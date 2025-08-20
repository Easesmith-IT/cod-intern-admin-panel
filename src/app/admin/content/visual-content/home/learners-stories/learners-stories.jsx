"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import { Story } from "./story";
import Autoplay from "embla-carousel-autoplay";
import stories from "@/data/stories.json";
import { cn } from "@/lib/utils";

export const LearnersStories = ({ className }) => {
  return (
    <section className={cn("section-container max-w-6xl py-12 md:py-24", className)}>
      <Carousel
        plugins={[
          Autoplay({
            delay: 1000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        opts={{ loop: true }}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
          <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium">
            <span className="text-main">Learners Who Fuel Progress</span>{" "}
            Stories That Ignite
            <Image
              src="/ellipse-group.svg"
              className="inline-block ml-2"
              width={46}
              height={16}
              alt="Ellipse"
            />
          </h2>
          <div className="hidden md:flex gap-4">
            <CarouselPrevious
              //   className="static translate-0 disabled:bg-[#ababab75]"
              className="static translate-0 border w-[77px] rounded-md h-[33px] disabled:bg-[#ababab75]"
              variant="ghost"
              icon={MoveLeft}
            />
            <CarouselNext
              className="static translate-0 border w-[77px] rounded-md h-[33px] disabled:bg-[#ababab75]"
              variant="ghost"
              icon={MoveRight}
            />
          </div>
        </div>

        <CarouselContent className="mt-10">
          {stories.map((story, index) => (
            <Story
              key={index}
              desc={story.desc}
              img={story.img}
              name={story.name}
              position={story.position}
              rating={story.rating}
            />
          ))}
        </CarouselContent>
        <div className="md:hidden flex justify-center gap-4 mt-10">
          <CarouselPrevious
            //   className="static translate-0 disabled:bg-[#ababab75]"
            className="static translate-0 border w-[77px] rounded-md h-[33px] disabled:bg-[#ababab75]"
            variant="ghost"
            icon={MoveLeft}
          />
          <CarouselNext
            className="static translate-0 border w-[77px] rounded-md h-[33px] disabled:bg-[#ababab75]"
            variant="ghost"
            icon={MoveRight}
          />
        </div>
      </Carousel>
    </section>
  );
};
