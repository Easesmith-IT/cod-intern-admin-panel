import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";

export const CourseCategory = ({
  index,
  name,
  label,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <CarouselItem className="basis-auto">
      <div className="p-1">
        <Button
          // disabled={index !== 0}
          variant={selectedCategory === name ? "codIntern" : "outline"}
          className="rounded text-xs sm:text-sm"
          onClick={() => setSelectedCategory(name)}
        >
          {label}
        </Button>
      </div>
    </CarouselItem>
  );
};
