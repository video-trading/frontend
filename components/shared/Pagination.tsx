"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  total: number;
  page: number;
  basePath: string;
}

interface PaginationResult {
  value: string;
  isMiddle?: boolean;
}

export function generatePagination(
  page: number,
  total: number
): PaginationResult[] {
  const paginationList: PaginationResult[] = [];

  if (total <= 0 || page <= 0 || page > total) {
    return paginationList;
  }

  const middle = {
    isMiddle: true,
    value: "...",
  };

  // Add the first three numbers
  for (let i = 1; i <= Math.min(total, 3); i++) {
    paginationList.push({
      value: i.toString(),
    });
  }

  // Add the '...' if there are more than three pages
  if (total > 3) {
    paginationList.push(middle);
  }

  // Add the last three numbers
  for (let i = Math.max(total - 2, 4); i <= total; i++) {
    paginationList.push({
      value: i.toString(),
    });
  }

  return paginationList;
}

export default function Paginator({ total, page, basePath }: Props) {
  const paginationList = generatePagination(page, total);

  return (
    <div>
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <Link
          // @ts-ignore
          href={`${basePath}?page=${Math.max(page - 1, 1)}`}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </Link>
        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
        {paginationList.map((item) =>
          item.value === page.toString() ? (
            <button
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {item.value}
            </button>
          ) : (
            <Link
              aria-current="page"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              // @ts-ignore
              href={`${basePath}?page=${item.value}`}
            >
              {item.value}
            </Link>
          )
        )}

        <Link
          // @ts-ignore
          href={`${basePath}?page=${page + 1}`}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
