import React from "react";

interface Props {
  title: string;
  description: string;
}

export default function HistoryHeader({ title, description }: Props) {
  return (
    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
      <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
