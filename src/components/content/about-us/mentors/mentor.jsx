import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export const Mentor = ({ img, name, position, about, experience }) => {
  return (
    <Card className="border-border-1 rounded-md py-2">
      <CardContent className="p-4">
        <Image
          src={img}
          width={458}
          height={396}
          className="object-cover max-w-[458px] w-full max-h-[396px]"
          alt="mentor"
        />

        <div className="flex flex-col justify-between h-52 mt-5">
          <div>
            <h3 className="font-stolzl font-medium md:text-2xl leading-11">
              {name}
            </h3>
            <p className="font-stolzl font-medium text-sm sm:text-base">
              {position}
            </p>
            <p className="font-stolzl font-medium text-xs sm:text-sm mt-3">
              {experience}
            </p>
          </div>
          <p className="font-stolzl text-xs md:text-sm font-book mt-2">
            {about}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
