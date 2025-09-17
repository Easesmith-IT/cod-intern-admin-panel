"use client";

import { AchieveYourGoals } from "@/components/content/about-us/achieve-your-goals";
import { ExpertInstructorLiveClasses } from "@/components/content/about-us/expert-instructor-live-classes/expert-instructor-live-classes";
import { HeroSection } from "@/components/content/about-us/hero";
import { Mentors } from "@/components/content/about-us/mentors/mentors";
import { ShapingFutures } from "@/components/content/about-us/shaping-futures/shaping-futures";
import { StartYourCourse } from "@/components/content/about-us/start-your-course/start-your-course";
import { LearnersStories } from "@/components/content/home/learners-stories/learners-stories";
import { LearningToCareer } from "@/components/content/home/learning-to-career/learning-to-career";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { useApiQuery } from "@/hooks/useApiQuery";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

const AboutUs = () => {
  const {
    data: contentData,
    isLoading,
    isError,
  } = useApiQuery({
    url: "/admin/content/about-us", // pageName = "about-us"
    queryKeys: ["content", "about-us"],
  });

  console.log("contentData", contentData);

  const getDataBySection = (sectionName, pageName = "about-us") => {
    return contentData?.data?.find(
      (section) =>
        section.pageName === pageName && section.sectionName === sectionName
    );
  };

  const heroData = useMemo(() => getDataBySection("hero"), [contentData]);

  const achieveYourGoalsData = useMemo(
    () => getDataBySection("achieve-your-goals"),
    [contentData]
  );

  const shapingFuturesData = useMemo(
    () => getDataBySection("shaping-futures"),
    [contentData]
  );

  const startYourCourseData = useMemo(
    () => getDataBySection("start-your-course"),
    [contentData]
  );

  const expertInstructorLiveClassesData = useMemo(
    () => getDataBySection("expert-instructor-live-classes"),
    [contentData]
  );

  const mentorsData = useMemo(
    () => getDataBySection("mentors"),
    [contentData] // only recompute when contentData changes
  );

  const learningToCareerData = useMemo(
    () => getDataBySection("learning-to-career"),
    [contentData] // only recompute when contentData changes
  );

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
        <HeroSection data={heroData} />
        <AchieveYourGoals data={achieveYourGoalsData} />
        <ShapingFutures data={shapingFuturesData} />
        {/* <EvolutionOFCodIntern /> comment this */}
        <StartYourCourse data={startYourCourseData} />
        <ExpertInstructorLiveClasses data={expertInstructorLiveClassesData} />
        <Mentors data={mentorsData} pageName="about-us" />
        <LearningToCareer
          data={learningToCareerData}
          pageName="about-us"
          className="pb-12 sm:pb-24"
        />
        {/* <LearnersStories className="!pt-0" /> */}
      </div>
    </section>
  );
};

export default AboutUs;
