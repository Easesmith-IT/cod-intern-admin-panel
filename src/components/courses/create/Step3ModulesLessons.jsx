"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  Clipboard,
  Clock,
  Eye,
} from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";

// Validation schema matching backend
const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  contentType: z.enum(["video", "article", "quiz", "assignment"]),
  contentUrl: z.string().url().optional().or(z.literal("")),
  duration: z.number().min(1).optional(),
  isPreviewFree: z.boolean().default(false),
});

const moduleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  description: z.string().min(1, "Module description is required"),
  lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
});

const step3Schema = z.object({
  modules: z.array(moduleSchema).min(1, "At least one module is required"),
});

const Step3ModulesLessons = ({ data, updateData, onNext, onPrevious }) => {
  const [openModules, setOpenModules] = useState({});

  const form = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      modules:
        data.modules.length > 0
          ? data.modules
          : [
              {
                title: "",
                description: "",
                lessons: [
                  {
                    title: "",
                    contentType: "video",
                    contentUrl: "",
                    duration: 0,
                    isPreviewFree: false,
                  },
                ],
              },
            ],
    },
  });

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  const {
    mutateAsync: addModules,
    isPending,
    data: result,
  } = useApiMutation({
    url: `/admin/courses/${
      data.courseId || "68ac6333b7d88323aa5aa749"
    }/modules`,
    method: POST,
  });

  const contentTypes = [
    {
      value: "video",
      label: "Video",
      icon: Video,
      color: "bg-blue-100 text-blue-700",
    },
    {
      value: "article",
      label: "Article",
      icon: FileText,
      color: "bg-green-100 text-green-700",
    },
    {
      value: "quiz",
      label: "Quiz",
      icon: HelpCircle,
      color: "bg-purple-100 text-purple-700",
    },
    {
      value: "assignment",
      label: "Assignment",
      icon: Clipboard,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const toggleModule = (index) => {
    setOpenModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "0 min";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? mins + "m" : ""}`;
    }
    return `${mins}m`;
  };

  const calculateModuleDuration = (moduleIndex) => {
    // const module = form.watch(moduleIndex.toString());
    const module = form.watch(`modules.${moduleIndex}`);
    if (!module?.lessons) return 0;
    return module.lessons.reduce(
      (total, lesson) => total + (lesson.duration || 0),
      0
    );
  };

  const calculateTotalDuration = () => {
    const modules = form.watch("modules");
    console.log("modules", modules);

    return modules?.reduce((total, module) => {
      if (!module?.lessons) return total;
      return (
        total +
        module.lessons.reduce(
          (lessonTotal, lesson) => lessonTotal + (lesson.duration || 0),
          0
        )
      );
    }, 0);
  };

  const onSubmit = async (formData) => {
    await addModules(formData);

    // Update local data state
    updateData("modules", formData);
  };

  useEffect(() => {
    if (result) {
      console.log("result", result);
      onNext();
    }
  }, [result]);

  // Initialize first module as open
  useEffect(() => {
    setOpenModules({ 0: true });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Course Structure Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Course Structure</span>
              <div className="text-sm text-muted-foreground">
                Total Duration: {formatDuration(calculateTotalDuration())}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <div>Modules: {moduleFields.length}</div>
              <div>
                Total Lessons:{" "}
                {moduleFields.reduce((total, _, index) => {
                  const module = form.watch(index.toString());
                  return total + (module?.lessons?.length || 0);
                }, 0)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules */}
        <div className="space-y-4">
          {moduleFields.map((moduleField, moduleIndex) => {
            const isOpen = openModules[moduleIndex];
            const moduleDuration = calculateModuleDuration(moduleIndex);

            return (
              <ModuleCard
                key={moduleField.id}
                moduleIndex={moduleIndex}
                isOpen={isOpen}
                moduleDuration={moduleDuration}
                form={form}
                contentTypes={contentTypes}
                formatDuration={formatDuration}
                toggleModule={() => toggleModule(moduleIndex)}
                onRemove={
                  moduleFields.length > 1
                    ? () => removeModule(moduleIndex)
                    : null
                }
              />
            );
          })}
        </div>

        {/* Add Module Button */}
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            appendModule({
              title: "",
              description: "",
              lessons: [
                {
                  title: "",
                  contentType: "video",
                  contentUrl: "",
                  duration: 0,
                  isPreviewFree: false,
                },
              ],
            });
            // Auto-open the new module
            setOpenModules((prev) => ({
              ...prev,
              [moduleFields.length]: true,
            }));
          }}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Module
        </Button>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button type="submit" disabled={isPending} variant="codIntern">
            {isPending ? "Saving Modules..." : "Save Modules & Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Module Card Component
const ModuleCard = ({
  moduleIndex,
  isOpen,
  moduleDuration,
  form,
  contentTypes,
  formatDuration,
  toggleModule,
  onRemove,
}) => {
  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control: form.control,
    name: `${moduleIndex}.lessons`,
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
                    {form.watch(`${moduleIndex}.title`) || "Untitled Module"}
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
                control={form.control}
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
                control={form.control}
                name={`modules.${moduleIndex}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of this module"
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
                    form={form}
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

// Lesson Card Component
const LessonCard = ({
  moduleIndex,
  lessonIndex,
  form,
  contentTypes,
  onRemove,
}) => {
  const contentType = form.watch(
    `${moduleIndex}.lessons.${lessonIndex}.contentType`
  );
  const isPreviewFree = form.watch(
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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

export default Step3ModulesLessons;
