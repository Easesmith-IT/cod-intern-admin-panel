import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import ReactStars from "react-stars";
import { Badge } from "../ui/badge";
import Spinner from "../shared/Spinner";
import { Switch } from "../ui/switch";
import { PATCH } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";

export const Review = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    _id,
    rating,
    reviewText,
    reviewerName,
    reviewerRole,
    platform,
    status,
  } = review || {};

  const [isActive, setIsActive] = useState(status === "active" || false);

  const {
    mutateAsync: updateStatus,
    isPending,
    error,
  } = useApiMutation({
    url: `/admin/reviews/${_id}/status`,
    method: PATCH,
    invalidateKey: ["review"],
  });

  const handleStatus = async (value) => {
    setIsActive(value);
    await updateStatus({ status: value ? "active" : "inactive" });
  };

  useEffect(() => {
    setIsActive(status === "active");
  }, [status, error]);

  const getImageByPlatform = (value) => {
    switch (value) {
      case "LinkedIn":
        return "/linkedin.svg";

      case "Google":
        return "/google.svg";

      case "Website":
        return "/logo.svg";

      default:
        return "/user-placeholder.png";
    }
  };

  return (
    <Card className="border-none rounded-md">
      <CardContent>
        <div className="flex gap-4 items-center bg-[#F6F6F6] rounded-full w-full">
          <Image
            src={getImageByPlatform(platform)}
            width={45}
            height={45}
            alt={platform || "Logo"}
          />
          <div className="flex gap-2 items-center">
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              edit={false}
              value={rating}
            />
            <span className="font-stolzl text-xs">({rating})</span>
          </div>
        </div>

        <div className="mt-5 font-stolzl font-book text-para text-sm">
          <p>
            {isExpanded ? (
              reviewText
            ) : (
              <span className="line-clamp-6">{reviewText}</span>
            )}
          </p>
          <p
            onClick={() => setIsExpanded((prev) => !prev)}
            className="font-medium cursor-pointer text-main text-right"
          >
            Read {isExpanded ? "Less" : "More"}
          </p>
        </div>

        <div className="flex gap-4 justify-between mt-5">
          <div>
            <h4 className="font-stolzl font-medium">{reviewerName}</h4>
            <p className="font-stolzl font-book text-xs text-[#2C1D4385]">
              {reviewerRole}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <Badge
              className="capitalize h-6"
              variant={isActive ? "success" : "secondary"}
            >
              {isPending ? (
                <Spinner spinnerClassName="size-4" />
              ) : isActive ? (
                "Active"
              ) : (
                "Inactive"
              )}
            </Badge>
            <Switch
              checked={isActive}
              onCheckedChange={handleStatus}
              disabled={isPending}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

Review.Skeleton = function ReviewSkeleton() {
  return (
    <Card className="border-none rounded-md">
      <CardContent className="space-y-5">
        {/* Top Section: Logo + Rating */}
        <div className="flex gap-4 items-center bg-[#F6F6F6] rounded-full w-full p-2">
          <Skeleton className="h-[45px] w-[45px] rounded-full" />
          <div className="flex gap-2 items-center">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-3 rounded-sm" />
              ))}
            </div>
            <Skeleton className="h-3 w-8 rounded" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-11/12 rounded" />
          <Skeleton className="h-3 w-10/12 rounded" />
          <Skeleton className="h-3 w-2/5 rounded ml-auto" /> {/* Read more */}
        </div>

        {/* User Info */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-32 rounded" /> {/* Name */}
          <Skeleton className="h-3 w-20 rounded" /> {/* Position */}
        </div>
      </CardContent>
    </Card>
  );
};
