import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

export const Feature = ({ title, desc }) => {
  return (
    <CarouselItem className="sm:basis-1/2 md:basis-1/2">
      <div className="p-1">
        <Card className="rounded-sm border-border-1 h-[270px]">
          <CardContent className="">
            <div className="flex gap-4 items-center">
              <Image src="/feature-img.svg" width={93} height={82} alt="icon" />
              <h4 className="font-stolzl font-medium text-lg sm:text-xl">{title}</h4>
            </div>
            <p className="mt-5 font-stolzl font-book text-para text-xs sm:text-base">
              {desc}
            </p>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};
