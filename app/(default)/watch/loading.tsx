import {
  CircularProgressBar,
  TextPlaceHolder,
} from "@/components/shared/Placeholders";
import React from "react";

export default function loading() {
  return (
    <div className="max-w-3xl mx-auto mt-32">
      <TextPlaceHolder />
    </div>
  );
}
