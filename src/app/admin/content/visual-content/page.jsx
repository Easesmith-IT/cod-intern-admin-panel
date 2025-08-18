import { TypographyH2 } from "@/components/typography.jsx/typography-h2";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
const options = [
  {
    label: "Home page",
    href: "/admin/content/visual-content/home",
    time: "Last Update 28 mins ago",
  },
  {
    label: "About Us",
    href: "/admin/content/visual-content/about-us",
    time: "Last Update 28 mins ago",
  },
  {
    label: "Contact Us",
    href: "/admin/content/visual-content/contact-us",
    time: "Last Update 28 mins ago",
  },
  {
    label: "Blogs",
    href: "/admin/content/visual-content/contact-us",
    time: "Last Update 28 mins ago",
  },
];

const VisualContent = () => {
  return (
    <div className="space-y-5">
      <Link href="/admin/content" className="flex gap-1 items-center mb-4">
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="All Pages" />
      </Link>

      <div className="grid grid-cols-1 gap-4 shadow-md bg-white p-5 rounded-sm">
        {options.map(({ label, href, time }, i) => (
          <Button
            key={i}
            asChild
            className="bg-[#F6F6F6] hover:bg-[#e5e5e5] active:scale-y-100 active:scale-x-100 active:scale-100 active:bg-[#F6F6F6] transition-colors flex justify-between h-16 text-[#555555] p-5 rounded-xl"
          >
            <Link href={href}>
              <h2 className="text-xl font-inter font-semibold">{label}</h2>
              <p className="font-inter">{time}</p>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VisualContent;
