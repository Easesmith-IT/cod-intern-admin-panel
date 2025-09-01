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
import { Plus, Trash2 } from "lucide-react";

export const StepForm = ({ name, stepNumber }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.arr`, // list items
  });

  return (
    <div className="space-y-4">
      {/* <h3 className="font-semibold">Step {stepNumber}</h3> */}

      {/* Title */}
      <FormField
        control={control}
        name={`${name}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Step Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter step title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Items */}
      <div>
        <FormLabel>Step Items</FormLabel>
        <div className="space-y-3 mt-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <FormField
                control={control}
                name={`${name}.arr.${index}`}
                render={({ field }) => (
                  <Input placeholder="Enter item" {...field} />
                )}
              />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="mt-3"
          onClick={() => append("")}
        >
          <Plus className="size-4 mr-1" /> Add Item
        </Button>
      </div>
    </div>
  );
};
