import { cn } from "@/lib/utils";

export const TypographyH1 = ({ heading = "", className }) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {heading}
    </h1>
  );
};
