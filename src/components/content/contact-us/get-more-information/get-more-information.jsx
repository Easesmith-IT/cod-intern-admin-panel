import Image from "next/image";
import React from "react";
import { Info } from "./info";

export const GetMoreInformation = () => {
  return (
    <section className="section-container py-12 md:py-24">
      <h2 className="text-2xl font-stolzl leading-9 lg:leading-14 md:text-4xl  font-medium text-center">
        <span className="text-main">Discover</span> More
        <Image
          src="/ellipse-group.svg"
          className="inline-block ml-2"
          width={46}
          height={16}
          alt="Ellipse"
        />
      </h2>

      <div className="w-full hidden md:block h-[1px] bg-[#C9C9C9] relative mt-32">
        <div className="size-2 rounded-full bg-[#C9C9C9] absolute -left-0.5 -top-1"></div>
        <div className="size-2 rounded-full bg-[#C9C9C9] absolute -right-0.5 -top-1"></div>
      </div>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 mt-10 md:mt-0 md:flex gap-7 sm:gap-5 lg:gap-[30px] justify-center items-start">
        <Info
          index={1}
          icon="/contact-us/time-saving.svg"
          width={44}
          height={47}
          title="Effective Learning"
          desc="CodIntern's AI-powered learning and streamlined coursework maximize your study time so you learn the fundamentals effectively and get career-ready at the fastest pace without any wastage of time."
        />
        <Image
          className="-translate-y-2 hidden md:block"
          src="/contact-us/arrow-right.svg"
          width={15}
          height={19}
          alt="Arrow Right"
        />
        <Info
          index={2}
          icon="/contact-us/cost-effective.svg"
          width={44}
          height={44}
          title="Affordable Excellence"
          desc="Access high-quality tech training, thorough resources, and professional mentorship at a reasonable investment. CodIntern provides superior value, putting high-quality skilling within reach and returning high value on education."
        />
        <Image
          className="-translate-y-2 hidden md:block"
          src="/contact-us/arrow-right.svg"
          width={15}
          height={19}
          alt="Arrow Right"
        />
        <Info
          index={3}
          icon="/contact-us/reliable-and-flexible.svg"
          width={44}
          height={41}
          title="Unwavering & Responsive"
          desc="Learn at your own pace, on your own timeline, with CodIntern's powerful and flexible platform. Our steadfast support and flexible learning flexibility mean you can work toward your goals with confidence, integrating education into your life."
        />
      </div>
    </section>
  );
};
