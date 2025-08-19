import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const EditableTextarea = ({
  className,
  name = "desc",
  textareaClassName,
  pClassName,
  isSubmitBtn=true
}) => {
  const {
    control,
    watch,
    formState: { isSubmitted, submitCount },
  } = useFormContext();
  const [isDescEdit, setIsDescEdit] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      setIsDescEdit(false);
    }
  }, [submitCount]);

  return (
    <div className={cn("relative max-w-[520px]", className)}>
      <button
        type="button"
        onClick={() => setIsDescEdit((prev) => !prev)}
        className="size-7 absolute shadow -top-4 -right-4 p-1.5 rounded-full bg-white flex justify-center items-center"
      >
        {isDescEdit ? <X className="size-5" /> : <Pencil className="size-5" />}
      </button>
      {isDescEdit ? (
        <>
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormControl>
                  <Textarea
                    className={cn(
                      "h-52 !text-base resize-none",
                      textareaClassName
                    )}
                    placeholder="Enter Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSubmitBtn && <Button className="mt-4" variant="codIntern">
            Submit
          </Button>}
        </>
      ) : (
        <p
          className={cn(
            "mt-5 font-stolzl font-book text-xs sm:text-base text-para",
            pClassName
          )}
        >
          {watch("desc")}
        </p>
      )}
    </div>
  );
};
