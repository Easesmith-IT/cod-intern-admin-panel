"use client";

import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { updatePreview } from "@/lib/updatePreview";

export const MentorForm = ({ name }) => {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.arr`, // proficiencies
  });

  const imageFile = watch(`${name}.image`); // actual file
  const imagePreview = watch(`${name}.imagePreview`); // preview url

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // store actual File object
      setValue(`${name}.image`, file);
      // update preview as base64 string
      updatePreview(e.target.files, `${name}.imagePreview`, setValue);
    }
  };

  return (
    <div className="space-y-4">
      {/* Image Upload */}
      <div className="space-y-2">
        <FormLabel>Mentor Image</FormLabel>
        {imagePreview && (
          <div className="w-full h-[350px] relative rounded-md overflow-hidden border">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md border hover:bg-gray-200">
            <Upload className="size-4" />
            <span className="text-sm">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {imagePreview && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                setValue(`${name}.image`, null);
                setValue(`${name}.imagePreview`, "");
              }}
            >
              Remove
            </Button>
          )}
        </div>
      </div>
      {/* Name */}
      <FormField
        control={control}
        name={`${name}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mentor Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Position */}
      <FormField
        control={control}
        name={`${name}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position</FormLabel>
            <FormControl>
              <Input placeholder="Enter position" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Experience */}
      <FormField
        control={control}
        name={`${name}.experience`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Experience</FormLabel>
            <FormControl>
              <Input placeholder="Enter experience" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* About */}
      <FormField
        control={control}
        name={`${name}.about`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>About</FormLabel>
            <FormControl>
              <Input placeholder="Enter about" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
