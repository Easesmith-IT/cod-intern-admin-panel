"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ImagePlus, Pencil } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const ImageUploadField = ({
  name,
  previewName,
  placeholderClassName,
  imgClassName,
}) => {
  const { control, watch, getValues, register } = useFormContext();
  const preview = watch(previewName);

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div>
            <FormLabel className="cursor-pointer">
              {!preview && (
                <div
                  className={cn(
                    "border-2 border-dashed border-[#C2CDD6] h-20 w-36 rounded-lg flex flex-col justify-center items-center",
                    placeholderClassName
                  )}
                >
                  <ImagePlus className="size-6 text-neutral-700" />
                </div>
              )}
              {preview && (
                <div className="relative">
                  <div
                    type="button"
                    className="size-7 absolute shadow top-1 right-1 p-1.5 rounded-full bg-white flex justify-center items-center"
                  >
                    <Pencil className="size-5" />
                  </div>
                  <img
                    className={cn("w-36 h-20 rounded-lg shadow", imgClassName)}
                    src={preview}
                    alt={`${name} preview`}
                  />
                </div>
              )}
            </FormLabel>
            <FormControl>
              <Input type="file" className="hidden" {...register(name)} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
