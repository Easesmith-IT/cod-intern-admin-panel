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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  FolderOpen,
  Calendar,
  Clock,
  Users,
  IndianRupee,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { PATCH } from "@/constants/apiMethods";

// Validation schema matching backend
const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  tools: z.array(z.string()).optional(),
});

const batchSchema = z.object({
  name: z.string().min(1, "Batch name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  schedule: z.object({
    days: z.array(z.string()).min(1, "At least one day is required"),
    time: z.object({
      start: z.string().min(1, "Start time is required"),
      end: z.string().min(1, "End time is required"),
    }),
  }),
  seatsLimit: z.number().min(1, "Seats limit is required"),
  price: z.number().min(0, "Price is required"),
  offerPrice: z.number().min(0).optional(),
  status: z.enum(["upcoming", "ongoing", "completed"]).default("upcoming"),
  batchHighlights: z.array(z.string()).optional(),
});

const step4Schema = z.object({
  projects: z.array(projectSchema).optional(),
  batches: z.array(batchSchema).optional(),
});

const Step4ProjectsBatches = ({ data, updateData, onNext, onPrevious }) => {
  const [projectFiles, setProjectFiles] = useState({});

  const form = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      projects: data.extras?.projects || [
        { title: "", description: "", tools: [] }
      ],
      batches: data.extras?.batches || [
        {
          name: "",
          startDate: "",
          endDate: "",
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

  const { mutateAsync: updateExtras, isPending } = useApiMutation({
    url: `/courses/${data.courseId}/extras`,
    method: PATCH,
    isToast: true,
  });

  const weekDays = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const commonTools = [
    "React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML", "CSS",
    "Python", "Django", "Flask", "PostgreSQL", "MySQL", "Git", "Docker",
    "AWS", "Firebase", "Vue.js", "Angular", "TypeScript", "GraphQL"
  ];

  const handleProjectFileChange = (projectIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      setProjectFiles(prev => ({
        ...prev,
        [projectIndex]: file
      }));
    }
  };

  const removeProjectFile = (projectIndex) => {
    setProjectFiles(prev => {
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
    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      
      // Add projects data
      if (formData.projects && formData.projects.length > 0) {
        submitData.append("projects", JSON.stringify(formData.projects));
        
        // Add project images
        Object.keys(projectFiles).forEach((projectIndex) => {
          const file = projectFiles[projectIndex];
          if (file) {
            submitData.append("projectImages", file);
          }
        });
      }
      
      // Add batches data
      if (formData.batches && formData.batches.length > 0) {
        submitData.append("batches", JSON.stringify(formData.batches));
      }

      await updateExtras(submitData);
      
      // Update local data state
      updateData("extras", formData);
      
      // Proceed to next step
      onNext();
    } catch (error) {
      console.error("Error updating course extras:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    form={form}
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
                      startDate: "",
                      endDate: "",
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
      currentTools.filter(tool => tool !== toolToRemove)
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
            <Badge key={toolIndex} variant="secondary" className="flex items-center space-x-1">
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
const BatchCard = ({
  batchIndex,
  form,
  weekDays,
  formatTimeForInput,
  formatTimeForDisplay,
  onRemove,
}) => {
  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control: form.control,
    name: `batches.${batchIndex}.batchHighlights`,
  });

  const selectedDays = form.watch(`batches.${batchIndex}.schedule.days`) || [];
  const price = form.watch(`batches.${batchIndex}.price`) || 0;
  const offerPrice = form.watch(`batches.${batchIndex}.offerPrice`) || 0;
  
  const savings = price && offerPrice && offerPrice < price ? price - offerPrice : 0;
  const savingsPercentage = savings > 0 ? Math.round((savings / price) * 100) : 0;

  const toggleDay = (day) => {
    const currentDays = form.getValues(`batches.${batchIndex}.schedule.days`) || [];
    if (currentDays.includes(day)) {
      form.setValue(
        `batches.${batchIndex}.schedule.days`,
        currentDays.filter(d => d !== day)
      );
    } else {
      form.setValue(`batches.${batchIndex}.schedule.days`, [...currentDays, day]);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Batch {batchIndex + 1}</h4>
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
          name={`batches.${batchIndex}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Morning Batch - January 2024"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`batches.${batchIndex}.status`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`batches.${batchIndex}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`batches.${batchIndex}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date (Optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Schedule */}
      <div>
        <FormLabel>Class Schedule *</FormLabel>
        <div className="mt-2 space-y-3">
          {/* Days Selection */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Select class days:</p>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <Button
                  key={day}
                  type="button"
                  variant={selectedDays.includes(day) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDay(day)}
                  className="text-xs"
                >
                  {day.slice(0, 3)}
                </Button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name={`batches.${batchIndex}.schedule.time.start`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time *</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`batches.${batchIndex}.schedule.time.end`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time *</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Pricing & Seats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name={`batches.${batchIndex}.seatsLimit`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seats Limit *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="50"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  />
                  <Users className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`batches.${batchIndex}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regular Price *</FormLabel>
              <FormControl>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="29999"
                    className="pl-10"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`batches.${batchIndex}.offerPrice`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Offer Price</FormLabel>
              <FormControl>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="19999"
                    className="pl-10"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Savings Display */}
      {savings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
          <div className="text-sm text-green-800">
            Students Save: ₹{savings.toLocaleString()} ({savingsPercentage}% off)
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4ProjectsBatches;
