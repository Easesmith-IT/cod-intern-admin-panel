"use client";

import { Edit, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StepForm } from "./step-form";

export const StepCard = ({ step, index }) => {
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
        <StepForm name={`steps.${index}`} />
      ) : (
        <div>
          <div className="flex justify-center items-center mx-auto border-2 size-[68px] rounded-full font-stolzl font-medium text-xl border-main">
            {step.index}
          </div>
          <div>
            <h4 className="font-stolzl font-medium sm:text-lg text-center">
              {step.title}
            </h4>
            <h4 className="font-stolzl font-medium sm:text-lg text-center">
              {step.title1}
            </h4>
          </div>
          <p className="text-sm mt-2">{step.description}</p>

          {step.points?.length > 0 && (
            <ul className="list-disc ml-4 mt-3 text-sm space-y-1">
              {step.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
