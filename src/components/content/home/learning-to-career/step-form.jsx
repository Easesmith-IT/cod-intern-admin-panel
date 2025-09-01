"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";

export const StepForm = ({ name }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.points`,
  });

  return (
    <div className="space-y-4">
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

      {/* Subtitle */}
      <FormField
        control={control}
        name={`${name}.title1`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input placeholder="Optional subtitle" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={control}
        name={`${name}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Points */}
      <div>
        <FormLabel>Bullet Points</FormLabel>
        <div className="space-y-3 mt-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <FormField
                control={control}
                name={`${name}.points.${index}`}
                render={({ field }) => (
                  <Input placeholder="Enter point" {...field} />
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
          <Plus className="size-4 mr-1" /> Add Point
        </Button>
      </div>
    </div>
  );
};
