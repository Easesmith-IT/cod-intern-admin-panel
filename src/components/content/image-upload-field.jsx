"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImagePlus, Pencil } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const ImageUploadField = ({ name, previewName }) => {
  const { control, watch, getValues, register } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div>
            <FormLabel className="cursor-pointer">
              {!watch(previewName) && (
                <div className="border-2 border-dashed border-[#C2CDD6] h-20 w-36 rounded-lg flex flex-col justify-center items-center">
                  <ImagePlus className="size-6 text-neutral-700" />
                </div>
              )}
              {watch(previewName) && (
                <div className="relative">
                  <div
                    type="button"
                    className="size-6 absolute shadow top-1 right-1 p-1.5 rounded-full bg-white flex justify-center items-center"
                  >
                    <Pencil className="size-4" />
                  </div>
                  <img
                    className="w-36 h-20 rounded-lg shadow"
                    src={getValues(previewName)}
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
