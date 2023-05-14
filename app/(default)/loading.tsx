import {
  ImagePlaceHolder,
  TextPlaceHolder,
} from "@/components/shared/Placeholders";
import React from "react";

export default function loading() {
  return (
    <div className="space-y-8 mt-20 max-w-4xl mx-auto">
      <ImagePlaceHolder />
      <ImagePlaceHolder />
      <TextPlaceHolder />
      <ImagePlaceHolder />
      <ImagePlaceHolder />
      <ImagePlaceHolder />
    </div>
  );
}
