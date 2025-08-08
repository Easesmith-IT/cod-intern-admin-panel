"use client";
import dynamic from "next/dynamic";

import DatePicker from "@/components/shared/DatePicker";
import { TypographyH2 } from "@/components/typography.jsx/typography-h2";
import { Button } from "@/components/ui/button";
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
import { updatePreview } from "@/lib/updatePreview";
import { AddJobSchema } from "@/schemas/AddJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImagePlus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import TiptapEditor from "@/components/tiptap-editor";

const CreateJob = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(AddJobSchema),
    defaultValues: {
      title: "",
      postingDate: new Date(),
      status: "active",
      category: "fresher",
      city: "",
      state: "",
      country: "",
      jobImage: "",
      jobImagePreview: "",
      education: [],
      aboutCompany: "",
      aboutJob: "",
      rolesAndReponsibilities: "",
      goodToHave: "",
    },
  });

  const { control, reset, handleSubmit, watch, register, setValue, getValues } =
    form;

  const jobImageRef = register("jobImage");
  const jobImage = watch("jobImage");

  const [newEducation, setNewEducation] = useState("");

  const { fields, append, remove } = useFieldArray({
    name: "education",
    control: control,
  });

  useEffect(() => {
    updatePreview(jobImage, "jobImagePreview", setValue);
  }, [form, jobImage]);

  const handleAddEducation = () => {
    const trimmed = newEducation.trim();

    const isDuplicate = fields.some((f) => f.title === trimmed);
    if (isDuplicate) {
      return toast.error("Education already added.");
    }

    append({ title: trimmed }); // add to form array
    setNewEducation(""); // clear input
  };

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <div className="space-y-5">
      <button
        onClick={() => router.push("/admin/jobs")}
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="Add Job" />
      </button>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full border rounded-xl bg-white px-5 py-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr_1fr] gap-6 items-start">
            <FormField
              control={control}
              name="jobImage"
              render={({ field }) => (
                <FormItem>
                  <div className="w-40">
                    <FormLabel className="cursor-pointer">
                      {!watch("jobImagePreview") && (
                        <div className="border-2 border-dashed border-[#C2CDD6] w-40 h-40 rounded-lg flex flex-col justify-center items-center">
                          <div className="flex flex-col items-center primary-color border-dashed rounded px-5">
                            <ImagePlus className="h-8 w-8 text-neutral-700" />
                            <p className="font-bold text-neutral-700 mt-2 text-center primary-color text-sm">
                              Add Photo
                            </p>
                          </div>
                        </div>
                      )}
                      {watch("jobImagePreview") && (
                        <div className="relative">
                          <div
                            type="button"
                            className="size-7 absolute top-1 right-1 p-1.5 rounded-full bg-white flex justify-center items-center"
                          >
                            <Pencil />
                          </div>
                          <img
                            className="w-40 h-40"
                            src={getValues("jobImagePreview")}
                            alt=""
                          />
                        </div>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="placeholder:text-[#3B3B3B] hidden w-full"
                        {...jobImageRef}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 col-span-3 gap-6 items-start">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="postingDate"
                render={({ field }) => (
                  <FormItem className="col-span-2 lg:col-span-1">
                    <FormLabel>Posting Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem className="col-span-2 lg:col-span-1">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="flex justify-between w-full items-center h-10 text-sm font-normal font-sans border">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem className="col-span-2 lg:col-span-1">
                    <FormLabel>Job Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="flex justify-between w-full items-center h-10 text-sm font-normal font-sans border">
                          <SelectValue placeholder="Select Job Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fresher">Fresher</SelectItem>
                          <SelectItem value="experienced">
                            Experienced
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem className="col-span-2 lg:col-span-1">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="state"
                render={({ field }) => (
                  <FormItem className="col-span-2 lg:col-span-1">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="country"
                render={({ field }) => (
                  <FormItem className="col-span-2 lg:col-span-1">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="max-w-2xl mt-10">
            <FormLabel className="mt-3">Education</FormLabel>

            {/* Input to enter a new pincode */}
            <div className="flex items-center gap-2 mt-2">
              <Input
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                placeholder="Enter Education"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddEducation}
              >
                Add
              </Button>
            </div>

            {/* Show Zod validation message */}
            <FormMessage>
              {form.formState.errors?.education?.message}
            </FormMessage>

            {/* List of added pincodes */}
            {fields.length > 0 && (
              <div className="mt-4 flex gap-3 items-center flex-wrap">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between gap-8 px-3 py-2 border rounded-md"
                  >
                    <span>{field.title}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <FormField
            control={control}
            name="aboutCompany"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>About the Company</FormLabel>
                <FormControl>
                  <TiptapEditor
                    onChange={field.onChange}
                    initialContent={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="aboutJob"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>About the Job</FormLabel>
                <FormControl>
                  <TiptapEditor
                    onChange={field.onChange}
                    initialContent={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="rolesAndReponsibilities"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Roles & Reponsibilities</FormLabel>
                <FormControl>
                  <TiptapEditor
                    onChange={field.onChange}
                    initialContent={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="goodToHave"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Good to Have</FormLabel>
                <FormControl>
                  <TiptapEditor
                    onChange={field.onChange}
                    initialContent={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-10">
            <Button type="submit" variant="codIntern" size="" className="px-10">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateJob;
