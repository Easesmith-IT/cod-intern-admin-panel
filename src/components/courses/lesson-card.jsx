import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Clock,
    Eye,
    X
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

export const LessonCard = ({
  moduleIndex,
  lessonIndex,
  contentTypes,
  onRemove,
}) => {
  const { reset, getValues, control, handleSubmit, watch } = useFormContext();
  const contentType = watch(
    `${moduleIndex}.lessons.${lessonIndex}.contentType`
  );
  const isPreviewFree = watch(
    `${moduleIndex}.lessons.${lessonIndex}.isPreviewFree`
  );

  const selectedContentType = contentTypes.find(
    (type) => type.value === contentType
  );

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`p-1 rounded ${
              selectedContentType?.color || "bg-gray-100"
            }`}
          >
            {selectedContentType?.icon && (
              <selectedContentType.icon className="h-4 w-4" />
            )}
          </div>
          <span className="text-sm font-medium">Lesson {lessonIndex + 1}</span>
          {isPreviewFree && (
            <Badge variant="secondary" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              Free Preview
            </Badge>
          )}
        </div>
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={control}
          name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Title *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Introduction to HTML" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`modules.${moduleIndex}.lessons.${lessonIndex}.contentType`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormField
          control={control}
          name={`modules.${moduleIndex}.lessons.${lessonIndex}.contentUrl`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`modules.${moduleIndex}.lessons.${lessonIndex}.duration`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (minutes)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="30"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                  />
                  <Clock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`modules.${moduleIndex}.lessons.${lessonIndex}.isPreviewFree`}
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <div className="flex items-center space-x-2 pb-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm">Free Preview</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
