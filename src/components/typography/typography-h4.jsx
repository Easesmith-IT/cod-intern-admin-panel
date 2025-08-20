import { cn } from "@/lib/utils";

export const TypographyH4 = ({ heading = "", className }) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {heading}
    </h4>
  );
};
