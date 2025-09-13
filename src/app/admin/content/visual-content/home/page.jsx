"use client";

import { HeroSection } from "@/components/content/home/hero-section/hero-section";
import { LearningToCareer } from "@/components/content/home/learning-to-career/learning-to-career";
import { SharpenYourSkill } from "@/components/content/home/sharpen-your-skills/sharpen-your-skill";
import { Universities } from "@/components/content/home/universities/universities";
import { WhyCodInterns } from "@/components/content/home/why-cod-interns/why-cod-interns";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { useApiQuery } from "@/hooks/useApiQuery";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ConnectWithUs } from "../../../../../components/content/home/connect-with-us";
import { LearnersStories } from "../../../../../components/content/home/learners-stories/learners-stories";
import { Mentors } from "../../../../../components/content/home/mentors/mentors";
import { PopularCourses } from "../../../../../components/content/home/popular-courses/popular-courses";
import { ThreeStepApproach } from "../../../../../components/content/home/three-step-approach/three-step-approach";
import { WeJustKeepGrowing } from "../../../../../components/content/home/we-just-keep-growing";
import { useMemo } from "react";

const Home = () => {
  const {
    data: contentData,
    isLoading,
    isError,
  } = useApiQuery({
    url: "/admin/content/home", // pageName = "home"
    queryKeys: ["content", "home"],
  });

  console.log("contentData", contentData);

  const getDataBySection = (sectionName, pageName ="home") => {
    return contentData?.data?.find(
      (section) =>
        section.pageName === pageName && section.sectionName === sectionName
    );
  };

  const threeStepData = useMemo(
    () => getDataBySection("three-step-approach"),
    [contentData]
  );

  const popularCoursesData = useMemo(
    () => getDataBySection("popular-courses"),
    [contentData] // only recompute when contentData changes
  );

  const sharpenYourSkillData = useMemo(
    () => getDataBySection("sharpen-your-skill"),
    [contentData] // only recompute when contentData changes
  );

  const universitiesData = useMemo(
    () => getDataBySection("universities"),
    [contentData] // only recompute when contentData changes
  );

  const whyCodInternsData = useMemo(
    () => getDataBySection("why-cod-interns"),
    [contentData] // only recompute when contentData changes
  );

  const learningToCareerData = useMemo(
    () => getDataBySection("learning-to-career"),
    [contentData] // only recompute when contentData changes
  );

  const connectWithUsData = useMemo(
    () => getDataBySection("connect-with-us"),
    [contentData] // only recompute when contentData changes
  );

  const weJustKeepGrowingData = useMemo(
    () => getDataBySection("we-just-keep-growing"),
    [contentData] // only recompute when contentData changes
  );
  
  const mentorsData = useMemo(
    () => getDataBySection("mentors"),
    [contentData] // only recompute when contentData changes
  );

  return (
    <div className="w-full">
      <Link
        href="/admin/content/visual-content"
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="Home Page" />
      </Link>
      {isLoading && <div>Loading...</div>}

      <div className="bg-white">
        <HeroSection />
        <ThreeStepApproach data={threeStepData} />
        {/* <FreshJobs /> */}
        {/* <AccelerateYourCareer /> */}
        <PopularCourses data={popularCoursesData} />
        <SharpenYourSkill data={sharpenYourSkillData} />
        <Universities data={universitiesData} />
        <WhyCodInterns data={whyCodInternsData} />
        <LearningToCareer data={learningToCareerData} />
        <ConnectWithUs data={connectWithUsData} />
        <WeJustKeepGrowing data={weJustKeepGrowingData} />
        {/* <LearnersStories /> */}
        <Mentors data={mentorsData} />
      </div>
    </div>
  );
};

export default Home;
