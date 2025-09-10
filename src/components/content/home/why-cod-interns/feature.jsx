"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

export const Feature = ({ index, control, remove }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="sm:basis-1/2 shrink-0 p-1">
      <Card className="rounded-sm border relative">
        <CardContent className="p-4">
          {isEditing ? (
            <div className="space-y-3">
              <FormField
                control={control}
                name={`features.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Feature title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`features.${index}.desc`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Feature description"
                        className="resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button
                size="sm"
                className="w-full"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Continue
              </Button> */}
            </div>
          ) : (
            <>
              <h4 className="font-medium text-lg">
                {/* This will display the value bound to RHF */}
                <FormField
                  control={control}
                  name={`features.${index}.title`}
                  render={({ field }) => <span>{field.value}</span>}
                />
              </h4>
              <p className="mt-3 text-sm text-muted-foreground">
                <FormField
                  control={control}
                  name={`features.${index}.desc`}
                  render={({ field }) => <span>{field.value}</span>}
                />
              </p>
            </>
          )}
        </CardContent>

        {/* action buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? (
              <X className="h-4 w-4" />
            ) : (
              <Pencil className="h-4 w-4" />
            )}
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
