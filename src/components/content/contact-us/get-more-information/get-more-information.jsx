import Image from "next/image";
import React from "react";
import { Info } from "./info";
import { EditableInfoCards } from "./editable-info-cards";
import { InfoCard } from "./info-card";

export const GetMoreInformation = ({ data, isLoading }) => {
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

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full mt-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <InfoCard.Skeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && <EditableInfoCards data={data} isLoading={isLoading} />}
    </section>
  );
};
