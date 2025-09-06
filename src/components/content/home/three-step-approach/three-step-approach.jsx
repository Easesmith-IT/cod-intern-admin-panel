"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Step } from "./step";
import { StepForm } from "./step-form";
import { ThreeStepApproachSchema } from "@/schemas/ContentSchema";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import Spinner from "@/components/shared/Spinner";
import { useEffect } from "react";

export const ThreeStepApproach = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(ThreeStepApproachSchema),
    defaultValues: {
      steps: [
        {
          title: "AI-Powered Profile Optimization",
          arr: [
            "AI-Enhanced Resume Crafting",
            "Intelligent LinkedIn Optimization",
            "Automated Multi-Platform Presence",
          ],
        },
        {
          title: "Elite Interview Preparation",
          arr: [
            "Identified Growth Areas",
            "Specialized Technical Drills",
            "Customized Company Simulations",
          ],
        },
        {
          title: "Strategic Opportunity Alignment",
          arr: [
            "Precise Competency Assessment",
            "Advanced Technical Proficiency Drills",
            "Tailored Enterprise Simulations",
          ],
        },
      ],
    },
  });

  const { handleSubmit, watch, getValues, reset } = form;

  const steps = watch("steps");
  const { _id, content } = data || {};

useEffect(() => {
  // Only reset if the incoming data is actually different
  if (data) {
    reset(content);
  }
}, [data, reset]);


  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: `/admin/content?id=${_id}`,
    method: POST,
    invalidateKey: ["content", "home", "three-step-approach"],
  });

  console.log("Steps get data:", data);
  const onSubmit = (values) => {
    console.log("Steps Data:", values);
    const apiData = {
      pageName: "home",
      sectionName: "three-step-approach",
      content: values,
    };
    submitForm(apiData);
    // send to backend (save to DB)
  };

  return (
    <section className="py-12 md:py-24 section-container">
      <div className="flex justify-center text-center section-container px-0 max-w-[900px]">
        <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium">
          <span className="text-main">Our 3-Step </span> AI-Enhanced Recruitment
          Approach
          <Image
            src="/ellipse-group.svg"
            className="inline-block ml-2"
            width={46}
            height={16}
            alt="Ellipse"
          />
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
            {steps.map(({ title, arr }, index) => (
              <Step
                key={index}
                title={title}
                className="text-main"
                arr={arr}
                index={index}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isSubmitFormLoading}
              className="mt-5"
              variant="codIntern"
            >
              {isSubmitFormLoading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
