"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { InfoCard } from "./info-card";
import { useEffect } from "react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import Spinner from "@/components/shared/Spinner";

export const EditableInfoCards = ({ data, isLoading }) => {
  const form = useForm({
    defaultValues: {
      cards: [
        {
          icon: "",
          iconPreview: "/contact-us/time-saving.svg",
          title: "Effective Learning",
          desc: "CodIntern's AI-powered learning and streamlined coursework maximize your study time so you learn the fundamentals effectively and get career-ready at the fastest pace without any wastage of time.",
        },
        {
          icon: "",
          iconPreview: "/contact-us/cost-effective.svg",
          title: "Affordable Excellence",
          desc: "Access high-quality tech training, thorough resources, and professional mentorship at a reasonable investment. CodIntern provides superior value, putting high-quality skilling within reach and returning high value on education.",
        },
        {
          icon: "",
          iconPreview: "/contact-us/reliable-and-flexible.svg",
          title: "Unwavering & Responsive",
          desc: "Learn at your own pace, on your own timeline, with CodIntern's powerful and flexible platform. Our steadfast support and flexible learning flexibility mean you can work toward your goals with confidence, integrating education into your life.",
        },
      ],
    },
  });

  const { handleSubmit, control, setValue, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "cards",
  });

  console.log("get more info data", data);

  const { _id = "", images = [], content } = data || {};

  useEffect(() => {
    if (data) {
      reset({
        cards:
          content?.cards.map((card, i) => ({
            ...card,
            iconPreview: images?.[i]?.image,
          })) || "",
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
    invalidateKey: ["content", "contact-us", "get-more-information"],
  });

  const onSubmit = (values) => {
    console.log("Data:", values);

    const formData = new FormData();
    let cards = [];

    values.cards.forEach((card) => {
      cards.push({
        title: card.title,
        desc: card.desc,
      });

      if (card.icon instanceof File) {
        formData.append("images", card.icon);
      }
    });

    formData.append("pageName", "contact-us");
    formData.append("sectionName", "get-more-information");
    formData.append("content", JSON.stringify({ cards }));

    submitForm(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full mt-10">
          {fields.map((field, index) => (
            <InfoCard key={index} index={index} field={field} />
          ))}
        </div>

        <div className="flex gap-2 justify-end mt-4 w-full">
          {/* <Button
            type="button"
            variant="codIntern"
            onClick={() =>
              append({
                icon: "/contact-us/time-saving.svg",
                title: "New Title",
                desc: "New description...",
              })
            }
          >
            <Plus size={14} className="mr-2" /> Add Card
          </Button> */}

          <Button type="submit" variant="codIntern">
            {isSubmitFormLoading ? <Spinner /> : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
