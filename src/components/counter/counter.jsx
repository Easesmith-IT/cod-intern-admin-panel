// "use client";

import { cn } from "@/lib/utils";

  // return (
  //   <div className="flex items-center font-stolzl text-xs md:text-base">
  //     <div className="flex justify-center border w-6 h-6 md:w-8 md:h-8 rounded items-center p-2">
  //       {format(days)}
  //     </div>
  //     <p className="px-2">:</p>
  //     <div className="flex justify-center border w-6 h-6 md:w-8 md:h-8 rounded items-center p-2">
  //       {format(hours)}
  //     </div>
  //     <p className="px-2">:</p>
  //     <div className="flex justify-center border w-6 h-6 md:w-8 md:h-8 rounded items-center p-2">
  //       {format(minutes)}
  //     </div>
  //     <p className="px-2">:</p>
  //     <div className="flex justify-center border w-6 h-6 md:w-8 md:h-8 rounded items-center p-2">
  //       {format(seconds)}
  //     </div>
  //   </div>
  // );

export const CounterSeperator = ({ className }) => {
  return <p className={cn("px-2", className)}>:</p>;
};

export const CounterItem = ({ className, value }) => {
  return (
    <div
      className={cn(
        "flex justify-center border w-6 h-6 md:w-8 md:h-8 rounded items-center p-2",
        className
      )}
    >
      {value}
    </div>
  );
};
