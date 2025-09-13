"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UniversitiesSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useFieldArray, useForm } from "react-hook-form";
import { ImageUploadField } from "../../image-upload-field";
import { useEffect } from "react";
import { updatePreview } from "@/lib/updatePreview";
import { Trash } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import Spinner from "@/components/shared/Spinner";

export const Universities = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(UniversitiesSchema),
    defaultValues: {
      icons: [
        { image: "", preview: "/universities/logitech.svg" },
        { image: "", preview: "/universities/google-1.svg" },
        { image: "", preview: "/universities/facebook.svg" },
        { image: "", preview: "/universities/amazon.svg" },
      ],
    },
  });

  const { handleSubmit, control, watch, setValue, reset, getValues } = form;

  // ✅ For dynamic fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "icons",
  });

  // console.log("fields", fields);

  const icons = watch("icons");
  // console.log("getValues", getValues());

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.includes("icons") && name.endsWith("image")) {
        const index = parseInt(name.split(".")[1], 10);
        const fileList = value.icons?.[index]?.image;

        if (fileList instanceof FileList && fileList.length > 0) {
          updatePreview(fileList, `icons.${index}.preview`, setValue);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const { _id = "", images = [] } = data || {};

  useEffect(() => {
    if (data) {
      reset({
        icons: images?.map((item) => ({ image: "", preview: item.image })),
      });
    }
  }, [data, reset]);

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: `/admin/content?id=${_id}`,
    method: POST,
    invalidateKey: ["content", "home", "universities"],
  });

  const onSubmit = (values) => {
    console.log("Steps Data:", values);
    const formData = new FormData();

    formData.append("pageName", "home");
    formData.append("sectionName", "universities");
    if (values.icons.length > 0) {
      values.icons.forEach((icon) => {
        if (icon.image[0] instanceof File) {
          formData.append("images", icon.image[0]);
        }
      });
    }

    submitForm(formData);
  };

  return (
    <>
      {/* Banner Section */}
      <section className="bg-[#2C1D43] py-14 md:py-16 w-full">
        <div className="section-container max-w-5xl text-white flex flex-col sm:flex-row items-center gap-4">
          <p className="text-sm sm:text-lg md:text-xl lg:text-[26px] font-medium font-stolzl sm:max-w-[360px]">
            Programs in Collaboration with world's top Universities & MNC's
          </p>
          <img
            src="/universities/seperator.svg"
            width={11}
            height={119}
            className="-my-5 sm:my-0 sm:ml-4 rotate-90 sm:rotate-0"
            alt="seperator"
          />

          <Marquee
            autoFill
            gradient
            gradientColor="#2C1D43"
            gradientWidth={200}
          >
            {icons.map((field, index) => {

              return (
                <Image
                  // key={field.id}
                  key={index}
                  src={field.preview}
                  className="px-5"
                  width={100}
                  height={30}
                  alt="entity"
                />
              );
            })}
          </Marquee>
        </div>
      </section>

      {/* Form Section */}
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap gap-4 mt-4 w-full"
        >
          {fields.map((field, index) => {
            const image = watch(`icons.${index}.image`);
            const preview = watch(`icons.${index}.preview`);

            // useEffect(() => {
            //   if (image) {
            //     updatePreview(image, `icons.${index}.preview`, setValue);
            //   }
            // }, [image, index, setValue]);

            return (
              <div
                key={field.id}
                className="flex gap-3 bg-[#2C1D43] items-center relative"
              >
                <ImageUploadField
                  name={`icons.${index}.image`}
                  previewName={`icons.${index}.preview`}
                  imgClassName="shadow-none object-contain"
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="size-7 rounded-full p-1 absolute bottom-2 right-2"
                  onClick={() => remove(index)}
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            );
          })}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ image: "", preview: "" })}
            >
              Add Image
            </Button>
            <Button
              disabled={isSubmitFormLoading}
              variant="codIntern"
              type="submit"
            >
              {isSubmitFormLoading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
