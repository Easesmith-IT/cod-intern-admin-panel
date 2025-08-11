"use client";

import { Field, LabelText, ReadOnlyBlock } from "@/components/jobs/field";
import { TypographyH2 } from "@/components/typography.jsx/typography-h2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useApiQuery } from "@/hooks/useApiQuery";
import { previewImage } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Globe,
  MapPin,
  Tags,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const JobDetails = () => {
  const router = useRouter();
  const params = useParams();

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/jobs/get-details/${params?.jobId}`,
    queryKeys: ["job"],
  });

  console.log("data", data);

  const {
    title,
    postingDate,
    status,
    category,
    city,
    state,
    country,
    jobImage: image,
    education,
    company,
    aboutCompany,
    aboutJob,
    rolesAndReponsibilities,
    goodToHave,
    _id,
  } = data?.job || {};

  return (
    <div className="space-y-5">
      <button
        onClick={() => router.push("/admin/jobs")}
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="Job Details" />
      </button>

      <div className="rounded-xl border bg-card">
        <div className="grid gap-6 p-4 md:grid-cols-3 items-start md:p-6">
          <Card className="md:col-span-1 overflow-hidden border-none shadow-none py-0 gap-1">
            <CardHeader>
              <CardTitle className="text-base">Job Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                <img
                  src={previewImage(image) || "/placeholder.svg"}
                  alt="Job cover"
                  width={600}
                  height={440}
                  className="aspect-square w-full object-cover md:aspect-[4/3]"
                  loading="eager"
                />
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Job Title" value={title} />
              <Field
                icon={<Calendar className="h-4 w-4" />}
                label="Posting Date"
                value={
                  postingDate ? format(new Date(postingDate), "dd-MM-yyyy") : ""
                }
              />
              <Field
                icon={<CheckCircle2 className="h-4 w-4" />}
                label="Status"
                value={status}
                badge
              />
              <Field
                icon={<Briefcase className="h-4 w-4" />}
                label="Job Category"
                value={category}
              />
              <Field
                icon={<MapPin className="h-4 w-4" />}
                label="City"
                value={city}
              />
              <Field
                icon={<MapPin className="h-4 w-4" />}
                label="State"
                value={state}
              />
              <Field
                icon={<Globe className="h-4 w-4" />}
                label="Country"
                value={country}
              />
              <div className="flex gap-3 items-center">
                <LabelText>{"Education"}</LabelText>
                <div className="flex flex-wrap items-center gap-2">
                  {education?.map((ed) => (
                    <Badge key={ed} variant="secondary" className="rounded-md">
                      <Tags className="mr-1.5 h-3.5 w-3.5" />
                      {ed}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  icon={<Building2 className="h-4 w-4" />}
                  label="Company Name"
                  value={company}
                  className="sm:col-span-2"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-6 p-4 md:p-6 w-full">
          <ReadOnlyBlock title="About the Company" text={aboutCompany} />
          <ReadOnlyBlock title="About the Job" text={aboutJob} />
          <ReadOnlyBlock
            title="Roles & Responsibilities"
            text={rolesAndReponsibilities}
          />
          <ReadOnlyBlock title="Good to Have" text={goodToHave} />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
