import { cn } from "@/lib/utils"

export const TypographyH3 = ({ heading = "", className }) => {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight",className)}>
      {heading}
    </h3>
  );
};
