"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { POST } from "@/constants/apiMethods";
import { contentTypes } from "@/constants/constants";
import { useApiMutation } from "@/hooks/useApiMutation";
import { step3Schema } from "@/schemas/CourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Clock,
  Eye,
  FileText,
  HelpCircle,
  Plus,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { LessonCard } from "../lesson-card";
import { ModuleCard } from "../module-card";

const Step3ModulesLessons = ({ data, updateData, onNext, onPrevious }) => {
  const [openModules, setOpenModules] = useState({});

  const form = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      modules: [
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

  const { reset } = form;

  useEffect(() => {
    if (data?.modules.length > 0) {
      reset({ modules: data.modules });
      // setCertificatePreview(
      //   data?.courseDetails?.certificate?.certificateLink || null
      // );
    }
  }, [data.modules]);

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
    updateData("modules", formData.modules);
    await addModules(formData);
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
                  // duration: 0,
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

export default Step3ModulesLessons;
