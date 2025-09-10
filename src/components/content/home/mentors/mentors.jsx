"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { MentorsSchema } from "@/schemas/ContentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Mentor } from "./mentor";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import Spinner from "@/components/shared/Spinner";
import { useEffect } from "react";

export const Mentors = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(MentorsSchema),
    defaultValues: {
      mentors: [
        {
          image: null,
          imagePreview: "/our-mentors/Anjali-img.jpg",
          name: "Anjali Sharma",
          position: "Founder",
          arr: ["Talent Acquisition", "Recruitment", "HR"],
        },
        {
          image: null,
          imagePreview: "/our-mentors/Gaurav-img.jpg",
          name: "Gaurav Dwivedi",
          position: "Co-Founder",
          arr: ["Cloud Computing", "Python", "Digital Marketing"],
        },
        {
          image: null,
          imagePreview: "/our-mentors/Akansha-img.jpg",
          name: "Akanksha Chaturvedi",
          position: "Placement Head-Recruitment",
          arr: ["Placements", "Soft Skill Trainer"],
        },
      ],
    },
  });

  const { handleSubmit, watch, reset } = form;
  const mentors = watch("mentors");

  const { _id = "", images = [], content } = data || {};

  useEffect(() => {
    if (data) {
      reset({
        mentors: content?.mentors || "",
        imagePreview: images?.[0]?.image || "",
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
    invalidateKey: ["content", "home", "mentors"],
  });

  const onSubmit = (values) => {
    console.log("Mentors Data:", values);

    const formData = new FormData();
    let images =[]
    let mentors =[]

    values.mentors.forEach(mentor => {
      
    });

    formData.append("pageName", "home");
    formData.append("sectionName", "mentors");
    formData.append("content", JSON.stringify({ mentors: values.mentors }));
    if (values.image?.[0] instanceof File) {
      formData.append("images", values.image?.[0]);
    }

    submitForm(formData);
  };

  return (
    <section className="section-container py-12 md:py-20">
      <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl font-medium text-center">
        <span className="text-main">Mentors behind</span> your career growth
        <Image
          src="/ellipse-group.svg"
          className="inline-block ml-2"
          width={46}
          height={16}
          alt="Ellipse"
        />
      </h2>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {mentors.map((mentor, index) => (
              <Mentor
                key={index}
                name={mentor.name}
                position={mentor.position}
                img={mentor.imagePreview || "/user-placeholder.png"}
                proficiency={mentor.arr}
                index={index}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              disabled={isSubmitFormLoading}
              variant="codIntern"
              className="mt-4"
              type="submit"
            >
              {isSubmitFormLoading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
