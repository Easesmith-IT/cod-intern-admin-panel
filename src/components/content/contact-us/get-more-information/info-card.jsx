import Image from "next/image";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  useForm,
  useFieldArray,
  Controller,
  useFormContext,
} from "react-hook-form";
import { Plus, Trash, Upload } from "lucide-react";
import Spinner from "@/components/shared/Spinner";
import { updatePreview } from "@/lib/updatePreview";
import { Skeleton } from "@/components/ui/skeleton";

export const InfoCard = ({ index, field }) => {
  const { watch, control, setValue } = useFormContext();
  const imageFile = watch(`cards.${index}.icon`); // actual file
  const imagePreview = watch(`cards.${index}.iconPreview`); // preview url
  console.log("imagePreview", imagePreview);

  const handleFileChange = (e, i) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setValue(`cards.${i}.icon`, file);
      setValue(`cards.${i}.iconPreview`, url);
      // ⚡ here you’d also trigger API call to upload file and save path
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="flex flex-col items-center md:items-start gap-4 max-w-[380px]">
        <FormField
          control={control}
          name={`cards.${index}.icon`}
          render={({ field: f }) => (
            <FormItem className="w-full">
              {/* <FormLabel className="text-sm font-medium">Card Icon</FormLabel> */}
              <FormControl>
                <div className="flex flex-col gap-3">
                  {/* Preview */}
                  {imagePreview && (
                    <div className="size-32 md:size-36 rounded-full bg-gradient-to-r from-main to-para-3 p-[2px]">
                      <div className="rounded-full bg-white w-full h-full p-4 relative flex items-center justify-center">
                        <div className="size-8 md:*:size-10 absolute top-2 -right-1 text-sm md:text-base rounded-full bg-main text-white font-stolzl flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="bg-white size-full flex justify-center items-center rounded-full shadow-[0px_4px_15px_0px_#00000024]">
                          <Image
                            src={imagePreview}
                            width={44}
                            height={44}
                            alt={field.title}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Upload + Remove */}
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md border hover:bg-gray-200">
                      <Upload className="size-4" />
                      <span className="text-sm">Upload Icon</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, index)}
                      />
                    </label>

                    {f.value && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => f.onChange("")}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`cards.${index}.title`}
          render={({ field: f }) => (
            <FormItem>
              <FormLabel className="sr-only">Card Title</FormLabel>
              <FormControl>
                <Textarea
                  {...f}
                  rows={1}
                  className="text-center md:text-left font-stolzl text-base md:text-lg font-medium resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`cards.${index}.desc`}
          render={({ field: f }) => (
            <FormItem>
              <FormLabel className="sr-only">Card Description</FormLabel>
              <FormControl>
                <Textarea
                  {...f}
                  rows={4}
                  className="text-center md:text-left text-xs sm:text-sm lg:text-base font-stolzl font-book resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* <div className="flex flex-col gap-2 mt-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash size={16} /> Remove
                </Button>
              </div> */}
    </div>
  );
};

InfoCard.Skeleton = function InfoCardSkeleton() {
  return (
    <div className="max-w-[380px] flex flex-col items-center">
      {/* Icon wrapper */}
      <div className="size-32 md:size-36 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 p-[2px]">
        <div className="rounded-full bg-white w-full h-full p-4 relative flex items-center justify-center">
          {/* Index bubble */}
          {/* <Skeleton className="size-8 md:size-10 absolute top-2 -right-1 rounded-full" /> */}
          {/* Icon placeholder */}
          <Skeleton className="size-full rounded-full" />
        </div>
      </div>

      {/* Title placeholder */}
      <Skeleton className="h-5 w-32 rounded-md mt-5" />

      {/* Description placeholder */}
      <div className="flex flex-col items-center gap-2 mt-3">
        <Skeleton className="h-3 w-60 rounded-md" />
        <Skeleton className="h-3 w-52 rounded-md" />
        <Skeleton className="h-3 w-40 rounded-md" />
      </div>
    </div>
  );
}
