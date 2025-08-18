"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Job } from "./job";
import { cn } from "@/lib/utils";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useState } from "react";

export const FreshJobs = ({ className }) => {
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useApiQuery({
    url: `/student/jobs/get?limit=${limit}`,
    queryKeys: ["job", limit],
  });

  return (
    <section className={cn("section-container max-w-6xl", className)}>
      <Carousel className="w-full">
        <div className="flex justify-between items-center gap-5">
          <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium">
            <span className="text-main">Fresh</span> Jobs
            <Image
              src="/ellipse-group.svg"
              className="inline-block ml-2"
              width={46}
              height={16}
              alt="Ellipse"
            />
          </h2>
          <div className="flex gap-4">
            <CarouselPrevious
              variant="default"
              className="static translate-0"
            />
            <CarouselNext variant="default" className="static translate-0" />
          </div>
        </div>

        <CarouselContent className="mt-10">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Job.Skeleton key={index} />
            ))}
          {data?.jobs?.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
