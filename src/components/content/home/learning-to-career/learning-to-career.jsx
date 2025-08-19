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

export const LearningToCareer = ({ className }) => {
  const form = useForm({
    resolver: zodResolver(LearningToCareerSchema),
    defaultValues: {
      //  image: "",
      //  imagePreview: "/sharpenYourSkill/sharpen-your-skill-img.jpg",
      desc: "Our philosophy at CodIntern is straightforward: we give you the tools you need to transform your love of learning into a career you can be proud of. By offering state-of-the-art, AI-driven learning opportunities and practical skill development, we close the knowledge gap between education and employment. Our objective is to provide you with the marketable abilities and self-assurance you need to succeed in the tech sector, ensuring that your future work reflects your actual abilities and goals.",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (values) => {
    console.log("Steps Data:", values);
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
            className="max-w-5xl text-center"
            textareaClassName="h-32"
          />

          <h3 className="mt-10 max-w-5xl mx-auto capitalize font-stolzl text-base sm:text-2xl font-medium text-center">
            Our 6-Step AI-Driven Learning Experience Here's what CodIntern
            drives your career ahead with a smart, organized plan:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center mt-6">
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
              {/* <p>
            Our AI constantly monitors your performance, dynamically adapting
            content to maximize your learning experience.
          </p> */}
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
              {/* <p className="mt-4">
            Outcome: You'll have a job-ready profile that strongly highlights
            your experiential skills.
          </p> */}
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
        </form>
      </Form>
    </div>
  );
};
