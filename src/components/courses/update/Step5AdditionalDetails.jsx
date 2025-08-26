"use client";

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
import { PUT } from "@/constants/apiMethods";
import {
  commonFeatures,
  durationOptions,
  platformOptions,
  timingOptions,
} from "@/constants/constants";
import { useApiMutation } from "@/hooks/useApiMutation";
import { step5Schema } from "@/schemas/CourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock,
  FileText,
  Globe,
  Link as LinkIcon,
  Plus,
  Star,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const Step5AdditionalDetails = ({ data, updateData, onNext, onPrevious }) => {
  const [brochureFile, setBrochureFile] = useState(null);
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [featureIcons, setFeatureIcons] = useState({});

  const params = useParams();

  const form = useForm({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      courseDuration: "",
      classTiming: "",
      totalSeats: 100,
      interviews: 0,
      integratedInternship: {
        hasInternship: false,
        count: 0,
      },
      features: [{ title: "", subtitle: "" }],
      venue: "online",
      onlinePlatform: "Zoom",
      meetingLink: "",
      brochureFile: "",
      syllabusFile: "",
    },
  });

  const { setValue, getValues, watch, register, formState, reset } = form;
  const { errors } = formState || {};

  console.log("getValues", getValues());

  useEffect(() => {
    if (data?.additionalDetails) {
      const {
        courseDuration,
        classTiming,
        totalSeats,
        brochure,
        syllabusFile,
        interviews,
        integratedInternship,
        features = [],
        venue,
        onlinePlatform,
        meetingLink,
      } = data.additionalDetails;

      reset({
        courseDuration,
        classTiming,
        totalSeats,
        // brochure,
        // syllabusFile,
        interviews,
        integratedInternship,
        features,
        venue,
        onlinePlatform,
        meetingLink,
      });
      setFeatureIcons(features.map((feature) => feature.icon));
      setBrochureFile(brochure);
      setSyllabusFile(syllabusFile);
    }
  }, [data?.additionalDetails]);

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const {
    mutateAsync: updateAdditionalDetails,
    isPending,
    data: result,
  } = useApiMutation({
    url: `/admin/courses/${
      params.courseId
    }/update-additional`,
    method: PUT,
    isToast: true,
  });

  const handleFileChange = (fileType, event) => {
    const file = event.target.files[0];
    if (file) {
      if (fileType === "brochure") {
        setValue("brochureFile", file);
        setBrochureFile(file);
      } else if (fileType === "syllabus") {
        setValue("syllabusFile", file);
        setSyllabusFile(file);
      }
    }
  };

  const handleFeatureIconChange = (featureIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      setFeatureIcons((prev) => ({
        ...prev,
        [featureIndex]: file,
      }));
    }
  };

  const removeFile = (fileType) => {
    if (fileType === "brochure") {
      setBrochureFile(null);
      setValue("brochureFile", null);
    } else if (fileType === "syllabus") {
      setSyllabusFile(null);
      setValue("syllabusFile", null);
    }
  };

  const removeFeatureIcon = (featureIndex) => {
    setFeatureIcons((prev) => {
      const newIcons = { ...prev };
      delete newIcons[featureIndex];
      return newIcons;
    });
  };

  const addCommonFeature = (feature) => {
    appendFeature(feature);
  };

  const onSubmit = async (formData) => {
    // Create FormData for file uploads
    const submitData = new FormData();
    const featureIconFiles = Object.values(featureIcons);

    // Add form fields
    Object.keys(formData).forEach((key) => {
      if (key === "features") {
        // submitData.append("features", JSON.stringify(formData.features));
        if (Array.isArray(featureIconFiles)) {
          submitData.append(
            "features",
            JSON.stringify(
              formData.features.map((feature, index) => ({
                ...feature,
                icon: featureIconFiles[index],
              }))
            )
          );
        } else {
          submitData.append("features", JSON.stringify(formData.features));
        }
      } else if (key === "integratedInternship") {
        submitData.append(
          "integratedInternship",
          JSON.stringify(formData.integratedInternship)
        );
      } else if (
        formData[key] !== "" &&
        formData[key] !== null &&
        formData[key] !== undefined
      ) {
        submitData.append(key, formData[key]);
      }
    });

    console.log("typeof brochureFile", typeof brochureFile);
    console.log("typeof syllabusFile", typeof syllabusFile);

    // Add files
    if (brochureFile && typeof brochureFile === "object") {
      submitData.append("brochure", brochureFile);
    }
    if (syllabusFile && typeof syllabusFile === "object") {
      submitData.append("syllabusFile", syllabusFile);
    }

    // Add feature icons

    featureIconFiles.forEach((file) => {
      submitData.append("featureIcons", file);
    });

    await updateAdditionalDetails(submitData);

    // Update local data state
    updateData("additionalDetails", formData);
  };

  useEffect(() => {
    if (result) {
      console.log("result", result);
      onNext();
    }
  }, [result]);

  const watchedHasInternship = form.watch("integratedInternship.hasInternship");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Course Duration & Timing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Course Duration & Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="courseDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Duration *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        key={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {durationOptions.map((duration) => (
                            <SelectItem key={duration} value={duration}>
                              {duration}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">
                            Custom Duration
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("courseDuration") === "custom" && (
                  <FormField
                    control={form.control}
                    name="courseDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Duration</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 5 months, 18 weeks"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="classTiming"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Timing *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        key={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timing" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timingOptions.map((timing) => (
                            <SelectItem key={timing} value={timing}>
                              {timing}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">Custom Timing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("classTiming") === "custom" && (
                  <FormField
                    control={form.control}
                    name="classTiming"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Timing</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Mon-Wed-Fri 8-10 PM"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="totalSeats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Seats *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="100"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value) || 0)
                            }
                          />
                          <Users className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Career Support */}
            <Card>
              <CardHeader>
                <CardTitle>Career Support & Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="interviews"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Interviews (Optional)</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          if (value === "unlimited") {
                            field.onChange("unlimited");
                          } else {
                            field.onChange(Number(value));
                          }
                        }}
                        value={field.value?.toString() || "0"}
                        key={field.value?.toString() || "0"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interview guarantee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">No guarantee</SelectItem>
                          <SelectItem value="3">3 interviews</SelectItem>
                          <SelectItem value="5">5 interviews</SelectItem>
                          <SelectItem value="10">10 interviews</SelectItem>
                          <SelectItem value="unlimited">
                            Unlimited interviews
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="integratedInternship.hasInternship"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div>
                          <FormLabel>Integrated Internship</FormLabel>
                          <p className="text-xs text-muted-foreground">
                            Include internship opportunities with the course
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  {watchedHasInternship && (
                    <FormField
                      control={form.control}
                      name="integratedInternship.count"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Internships</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              if (value === "unlimited") {
                                field.onChange("unlimited");
                              } else {
                                field.onChange(Number(value));
                              }
                            }}
                            defaultValue={field.value?.toString() || "1"}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select count" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 internship</SelectItem>
                              <SelectItem value="2">2 internships</SelectItem>
                              <SelectItem value="3">3 internships</SelectItem>
                              <SelectItem value="unlimited">
                                Unlimited internships
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Materials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Course Materials</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <FormLabel>Course Brochure *</FormLabel>
                  <div className="mt-2">
                    {brochureFile ? (
                      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded">
                        <FileText className="h-4 w-4 shrink-0" />
                        <p className="text-sm line-clamp-1">
                          {brochureFile.name || brochureFile}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile("brochure")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange("brochure", e)}
                            className="hidden"
                            id="brochure-upload"
                          />
                          <label
                            htmlFor="brochure-upload"
                            className="cursor-pointer flex flex-col items-center space-y-2"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Upload course brochure (PDF)
                            </span>
                          </label>
                        </div>
                        {errors?.brochureFile?.message && (
                          <p className="text-sm text-destructive mt-2">
                            {errors?.brochureFile?.message}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <FormLabel>Detailed Syllabus *</FormLabel>
                  <div className="mt-2">
                    {syllabusFile ? (
                      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded">
                        <FileText className="h-4 w-4 shrink-0" />
                        <p className="text-sm line-clamp-1">
                          {syllabusFile.name || syllabusFile}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile("syllabus")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange("syllabus", e)}
                            className="hidden"
                            id="syllabus-upload"
                          />
                          <label
                            htmlFor="syllabus-upload"
                            className="cursor-pointer flex flex-col items-center space-y-2"
                          >
                            <Upload className="h-6 w-6 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Upload detailed syllabus (PDF)
                            </span>
                          </label>
                        </div>
                        {errors?.syllabusFile?.message && (
                          <p className="text-sm text-destructive mt-2">
                            {errors?.syllabusFile?.message}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Course Features</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Highlight the key features and benefits of your course
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Add Common Features */}
                <div>
                  <FormLabel>Quick Add Features</FormLabel>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {commonFeatures.map((feature, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addCommonFeature(feature)}
                        className="text-xs justify-start h-auto p-2"
                      >
                        <div className="text-left">
                          <div className="font-medium">{feature.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {feature.subtitle}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Features */}
                <div className="space-y-3">
                  {featureFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Feature {index + 1}</h4>
                        {featureFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              removeFeature(index);
                              removeFeatureIcon(index);
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
                          name={`features.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Feature Title *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Pan India Placements"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`features.${index}.subtitle`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subtitle (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 100+ hiring partners"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Feature Icon Upload */}
                        <div>
                          <FormLabel>Feature Icon (Optional)</FormLabel>
                          <div className="mt-2">
                            {featureIcons[index] ? (
                              <div className="inline-flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded">
                                {featureIcons[index]?.name ? (
                                  <>
                                    <Star className="h-4 w-4" />
                                    <span className="text-sm">
                                      {featureIcons[index].name}
                                    </span>
                                  </>
                                ) : (
                                  <img
                                    src={featureIcons[index]}
                                    alt="Feature"
                                    className="w-48 h-32 object-cover rounded-lg border"
                                  />
                                )}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFeatureIcon(index)}
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
                                    handleFeatureIconChange(index, e)
                                  }
                                  className="hidden"
                                  id={`feature-icon-${index}`}
                                />
                                <label
                                  htmlFor={`feature-icon-${index}`}
                                  className="cursor-pointer flex flex-col items-center space-y-1"
                                >
                                  <Upload className="h-4 w-4 text-gray-400" />
                                  <span className="text-xs text-gray-600">
                                    Upload icon
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
                    onClick={() => appendFeature({ title: "", subtitle: "" })}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Feature
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Venue & Platform */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Venue & Platform</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Venue</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="onlinePlatform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Online Platform</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {platformOptions.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="meetingLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Link (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="https://zoom.us/j/123456789"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

export default Step5AdditionalDetails;
