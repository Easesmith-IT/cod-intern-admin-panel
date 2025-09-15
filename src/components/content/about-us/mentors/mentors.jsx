"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { MentorsSchema, MentorsSchema1 } from "@/schemas/ContentSchema";
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
    resolver: zodResolver(MentorsSchema1),
    defaultValues: {
      mentors: [
        {
          image: null,
          imagePreview: "",
          name: "Hisham Khan",
          position: "Lead Career Mentor",
          experience: "Ex–Deloitte | Present–Career Strategist, CodIntern",
          about:
            "With years of consulting experience at Deloitte, Hisham brings sharp industry insights and a passion for mentoring students toward job-readiness.",
        },
        {
          image: null,
          imagePreview: "",
          name: "Priya Malhotra",
          position: "Software Engineering Mentor",
          experience: "Present–Software Developer at Microsoft",
          about:
            "An expert in full-stack development, Priya blends technical depth with real-world case studies to help learners grasp modern development practices.",
        },
        {
          image: null,
          imagePreview: "",
          name: "Ankur Jain",
          position: "Data Science & AI Mentor",
          experience: "Ex–Accenture | Present–AI Consultant",
          about:
            "With a strong background in AI and data analytics, Ankur guides students through hands-on projects and industry-relevant tools.",
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
        mentors:
          content?.mentors.map((mentor, i) => ({
            ...mentor,
            imagePreview: images?.[i]?.image,
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
    invalidateKey: ["content", "about-us", "mentors"],
  });

  const onSubmit = (values) => {
    console.log("Mentors Data:", values);

    const formData = new FormData();
    let mentors = [];

    values.mentors.forEach((mentor) => {
      mentors.push({
        name: mentor.name,
        position: mentor.position,
        experience: mentor.experience,
        about: mentor.about,
      });

      if (mentor.image instanceof File) {
        formData.append("images", mentor.image);
      }
    });

    formData.append("pageName", "about-us");
    formData.append("sectionName", "mentors");
    formData.append("content", JSON.stringify({ mentors: mentors }));

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
                experience={mentor.experience}
                about={mentor.about}
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
