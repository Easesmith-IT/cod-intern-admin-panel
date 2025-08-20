import { HeroSection } from "@/components/content/home/hero-section";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThreeStepApproach } from "./three-step-approach/three-step-approach";
import { FreshJobs } from "./fresh-jobs/fresh-jobs";
import { AccelerateYourCareer } from "./accelerate-your-career/accelerate-your-career";
import { PopularCourses } from "./popular-courses/popular-courses";
import { SharpenYourSkill } from "@/components/content/home/sharpen-your-skills/sharpen-your-skill";
import { Universities } from "@/components/content/home/universities/universities";
import { WhyCodInterns } from "@/components/content/home/why-cod-interns/why-cod-interns";
import { LearningToCareer } from "@/components/content/home/learning-to-career/learning-to-career";
import { ConnectWithUs } from "./connect-with-us";
import { WeJustKeepGrowing } from "./we-just-keep-growing";
import { LearnersStories } from "./learners-stories/learners-stories";
import { Mentors } from "./mentors/mentors";

const Home = () => {
  return (
    <div>
      <Link
        href="/admin/content/visual-content"
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="Home Page" />
      </Link>

      <div className="bg-white">
        <HeroSection />
        <ThreeStepApproach />
        <FreshJobs />
        <AccelerateYourCareer />
        <PopularCourses />
        <SharpenYourSkill />
        <Universities />
        <WhyCodInterns />
        <LearningToCareer />
        <ConnectWithUs />
        <WeJustKeepGrowing />
        <LearnersStories />
        <Mentors />
      </div>
    </div>
  );
};

export default Home;
