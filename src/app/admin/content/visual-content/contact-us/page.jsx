"use client";

import { GetMoreInformation } from "@/components/content/contact-us/get-more-information/get-more-information";
import { HeroSection } from "@/components/content/contact-us/hero";
import { Map } from "@/components/content/contact-us/map";
import { SendUsMessage } from "@/components/content/contact-us/send-us-message/send-us-message";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { useApiQuery } from "@/hooks/useApiQuery";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

const ContactUs = () => {
  const {
    data: contentData,
    isLoading,
    isError,
  } = useApiQuery({
    url: "/admin/content/contact-us", // pageName = "contact"
    queryKeys: ["content", "contact-us"],
  });

  console.log("contentData", contentData);

  const getDataBySection = (sectionName, pageName = "contact-us") => {
    return contentData?.data?.find(
      (section) =>
        section.pageName === pageName && section.sectionName === sectionName
    );
  };

  const heroData = useMemo(() => getDataBySection("hero"), [contentData]);
  const sendUsMessageData = useMemo(
    () => getDataBySection("send-us-message"),
    [contentData]
  );
  const mapData = useMemo(() => getDataBySection("map"), [contentData]);
  const getMoreInformationData = useMemo(
    () => getDataBySection("get-more-information"),
    [contentData]
  );

  return (
    <section>
      <Link
        href="/admin/content/visual-content"
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="Contact Us Page" />
      </Link>

      <div className="bg-white">
        <HeroSection data={heroData} isLoading={isLoading} />
        <SendUsMessage data={sendUsMessageData} isLoading={isLoading} />
        <Map data={mapData} isDataLoading={isLoading} />
        <GetMoreInformation
          data={getMoreInformationData}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default ContactUs;
