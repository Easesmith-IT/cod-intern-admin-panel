import Image from 'next/image';
import React from 'react'

export const Tech = ({title}) => {
  return (
    <div className="flex flex-col gap-2 justify-start items-center">
      <Image className="" src="google.svg" width={24} height={24} alt="tech" />
      <p className="font-stolzl font-book text-para-1 text-center text-xs">{title}</p>
    </div>
  );
}
