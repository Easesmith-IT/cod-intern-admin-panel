import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNowStrict } from "date-fns";
import { ChevronRight, GraduationCap, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Job = ({ job }) => {
  const {
    title,
    status,
    jobImage,
    customId,
    postingDate,
    category,
    city,
    state,
    country,
    education,
    jobId,
    _id,
  } = job || {};

  return (
    <CarouselItem className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <Card className="border-none rounded-md shadow-[0px_0px_10px_0px_#00000026]">
          <CardContent>
            <div className="flex gap-4 justify-between items-center">
              <div>
                {status === "active" && (
                  <div className="border-2 border-[#9237E333] flex gap-2 items-centern w-[135px] rounded px-2 py-1 text-[10px] sm:text-xs font-stolzl font-normal">
                    <Image
                      src="/job/Icon.svg"
                      width={16}
                      height={16}
                      alt="icon"
                    />
                    <p className="text-para">Actively hiring</p>
                  </div>
                )}
                {status !== "active" && (
                  <div className="border-2 border-[#9237E333] flex gap-2 items-centern w-[85px] rounded px-2 py-1 text-[10px] sm:text-xs font-stolzl font-normal">
                    <Lock className="text-main size-4" />
                    <p className="text-para">Closed</p>
                  </div>
                )}
                <h3 className="font-stolzl capitalize line-clamp-2 h-14 font-medium text-lg md:text-xl mt-4">
                  {title}
                </h3>
                <p className="font-stolzl text-para font-book text-xs sm:text-sm mt-1">
                  {jobId}
                </p>
              </div>
              <Image src={jobImage} width={60} height={60} alt="job" />
            </div>

            <div className="flex gap-3 items-center mt-2">
              <div className="bg-[#F7EFFD] rounded-full px-3 py-1.5 flex gap-2 items-center">
                <Image
                  src="/job/time-ago.svg"
                  width={14}
                  height={14}
                  alt="Active"
                />
                <span className="text-xs font-book font-stolzl text-para-3">
                  {postingDate &&
                    formatDistanceToNowStrict(new Date(postingDate), {
                      addSuffix: true,
                    })}
                </span>
              </div>
              {status === "active" && (
                <div className="border border-border-1 rounded-full px-3 py-1.5 font-stolzl text-xs flex items-center font-book text-main">
                  Actively Hiring
                </div>
              )}
              {status !== "active" && (
                <div className="border border-border-1 rounded-full px-3 py-1.5 font-stolzl text-xs flex items-center font-book text-main">
                  Closed
                </div>
              )}
            </div>

            <Separator className="my-3" />

            <div className="mt-5 flex gap-2 items-start">
              <Image
                src="/job/user.svg"
                width={16}
                height={16}
                alt="user"
                className="shrink-0"
              />
              <p className="font-stolzl font-book text-para text-xs capitalize sm:text-sm">
                {category} Job
              </p>
            </div>
            <div className="mt-1 flex gap-2 items-start">
              <Image
                src="/job/map-pin.svg"
                width={16}
                height={16}
                alt="map-pin"
                className="shrink-0"
              />
              <p className="font-stolzl font-book line-clamp-1 text-para capitalize text-xs sm:text-sm">
                {city}, {state}, {country}
              </p>
            </div>

            <div className="mt-1 flex gap-2 items-start">
              <GraduationCap className="size-4 text-main/90 shrink-0" />
              <p className="font-stolzl font-book text-para line-clamp-1 text-xs sm:text-sm">
                {education.join(", ")}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center mt-9">
            <div className="w-[86px] h-[30px] flex items-center justify-center text-para rounded-md bg-[#F8F2FD] font-stolzl text-xs sm:text-sm font-book text-center">
              Job
            </div>
            <Button variant="ghost" className="text-main text-xs sm:text-sm">
              <span>View Details</span>
              <ChevronRight className="size-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </CarouselItem>
  );
};

Job.Skeleton = function BoardCardSkeleton() {
  return (
    <CarouselItem className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
      <div className="p-1">
        <Card className="border-none rounded-md shadow-[0px_0px_10px_0px_#00000026]">
          <CardContent>
            {/* Top Section */}
            <div className="flex gap-4 justify-between items-center">
              <div>
                {/* Badge */}
                <div className="border flex gap-2 items-center rounded px-2 py-1 text-[10px] sm:text-xs">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-3 w-20" />
                </div>

                {/* Job Title */}
                <Skeleton className="h-5 w-32 mt-4" />

                {/* Job ID */}
                <Skeleton className="h-3 w-24 mt-1" />
              </div>

              {/* Job Logo */}
              <Skeleton className="h-[86px] w-[69px] rounded" />
            </div>

            {/* Tags Row */}
            <div className="flex gap-3 items-center mt-2">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>

            <Separator className="my-3" />

            {/* Details */}
            <div className="mt-5 flex gap-2 items-center">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="mt-1 flex gap-2 items-center">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3 w-28" />
            </div>
            <div className="mt-1 flex gap-2 items-center">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3 w-28" />
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex justify-between items-center mt-9">
            <Skeleton className="h-9 md:h-10 w-24 rounded" />
            <Skeleton className="h-9 md:h-10 w-28 rounded" />
          </CardFooter>
        </Card>
      </div>
    </CarouselItem>
  );
};
