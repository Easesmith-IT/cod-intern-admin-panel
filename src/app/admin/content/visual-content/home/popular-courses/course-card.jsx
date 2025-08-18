import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CourseCard = ({name,src}) => {
  return (
    <Card className="rounded-sm py-0">
      <CardContent className="px-0">
        <Image
          src={src || "/course-img.jpg"}
          className="w-full"
          width={300}
          height={200}
          alt="course"
        />
        <div className="px-3 mt-3">
          <div className="flex gap-1 items-center">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  src="/star.svg"
                  className="w-4 h-4"
                  width={16}
                  height={16}
                  alt="star"
                />
              ))}
            </div>
            <p className="text-para-2 font-book font-stolzl text-xs">(4.5)</p>
          </div>
          <h3 className="font-stolzl text-heading font-medium text-base md:text-lg mt-2 line-clamp-2">
            {name}
          </h3>

          <div className="flex items-center gap-5 mt-4">
            <div className="flex gap-1.5 items-center">
              <Image src="/file.svg" width={10} height={10} alt="file" />
              <p className="text-para-2 font-normal font-stolzl text-xs">
                8 Weeks
              </p>
            </div>
            <div className="flex gap-1.5 items-center">
              <Image src="/course/user.svg" width={10} height={10} alt="file" />
              <p className="text-para-2 font-normal font-stolzl text-xs">
                Students 60+
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-main py-0 has-[>svg]:px-0 gap-1 mt-5 text-xs sm:text-sm"
            asChild
          >
            <Link href="/courses/123">
              <span>Know More</span>
              <ChevronRight className="size-5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
