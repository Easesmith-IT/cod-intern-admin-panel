"use client";

import { Edit, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MentorForm } from "./mentor-form";

export const Mentor = ({
  img,
  name,
  position,
  experience,
  about,
  index = 0,
}) => {
  const { formState } = useFormContext();
  const { isSubmitted, submitCount } = formState;

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      setIsEdit(false);
    }
  }, [submitCount]);

  return (
    <div className="border rounded-md p-5 relative">
      <button
        type="button"
        onClick={() => setIsEdit((prev) => !prev)}
        className="absolute top-2 right-2"
      >
        {isEdit ? <X /> : <Edit className="size-5" />}
      </button>

      {isEdit ? (
        <MentorForm name={`mentors.${index}`} />
      ) : (
        <div>
          <Image
            src={img}
            width={458}
            height={396}
            className="aspect-square object-cover"
            alt={name}
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
        </div>
      )}
    </div>
  );
};
