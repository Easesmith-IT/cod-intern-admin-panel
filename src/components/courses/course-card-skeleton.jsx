import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CourseCardSkeleton = () => {
  return (
    <div>
      <Card className="shadow-none border-none">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <Skeleton className="w-64 h-48 rounded-lg" />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                {/* Badges */}
                <div className="flex items-center space-x-2 mb-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>

                {/* Title */}
                <Skeleton className="h-6 w-3/4 mb-2" />

                {/* Description */}
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-12 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-5 items-center bg-white p-3 rounded-md mt-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-20 h-8" />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 bg-white p-3 rounded-md mt-5">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
      </div>
    </div>
  );
};
