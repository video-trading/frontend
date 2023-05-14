import React, { Suspense } from "react";
import { SingleImagePlaceholder } from "./Placeholders";

interface Props {
  src?: string;
  alt: string;
  className?: string;
}

export default function FallbackImage({ src, alt, className }: Props) {
  if (src) {
    return <img src={src} alt={alt} className={className} />;
  }
  return <SingleImagePlaceholder />;
}
