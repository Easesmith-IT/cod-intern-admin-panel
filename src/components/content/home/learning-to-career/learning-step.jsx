import React from "react";

export const LearningStep = ({ title,title1, desc, index, result,children }) => {
  return (
    <div className="border w-full border-[#D9D9D940] px-4 py-8 space-y-4">
      <div className="flex justify-center items-center mx-auto border-2 size-[68px] rounded-full font-stolzl font-medium text-xl border-main">
        {index}
      </div>
      <div>
      <h4 className="font-stolzl font-medium sm:text-lg text-center">{title}</h4>
      <h4 className="font-stolzl font-medium sm:text-lg text-center">{title1}</h4>
      </div>
      <div className="font-stolzl font-book text-xs sm:text-sm text-para text-center">
        {children}
      </div>
    </div>
  );
};
