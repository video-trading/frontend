import { type } from "os";
import React from "react";

interface Props {
  onClick?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function LoadingProgress() {
  return (
    <div
      className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}

export default function LoadingButton(props: Props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      type={props.type}
    >
      {props.loading ? <LoadingProgress /> : props.children}
    </button>
  );
}
