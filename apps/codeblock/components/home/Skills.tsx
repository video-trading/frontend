import React from "react";
import Image from "next/image";

export default function Skills() {
  return (
    <div
      className="bg-[url('/assets/illustrations/details.svg')] bg-contain bg-no-repeat bg-left-top"
      id="about"
    >
      <div className="container py-16 flex flex-col lg:flex-row justify-between items-center">
        <div className="flex-none lg:flex-1">
          <Image
            src="/assets/illustrations/skills.svg"
            width={447}
            height={326}
          />
        </div>
        <div className="flex-none lg:flex-1 pl-0 lg:pl-8">
          <h2 className="mb-8 text-3xl font-bold text-brand-primary dark:text-white typography">
            Features
          </h2>
          <p className="mb-[2.5rem] font-normal text-xl md:text-[26px] text-brand-secondary dark:text-slate-200 leading-[34px] typography">
            Codeblock is a code visualization tool that helps you to visualize
            your code configurable parameters and their values. It is a designed
            for non-technical users to understand the code and its parameters.
            Users typically can config the code parameters without any coding
            knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}
