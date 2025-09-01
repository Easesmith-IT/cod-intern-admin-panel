import Image from "next/image";
import React from "react";
import { Mentor } from "./mentor";

export const Mentors = () => {
  return (
    <section className="section-container">
      <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium text-center">
        <span className="text-main">Experts Fueling</span> Your Career Journey
        <Image
          src="/ellipse-group.svg"
          className="inline-block ml-2"
          width={46}
          height={16}
          alt="Ellipse"
        />
      </h2>
      <p className="font-stolzl text-sm text-para max-w-[869px] mx-auto text-center mt-2 font-book">
        Meet the professionals guiding your path — seasoned leaders who’ve
        worked with top companies and are now here to accelerate your growth
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        <Mentor
          img="/our-mentors/user-placeholder.png"
          name="Hisham Khan"
          position="Lead Career Mentor"
          experience="Ex–Deloitte | Present–Career Strategist, CodIntern"
          about="With years of consulting experience at Deloitte, Hisham brings sharp industry insights and a passion for mentoring students toward job-readiness."
        />
        <Mentor
          img="/our-mentors/user-placeholder.png"
          name="Priya Malhotra"
          position="Software Engineering Mentor"
          experience="Present–Software Developer at Microsoft"
          about="An expert in full-stack development, Priya blends technical depth with real-world case studies to help learners grasp modern development practices."
        />
        <Mentor
          img="/our-mentors/user-placeholder.png"
          name="Ankur Jain"
          position="Data Science & AI Mentor"
          experience="Ex–Accenture | Present–AI Consultant"
          about="With a strong background in AI and data analytics, Ankur guides students through hands-on projects and industry-relevant tools."
        />
      </div>
    </section>
  );
};
