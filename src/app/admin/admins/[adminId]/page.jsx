"use client";

import { TypographyH2 } from "@/components/typography.jsx/typography-h2";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApiQuery } from "@/hooks/useApiQuery";
import { cn } from "@/lib/utils";
import { ArrowLeft, Mail, Phone, Shield, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const getPermissionColor = (level) => {
  switch (level) {
    case "read&write":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "read":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
};

const AdminDetails = () => {
  const router = useRouter();
  const params = useParams();

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/admins/get-details/${params?.adminId}`,
    queryKeys: ["admin"],
  });

  console.log("data", data);
  const {
    name,
    email,
    position,
    role,
    status,
    profileImage,
    permissions,
    phone,
  } = data?.admin || {};

  return (
    <div className="space-y-5">
      <button
        onClick={() => router.push("/admin/admins")}
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="Admin Details" />
      </button>

      <Card>
        <CardHeader className="grid gric1 lg:grid-cols-2">
          <div className="flex items-start space-x-6">
            <Avatar className="size-28">
              <AvatarImage src={profileImage} />
              <AvatarFallback className="text-lg">
                {name ? (
                  name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                ) : (
                  <User className="h-10 w-10" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <CardTitle className="text-2xl">{name}</CardTitle>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="capitalize text-sm">
                  {position}
                </Badge>
                <Badge
                  className="capitalize"
                  variant={status === "active" ? "success" : "inProgress"}
                >
                  {status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2 capitalize text-base">
                <Shield className="h-4 w-4" />
                {role}
              </CardDescription>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="font-medium">{email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Phone
                </p>
                <p className="font-medium">{phone || "Not provided"}</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Module Permissions</CardTitle>
          <CardDescription>
            Access levels across different system modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {permissions && Object.entries(permissions).map(([module, level]) => (
              <div key={module} className="p-4 border rounded-lg bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium capitalize">{module}</h4>
                  <Badge
                    className={cn("capitalize",getPermissionColor(level))}
                    variant="outline"
                  >
                    {level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {level === "read&write" && "Read and write permissions"}
                  {level === "read" && "Read-only access"}
                  {level === "none" && "No access granted"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDetails;
