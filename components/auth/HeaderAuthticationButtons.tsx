"use client";

import { classNames } from "@/src/classNames";
import useDebounce from "@/src/hooks/useDebounce";
import { useSearchVideoByKeyword } from "@/src/hooks/useSearchVideoByKeyword";
import { SearchVideoResponse } from "@/src/services/VideoService";
import { Combobox } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CircularProgressBar } from "../shared/Placeholders";
import Avatar from "./Avatar";

const queryClient = new QueryClient();

export default function HeaderAuthticationButtons({
  session,
  balance,
}: {
  session: any;
  balance?: number;
}) {
  const { t } = useTranslation("common");

  return (
    <QueryClientProvider client={queryClient}>
      <nav className="flex grow">
        {/* Desktop sign in links */}
        <ul className="flex grow justify-end flex-wrap items-center  space-x-3">
          <SearchBar />
          {!session && (
            <li>
              <Link
                className="font-medium text-gray-600 decoration-blue-500 decoration-2 underline-offset-2 hover:underline px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                href={"/signin"}
              >
                {t("sign-in")}
              </Link>
            </li>
          )}
          {!session && (
            <li className="ml-3">
              <Link
                className="btn-sm text-white bg-blue-500 hover:bg-blue-600 w-full shadow-sm"
                href="/signup"
              >
                {t("sign-up")}
              </Link>
            </li>
          )}
          {session && <Avatar user={session.user} tokenBalance={balance} />}
        </ul>
      </nav>
    </QueryClientProvider>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 500);
  const { isLoading, data } = useSearchVideoByKeyword(debounceQuery);
  const router = useRouter();

  return (
    <div className="w-96 hidden sm:block">
      <Combobox
        onChange={(value: SearchVideoResponse) => {
          router.push(`/watch/${value.id}`);
        }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <CircularProgressBar />
            </div>
          )}
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {(data?.length ?? 0) > 0 && (
          <Combobox.Options
            className={
              "absolute z-10 mt-1 max-h-60 w-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            }
          >
            {data?.map((video) => (
              <Combobox.Option
                key={video.id}
                value={video}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-blue-600 text-white" : "text-gray-900"
                  )
                }
              >
                {video.title}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </div>
  );
}
