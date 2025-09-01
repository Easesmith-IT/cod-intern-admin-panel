import { cn } from "@/lib/utils";
import { Check, Edit, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { StepForm } from "./step-form";
import { useFormContext } from "react-hook-form";

export const Step = ({ title, className, arr, name, index = 0 }) => {
  const { formState } = useFormContext();
  const { isSubmitted, submitCount } = formState;

  
  const [isEdit, setIsEdit] = useState(false);
  
  useEffect(() => {
    if (isSubmitted) {
      setIsEdit(false);
    }
  }, [submitCount]);

  return (
    <div className="border rounded p-7 relative">
      <button
        type="button"
        onClick={() => setIsEdit((prev) => !prev)}
        className="absolute top-2 right-2"
      >
        {isEdit ? <X /> : <Edit className="size-5" />}
      </button>
      {isEdit ? (
        <StepForm name={`steps.${index}`} stepNumber={index + 1} />
      ) : (
        <div className="">
          <h4
            className={cn(
              "font-stolzl font-medium md:text-lg lg:text-xl",
              className
            )}
          >
            {title}
          </h4>
          <div className="flex flex-col gap-1 mt-5">
            {arr.map((item, i) => (
              <div className="flex items-center gap-2" key={i}>
                <div className="w-4 h-4 rounded-full flex justify-center items-center bg-[#F4F3F5]">
                  <Check className="size-2" />
                </div>
                <p className="text-xs lg:text-sm text-para font-stolzl">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
