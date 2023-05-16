import { CircularProgressBarFullscreen } from "@/components/shared/Placeholders";
import React from "react";

export default function loading() {
  return (
    <div className="absolute h-screen w-screen flex top-0 left-0">
      <CircularProgressBarFullscreen />;
    </div>
  );
}
