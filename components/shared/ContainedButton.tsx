import { classNames } from "@/src/classNames";
import React from "react";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function ContainedButton({
  disabled,
  onClick,
  children,
}: Props) {
  return (
    <button
      type="button"
      className={classNames(
        disabled
          ? "bg-gray-300 text-gray-700 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700",
        "flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
