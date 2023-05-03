import { GetCategoryResponse } from "@/src/services/CategoryService";
import React from "react";

interface Props {
  category: GetCategoryResponse;
}

export default function VideoBreadcrumb({ category }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div className="flex items-center text-sm">
            <a
              href={"/"}
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Home
            </a>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          </div>
        </li>
        <li>
          <div className="flex items-center text-sm">
            <a
              href={`/category/${category.id}`}
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              {category.name}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
}
