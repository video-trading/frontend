import React from "react";

interface Props {
  className?: string;
  selections: string[];
  name: string;
  onChange: (selection: string) => void;
}

export default function RadioButtons({
  name,
  className,
  selections,
  onChange,
}: Props) {
  return (
    <div className={className}>
      {selections.map((selection) => (
        <div className="flex items-center gap-x-3" key={selection}>
          <input
            id={selection}
            name={name}
            type="radio"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            onChange={(e) => onChange(selection)}
          />
          <label
            htmlFor="push-everything"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {selection}
          </label>
        </div>
      ))}
    </div>
  );
}
