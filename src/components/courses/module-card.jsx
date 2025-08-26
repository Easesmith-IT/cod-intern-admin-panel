import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { LessonCard } from "./lesson-card";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export const ModuleCard = ({
  moduleIndex,
  isOpen,
  moduleDuration,
  contentTypes,
  formatDuration,
  toggleModule,
  onRemove,
}) => {
  const { control, watch } = useFormContext();

  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control: control,
    name: `modules.${moduleIndex}.lessons`,
  });

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={toggleModule}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <CardTitle className="text-base">
                    Module {moduleIndex + 1}:{" "}
                    {watch(`modules.${moduleIndex}.title`) || "Untitled Module"}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{lessonFields.length} lessons</span>
                    <span>{formatDuration(moduleDuration)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {onRemove && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove();
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {/* Module Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`modules.${moduleIndex}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., HTML & CSS Fundamentals"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`modules.${moduleIndex}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of this module"
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Lessons */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Lessons</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    appendLesson({
                      title: "",
                      contentType: "video",
                      contentUrl: "",
                      duration: 0,
                      isPreviewFree: false,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Lesson
                </Button>
              </div>

              <div className="space-y-3">
                {lessonFields.map((lessonField, lessonIndex) => (
                  <LessonCard
                    key={lessonField.id}
                    moduleIndex={moduleIndex}
                    lessonIndex={lessonIndex}
                    contentTypes={contentTypes}
                    onRemove={
                      lessonFields.length > 1
                        ? () => removeLesson(lessonIndex)
                        : null
                    }
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
