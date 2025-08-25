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
import { Plus, X, Upload, IndianRupee, Award, Star } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { PATCH } from "@/constants/apiMethods";

// Validation schema matching backend
const step2Schema = z.object({
  pricing: z.object({
    price: z.number().min(0),
    discountPrice: z.number().min(0).optional(),
    currency: z.string().default("INR"),
    isFree: z.boolean().default(false),
  }),
  certificate: z.object({
    title: z.string().min(1, "Certificate title is required"),
    provider: z.string().optional(),
    issueDate: z.string().optional(),
    expiryDate: z.string().optional(),
  }),
  courseHighlights: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        type: z.enum(["feature", "highlight", "certification", "update"]),
        value: z.string().optional(),
      })
    )
    .min(1, "At least one course highlight is required"),
  studentBenefits: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        type: z.enum(["feature", "highlight", "certification", "update"]),
        value: z.string().optional(),
      })
    )
    .min(1, "At least one student benefit is required"),
});

const Step2CourseDetails = ({ data, updateData, onNext, onPrevious }) => {
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState(null);

  console.log("data", data);

  const form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      pricing: {
        price: 0,
        discountPrice: 0,
        currency: "INR",
        isFree: false,
      },
      certificate: {
        title: "",
        provider: "CodIntern",
        issueDate: "",
        expiryDate: "",
      },
      courseHighlights: [{ label: "", type: "feature", value: "" }],
      studentBenefits: [{ label: "", type: "feature", value: "" }],
      ...data.courseDetails,
    },
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control: form.control,
    name: "courseHighlights",
  });

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control: form.control,
    name: "studentBenefits",
  });

  const {
    mutateAsync: updateCourseDetails,
    isPending,
    data: result,
  } = useApiMutation({
    url: `/admin/courses/${
      data.courseId || "68ac6333b7d88323aa5aa749"
    }/details`,
    method: PATCH,
  });

  const highlightTypes = [
    { value: "feature", label: "Feature", icon: Star },
    { value: "highlight", label: "Highlight", icon: Star },
    { value: "certification", label: "Certification", icon: Award },
    { value: "update", label: "Update", icon: Star },
  ];

  const handleCertificateChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCertificateFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificatePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCertificate = () => {
    setCertificateFile(null);
    setCertificatePreview(null);
  };

  const onSubmit = async (formData) => {
    // Create FormData for file upload
    const submitData = new FormData();

    // Convert form data to match backend expectations
    submitData.append("pricing", JSON.stringify(formData.pricing));
    submitData.append("certificate", JSON.stringify(formData.certificate));
    submitData.append(
      "courseHighlights",
      JSON.stringify(formData.courseHighlights)
    );
    submitData.append(
      "studentBenefits",
      JSON.stringify(formData.studentBenefits)
    );

    // Add certificate image if selected
    if (certificateFile) {
      submitData.append("image", certificateFile);
    }

    await updateCourseDetails(submitData);

    // Update local data state
    updateData("courseDetails", formData);
  };

  useEffect(() => {
    if (result) {
      console.log("result", result);
      onNext();
    }
  }, [result]);

  const watchedPrice = form.watch("pricing.price");
  const watchedDiscountPrice = form.watch("pricing.discountPrice");
  const watchedIsFree = form.watch("pricing.isFree");

  const savingsAmount =
    watchedPrice && watchedDiscountPrice
      ? watchedPrice - watchedDiscountPrice
      : 0;
  const savingsPercentage =
    watchedPrice > 0 ? Math.round((savingsAmount / watchedPrice) * 100) : 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Pricing Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <IndianRupee className="h-5 w-5" />
                  <span>Course Pricing</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="pricing.isFree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Free Course</FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Check if this course should be free for all students
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {!watchedIsFree && (
                  <>
                    <FormField
                      control={form.control}
                      name="pricing.price"
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
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pricing.discountPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discounted Price (Optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                type="number"
                                placeholder="19999"
                                className="pl-10"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value) || 0)
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {savingsAmount > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="text-sm text-green-800">
                          <div className="font-medium">Price Summary</div>
                          <div className="mt-1 space-y-1">
                            <div>
                              Regular Price: ₹{watchedPrice?.toLocaleString()}
                            </div>
                            <div>
                              Discounted Price: ₹
                              {watchedDiscountPrice?.toLocaleString()}
                            </div>
                            <div className="font-medium text-green-700">
                              Students Save: ₹{savingsAmount.toLocaleString()} (
                              {savingsPercentage}% off)
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Certificate Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Course Certificate</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="certificate.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Master Certification in Web Development"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="certificate.provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification Provider</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., CodIntern, NASSCOM"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="certificate.issueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Date (Optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certificate.expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date (Optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Certificate Template Upload */}
                <div>
                  <FormLabel>Certificate Template (Optional)</FormLabel>
                  <div className="mt-2">
                    {certificatePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={certificatePreview}
                          alt="Certificate preview"
                          className="w-48 h-32 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={removeCertificate}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCertificateChange}
                          className="hidden"
                          id="certificate-upload"
                        />
                        <label
                          htmlFor="certificate-upload"
                          className="cursor-pointer flex flex-col items-center space-y-2"
                        >
                          <Upload className="h-6 w-6 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Upload certificate template
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Course Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Course Highlights</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add key features and highlights of your course
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {highlightFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <FormField
                          control={form.control}
                          name={`courseHighlights.${index}.label`}
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormControl>
                                <Input
                                  placeholder="e.g., AI-Powered Learning"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`courseHighlights.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
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
                                  {highlightTypes.map((type) => (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`courseHighlights.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Additional value (optional)"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {highlightFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeHighlight(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendHighlight({ label: "", type: "feature", value: "" })
                  }
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Highlight
                </Button>
              </CardContent>
            </Card>

            {/* Student Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Student Benefits</CardTitle>
                <p className="text-sm text-muted-foreground">
                  What benefits will students get from this course?
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefitFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <FormField
                          control={form.control}
                          name={`studentBenefits.${index}.label`}
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormControl>
                                <Input
                                  placeholder="e.g., 100% Job Guarantee"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`studentBenefits.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
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
                                  {highlightTypes.map((type) => (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`studentBenefits.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Additional value (optional)"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {benefitFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeBenefit(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendBenefit({ label: "", type: "feature", value: "" })
                  }
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
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
            {isPending ? "Updating..." : "Save & Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Step2CourseDetails;
