import Image from "next/image";
import React from "react";

export const Benifit = ({ title, src }) => {
  return (
    <div className="bg-[#E6D1F84A] rounded-xl p-4 flex items-center gap-2">
      <Image src={src} width={22} height={22} alt="benifit" />
      <h5 className="font-stolzl font-normal text-xs sm:text-sm">{title}</h5>
    </div>
  );
};
