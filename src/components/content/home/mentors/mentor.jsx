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
  proficiency = [],
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
            width={400}
            height={300}
            className="object-cover w-full max-h-[350px] rounded"
            alt={name}
          />
          <div className="mt-5">
            <h3 className="font-stolzl font-medium md:text-xl">{name}</h3>
            <p className="font-stolzl font-medium text-sm">{position}</p>
            {proficiency.length > 0 && (
              <>
                <p className="font-stolzl text-sm mt-4">Proficient At:</p>
                <div className="flex gap-2 flex-wrap mt-2">
                  {proficiency.map((item, i) => (
                    <div
                      key={i}
                      className="bg-main rounded-md text-white py-1 px-2 text-xs font-stolzl"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
