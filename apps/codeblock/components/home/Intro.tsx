import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  onClick: () => void;
}

export default function Intro(props: Props) {
  return (
    <div className="bg-[url('/assets/illustrations/overlay.svg')] bg-contain bg-right-top bg-no-repeat pb-16">
      <div className="container py-16 flex items-center flex-col md:flex-row justify-between">
        <div className="flex-1 w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="mb-8 text-3xl md:text-5xl font-bold text-brand-primary dark:text-white typography">
            CodeBlock
          </h1>
          <h2 className="mb-[2.5rem] text-2xl md:text-4xl text-brand-secondary dark:text-slate-200 typography">
            Configure your code without headache
          </h2>
          <button onClick={props.onClick}>
            <a className="button button-primary">Try it now!</a>
          </button>
        </div>
        <div className="flex-1 w-full md:w-1/2">
          <Image
            src="/assets/illustrations/dev.svg"
            alt="I’m John and I’m a JAMStack engineer!"
            width={463}
            height={273}
            priority
          />
        </div>
      </div>
    </div>
  );
}
