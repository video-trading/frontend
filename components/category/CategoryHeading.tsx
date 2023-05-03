import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function CategoryHeading({ name }: { name: string }) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-10">
      <div className="absolute">
        <Link href={"/"}>
          <button
            type="button"
            className="rounded-full bg-purple-700 p-2 text-white shadow-sm hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </Link>
      </div>
      <h2 className="h2 font-cabinet-grotesk text-gray-100 text-center">
        {name}
      </h2>
    </div>
  );
}
