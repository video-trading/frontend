import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex flex-col min-h-screen overflow-hidden">
          <div className="absolute top-20 left-20">
            <Link href={`/`}>
              <button
                type="button"
                className="rounded-full bg-gray-400 p-2 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
