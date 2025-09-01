import Image from "next/image";
import React from "react";

export const Info = ({ title }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="size-8 sm:size-10 bg-custom rounded-full flex justify-center items-center">
        <Image src="/about-us/check.svg" width={13} height={8} alt="Check" />
      </div>
      <span className="font-stolzl font-medium text-sm">{title}</span>
    </div>
  );
};
