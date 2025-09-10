"use client";

import Image from "next/image";
import { LearningStep } from "./learning-step";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LearningToCareerSchema } from "@/schemas/ContentSchema";
import { Form } from "@/components/ui/form";
import { EditableTextarea } from "../../EditableTextarea";
import { StepCard } from "./step-card";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import Spinner from "@/components/shared/Spinner";

export const LearningToCareer = ({ className, data }) => {
  const form = useForm({
    resolver: zodResolver(LearningToCareerSchema),
    defaultValues: {
      //  image: "",
      //  imagePreview: "/sharpenYourSkill/sharpen-your-skill-img.jpg",
      desc: "Our philosophy at CodIntern is straightforward: we give you the tools you need to transform your love of learning into a career you can be proud of. By offering state-of-the-art, AI-driven learning opportunities and practical skill development, we close the knowledge gap between education and employment. Our objective is to provide you with the marketable abilities and self-assurance you need to succeed in the tech sector, ensuring that your future work reflects your actual abilities and goals.",
      steps: [
        {
          index: 1,
          title: "Sign Up & Get Assessed",
          title1: "(AI-Driven Skill Mapping)",
          description:
            "Begin your journey with an AI-based diagnostic test. This advanced test accurately measures your existing skill set, detects your exclusive learning pattern, and aligns with your career goals, making it an absolutely personalized beginning.",
          // points: [
          //   "Customized roadmap crafted to lead your unique learning journey",
          // ],
        },
        {
          index: 2,
          title: "Access Your Learning Dashboard",
          title1: "(Smart LMS)",
          description:
            "Get access to our AI-driven Learning Management System. You'll have an easy-to-use dashboard with:",
          points: [
            "Auto-captioned video lectures and multi-language subtitles.",
            "Downloadable notes and resources for thorough study.",
            "Chapter-wise progress tracking for monitoring your progress.",
          ],
        },
        {
          index: 3,
          title: "Learn Through Live Classes & Projects",
          description:
            "Get immersed in live, mentor-guided sessions and work on actual projects. CodIntern's AI-powered engine suggests projects that exactly match your pace and areas of interest. In addition, you get instant feedback on code and AI-driven doubt-solving bots for round-the-clock assistance.",
        },
        {
          index: 4,
          title: "Practice with Adaptive Quizzes",
          title1: "(AI-Generated)",
          description:
            "Challenge yourself with AI-created quizzes that respond in real-time based on your answers, scaling up or down in difficulty and subject matter. This intelligent system detects your weak spots and reinforces your knowledge through clever, focused repetition.",
        },
        {
          index: 5,
          title: "Create Your Internship Portfolio",
          title1: "(AI Resume Builder)",
          description:
            "Tap into our AI-based resume and portfolio creator to write strong documents that grab attention. Get constructive feedback on your GitHub projects, LinkedIn page, and even simulated interviews, all based on AI-facilitated tools.",
        },
        {
          index: 6,
          title: "Get Certified & Career Matched",
          title1: "(AI Career Matchmaking)",
          description:
            "Upon certification, our sophisticated AI engine connects you with internships, projects, and job positions that exactly match your skill set and interests—from fast-paced startup openings to jobs in top tech MNCs. Our expert guidance, complemented by AI assistance, guides you every step from application to preparation and final success.",
        },
      ],
    },
  });

  const { handleSubmit, watch, reset } = form;
  const steps = watch("steps");

  const { _id = "", content } = data || {};

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
    invalidateKey: ["content", "home", "learning-to-career"],
  });

  const onSubmit = (values) => {
    console.log("Steps Data:", values);
    const apiData = {
      pageName: "home",
      sectionName: "learning-to-career",
      content: values,
    };
    submitForm(apiData);
    // send to backend (save to DB)
  };

  return (
    <div className={cn("section-container", className)}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium text-center capitalize w-full">
            <span className="text-main">Transform Learning</span> into a Proud
            Career
            <Image
              src="/ellipse-group.svg"
              className="inline-block ml-2"
              width={46}
              height={16}
              alt="Ellipse"
            />
          </h2>

          {/* <p className="max-w-5xl mx-auto text-center font-stolzl text-xs sm:text-base font-book text-para mt-4">
            Our philosophy at CodIntern is straightforward: we give you the
            tools you need to transform your love of learning into a career you
            can be proud of. By offering state-of-the-art, AI-driven learning
            opportunities and practical skill development, we close the
            knowledge gap between education and employment. Our objective is to
            provide you with the marketable abilities and self-assurance you
            need to succeed in the tech sector, ensuring that your future work
            reflects your actual abilities and goals.
          </p> */}

          <EditableTextarea
            className="max-w-5xl mx-auto text-center"
            textareaClassName="h-32"
            isSubmitBtn={false}
          />

          <h3 className="mt-10 max-w-5xl mx-auto capitalize font-stolzl text-base sm:text-2xl font-medium text-center">
            Our 6-Step AI-Driven Learning Experience Here's what CodIntern
            drives your career ahead with a smart, organized plan:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>

          <div className="hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center mt-6">
            <LearningStep
              index={1}
              title="Sign Up & Get Assessed"
              title1="(AI-Driven Skill Mapping)"
            >
              <p className="text-xs sm:text-sm">
                Begin your journey with an AI-based diagnostic test. This
                advanced test accurately measures your existing skill set,
                detects your exclusive learning pattern, and aligns with your
                career goals, making it an absolutely personalized beginning.
              </p>
              <p className="mt-2 text-xs sm:text-sm">
                Result: You'll get a customized roadmap, individually crafted to
                lead your unique learning journey.
              </p>
            </LearningStep>
            <LearningStep
              index={2}
              title="Access Your Learning Dashboard"
              title1="(Smart LMS)"
            >
              Get access to our AI-driven Learning Management System. You'll
              have an easy-to-use dashboard with:
              <ul className="list-disc ml-4 my-4 text-left flex flex-col gap-0.5">
                <li>
                  Auto-captioned video lectures and multi-language subtitles.
                </li>
                <li>Downloadable notes and resources for thorough study.</li>
                <li>
                  Chapter-wise progress tracking for monitoring your progress.
                </li>
              </ul>
            </LearningStep>
            <LearningStep
              index={3}
              title="Learn Through Live Classes & Projects"
            >
              Get immersed in live, mentor-guided sessions and work on actual
              projects. CodIntern's AI-powered engine suggests projects that
              exactly match your pace and areas of interest. In addition, you
              get instant feedback on code and AI-driven doubt-solving bots for
              round-the-clock assistance.
            </LearningStep>
            <LearningStep
              index={4}
              title="Practice with Adaptive Quizzes"
              title1="(AI-Generated)"
            >
              Challenge yourself with AI-created quizzes that respond in
              real-time based on your answers, scaling up or down in difficulty
              and subject matter. This intelligent system detects your weak
              spots and reinforces your knowledge through clever, focused
              repetition.
            </LearningStep>
            <LearningStep
              index={5}
              title="Create Your Internship Portfolio"
              title1="(AI Resume Builder)"
            >
              Tap into our AI-based resume and portfolio creator to write strong
              documents that grab attention. Get constructive feedback on your
              GitHub projects, LinkedIn page, and even simulated interviews, all
              based on AI-facilitated tools.
            </LearningStep>
            <LearningStep
              index={6}
              title="Get Certified & Career Matched"
              title1="(AI Career Matchmaking)"
            >
              Upon certification, our sophisticated AI engine connects you with
              internships, projects, and job positions that exactly match your
              skill set and interests—from fast-paced startup openings to jobs
              in top tech MNCs. Our expert guidance, complemented by AI
              assistance, guides you every step from application to preparation
              and final success.
            </LearningStep>
          </div>

          <div className="flex justify-end mt-4">
            <Button disabled={isSubmitFormLoading} variant="codIntern">
              {isSubmitFormLoading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
