import { AchieveYourGoals } from "@/components/content/about-us/achieve-your-goals";
import { ExpertInstructorLiveClasses } from "@/components/content/about-us/expert-instructor-live-classes/expert-instructor-live-classes";
import { HeroSection } from "@/components/content/about-us/hero";
import { Mentors } from "@/components/content/about-us/mentors/mentors";
import { ShapingFutures } from "@/components/content/about-us/shaping-futures/shaping-futures";
import { StartYourCourse } from "@/components/content/about-us/start-your-course";
import { LearnersStories } from "@/components/content/home/learners-stories/learners-stories";
import { LearningToCareer } from "@/components/content/home/learning-to-career/learning-to-career";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AboutUs = () => {
  return (
    <section>
      <Link
        href="/admin/content/visual-content"
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="About Us Page" />
      </Link>

      <div className="bg-white">
        <HeroSection />
        <AchieveYourGoals />
        <ShapingFutures />
        {/* <EvolutionOFCodIntern /> comment this */}
        <StartYourCourse />
        <ExpertInstructorLiveClasses />
        <Mentors />
        <LearningToCareer className="py-12 sm:py-24" />
        <LearnersStories className="!pt-0" />
      </div>
    </section>
  );
};

export default AboutUs;
