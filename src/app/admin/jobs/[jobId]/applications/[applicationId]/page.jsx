"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { getStatusColorCode } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const statuses = ["pending", "reviewed", "shortlisted", "rejected", "accepted"];
const ApplicationDetail = () => {
  const params = useParams();
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/jobs/job-applications/get-details/${params.applicationId}`,
    queryKeys: ["job-application"],
  });

  console.log("data", data);

  let mutation = ""

  if (isLoading) return <p>Loading...</p>;
  if (!data?.data) return <p>Not found</p>;

  const app = data.data;

  return (
    <div className="grid gap-6 max-w-3xl mx-auto mt-6">
      {/* Applicant Info */}
      <Card>
        <CardHeader>
          <CardTitle>Applicant Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="size-5 text-gray-500" />
            <span className="font-medium">{app.fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-5 text-gray-500" />
            <span>{app.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-5 text-gray-500" />
            <span>{app.phoneNumber}</span>
          </div>
          <p className="text-sm text-gray-500">
            Applied at: {format(new Date(app.appliedAt), "PPP")}
          </p>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge className={getStatusColorCode(app.status)}>{app.status}</Badge>
        </CardContent>
      </Card>

      {/* Update Status */}
      <Card>
        <CardHeader>
          <CardTitle>Update Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select onValueChange={setNewStatus} value={newStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Add a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Button
            onClick={() => mutation?.mutate()}
            disabled={!newStatus || mutation?.isPending}
          >
            {mutation?.isPending ? "Updating..." : "Update Status"}
          </Button>
        </CardContent>
      </Card>

      {/* Status History */}
      <Card>
        <CardHeader>
          <CardTitle>Status History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {app.statusHistory.map((entry, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(entry.status)}>
                  {entry.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  {format(new Date(entry.changedAt), "PPP p")}
                </span>
              </div>
              {entry.note && (
                <p className="text-sm mt-1 text-gray-600">{entry.note}</p>
              )}
              {idx < app.statusHistory.length - 1 && (
                <Separator className="my-3" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationDetail;
