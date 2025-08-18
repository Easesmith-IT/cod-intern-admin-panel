import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Benifit } from "./benifit";

export const SharpenYourSkill = () => {
  return (
    <section className="section-container py-12 md:py-24 flex flex-col lg:flex-row items-center sm:justify-between gap-10">
      <div className="">
        <div className="flex max-w-[590px]">
          <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium">
            <span className="text-main">Master In-Demand Skills</span> with Our
            Online Courses
            <Image
              src="/ellipse-group.svg"
              className="inline-block ml-2"
              width={46}
              height={16}
              alt="Ellipse"
            />
          </h2>
        </div>
        <p className="font-stolzl font-book text-para max-w-[590px] text-xs sm:text-base mt-5">
          Take advantage of our state-of-the-art online courses, which are
          intended to give you the highly sought-after skills you need to
          succeed in the fast-paced workplace of today. Our programs combine
          real-world, hands-on learning with AI-driven insights to make sure you
          not only understand theoretical ideas but also become an expert in
          their practical application. From fundamental concepts to more complex
          specializations, we enable you to gain employable skills and quicken
          your professional path.
        </p>
        <Button
          size="lg"
          variant="linearGradient"
          className="rounded-sm px-5 h-12 mt-10"
        >
          Need More Information
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <Image
          src="/sharpenYourSkill/sharpen-your-skill-img.jpg"
          width={353}
          height={404}
          alt="sharpen-your-skill-img"
        />
        <div className="sm:w-[245px] space-y-4">
          <h3 className="font-stolzl font-medium sm:hidden text-lg sm:text-2xl">
            Benefits of Online Training
          </h3>
          <h3 className="font-stolzl hidden sm:block font-medium text-xl sm:text-2xl">
            Benefits of <br /> Online Training
          </h3>
          <Benifit src="/sharpenYourSkill/Flexibility.svg" title="Flexibility in study" />
          <Benifit src="/sharpenYourSkill/Easy.svg" title="Easy On The Pockets" />
          <Benifit src="/sharpenYourSkill/online-support.svg" title="Online Support" />
          <Benifit src="/sharpenYourSkill/Career.svg" title="Progress Report" />
        </div>
      </div>
    </section>
  );
};
