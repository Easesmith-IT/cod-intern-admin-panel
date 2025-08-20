import { TypographyH2 } from "@/components/typography/typography-h2";
import { Button } from "@/components/ui/button";
import { Image, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const Content = () => {
  return (
    <div className="space-y-5">
      <TypographyH2 heading="Content Management" />
      <div className="grid grid-cols-2 gap-10 shadow-md bg-white px-5 py-8 rounded-sm">
        <Button
          variant="codIntern"
          className="h-14 text-xl font-inter font-semibold"
          asChild
        >
          <Link href="/admin/content/seo">
            <Search className="size-6" />
            <span>Update SEOs</span>
          </Link>
        </Button>
        <Button
          variant="codIntern"
          className="h-14 text-xl font-inter font-semibold"
          asChild
        >
          <Link href="/admin/content/visual-content">
            <Image className="size-6" />
            <span>Update Visual Content</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Content;
