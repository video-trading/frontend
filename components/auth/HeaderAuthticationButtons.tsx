"use client";

import { signIn, signOut } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

export default function HeaderAuthticationButtons({
  session,
  balance,
}: {
  session: any;
  balance?: number;
}) {
  const { t } = useTranslation("common");

  return (
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
  );
}

function SearchBar() {
  return (
    <form className="w-96 hidden sm:block">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
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
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search videos"
          required
        />
      </div>
    </form>
  );
}
