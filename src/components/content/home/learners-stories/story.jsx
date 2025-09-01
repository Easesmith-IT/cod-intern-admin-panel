import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Story = ({ img, rating, name, position, desc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
      <div className="p-1">
        <Card className="border-none rounded-md shadow-[0px_0px_10px_0px_#00000026]">
          <CardContent>
            <div className="flex gap-4 items-center bg-[#F6F6F6] rounded-full w-full">
              <Image
                src={img || "/linkedin.svg"}
                width={45}
                height={45}
                alt="linkedin"
              />
              <div className="flex gap-2 items-center">
                <div className="flex gap-1">
                  <StarIcon className="w-3 h-3 text-[#FFA500] fill-[#FFA500]" />
                  <StarIcon className="w-3 h-3 text-[#FFA500] fill-[#FFA500]" />
                  <StarIcon className="w-3 h-3 text-[#FFA500] fill-[#FFA500]" />
                  <StarIcon className="w-3 h-3 text-[#FFA500] fill-[#FFA500]" />
                  <StarIcon className="w-3 h-3 text-[#FFA500]" />
                </div>
                <span className="font-stolzl text-xs">({rating})</span>
              </div>
            </div>

            <div className="mt-5 font-stolzl font-book text-para text-sm">
              <p>
              {isExpanded ? desc : <span className="line-clamp-6">{desc}</span>}
              </p>
              <p
                onClick={() => setIsExpanded((prev) => !prev)}
                className="font-medium cursor-pointer text-main text-right"
              >
                Read {isExpanded ? "Less" : "More"}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="font-stolzl font-medium">{name}</h4>
              <p className="font-stolzl font-book text-xs text-[#2C1D4385]">
                {position}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};
