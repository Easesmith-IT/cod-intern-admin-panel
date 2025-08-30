"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  Trophy,
  User,
  Star,
  ExternalLink,
  Linkedin,
  Twitter,
  Github,
  Globe,
} from "lucide-react";
import { TypographyH2 } from "../typography/typography-h2";
import { format } from "date-fns";
import Spinner from "../shared/Spinner";
import { PATCH } from "@/constants/apiMethods";
import { Switch } from "@/components/ui/switch";
import { InstructorDetailsSkeleton } from "./instructor-details-skeleton";
import { ChangePassword } from "./ChangePassword";

export const InstructorDetailClient = ({ instructorId }) => {
  const router = useRouter();
  const [isChangePassword, setIsChangePassword] = useState(false);

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/instructors/${instructorId}`,
    queryKeys: ["instructor", instructorId],
  });

  const { mutateAsync: toggleStatus, isPending: isUpdatingStatus } =
    useApiMutation({
      url: `/admin/instructors/${instructorId}/toggle-status`,
      method: PATCH,
      invalidateKey: ["instructor", instructorId],
    });

  const instructor = data?.instructor;

  console.log("instructor", instructor);

  const handleStatusToggle = async () => {
    await toggleStatus();
  };

  const handleBack = () => {
    router.push("/admin/instructors");
  };

  const handleEdit = () => {
    router.push(`/admin/instructors/${instructorId}/update`);
  };
  const handleChangePassword = () => {
    setIsChangePassword(true)
  };

  if (isLoading) {
    return (
        <InstructorDetailsSkeleton />
    );
  }

  if (error || !instructor) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Instructors
        </Button>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Instructor not found or error loading data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={handleBack}
            className="flex justify-start items-center"
          >
            <ArrowLeft />
            <TypographyH2 heading="Instructor Details" />
          </button>
          <p className="text-muted-foreground">
            View and manage instructor information
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="codIntern" onClick={handleChangePassword}>
            Change Password
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Instructor
          </Button>
        </div>
      </div>

      {/* Instructor Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={instructor.profileImage || "/user-placeholder.png"}
                  className="object-cover"
                  alt={`${instructor.firstName} ${instructor.lastName}`}
                />
                <AvatarFallback className="text-lg">
                  {instructor.firstName?.charAt(0)}
                  {instructor.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {instructor.firstName} {instructor.lastName}
                </h3>
                <p className="text-muted-foreground">{instructor.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge
                    variant={instructor.isActive ? "success" : "secondary"}
                    className="capitalize"
                  >
                    {instructor.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">
                      {instructor.ratings?.average || 0}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({instructor.ratings?.count || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Switch
                  checked={instructor.isActive}
                  onCheckedChange={handleStatusToggle}
                  disabled={isUpdatingStatus}
                />
              </div>
              {isUpdatingStatus && <Spinner className="h-4 w-4 mx-auto" />}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="expertise">Expertise</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    First Name
                  </label>
                  <p className="text-sm">{instructor.firstName}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Name
                  </label>
                  <p className="text-sm">{instructor.lastName}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <p className="text-sm">{instructor.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone
                  </label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <p className="text-sm">
                      {instructor.phone || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Joined
                  </label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <p className="text-sm">
                      {format(new Date(instructor.createdAt), "PPP")}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <p className="text-sm">
                      {format(new Date(instructor.updatedAt), "PPP")}
                    </p>
                  </div>
                </div>
              </div>

              {instructor.bio && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Bio
                    </label>
                    <p className="text-sm">{instructor.bio}</p>
                  </div>
                </>
              )}

              {/* Social Links */}
              {instructor.socialLinks &&
                Object.values(instructor.socialLinks).some((link) => link) && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-muted-foreground">
                        Social Links
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {instructor.socialLinks.linkedin && (
                          <a
                            href={instructor.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span className="text-sm">LinkedIn</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {instructor.socialLinks.twitter && (
                          <a
                            href={instructor.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-400 hover:text-blue-600"
                          >
                            <Twitter className="h-4 w-4" />
                            <span className="text-sm">Twitter</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {instructor.socialLinks.github && (
                          <a
                            href={instructor.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                          >
                            <Github className="h-4 w-4" />
                            <span className="text-sm">GitHub</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {instructor.socialLinks.website && (
                          <a
                            href={instructor.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                          >
                            <Globe className="h-4 w-4" />
                            <span className="text-sm">Website</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expertise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Areas of Expertise</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {instructor.expertise && instructor.expertise.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {instructor.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No expertise areas specified.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>
                  Certifications ({instructor.certifications?.length || 0})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {instructor.certifications &&
              instructor.certifications.length > 0 ? (
                <div className="space-y-4">
                  {instructor.certifications.map((cert, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">{cert.title}</h4>
                        {cert.provider && (
                          <p className="text-sm text-muted-foreground">
                            Provider: {cert.provider}
                          </p>
                        )}
                        {cert.year && (
                          <p className="text-sm text-muted-foreground">
                            Year: {cert.year}
                          </p>
                        )}
                        {cert.certificateLink && (
                          <a
                            href={cert.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <span>View Certificate</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No certifications provided.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>
                  Achievements ({instructor.achievements?.length || 0})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {instructor.achievements && instructor.achievements.length > 0 ? (
                <div className="space-y-4">
                  {instructor.achievements.map((achievement, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{achievement.title}</h4>
                          {achievement.date && (
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(achievement.date), "MMM yyyy")}
                            </span>
                          )}
                        </div>
                        {achievement.description && (
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No achievements recorded.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>
                  Teaching Courses ({instructor.courses?.length || 0})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {instructor.courses && instructor.courses.length > 0 ? (
                <div className="space-y-3">
                  {instructor.courses.map((course, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {course.title || `Course #${index + 1}`}
                        </p>
                        {course.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {course.description}
                          </p>
                        )}
                        {course.status && (
                          <Badge
                            variant={
                              course.status === "published"
                                ? "success"
                                : course.status === "draft"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {course.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No courses assigned.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isChangePassword && (
        <ChangePassword
          isChangePassword={isChangePassword}
          setIsChangePassword={setIsChangePassword}
        />
      )}
    </div>
  );
};
