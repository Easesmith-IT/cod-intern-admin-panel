"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { EditIcon, XIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Info = ({ title, name, icon, alt, width, height, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, watch } = useFormContext();

  const value = watch(name);

  return (
    <div className="flex gap-3">
      <div
        className="size-12 shrink-0 rounded-md flex justify-center items-center"
        style={{
          background: "linear-gradient(263.55deg, #F3F1F5 8.66%, #F3F4FF 100%)",
        }}
      >
        <Image src={icon} width={width} height={height} alt={alt} />
      </div>
      <div>
        <h4 className="font-stolzl text-sm sm:text-base text-para-3 font-normal flex gap-2">
          {title}
          {isEditing ? (
            <XIcon
              className="size-5 cursor-pointer"
              onClick={() => setIsEditing(false)}
            />
          ) : (
            <EditIcon
              className="size-5 cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          )}
        </h4>

        {isLoading ? (
          <Skeleton className="h-4 w-full mt-2" />
        ) : (
          <div>
            {isEditing ? (
              <Input
                {...register(name)}
                defaultValue={value}
                onBlur={() => setIsEditing(false)}
                autoFocus
                className="font-stolzl text-xs sm:text-sm"
              />
            ) : (
              <p
                className="bg-gradient-to-r font-stolzl font-normal text-xs sm:text-sm from-main to-para-3 bg-clip-text text-transparent cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {value || "Click to edit"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
