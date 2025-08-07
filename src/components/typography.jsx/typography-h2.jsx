import { cn } from "@/lib/utils";

export const TypographyH2 = ({ heading = "", className }) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {heading}
    </h2>
  );
};
