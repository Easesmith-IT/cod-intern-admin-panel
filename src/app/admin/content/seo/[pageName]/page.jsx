"use client";

import Spinner from "@/components/shared/Spinner";
import { TypographyH2 } from "@/components/typography/typography-h2";
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
import { Textarea } from "@/components/ui/textarea";
import { POST } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { AddSeoSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const DetailPage = () => {
  const params = useParams();
  const pageName = params.pageName;
  console.log("pageName", pageName);

  const form = useForm({
    resolver: zodResolver(AddSeoSchema),
    defaultValues: {
      title: "",
      description: "",
      keywords: [],
    },
  });

  const { reset, handleSubmit, control, formState } = form;

  const { errors } = formState;

  console.log("errors", errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywords",
  });

  const { data, isLoading, isError } = useApiQuery({
    url: `/admin/content/get-seo?pageName=${pageName}`,
    queryKeys: ["content", "seo", pageName],
  });

  console.log("data", data);

  useEffect(() => {
    if (data) {
      const { title, description, keywords } = data?.seo || {};
      reset({ title, description, keywords });
    }
  }, [data, reset]);

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: `/admin/content/create-seo`,
    method: POST,
    invalidateKey: ["content", "seo", pageName],
  });

  const onSubmit = (data) => {
    console.log("Data:", data);

    submitForm({ ...data, pageName });
  };

  return (
    <div>
      <Link
        href="/admin/content/seo"
        className="inline-flex gap-1 items-center justify-start mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2
          heading={`Update SEO for: ${pageName}`}
          className="capitalize"
        />
      </Link>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white p-5 rounded"
        >
          <div className="grid grid-cols-1 gap-4 mt-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <div className="flex flex-wrap gap-4 mt-1">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-2">
                    <div>
                      <FormField
                        control={control}
                        name={`keywords.${index}`}
                        render={({ field }) => (
                          <FormControl>
                            <Input placeholder="Enter Keyword" className="min-w-auto" {...field} />
                          </FormControl>
                        )}
                      />
                      <FormMessage>
                        {errors?.keywords?.[index]?.message}
                      </FormMessage>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append("")}
                  className="w-fit"
                >
                  <Plus className="size-4 mr-1" /> Add Keyword
                </Button>
              </div>
              <FormMessage>{errors?.keywords?.message}</FormMessage>
            </FormItem>

            <div className="flex justify-end mt-3">
              <Button variant="codIntern">
                {isSubmitFormLoading ? <Spinner /> : "Update SEO"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailPage;
