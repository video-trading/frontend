import { CategoryService } from "@/src/services/CategoryService";
import React, { Suspense } from "react";
import { CircularProgressBar } from "../shared/Placeholders";
import Carousel from "./carousel";

export default async function CategoryDisplay() {
  const categories = await CategoryService.getCategories();
  return (
    <Suspense fallback={<CircularProgressBar />}>
      <Carousel categories={categories} />
    </Suspense>
  );
}
