"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Plus, X, Link as LinkIcon, Award, Trophy } from "lucide-react";
import { TypographyH2 } from "../typography/typography-h2";
import Spinner from "../shared/Spinner";
import { PUT } from "@/constants/apiMethods";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InstructorUpdateSchema } from "@/schemas/InstructorUpdateSchema";

export const InstructorUpdateClient = ({ instructorId }) => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);

  // Initialize React Hook Form
  const form = useForm({
    resolver: zodResolver(InstructorUpdateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
      expertise: [],
      socialLinks: {
        linkedin: "",
        twitter: "",
        github: "",
        website: "",
      },
      certifications: [],
      achievements: [],
      isActive: true,
    },
  });

  // Field arrays for dynamic sections
  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  const { fields: achievementFields, append: appendAchievement, remove: removeAchievement } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  const { fields: expertiseFields, append: appendExpertise, remove: removeExpertise } = useFieldArray({
    control: form.control,
    name: "expertise",
  });

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/instructors/${instructorId}`,
    queryKeys: ["instructor", instructorId],
  });

  const {
    mutateAsync: updateInstructor,
    isPending: isUpdating,
  } = useApiMutation({
    url: `/admin/instructors/${instructorId}`,
    method: PUT,
    invalidateKey: ["instructor", instructorId],
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });

  const instructor = data?.instructor;

  // Reset form when instructor data loads
  useEffect(() => {
    if (instructor) {
      form.reset({
        firstName: instructor.firstName || "",
        lastName: instructor.lastName || "",
        email: instructor.email || "",
        phone: instructor.phone || "",
        bio: instructor.bio || "",
        expertise: instructor.expertise || [],
        socialLinks: {
          linkedin: instructor.socialLinks?.linkedin || "",
          twitter: instructor.socialLinks?.twitter || "",
          github: instructor.socialLinks?.github || "",
          website: instructor.socialLinks?.website || "",
        },
        certifications: instructor.certifications || [],
        achievements: instructor.achievements || [],
        isActive: instructor.isActive ?? true,
      });
    }
  }, [instructor, form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const onSubmit = async (formData) => {
    try {
      const submitData = new FormData();
      
      // Add form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'socialLinks' || key === 'certifications' || key === 'achievements' || key === 'expertise') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== undefined && formData[key] !== "") {
          submitData.append(key, formData[key]);
        }
      });
      
      // Add image file if selected
      if (imageFile) {
        submitData.append('profileImage', imageFile);
      }

      await updateInstructor(submitData);
      router.push(`/admin/instructors/${instructorId}`);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleBack = () => {
    router.push(`/admin/instructors/${instructorId}`);
  };

  const addExpertise = () => {
    const newExpertise = form.watch('newExpertise');
    if (newExpertise && newExpertise.trim()) {
      const currentExpertise = form.getValues('expertise') || [];
      form.setValue('expertise', [...currentExpertise, newExpertise.trim()]);
      form.setValue('newExpertise', '');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !instructor) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.push("/admin/instructors")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Instructors
        </Button>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Instructor not found or error loading data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Button>
          <div>
            <TypographyH2 heading={`Edit Instructor - ${instructor.firstName} ${instructor.lastName}`} />
            <p className="text-muted-foreground">Update instructor information</p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-sm text-muted-foreground">
                Instructor's personal and contact details
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter instructor bio"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Profile Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p className="text-sm text-muted-foreground">
                  Leave empty to keep current image. Max size: 5MB
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Expertise */}
          <Card>
            <CardHeader>
              <CardTitle>Expertise</CardTitle>
              <p className="text-sm text-muted-foreground">
                Instructor's areas of expertise
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add expertise area"
                  {...form.register('newExpertise')}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addExpertise();
                    }
                  }}
                />
                <Button type="button" onClick={addExpertise}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {form.watch('expertise')?.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        const currentExpertise = form.getValues('expertise');
                        form.setValue('expertise', currentExpertise.filter((_, i) => i !== index));
                      }}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LinkIcon className="h-5 w-5" />
                <span>Social Links</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Instructor's social media and professional profiles
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="socialLinks.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialLinks.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://twitter.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialLinks.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialLinks.website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Certifications</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendCertification({ title: "", provider: "", year: "", certificateLink: "" })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {certificationFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Certification #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Certification title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.provider`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provider</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Certification provider"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.year`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="2024"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : "")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.certificateLink`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certificate Link</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/certificate"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Achievements</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendAchievement({ title: "", description: "", date: "" })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievementFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Achievement #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`achievements.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Achievement title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`achievements.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                              onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : "")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`achievements.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Achievement description"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Instructor account configuration
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Active Status
                      </FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Set instructor as active and available for teaching
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Read-only fields for reference */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Instructor ID (Read-only)</Label>
                  <Input value={instructor._id || "N/A"} disabled />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Average Rating (Read-only)</Label>
                  <Input value={`${instructor.ratings?.average || 0} (${instructor.ratings?.count || 0} reviews)`} disabled />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Total Courses (Read-only)</Label>
                  <Input value={instructor.courses?.length || 0} disabled />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Created At (Read-only)</Label>
                  <Input value={new Date(instructor.createdAt).toLocaleDateString()} disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating || !form.formState.isValid}>
              {isUpdating ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Instructor
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
