"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { PATCH } from "@/constants/apiMethods";
import { commonTools, weekDays } from "@/constants/constants";
import { useApiMutation } from "@/hooks/useApiMutation";
import { step4Schema } from "@/schemas/CourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  FolderOpen,
  Image as ImageIcon,
  IndianRupee,
  Plus,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BatchCard } from "../batch-card";

const Step4ProjectsBatches = ({ data, updateData, onNext, onPrevious }) => {
  const [projectFiles, setProjectFiles] = useState({});
  console.log("data", data);

  const form = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      projects: data.extras?.projects || [
        { title: "", description: "", tools: [] },
      ],
      batches: data.extras?.batches || [
        {
          name: "",
          startDate: null,
          endDate: null,
          schedule: {
            days: [],
            time: { start: "", end: "" },
          },
          seatsLimit: 50,
          price: 0,
          offerPrice: 0,
          status: "upcoming",
          batchHighlights: [],
        },
      ],
    },
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const {
    fields: batchFields,
    append: appendBatch,
    remove: removeBatch,
  } = useFieldArray({
    control: form.control,
    name: "batches",
  });

  const {
    mutateAsync: updateExtras,
    isPending,
    data: result,
  } = useApiMutation({
    url: `/admin/courses/${data.courseId || "68ac6333b7d88323aa5aa749"}/extras`,
    method: PATCH,
    invalidateKey: "course",
  });

  const handleProjectFileChange = (projectIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      setProjectFiles((prev) => ({
        ...prev,
        [projectIndex]: file,
      }));
    }
  };

  const removeProjectFile = (projectIndex) => {
    setProjectFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[projectIndex];
      return newFiles;
    });
  };

  const formatTimeForInput = (timeString) => {
    if (!timeString) return "";
    // Convert "09:00 AM" to "09:00" format
    const [time, period] = timeString.split(" ");
    if (!period) return time;

    const [hours, minutes] = time.split(":");
    let hour24 = parseInt(hours);

    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    return `${hour24.toString().padStart(2, "0")}:${minutes}`;
  };

  const formatTimeForDisplay = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minutes} ${period}`;
  };

  const onSubmit = async (formData) => {
    // Create FormData for file uploads
    const submitData = new FormData();

    // Add projects data
    if (formData.projects && formData.projects.length > 0) {
      if (Array.isArray(projectFiles)) {
        submitData.append(
          "projects",
          JSON.stringify(
            formData.projects.map((project, index) => ({
              ...project,
              icon: projectFiles[index],
            }))
          )
        );
      } else {
        submitData.append("projects", JSON.stringify(formData.projects));
      }

      // Add project images
      if (!Array.isArray(projectFiles)) {
        Object.keys(projectFiles).forEach((projectIndex) => {
          const file = projectFiles[projectIndex];
          if (file) {
            submitData.append("projectImages", file);
          }
        });
      }
    }

    if (formData.batches && formData.batches.length > 0) {
      formData.batches.forEach((batch) => {
        console.log("batch", batch);
        if (batch.image[0] instanceof File) {
          submitData.append("batchImages", batch.image[0]);
        }
      });

      const batchesWithoutPreview = formData.batches.map((batch) => {
        const batchHighlights = batch.batchHighlights.map(
          (highlight) => highlight.text
        );
        const { imagePreview, image, ...rest } = batch;
        return { ...rest, batchHighlights };
      });
      submitData.append("batches", JSON.stringify(batchesWithoutPreview));

      // Add batch images separately
    }

    await updateExtras(submitData);

    // Update local data state
    updateData("extras", formData);
  };

  useEffect(() => {
    if (result) {
      console.log("result", result);
      onNext();
    }
  }, [result]);

  const onError = (error) => {
    console.log("error", error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Projects Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FolderOpen className="h-5 w-5" />
                  <span>Course Projects</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add hands-on projects students will work on during the course
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Project {index + 1}</h4>
                      {projectFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            removeProject(index);
                            removeProjectFile(index);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name={`projects.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., E-commerce Website"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`projects.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe what students will build in this project"
                                className="resize-none"
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <ProjectToolsField
                        form={form}
                        projectIndex={index}
                        commonTools={commonTools}
                      />

                      {/* Project Icon Upload */}
                      <div>
                        <FormLabel>Project Icon (Optional)</FormLabel>
                        <div className="mt-2">
                          {projectFiles[index] ? (
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded">
                                <ImageIcon className="h-4 w-4" />
                                <span className="text-sm">
                                  {projectFiles[index].name}
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeProjectFile(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleProjectFileChange(index, e)
                                }
                                className="hidden"
                                id={`project-icon-${index}`}
                              />
                              <label
                                htmlFor={`project-icon-${index}`}
                                className="cursor-pointer flex flex-col items-center space-y-1"
                              >
                                <Upload className="h-5 w-5 text-gray-400" />
                                <span className="text-xs text-gray-600">
                                  Upload project icon
                                </span>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendProject({ title: "", description: "", tools: [] })
                  }
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Batches Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Course Batches</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Schedule different batches with specific timings and pricing
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {batchFields.map((field, index) => (
                  <BatchCard
                    key={field.id}
                    batchIndex={index}
                    weekDays={weekDays}
                    formatTimeForInput={formatTimeForInput}
                    formatTimeForDisplay={formatTimeForDisplay}
                    onRemove={
                      batchFields.length > 1 ? () => removeBatch(index) : null
                    }
                  />
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendBatch({
                      name: "",
                      startDate: null,
                      endDate: null,
                      schedule: {
                        days: [],
                        time: { start: "", end: "" },
                      },
                      seatsLimit: 50,
                      price: 0,
                      offerPrice: 0,
                      status: "upcoming",
                      batchHighlights: [],
                    })
                  }
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Batch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button type="submit" disabled={isPending} variant="codIntern">
            {isPending ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Project Tools Field Component
const ProjectToolsField = ({ form, projectIndex, commonTools }) => {
  const [customTool, setCustomTool] = useState("");

  const tools = form.watch(`projects.${projectIndex}.tools`) || [];

  const addTool = (tool) => {
    const currentTools = form.getValues(`projects.${projectIndex}.tools`) || [];
    if (!currentTools.includes(tool)) {
      form.setValue(`projects.${projectIndex}.tools`, [...currentTools, tool]);
    }
  };

  const removeTool = (toolToRemove) => {
    const currentTools = form.getValues(`projects.${projectIndex}.tools`) || [];
    form.setValue(
      `projects.${projectIndex}.tools`,
      currentTools.filter((tool) => tool !== toolToRemove)
    );
  };

  const addCustomTool = () => {
    if (customTool.trim()) {
      addTool(customTool.trim());
      setCustomTool("");
    }
  };

  return (
    <div>
      <FormLabel>Technologies & Tools</FormLabel>

      {/* Selected Tools */}
      {tools.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 mb-3">
          {tools.map((tool, toolIndex) => (
            <Badge
              key={toolIndex}
              variant="secondary"
              className="flex items-center space-x-1"
            >
              <span>{tool}</span>
              <button
                type="button"
                onClick={() => removeTool(tool)}
                className="ml-1 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Common Tools */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-1">
          {commonTools.slice(0, 8).map((tool) => (
            <Button
              key={tool}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addTool(tool)}
              className="text-xs h-7"
              disabled={tools.includes(tool)}
            >
              {tool}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Tool Input */}
      <div className="flex space-x-2">
        <Input
          placeholder="Add custom tool..."
          value={customTool}
          onChange={(e) => setCustomTool(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustomTool();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={addCustomTool}
          disabled={!customTool.trim()}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

// Batch Card Component

export default Step4ProjectsBatches;
