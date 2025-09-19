"use client";

import { TypographyH2 } from "@/components/typography/typography-h2";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const options = [
  {
    label: "Home page",
    href: "/admin/content/seo/home-page",
    time: "Last Update 28 mins ago",
  },
  {
    label: "Blogs",
    href: "/admin/content/seo/blogs",
    time: "Last Update 28 mins ago",
  },
  {
    label: "About Us",
    href: "/admin/content/seo/about-us",
    time: "Last Update 28 mins ago",
  },
  {
    label: "Contact Us",
    href: "/admin/content/seo/contact-us",
    time: "Last Update 28 mins ago",
  },
];

const Seo = () => {
  return (
    <div className="shadow-md bg-white p-5 rounded-sm">
      <Link
        href="/admin/content"
        className="inline-flex gap-1 items-center justify-start mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="Seo" />
      </Link>
      <div className="grid grid-cols-1 gap-4 mt-5">
        {options.map((option, i) => (
          <Button
            key={i}
            className="bg-[#F6F6F6] hover:bg-[#e5e5e5] active:scale-y-100 active:scale-x-100 active:scale-100 active:bg-[#F6F6F6] transition-colors flex justify-between h-16 text-[#555555] p-5 rounded-xl"
            asChild
          >
            <Link href={option.href}>
              <h2 className="text-xl font-inter font-semibold">
                {option.label}
              </h2>
              <p className="font-inter">{option.time}</p>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Seo;
